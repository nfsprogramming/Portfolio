import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import * as THREE from "three";
import FloatingModel from "./FloatingModel";
import Particles from "./Particles";

/**
 * The WebGL layer behind the hero. Fixed-positioned + pointer-events none
 * so it sits behind the DOM scroll content and never intercepts clicks.
 *
 * scrollRef is shared with the Hero — driven by a scroll listener outside
 * the canvas so the scene reacts to page scroll without re-rendering r3f.
 */
export default function Scene({
  scrollRef,
}: {
  scrollRef: React.MutableRefObject<number>;
}) {
  return (
    <div className="scene-wrap" aria-hidden="true">
      <Canvas
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        camera={{ position: [0, 0, 4.5], fov: 45, near: 0.1, far: 100 }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#050816"), 0);
        }}
      >
        <Suspense fallback={null}>
          <Lights />
          <FloatingModel scrollRef={scrollRef} />
          <Particles scrollRef={scrollRef} />
          <EffectComposer multisampling={0} enableNormalPass={false}>
            <Bloom
              intensity={0.85}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.6}
              mipmapBlur
              kernelSize={KernelSize.LARGE}
            />
            <Vignette eskil={false} offset={0.25} darkness={0.85} />
            <Noise opacity={0.025} premultiply blendFunction={THREE.AdditiveBlending} />
          </EffectComposer>
        </Suspense>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}

function Lights() {
  // Soft key + colored rim — palette glows bleed into the bloom pass.
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-6, -2, -3]} intensity={2.2} color="#00e5ff" />
      <pointLight position={[6, 3, -2]} intensity={1.6} color="#7b61ff" />
      <pointLight position={[0, -5, 2]} intensity={1.4} color="#14f195" />
    </>
  );
}
