'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ============================================
   HARMENS 3D Scene - Enhanced & Dramatic
   - Single canvas covering the entire page
   - Colors: Dark Navy + Light Blue + Gold accents
   - Architectural abstract floating shapes
   - Infinity/8 shape reference to logo
   - Dramatic lighting
   ============================================ */

function NeonSphere({ position, scale = 1, color = '#25A2DC' }: { position: [number, number, number]; scale?: number; color?: string }) {
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
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.15}
          metalness={0.9}
          distort={0.3}
          speed={1.5}
          transparent
          opacity={0.4}
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
        <torusGeometry args={[1, 0.25, 32, 64]} />
        <MeshDistortMaterial
          color="#1B8BBE"
          emissive="#1B8BBE"
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.95}
          distort={0.2}
          speed={1.2}
          transparent
          opacity={0.35}
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
          emissiveIntensity={0.1}
          roughness={0.3}
          metalness={0.8}
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
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={0.08}
          roughness={0.4}
          metalness={0.7}
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
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.85}
          distort={0.25}
          speed={1.4}
          transparent
          opacity={0.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

/* Infinity torus knot - reference to the HARMENS logo "8" shape */
function InfinityShape({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusKnotGeometry args={[1, 0.25, 128, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={0.12}
          roughness={0.2}
          metalness={0.95}
          distort={0.1}
          speed={0.8}
          transparent
          opacity={0.25}
        />
      </mesh>
    </Float>
  );
}

/* Gold ring - like the HARMENS infinity symbol ring */
function GoldRing({ position, scale = 1, rotation = [0, 0, 0] as [number, number, number] }: { position: [number, number, number]; scale?: number; rotation?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale} rotation={rotation}>
        <torusGeometry args={[1, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={1}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

function ParticleField({ count = 200 }: { count?: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return positions;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.008;
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
        size={0.025}
        color="#25A2DC"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* Gold particles - scattered, fewer, more premium */
function GoldParticles({ count = 40 }: { count?: number }) {
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
      pointsRef.current.rotation.y = -state.clock.elapsedTime * 0.01;
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
        size={0.06}
        color="#D4AF37"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function SceneContent() {
  return (
    <>
      {/* Dramatic lighting setup */}
      <ambientLight intensity={0.08} color="#FFFFFF" />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#25A2DC" distance={25} />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#1B8BBE" distance={20} />
      <pointLight position={[0, 8, -5]} intensity={0.3} color="#A0AEC0" distance={25} />
      {/* Gold accent light */}
      <pointLight position={[3, 2, -2]} intensity={0.2} color="#D4AF37" distance={15} />
      <pointLight position={[-3, -5, 2]} intensity={0.15} color="#D4AF37" distance={12} />

      {/* Stars for background depth */}
      <Stars
        radius={60}
        depth={50}
        count={2000}
        factor={3}
        saturation={0}
        fade
        speed={0.3}
      />

      {/* ===== HERO AREA SHAPES (y: 0 to 5) ===== */}
      {/* Main infinity shape - the HARMENS logo reference */}
      <InfinityShape position={[0, 2, -8]} scale={1.5} />

      {/* Architectural shapes scattered */}
      <NeonSphere position={[-5, 3, -4]} scale={1.3} />
      <GlowingTorus position={[5.5, 1.5, -5]} scale={0.9} />
      <WobblyCube position={[-3, -1, -3]} scale={0.7} />
      <FloatingOctahedron position={[3.5, -0.5, -6]} scale={1.0} />
      <FloatingIcosahedron position={[-6, 5, -7]} scale={1.1} />

      {/* Gold rings floating */}
      <GoldRing position={[2, 4, -4]} scale={0.8} rotation={[Math.PI / 4, 0, 0]} />
      <GoldRing position={[-4, 0, -5]} scale={0.6} rotation={[0, Math.PI / 3, 0]} />

      {/* ===== PORTFOLIO AREA SHAPES (y: -5 to -15) ===== */}
      <NeonSphere position={[4, -8, -5]} scale={0.8} color="#1B8BBE" />
      <FloatingOctahedron position={[-5, -12, -6]} scale={0.9} />
      <WobblyCube position={[6, -6, -4]} scale={0.5} />
      <GoldRing position={[-2, -10, -4]} scale={0.5} rotation={[Math.PI / 6, Math.PI / 4, 0]} />
      <InfinityShape position={[1, -14, -8]} scale={0.7} />

      {/* ===== CONTACT AREA SHAPES (y: -20 to -30) ===== */}
      <GlowingTorus position={[-3.5, -24, -5]} scale={1.0} />
      <FloatingIcosahedron position={[4, -28, -6]} scale={0.8} />
      <NeonSphere position={[0, -22, -4]} scale={0.6} />
      <GoldRing position={[3, -26, -3]} scale={0.7} rotation={[0, 0, Math.PI / 4]} />

      {/* Particle fields */}
      <ParticleField count={200} />
      <GoldParticles count={40} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0B0F18', 8, 40]} />
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
