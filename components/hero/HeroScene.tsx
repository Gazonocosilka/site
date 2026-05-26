"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import HeroFigure from "./HeroFigure";
import { useDimension } from "../system/DimensionContext";


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
