"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useDimension } from "../system/DimensionContext";

/**
 * Abstract chrome humanoid silhouette.
 * Composed from primitive geometries + a holographic shader on a chrome base.
 * Subtle breathing, cursor-driven head tilt, drift.
 */
export default function HeroFigure() {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Mesh>(null);
  const body = useRef<THREE.Mesh>(null);
  const { mode } = useDimension();
  const { mouse, viewport } = useThree();

  const envMap = useEnvCubeStub();

  const chromeMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#dadde6"),
        metalness: 1,
        roughness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        envMap,
        envMapIntensity: 1.2,
        reflectivity: 1,
      }),
    [envMap]
  );

  const holoMat = useMemo(() => {
    const uniforms = {
      uTime: { value: 0 },
      uMix: { value: 0 },
      uColorA: { value: new THREE.Color("#8BA8FF") },
      uColorB: { value: new THREE.Color("#B7A7FF") },
      uColorC: { value: new THREE.Color("#D6D6FF") },
    };
    return new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vView = normalize(-mv.xyz);
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
        void main() {
          float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.4);
          float band = sin(vNormal.y * 18.0 + uTime * 0.6) * 0.5 + 0.5;
          vec3 col = mix(uColorA, uColorB, band);
          col = mix(col, uColorC, fres);
          float a = fres * (0.55 + 0.45 * uMix);
          gl_FragColor = vec4(col, a);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    holoMat.uniforms.uTime.value = t;
    const targetMix = mode === "dimension" ? 1 : 0.25;
    holoMat.uniforms.uMix.value += (targetMix - holoMat.uniforms.uMix.value) * 0.05;

    if (group.current) {
      // breathing
      group.current.position.y = Math.sin(t * 0.7) * 0.04 - 0.1;
      // subtle cursor-driven yaw
      const targetYaw = mouse.x * 0.25;
      const targetPitch = -mouse.y * 0.12;
      group.current.rotation.y += (targetYaw - group.current.rotation.y) * 0.04;
      if (head.current) {
        head.current.rotation.x += (targetPitch - head.current.rotation.x) * 0.06;
        head.current.rotation.y += (targetYaw * 1.6 - head.current.rotation.y) * 0.06;
      }
    }
    if (body.current) {
      body.current.rotation.y = Math.sin(t * 0.4) * 0.05;
    }
  });

  // Responsive scale based on viewport
  const scale = Math.min(1.1, Math.max(0.55, viewport.width / 8));

  return (
    <group ref={group} scale={scale} position={[0, -0.1, 0]}>
      {/* Body — elongated capsule */}
      <mesh ref={body} position={[0, -0.3, 0]} material={chromeMat}>
        <capsuleGeometry args={[0.55, 1.4, 16, 32]} />
      </mesh>
      <mesh position={[0, -0.3, 0]} material={holoMat}>
        <capsuleGeometry args={[0.58, 1.4, 16, 32]} />
      </mesh>

      {/* Shoulders — small chrome torus */}
      <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]} material={chromeMat}>
        <torusGeometry args={[0.55, 0.12, 24, 64]} />
      </mesh>

      {/* Head — sphere with hint of a brushed chrome bowl */}
      <mesh ref={head} position={[0, 1.05, 0]} material={chromeMat}>
        <sphereGeometry args={[0.42, 64, 64]} />
      </mesh>
      <mesh position={[0, 1.05, 0]} material={holoMat}>
        <sphereGeometry args={[0.45, 64, 64]} />
      </mesh>

      {/* Visor band */}
      <mesh position={[0, 1.05, 0.05]}>
        <torusGeometry args={[0.42, 0.018, 12, 64]} />
        <meshBasicMaterial color="#0a0a0c" />
      </mesh>

      {/* Floating ring around figure */}
      <FloatingRing />
    </group>
  );
}

function FloatingRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.PI / 2 + Math.sin(s.clock.elapsedTime * 0.3) * 0.18;
    ref.current.rotation.z = s.clock.elapsedTime * 0.06;
  });
  return (
    <mesh ref={ref} position={[0, 0.2, 0]}>
      <torusGeometry args={[1.4, 0.005, 8, 200]} />
      <meshBasicMaterial color="#8BA8FF" transparent opacity={0.55} />
    </mesh>
  );
}

/**
 * A cheap stub env-map: a small canvas texture mapped onto a CubeTexture.
 * Avoids loading an HDRI but still gives chrome a real reflection.
 */
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
