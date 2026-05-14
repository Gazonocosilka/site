"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function ChromePlane() {
  const ref = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(1, 1) },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec2 vUv;

        // simple iq smooth noise
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }
        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          for (int i = 0; i < 5; i++) {
            v += a * noise(p);
            p *= 2.02;
            a *= 0.5;
          }
          return v;
        }

        void main() {
          vec2 uv = vUv;
          vec2 m = uMouse * 0.4;
          float t = uTime * 0.08;

          float n = fbm(uv * 3.5 + vec2(t, -t * 0.6) + m);
          float n2 = fbm(uv * 7.0 - vec2(t * 1.4, t) - m * 0.5);

          // chrome banding from gradients of noise
          float band = sin((n - n2) * 8.0 + uTime * 0.4) * 0.5 + 0.5;

          // Pink + chrome silver palette — kept atmospheric, not loud
          vec3 silver = vec3(0.55, 0.56, 0.62);
          vec3 dark = vec3(0.04, 0.04, 0.06);
          vec3 pink = vec3(1.0, 0.87, 0.91);
          vec3 violet = vec3(0.72, 0.65, 1.0);

          vec3 col = mix(dark, silver, smoothstep(0.25, 0.85, band));
          col = mix(col, pink, pow(band, 3.5) * 0.35);
          col += violet * pow(1.0 - band, 5.0) * 0.18;

          // strong central vignette so the product slot reads on top
          float v = smoothstep(1.3, 0.05, length(uv - 0.5));
          col *= v;

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uMouse.value.lerp(mouse, 0.06);
  });

  return (
    <mesh ref={ref} material={material} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}

export default function ChromeBackdrop() {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 60 }}
      dpr={[1, 1.4]}
      gl={{ antialias: false }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ChromePlane />
    </Canvas>
  );
}
