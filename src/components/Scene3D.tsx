'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ============================================
   HARMENS 3D Scene - MAXIMUM Visual Impact
   - BIG, VISIBLE, ANIMATED 3D shapes
   - Gold + Blue theme matching brand
   - Shapes that clearly move and rotate
   - Infinity/8 reference to logo
   ============================================ */

/* === HERO: Large animated Infinity/8 knot === */
function HeroInfinity({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={2.2}>
        <torusKnotGeometry args={[1, 0.3, 200, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={0.25}
          roughness={0.15}
          metalness={0.95}
          distort={0.12}
          speed={1}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

/* === Big wireframe sphere - architectural === */
function ArchitecturalSphere({ position, scale = 1, color = '#25A2DC' }: { position: [number, number, number]; scale?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.06;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </Float>
  );
}

/* === Solid gold sphere with distort === */
function GoldSphere({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={1}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.45}
        />
      </mesh>
    </Float>
  );
}

/* === Blue neon sphere === */
function BlueSphere({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.7}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#25A2DC"
          emissive="#25A2DC"
          emissiveIntensity={0.35}
          roughness={0.1}
          metalness={0.9}
          distort={0.35}
          speed={1.8}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

/* === Animated torus - rotating ring === */
function AnimatedTorus({ position, scale = 1, color = '#1B8BBE', emissiveIntensity = 0.2 }: { position: [number, number, number]; scale?: number; color?: string; emissiveIntensity?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.25;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.2, 32, 64]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          roughness={0.15}
          metalness={0.95}
          distort={0.2}
          speed={1.5}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

/* === Gold ring - thin and elegant === */
function GoldRing({ position, scale = 1, rotation = [0, 0, 0] as [number, number, number] }: { position: [number, number, number]; scale?: number; rotation?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.003;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale} rotation={rotation}>
        <torusGeometry args={[1, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={0.5}
          roughness={0.05}
          metalness={1}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

/* === Wobbly architectural cube === */
function WobblyCube({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.06;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshWobbleMaterial
          color="#25A2DC"
          emissive="#25A2DC"
          emissiveIntensity={0.12}
          roughness={0.25}
          metalness={0.85}
          factor={0.25}
          speed={1}
          transparent
          opacity={0.2}
        />
      </mesh>
    </Float>
  );
}

/* === Double ring - like Saturn === */
function DoubleRing({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.2;
    }
  });

  return (
    <Float speed={0.7} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Core sphere */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshDistortMaterial
            color="#1B8BBE"
            emissive="#1B8BBE"
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0.9}
            distort={0.3}
            speed={2}
            transparent
            opacity={0.5}
          />
        </mesh>
        {/* Ring 1 */}
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[1, 0.04, 16, 64]} />
          <meshStandardMaterial
            color="#25A2DC"
            emissive="#25A2DC"
            emissiveIntensity={0.4}
            roughness={0.1}
            metalness={1}
            transparent
            opacity={0.5}
          />
        </mesh>
        {/* Ring 2 - tilted */}
        <mesh rotation={[Math.PI / 1.5, Math.PI / 4, 0]}>
          <torusGeometry args={[1.2, 0.03, 16, 64]} />
          <meshStandardMaterial
            color="#D4AF37"
            emissive="#D4AF37"
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={1}
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* === Blue particle field === */
function ParticleField({ count = 300 }: { count?: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.012;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.006;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#25A2DC" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* === Gold dust particles === */
function GoldParticles({ count = 60 }: { count?: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 35;
    }
    return positions;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#D4AF37" transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* === Moving light beam === */
function MovingLight() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 8;
      lightRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.2) * 5;
      lightRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.15) * 3;
    }
  });

  return <pointLight ref={lightRef} intensity={0.6} color="#25A2DC" distance={20} />;
}

function SceneContent() {
  return (
    <>
      {/* === DRAMATIC LIGHTING === */}
      <ambientLight intensity={0.06} color="#FFFFFF" />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#25A2DC" distance={30} />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#1B8BBE" distance={25} />
      <pointLight position={[0, 8, -5]} intensity={0.3} color="#A0AEC0" distance={30} />
      <pointLight position={[3, 2, -2]} intensity={0.4} color="#D4AF37" distance={20} />
      <pointLight position={[-4, -5, 2]} intensity={0.25} color="#D4AF37" distance={15} />

      {/* Moving animated light */}
      <MovingLight />

      {/* Stars background */}
      <Stars radius={70} depth={60} count={3000} factor={2.5} saturation={0} fade speed={0.2} />

      {/* ==========================================
          HERO AREA (y: -2 to 5)
          Big, visible, animated shapes
          ========================================== */}
      <HeroInfinity position={[0, 1.5, -6]} />
      <BlueSphere position={[-5.5, 3, -3]} scale={1.5} />
      <ArchitecturalSphere position={[5.5, 2, -5]} scale={2.0} color="#25A2DC" />
      <GoldSphere position={[-3, -1.5, -4]} scale={0.8} />
      <AnimatedTorus position={[4, -1, -4]} scale={1.2} color="#D4AF37" emissiveIntensity={0.25} />
      <DoubleRing position={[-6, 5, -8]} scale={1.3} />
      <GoldRing position={[2.5, 5, -5]} scale={1.5} rotation={[Math.PI / 3, 0, 0]} />
      <GoldRing position={[-4, 0, -6]} scale={1.0} rotation={[0, Math.PI / 2, 0]} />
      <WobblyCube position={[6.5, 4, -7]} scale={1.2} />

      {/* ==========================================
          PORTFOLIO AREA (y: -6 to -18)
          ========================================== */}
      <ArchitecturalSphere position={[-5, -10, -6]} scale={1.5} color="#D4AF37" />
      <BlueSphere position={[5, -8, -5]} scale={1.0} />
      <AnimatedTorus position={[-3, -15, -5]} scale={0.9} />
      <GoldRing position={[4, -12, -4]} scale={1.2} rotation={[Math.PI / 4, Math.PI / 3, 0]} />
      <DoubleRing position={[0, -6, -8]} scale={0.8} />
      <GoldSphere position={[-6, -14, -7]} scale={0.6} />
      <WobblyCube position={[6, -16, -5]} scale={0.8} />

      {/* ==========================================
          CONTACT AREA (y: -22 to -35)
          ========================================== */}
      <AnimatedTorus position={[-4, -26, -5]} scale={1.3} color="#D4AF37" emissiveIntensity={0.3} />
      <ArchitecturalSphere position={[5, -30, -6]} scale={1.8} color="#1B8BBE" />
      <BlueSphere position={[0, -24, -4]} scale={0.7} />
      <GoldRing position={[-2, -32, -4]} scale={1.5} rotation={[0, 0, Math.PI / 6]} />
      <HeroInfinity position={[3, -28, -10]} scale={0.6} />

      {/* === PARTICLES === */}
      <ParticleField count={300} />
      <GoldParticles count={60} />

      {/* === FOG === */}
      <fog attach="fog" args={['#0B0F18', 6, 45]} />
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
