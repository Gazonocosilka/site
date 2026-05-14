"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useDimension } from "../system/DimensionContext";

/**
 * Sculptural chrome form:
 *  - central distorted icosphere (liquid mercury feel) with chrome + holographic blend
 *  - orbiting smaller chrome facets (octahedron, tetrahedron) at varying radii / speeds
 *  - thin orbital ring + a slow inner glass shell
 *  - reacts to mouse: whole assembly tilts; central form distortion intensity ramps with cursor distance from center
 */
export default function HeroFigure() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const distortRef = useRef<{ distort: number; speed: number }>({ distort: 0.38, speed: 1.6 });
  const { mode } = useDimension();
  const { mouse, viewport } = useThree();

  const envMap = useEnvCubeStub();

  // Holographic outer shell uniforms (fresnel + iridescent bands)
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

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    holoMat.uniforms.uTime.value = t;
    const targetMix = mode === "dimension" ? 1 : 0.3;
    holoMat.uniforms.uMix.value += (targetMix - holoMat.uniforms.uMix.value) * 0.04;

    if (group.current) {
      group.current.position.y = Math.sin(t * 0.5) * 0.05 - 0.05;
      group.current.rotation.y += (mouse.x * 0.35 - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (-mouse.y * 0.18 - group.current.rotation.x) * 0.04;
    }

    // Cursor proximity inflates distortion
    if (core.current) {
      core.current.rotation.y += 0.0025;
      core.current.rotation.x += 0.0014;
      const dist = Math.hypot(mouse.x, mouse.y);
      const targetDistort = 0.32 + dist * 0.45 + (mode === "dimension" ? 0.18 : 0);
      distortRef.current.distort += (targetDistort - distortRef.current.distort) * 0.05;
      const distMat = (core.current.material as unknown) as { distort: number };
      if (distMat) distMat.distort = distortRef.current.distort;
    }
  });

  const scale = Math.min(1.25, Math.max(0.65, viewport.width / 7));

  return (
    <group ref={group} scale={scale}>
      {/* Central liquid chrome icosphere */}
      <mesh ref={core}>
        <icosahedronGeometry args={[1.05, 32]} />
        <MeshDistortMaterial
          envMap={envMap}
          envMapIntensity={1.4}
          metalness={1}
          roughness={0.18}
          color="#dcdfea"
          distort={0.4}
          speed={1.6}
        />
      </mesh>

      {/* Holographic shell over the core */}
      <mesh material={holoMat} scale={1.03}>
        <icosahedronGeometry args={[1.05, 24]} />
      </mesh>

      {/* Thin glass shell (subtle inner refraction) */}
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
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime * speed + offset;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 0.7 + tiltY) * radius * 0.25,
      Math.sin(t) * radius
    );
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.013;
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
