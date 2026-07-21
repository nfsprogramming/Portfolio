import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMouse } from "../hooks/useMouse";

/**
 * Neural Sphere — the AI-lab centerpiece.
 *
 * Three layers stacked:
 *   1. A faint, slowly-rotating wireframe icosphere (the "globe").
 *   2. Glowing node points distributed on the sphere surface (neurons).
 *   3. Animated edge lines between near-by nodes that pulse / fade over time,
 *      with bright "signal" dots traveling along a few of them.
 *
 * The whole thing rotates with the cursor + drifts down / scales with scroll
 * (driven by scrollRef shared with the Hero).
 *
 * No external assets. Fully procedural. Bloom (added in Scene.tsx) is what
 * makes the nodes/edges actually glow — keep the EffectComposer in place.
 */
export default function FloatingModel({
  scrollRef,
}: {
  scrollRef: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const signalsRef = useRef<THREE.Points>(null);
  const { mouse } = useMouse();

  const RADIUS = 1.45;

  // --- geometry: points on a sphere + the edges that connect close pairs ---
  const { nodePositions, edges } = useMemo(() => {
    const NODE_COUNT = 90;
    const positions: THREE.Vector3[] = [];

    // fibonacci sphere distribution — even, pleasing coverage
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      positions.push(
        new THREE.Vector3(
          Math.cos(theta) * r * RADIUS,
          y * RADIUS,
          Math.sin(theta) * r * RADIUS
        )
      );
    }

    // connect each node to its nearest neighbours → network mesh
    const edgeList: [number, number][] = [];
    const maxEdgeDist = RADIUS * 0.62;
    for (let i = 0; i < NODE_COUNT; i++) {
      // find 2 nearest unconnected neighbours
      const dists: { j: number; d: number }[] = [];
      for (let j = 0; j < NODE_COUNT; j++) {
        if (i === j) continue;
        const d = positions[i].distanceTo(positions[j]);
        if (d < maxEdgeDist) dists.push({ j, d });
      }
      dists.sort((a, b) => a.d - b.d);
      for (let k = 0; k < Math.min(2, dists.length); k++) {
        const j = dists[k].j;
        if (j > i) edgeList.push([i, j]);
      }
    }

    return { nodePositions: positions, edges: edgeList };
  }, []);

  // node geometry (the neurons)
  const nodeGeometry = useMemo(() => {
    const arr = new Float32Array(nodePositions.length * 3);
    nodePositions.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [nodePositions]);

  // edge geometry — each edge = 2 vertices
  const edgeGeometry = useMemo(() => {
    const arr = new Float32Array(edges.length * 2 * 3);
    edges.forEach(([a, b], i) => {
      const pa = nodePositions[a];
      const pb = nodePositions[b];
      arr[i * 6] = pa.x;
      arr[i * 6 + 1] = pa.y;
      arr[i * 6 + 2] = pa.z;
      arr[i * 6 + 3] = pb.x;
      arr[i * 6 + 4] = pb.y;
      arr[i * 6 + 5] = pb.z;
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [edges, nodePositions]);

  // wireframe globe geometry
  const wireGeometry = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(RADIUS * 1.02, 2);
    return new THREE.WireframeGeometry(ico);
  }, []);

  // "signal" points that travel along a subset of edges
  const SIGNAL_COUNT = 14;
  const signalState = useMemo(
    () =>
      Array.from({ length: SIGNAL_COUNT }, () => ({
        edgeIdx: Math.floor(Math.random() * Math.max(1, edges.length)),
        t: Math.random(),
        speed: 0.25 + Math.random() * 0.5,
      })),
    [edges.length]
  );
  const signalGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(SIGNAL_COUNT * 3), 3)
    );
    return g;
  }, []);

  // colors
  const nodeColor = useMemo(() => new THREE.Color("#00e5ff"), []);
  const edgeColor = useMemo(() => new THREE.Color("#7b61ff"), []);
  const signalColor = useMemo(() => new THREE.Color("#14f195"), []);

  // smoothed cursor (laggy feel)
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // ease cursor toward actual mouse
    target.current.x += (mouse.current.x - target.current.x) * 0.05;
    target.current.y += (mouse.current.y - target.current.y) * 0.05;

    if (groupRef.current) {
      // constant slow spin + cursor influence
      groupRef.current.rotation.y +=
        delta * 0.12 + target.current.x * 0.0006;
      groupRef.current.rotation.x +=
        (target.current.y * 0.35 - groupRef.current.rotation.x) * 0.04;
      // float + scroll-driven descent
      groupRef.current.position.y =
        Math.sin(t * 0.5) * 0.08 - scrollRef.current * 1.2;
      const s = 1 - scrollRef.current * 0.3;
      groupRef.current.scale.setScalar(Math.max(0.15, s));
    }

    // counter-rotate the wireframe slightly for parallax depth
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.04;
      wireRef.current.rotation.z = Math.sin(t * 0.1) * 0.08;
    }

    // pulse nodes (vary opacity via material)
    if (nodesRef.current) {
      const m = nodesRef.current.material as THREE.PointsMaterial;
      m.opacity = 0.7 + Math.sin(t * 1.6) * 0.15;
    }

    // pulse edges
    if (edgesRef.current) {
      const m = edgesRef.current.material as THREE.LineBasicMaterial;
      m.opacity = 0.22 + Math.sin(t * 0.9) * 0.08;
    }

    // advance signals along their edges
    if (signalsRef.current) {
      const pos = signalsRef.current.geometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      signalState.forEach((s, i) => {
        s.t += delta * s.speed;
        if (s.t >= 1) {
          s.t = 0;
          s.edgeIdx = Math.floor(Math.random() * edges.length);
          s.speed = 0.25 + Math.random() * 0.5;
        }
        const edge = edges[s.edgeIdx] ?? edges[0];
        if (!edge) return;
        const a = nodePositions[edge[0]];
        const b = nodePositions[edge[1]];
        // lerp a→b
        pos.setXYZ(
          i,
          a.x + (b.x - a.x) * s.t,
          a.y + (b.y - a.y) * s.t,
          a.z + (b.z - a.z) * s.t
        );
      });
      pos.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* faint wireframe globe */}
      <lineSegments ref={wireRef} geometry={wireGeometry}>
        <lineBasicMaterial
          color="#7b61ff"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </lineSegments>

      {/* network edges */}
      <lineSegments ref={edgesRef} geometry={edgeGeometry}>
        <lineBasicMaterial
          color={edgeColor}
          transparent
          opacity={0.25}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* neuron nodes */}
      <points ref={nodesRef} geometry={nodeGeometry}>
        <pointsMaterial
          color={nodeColor}
          size={0.07}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* traveling signals */}
      <points ref={signalsRef} geometry={signalGeometry}>
        <pointsMaterial
          color={signalColor}
          size={0.12}
          sizeAttenuation
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
