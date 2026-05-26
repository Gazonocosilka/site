"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import HeroFigure from "./HeroFigure";
import { useDimension } from "../system/DimensionContext";

/**
 * Orbital particle swarm. Each particle is on its OWN elliptical orbit around
 * the figure with its own radius, speed, tilt and phase — they read as a
 * spinning nebula, not a static dust cloud. The whole swarm:
 *  - rotates faster when the cursor is near the centre (energy ramp)
 *  - tilts to follow the mouse
 *  - has a brighter "near belt" (closer particles) and a softer "far belt"
 */
function OrbitalParticles({ count = 800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const speedRef = useRef(1);
  const { mouse } = useThree();

  // Per-particle constants (orbit parameters). Positions are recomputed each frame.
  const params = useMemo(() => {
    const arr: {
      radius: number;
      speed: number;
      phase: number;
      yAmp: number;
      yFreq: number;
      tilt: number;
      eccentricity: number;
    }[] = [];
    for (let i = 0; i < count; i++) {
      // Two belts: 70% close (1.8–3.4), 30% far (3.6–6.5)
      const close = Math.random() < 0.7;
      const radius = close
        ? 1.8 + Math.random() * 1.6
        : 3.6 + Math.random() * 2.9;
      arr.push({
        radius,
        speed: (close ? 0.35 : 0.18) * (Math.random() * 0.7 + 0.7) * (Math.random() < 0.85 ? 1 : -1),
        phase: Math.random() * Math.PI * 2,
        yAmp: (Math.random() - 0.5) * (close ? 0.6 : 1.2),
        yFreq: 0.3 + Math.random() * 0.6,
        tilt: (Math.random() - 0.5) * 0.35,
        eccentricity: 0.85 + Math.random() * 0.4, // squashes the orbit slightly
      });
    }
    return arr;
  }, [count]);

  // Per-particle sizes, brightness via point sizes attribute
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = 0.01 + Math.random() * 0.05;
    }
    return s;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;

    // Cursor proximity ramps swarm speed multiplier
    const dist = Math.hypot(mouse.x, mouse.y);
    const targetSpeed = 1 + (1 - Math.min(dist, 1)) * 2.5;
    speedRef.current += (targetSpeed - speedRef.current) * 0.04;
    const m = speedRef.current;

    const arr = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < count; i++) {
      const p = params[i];
      const theta = p.phase + t * p.speed * m;
      const x = Math.cos(theta) * p.radius;
      const z = Math.sin(theta) * p.radius * p.eccentricity;
      const y = p.yAmp + Math.sin(t * p.yFreq + p.phase) * 0.3;
      // Apply per-particle tilt (rotate around X to give "ring" tilt)
      const cosT = Math.cos(p.tilt);
      const sinT = Math.sin(p.tilt);
      const yt = y * cosT - z * sinT;
      const zt = y * sinT + z * cosT;
      arr[i * 3] = x;
      arr[i * 3 + 1] = yt;
      arr[i * 3 + 2] = zt;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;

    // Tilt the whole swarm with cursor for parallax (very subtle)
    ref.current.rotation.y += (mouse.x * 0.4 - ref.current.rotation.y) * 0.03;
    ref.current.rotation.x += (-mouse.y * 0.25 - ref.current.rotation.x) * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.85}
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
      <OrbitalParticles count={750} />
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
