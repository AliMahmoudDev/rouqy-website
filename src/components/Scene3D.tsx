'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ============================================
   HARMENS 3D Scene
   - Single canvas covering the entire page
   - Colors: Dark Navy (#161E2D) + Light Blue (#25A2DC)
   - Architectural abstract floating shapes
   - Slow, elegant movement
   ============================================ */

function NeonSphere({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#25A2DC"
          emissive="#25A2DC"
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={1.5}
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  );
}

function GlowingTorus({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 32, 64]} />
        <MeshDistortMaterial
          color="#1B8BBE"
          emissive="#1B8BBE"
          emissiveIntensity={0.1}
          roughness={0.3}
          metalness={0.9}
          distort={0.2}
          speed={1.2}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

function WobblyCube({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.7}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshWobbleMaterial
          color="#25A2DC"
          emissive="#25A2DC"
          emissiveIntensity={0.08}
          roughness={0.4}
          metalness={0.7}
          factor={0.2}
          speed={0.8}
          transparent
          opacity={0.2}
        />
      </mesh>
    </Float>
  );
}

function FloatingOctahedron({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.12;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.18;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#A0AEC0"
          emissive="#25A2DC"
          emissiveIntensity={0.05}
          roughness={0.5}
          metalness={0.6}
          distort={0.15}
          speed={1}
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function FloatingIcosahedron({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <Float speed={1.3} rotationIntensity={0.3} floatIntensity={0.9}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#25A2DC"
          emissive="#1B8BBE"
          emissiveIntensity={0.12}
          roughness={0.3}
          metalness={0.8}
          distort={0.25}
          speed={1.4}
          transparent
          opacity={0.18}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function ParticleField({ count = 150 }: { count?: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#25A2DC"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function SceneContent() {
  return (
    <>
      {/* Ambient & point lights */}
      <ambientLight intensity={0.15} color="#FFFFFF" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#25A2DC" distance={20} />
      <pointLight position={[-5, -3, 3]} intensity={0.3} color="#1B8BBE" distance={15} />
      <pointLight position={[0, 8, -5]} intensity={0.2} color="#A0AEC0" distance={20} />

      {/* Stars for background depth */}
      <Stars
        radius={50}
        depth={50}
        count={1000}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Floating architectural shapes - spread across viewport */}
      {/* Hero area shapes (y: 0 to 5) */}
      <NeonSphere position={[-4, 2, -3]} scale={1.2} />
      <GlowingTorus position={[4.5, 3, -4]} scale={0.8} />
      <WobblyCube position={[-2.5, -1, -2]} scale={0.6} />
      <FloatingOctahedron position={[3, 0, -5]} scale={0.9} />
      <FloatingIcosahedron position={[-5, 4, -6]} scale={1.0} />

      {/* Portfolio area shapes (y: -5 to -15) */}
      <NeonSphere position={[3.5, -8, -4]} scale={0.7} />
      <FloatingOctahedron position={[-4, -12, -5]} scale={0.8} />
      <WobblyCube position={[5, -6, -3]} scale={0.5} />

      {/* Contact area shapes (y: -20 to -30) */}
      <GlowingTorus position={[-3, -24, -4]} scale={0.9} />
      <FloatingIcosahedron position={[4, -28, -5]} scale={0.7} />
      <NeonSphere position={[0, -22, -3]} scale={0.5} />

      {/* Particle field covering entire scene */}
      <ParticleField count={150} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#161E2D', 8, 35]} />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
