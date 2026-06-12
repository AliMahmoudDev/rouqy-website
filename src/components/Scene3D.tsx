"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

function NeonSphere({ position, color, speed = 1, distort = 0.3 }: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          distort={distort}
          speed={3}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function GlowingTorus({ position, color }: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[1.2, 0.15, 32, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function WobblyCube({ position, color }: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <MeshWobbleMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          factor={0.4}
          speed={2}
          roughness={0.15}
          metalness={0.85}
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
}

function FloatingOctahedron({ position, color }: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.8}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const count = 200;
  const meshRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00f5ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00f5ff" />
      <pointLight position={[-5, -3, 3]} intensity={0.8} color="#a855f7" />
      <pointLight position={[0, 5, -5]} intensity={0.6} color="#ec4899" />

      <NeonSphere position={[-3.5, 1.5, -2]} color="#00f5ff" speed={0.8} distort={0.4} />
      <NeonSphere position={[3.5, -1, -1]} color="#a855f7" speed={1.2} distort={0.25} />
      <NeonSphere position={[0, -2.5, -3]} color="#ec4899" speed={0.6} distort={0.35} />

      <GlowingTorus position={[2.5, 2, -3]} color="#00f5ff" />
      <GlowingTorus position={[-3, -1.5, -4]} color="#a855f7" />

      <WobblyCube position={[-1, 0, -2]} color="#6366f1" />
      <WobblyCube position={[4, 1, -5]} color="#ec4899" />

      <FloatingOctahedron position={[1.5, 3, -2]} color="#00f5ff" />
      <FloatingOctahedron position={[-4, 2, -5]} color="#a855f7" />

      <ParticleField />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
