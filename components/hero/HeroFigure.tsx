"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useDimension } from "../system/DimensionContext";

/**
 * Sculptural chrome form with the designer's initial ("I") sitting inside it:
 *  - outer transmissive glass shell (refracts and gives the whole form depth)
 *  - central chrome "I" — Inna's mark, built from chrome primitives, slowly rotates
 *  - small displaced chrome pearl behind the I (sense of inner core / pearl-in-shell)
 *  - close holographic fresnel halo wrapping the I
 *  - orbiting chrome facets at varying radii / speeds
 *  - thin orbital rings around the whole assembly
 * Mouse: whole assembly tilts; chrome pearl distortion ramps with cursor distance.
 */
export default function HeroFigure() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const letter = useRef<THREE.Group>(null);
  const distortRef = useRef<{ distort: number }>({ distort: 0.32 });
  const { mode } = useDimension();
  const { mouse, viewport } = useThree();

  const envMap = useEnvCubeStub();

  // Holographic fresnel shell shader (wraps the I)
  const holoMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMix: { value: 0.25 },
        uColorA: { value: new THREE.Color("#8BA8FF") },
        uColorB: { value: new THREE.Color("#B7A7FF") },
        uColorC: { value: new THREE.Color("#D6D6FF") },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        varying vec3 vView;
        varying vec3 vPos;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vView = normalize(-mv.xyz);
          vPos = position;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform float uMix;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;
        varying vec3 vNormal;
        varying vec3 vView;
        varying vec3 vPos;
        void main() {
          float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.6);
          float band = sin(vPos.y * 6.0 + uTime * 0.5) * 0.5 + 0.5;
          float band2 = sin(vPos.x * 8.0 - uTime * 0.7) * 0.5 + 0.5;
          vec3 col = mix(uColorA, uColorB, band);
          col = mix(col, uColorC, fres);
          col += uColorB * band2 * 0.15;
          float a = fres * (0.6 + 0.4 * uMix);
          gl_FragColor = vec4(col, a);
        }
      `,
    });
  }, []);

  // Polished chrome — used for the "I" and the small inner pearl
  const chromeMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#e6e8f0"),
        metalness: 1,
        roughness: 0.16,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        envMap,
        envMapIntensity: 1.6,
        reflectivity: 1,
      }),
    [envMap]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    holoMat.uniforms.uTime.value = t;
    const targetMix = mode === "dimension" ? 1 : 0.3;
    holoMat.uniforms.uMix.value += (targetMix - holoMat.uniforms.uMix.value) * 0.04;

    // Cursor energy — used to drive multiple bits of motion at once
    const cursorR = Math.hypot(mouse.x, mouse.y); // 0..~1
    const cursorEnergy = Math.min(1, cursorR);     // clamp to 0..1

    if (group.current) {
      // breathing
      group.current.position.y = Math.sin(t * 0.5) * 0.05 - 0.05;
      // assembly tilts with stronger cursor influence
      group.current.rotation.y += (mouse.x * 0.55 - group.current.rotation.y) * 0.06;
      group.current.rotation.x += (-mouse.y * 0.28 - group.current.rotation.x) * 0.06;
    }

    // Inner pearl distortion ramps with cursor proximity to center
    if (core.current) {
      const targetDistort = 0.28 + cursorR * 0.55 + (mode === "dimension" ? 0.18 : 0);
      distortRef.current.distort += (targetDistort - distortRef.current.distort) * 0.07;
      const distMat = (core.current.material as unknown) as { distort: number };
      if (distMat) distMat.distort = distortRef.current.distort;
    }

    // Letter "I" — actively tilts to follow cursor (yaw + pitch)
    // plus a baseline slow rotation + bob so it always feels alive.
    if (letter.current) {
      const targetYaw = mouse.x * 0.9 + Math.sin(t * 0.35) * 0.25 + t * 0.05;
      const targetPitch = -mouse.y * 0.5 + Math.sin(t * 0.4) * 0.1;
      letter.current.rotation.y += (targetYaw - letter.current.rotation.y) * 0.08;
      letter.current.rotation.x += (targetPitch - letter.current.rotation.x) * 0.08;
      // Bob + cursor-driven Z push (slightly forward when cursor is near)
      letter.current.position.y = Math.sin(t * 0.6) * 0.04 - mouse.y * 0.06;
      letter.current.position.x = mouse.x * 0.05;
      letter.current.position.z = cursorEnergy * 0.15;
      // Energetic scale pulse when cursor is near center
      const s = 1 + cursorEnergy * 0.06 + Math.sin(t * 2) * 0.01;
      letter.current.scale.setScalar(0.55 * s);
    }
  });

  const scale = Math.min(1.25, Math.max(0.65, viewport.width / 7));

  return (
    <group ref={group} scale={scale}>
      {/* Outer transmissive glass shell */}
      <mesh scale={1.45}>
        <icosahedronGeometry args={[1.05, 6]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.6}
          ior={1.25}
          roughness={0.1}
          chromaticAberration={0.04}
          envMap={envMap}
          color="#f0f1ff"
          opacity={0.18}
          transparent
          backside={false}
        />
      </mesh>

      {/* Holographic halo wrapping the I, sized small to feel intimate */}
      <mesh material={holoMat} scale={0.95}>
        <icosahedronGeometry args={[1.0, 24]} />
      </mesh>

      {/* The designer's initial — chrome serif "I" — built from three chrome blocks */}
      <group ref={letter} scale={0.55}>
        {/* Top serif */}
        <mesh position={[0, 1.15, 0]} material={chromeMat}>
          <boxGeometry args={[1.1, 0.18, 0.32]} />
        </mesh>
        {/* Stem */}
        <mesh position={[0, 0, 0]} material={chromeMat}>
          <boxGeometry args={[0.32, 2.2, 0.32]} />
        </mesh>
        {/* Bottom serif */}
        <mesh position={[0, -1.15, 0]} material={chromeMat}>
          <boxGeometry args={[1.1, 0.18, 0.32]} />
        </mesh>
        {/* Soft inner glow disc behind the letter (a "lit panel" feel) */}
        <mesh position={[0, 0, -0.25]} rotation={[0, 0, 0]}>
          <circleGeometry args={[1.3, 48]} />
          <meshBasicMaterial
            color={mode === "dimension" ? "#B7A7FF" : "#8BA8FF"}
            transparent
            opacity={0.22}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Small chrome pearl behind the I — sense of inner core */}
      <mesh ref={core} position={[0, 0, -0.6]} scale={0.34}>
        <icosahedronGeometry args={[1.05, 24]} />
        <MeshDistortMaterial
          envMap={envMap}
          envMapIntensity={1.4}
          metalness={1}
          roughness={0.18}
          color="#dcdfea"
          distort={0.32}
          speed={1.4}
        />
      </mesh>

      {/* Orbiting chrome facets */}
      <OrbitingShard radius={2.0} speed={0.32} offset={0} size={0.22} type="oct" envMap={envMap} />
      <OrbitingShard radius={2.35} speed={0.22} offset={Math.PI * 0.75} size={0.16} type="tet" envMap={envMap} />
      <OrbitingShard radius={1.85} speed={-0.45} offset={Math.PI * 1.4} size={0.13} type="oct" envMap={envMap} tiltY={0.3} />
      <OrbitingShard radius={2.7} speed={0.15} offset={Math.PI * 0.3} size={0.10} type="tet" envMap={envMap} tiltY={-0.4} />

      {/* Orbital rings */}
      <FloatingRing radius={1.7} thickness={0.005} color="#8BA8FF" opacity={0.55} speed={0.3} />
      <FloatingRing radius={2.3} thickness={0.003} color="#B7A7FF" opacity={0.35} speed={-0.2} tilt={0.6} />
    </group>
  );
}

function OrbitingShard({
  radius,
  speed,
  offset,
  size,
  type,
  envMap,
  tiltY = 0,
}: {
  radius: number;
  speed: number;
  offset: number;
  size: number;
  type: "oct" | "tet";
  envMap: THREE.CubeTexture;
  tiltY?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  const accRef = useRef(0);
  const speedMult = useRef(1);
  useFrame((s, delta) => {
    if (!ref.current) return;
    // Cursor proximity ramps orbit speed
    const e = 1 - Math.min(1, Math.hypot(mouse.x, mouse.y));
    const target = 1 + e * 2.2;
    speedMult.current += (target - speedMult.current) * 0.05;
    accRef.current += delta * speed * speedMult.current;
    const t = accRef.current + offset;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 0.7 + tiltY) * radius * 0.25,
      Math.sin(t) * radius
    );
    ref.current.rotation.x += 0.01 * speedMult.current;
    ref.current.rotation.y += 0.013 * speedMult.current;
  });
  return (
    <mesh ref={ref}>
      {type === "oct" ? (
        <octahedronGeometry args={[size, 0]} />
      ) : (
        <tetrahedronGeometry args={[size * 1.25, 0]} />
      )}
      <meshPhysicalMaterial
        color="#e6e8f0"
        metalness={1}
        roughness={0.2}
        envMap={envMap}
        envMapIntensity={1.4}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

function FloatingRing({
  radius,
  thickness,
  color,
  opacity,
  speed,
  tilt = 0,
}: {
  radius: number;
  thickness: number;
  color: string;
  opacity: number;
  speed: number;
  tilt?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI / 2 + Math.sin(s.clock.elapsedTime * 0.3) * 0.18 + tilt;
    ref.current.rotation.z = s.clock.elapsedTime * speed * 0.2;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, thickness, 8, 240]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function useEnvCubeStub() {
  return useMemo(() => {
    const size = 256;
    const make = (color: string, accent: string) => {
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const g = c.getContext("2d")!;
      const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size);
      grad.addColorStop(0, accent);
      grad.addColorStop(0.5, color);
      grad.addColorStop(1, "#050505");
      g.fillStyle = grad;
      g.fillRect(0, 0, size, size);
      return c;
    };
    const faces = [
      make("#1f2230", "#8BA8FF"),
      make("#1a1c26", "#7A7F87"),
      make("#0e1018", "#D6D6FF"),
      make("#080a0f", "#050505"),
      make("#1a1d28", "#B7A7FF"),
      make("#161821", "#7A7F87"),
    ];
    const tex = new THREE.CubeTexture(faces);
    tex.needsUpdate = true;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}
