import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Background starfield — ~2000 instanced points spread across a hemisphere.
 * Subtle rotation + z-drift gives life without ever competing with the focal
 * object. Honors performance: a single BufferGeometry, additive points.
 */
export default function Particles({
  count = 2200,
  scrollRef,
}: {
  count?: number;
  scrollRef: React.MutableRefObject<number>;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const brand = [
      new THREE.Color("#00e5ff"),
      new THREE.Color("#7b61ff"),
      new THREE.Color("#14f195"),
      new THREE.Color("#ffffff"),
    ];

    for (let i = 0; i < count; i++) {
      // spherical distribution, biased outward
      const r = 4 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 2;

      const c = brand[Math.floor(Math.random() * brand.length)];
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 0.06 + 0.012;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.04;
    // descend gently with scroll
    pointsRef.current.position.z = scrollRef.current * 4;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        vertexColors
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
