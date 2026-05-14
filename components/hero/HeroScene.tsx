"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import HeroFigure from "./HeroFigure";
import { useDimension } from "../system/DimensionContext";

function Particles({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 8;
      const a = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 8;
      p[i * 3] = Math.cos(a) * r;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = Math.sin(a) * r - 2;
      s[i] = Math.random() * 0.012 + 0.002;
    }
    return { positions: p, sizes: s };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    const arr = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 1; i < arr.length; i += 3) {
      arr[i] += Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.0008;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.7}
        color="#D6D6FF"
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Lights() {
  const { mode } = useDimension();
  const isDim = mode === "dimension";
  return (
    <>
      <ambientLight intensity={0.18} />
      <directionalLight
        position={[3, 4, 5]}
        intensity={1.6}
        color={isDim ? "#B7A7FF" : "#D6D6FF"}
      />
      <pointLight position={[-3, 1, -2]} intensity={2.2} color={isDim ? "#FFDEE9" : "#8BA8FF"} distance={10} />
      <pointLight position={[2, -2, 3]} intensity={1.4} color="#7A7F87" distance={8} />
      <spotLight
        position={[0, 5, 2]}
        angle={0.45}
        penumbra={1}
        intensity={2.8}
        color={isDim ? "#FFDEE9" : "#ffffff"}
      />
    </>
  );
}

export default function HeroScene() {
  const { mode } = useDimension();
  const isDim = mode === "dimension";

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.2, 4.4], fov: 38 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <fog attach="fog" args={[isDim ? "#0a0510" : "#050505", 4, 13]} />
      <color attach="background" args={["#050505"]} />
      <Lights />
      <Suspense fallback={null}>
        <HeroFigure />
      </Suspense>
      <Particles count={500} />
      <EffectComposer multisampling={0}>
        <Bloom intensity={isDim ? 1.0 : 0.65} luminanceThreshold={0.85} luminanceSmoothing={0.2} mipmapBlur />
        <ChromaticAberration
          offset={new THREE.Vector2(isDim ? 0.0024 : 0.0008, isDim ? 0.0024 : 0.0008)}
          blendFunction={BlendFunction.NORMAL}
          radialModulation={false}
          modulationOffset={0}
        />
        <Noise opacity={0.04} blendFunction={BlendFunction.OVERLAY} />
        <Vignette eskil={false} offset={0.2} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
