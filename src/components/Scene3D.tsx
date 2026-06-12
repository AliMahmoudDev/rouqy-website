'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ============================================
   HARMENS 3D Scene v2.0 — MAXIMUM Visual Impact
   - Dramatically more visible shapes (0.55-0.9 opacity)
   - Faster, more dramatic rotations & animations
   - Scale pulse/breathing effects
   - Bigger shapes, more prominent positions
   - Gold + Blue brand theme enforced
   ============================================ */

/* === HERO: Massive animated Infinity/8 knot — THE centerpiece === */
function HeroInfinity({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.25) * 0.2;
      meshRef.current.rotation.z = Math.cos(t * 0.18) * 0.08;
      // Breathing scale pulse
      const scale = 2.5 + Math.sin(t * 0.5) * 0.15;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position}>
        <torusKnotGeometry args={[1, 0.32, 256, 40, 2, 3]} />
        <MeshDistortMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={0.45}
          roughness={0.1}
          metalness={0.98}
          distort={0.15}
          speed={1.5}
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
}

/* === Big wireframe icosahedron — architectural feel === */
function ArchitecturalSphere({ position, scale = 1, color = '#25A2DC' }: { position: [number, number, number]; scale?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.rotation.x = t * 0.08;
      meshRef.current.rotation.y = t * 0.12;
      // Subtle scale pulse
      const s = scale * (1 + Math.sin(t * 0.4) * 0.05);
      meshRef.current.scale.setScalar(s);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

/* === Solid gold sphere with dramatic distort === */
function GoldSphere({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={0.35}
          roughness={0.08}
          metalness={1}
          distort={0.5}
          speed={2.5}
          transparent
          opacity={0.65}
        />
      </mesh>
    </Float>
  );
}

/* === Blue neon sphere with strong glow === */
function BlueSphere({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
      // Breathing effect
      const s = scale * (1 + Math.sin(t * 0.6) * 0.08);
      meshRef.current.scale.setScalar(s);
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#25A2DC"
          emissive="#25A2DC"
          emissiveIntensity={0.5}
          roughness={0.08}
          metalness={0.92}
          distort={0.4}
          speed={2.2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

/* === Animated torus — fast rotating ring === */
function AnimatedTorus({ position, scale = 1, color = '#1B8BBE', emissiveIntensity = 0.3 }: { position: [number, number, number]; scale?: number; color?: string; emissiveIntensity?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.rotation.x = t * 0.35;
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.7}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.22, 32, 64]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          roughness={0.12}
          metalness={0.96}
          distort={0.25}
          speed={2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

/* === Gold ring — thin, elegant, spinning === */
function GoldRing({ position, scale = 1, rotation = [0, 0, 0] as [number, number, number] }: { position: [number, number, number]; scale?: number; rotation?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.rotation.z = rotation[2] + t * 0.005;
      meshRef.current.rotation.x = rotation[0] + Math.sin(t * 0.3) * 0.05;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale} rotation={rotation}>
        <torusGeometry args={[1, 0.035, 16, 100]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={0.7}
          roughness={0.05}
          metalness={1}
          transparent
          opacity={0.7}
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
      const t = state.clock.elapsedTime;
      meshRef.current.rotation.y = t * 0.18;
      meshRef.current.rotation.x = t * 0.1;
      meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.7}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshWobbleMaterial
          color="#25A2DC"
          emissive="#25A2DC"
          emissiveIntensity={0.2}
          roughness={0.2}
          metalness={0.88}
          factor={0.3}
          speed={1.5}
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  );
}

/* === Double ring — like Saturn, dramatic === */
function DoubleRing({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.y = t * 0.12;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.25;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={groupRef} position={position} scale={scale}>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshDistortMaterial
            color="#1B8BBE"
            emissive="#1B8BBE"
            emissiveIntensity={0.4}
            roughness={0.08}
            metalness={0.92}
            distort={0.35}
            speed={2.5}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[1, 0.05, 16, 64]} />
          <meshStandardMaterial
            color="#25A2DC"
            emissive="#25A2DC"
            emissiveIntensity={0.5}
            roughness={0.08}
            metalness={1}
            transparent
            opacity={0.65}
          />
        </mesh>
        <mesh rotation={[Math.PI / 1.5, Math.PI / 4, 0]}>
          <torusGeometry args={[1.2, 0.035, 16, 64]} />
          <meshStandardMaterial
            color="#D4AF37"
            emissive="#D4AF37"
            emissiveIntensity={0.45}
            roughness={0.08}
            metalness={1}
            transparent
            opacity={0.55}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* === Floating octahedron — geometric accent === */
function FloatingOctahedron({ position, scale = 1, color = '#D4AF37' }: { position: [number, number, number]; scale?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.rotation.y = t * 0.25;
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.95}
          distort={0.2}
          speed={1.5}
          transparent
          opacity={0.55}
        />
      </mesh>
    </Float>
  );
}

/* === Orbiting mini shapes around a center === */
function OrbitingSystem({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Center gold sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={0.6}
          metalness={1}
          roughness={0.05}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Orbiting blue sphere */}
      <Float speed={3} rotationIntensity={0} floatIntensity={0}>
        <mesh position={[1.2, 0, 0]} scale={0.15}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#25A2DC"
            emissive="#25A2DC"
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>
      {/* Orbiting gold cube */}
      <Float speed={2.5} rotationIntensity={0} floatIntensity={0}>
        <mesh position={[-0.8, 0.6, 0.4]} scale={0.12}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#D4AF37"
            emissive="#D4AF37"
            emissiveIntensity={0.4}
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.008, 8, 64]} />
        <meshStandardMaterial
          color="#25A2DC"
          emissive="#25A2DC"
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

/* === Blue particle field — MORE particles, brighter === */
function ParticleField({ count = 400 }: { count?: number }) {
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
      const t = state.clock.elapsedTime;
      pointsRef.current.rotation.y = t * 0.015;
      pointsRef.current.rotation.x = t * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#25A2DC" transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* === Gold dust particles — MORE, brighter === */
function GoldParticles({ count = 80 }: { count?: number }) {
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
      pointsRef.current.rotation.y = -state.clock.elapsedTime * 0.01;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.005) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.07} color="#D4AF37" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* === Moving light beams === */
function MovingLight({ color, speed, radius }: { color: string; speed: number; radius: number }) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      const t = state.clock.elapsedTime;
      lightRef.current.position.x = Math.sin(t * speed) * radius;
      lightRef.current.position.y = Math.cos(t * speed * 0.7) * (radius * 0.6);
      lightRef.current.position.z = Math.sin(t * speed * 0.5) * (radius * 0.4);
    }
  });

  return <pointLight ref={lightRef} intensity={0.8} color={color} distance={25} />;
}

/* === MAIN SCENE CONTENT === */
function SceneContent() {
  return (
    <>
      {/* === DRAMATIC LIGHTING === */}
      <ambientLight intensity={0.08} color="#FFFFFF" />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#25A2DC" distance={35} />
      <pointLight position={[-5, -3, 3]} intensity={0.7} color="#1B8BBE" distance={30} />
      <pointLight position={[0, 8, -5]} intensity={0.4} color="#A0AEC0" distance={35} />
      <pointLight position={[3, 2, -2]} intensity={0.6} color="#D4AF37" distance={25} />
      <pointLight position={[-4, -5, 2]} intensity={0.4} color="#D4AF37" distance={20} />

      {/* Moving animated lights */}
      <MovingLight color="#25A2DC" speed={0.3} radius={8} />
      <MovingLight color="#D4AF37" speed={0.2} radius={6} />

      {/* Stars background */}
      <Stars radius={80} depth={60} count={4000} factor={3} saturation={0} fade speed={0.3} />

      {/* ==========================================
          HERO AREA (y: -2 to 5)
          BIG, PROMINENT, DRAMATICALLY VISIBLE
          ========================================== */}
      <HeroInfinity position={[0, 1.5, -6]} />
      <BlueSphere position={[-5.5, 3, -3]} scale={1.8} />
      <ArchitecturalSphere position={[5.5, 2, -5]} scale={2.5} color="#25A2DC" />
      <GoldSphere position={[-3, -1.5, -4]} scale={1.0} />
      <AnimatedTorus position={[4, -1, -4]} scale={1.5} color="#D4AF37" emissiveIntensity={0.4} />
      <DoubleRing position={[-6, 5, -8]} scale={1.6} />
      <GoldRing position={[2.5, 5, -5]} scale={2.0} rotation={[Math.PI / 3, 0, 0]} />
      <GoldRing position={[-4, 0, -6]} scale={1.3} rotation={[0, Math.PI / 2, 0]} />
      <WobblyCube position={[6.5, 4, -7]} scale={1.5} />
      <FloatingOctahedron position={[-2, 5, -5]} scale={0.8} color="#D4AF37" />
      <OrbitingSystem position={[3, -2, -5]} />

      {/* ==========================================
          PORTFOLIO AREA (y: -6 to -18)
          ========================================== */}
      <ArchitecturalSphere position={[-5, -10, -6]} scale={2.0} color="#D4AF37" />
      <BlueSphere position={[5, -8, -5]} scale={1.3} />
      <AnimatedTorus position={[-3, -15, -5]} scale={1.2} color="#25A2DC" emissiveIntensity={0.35} />
      <GoldRing position={[4, -12, -4]} scale={1.8} rotation={[Math.PI / 4, Math.PI / 3, 0]} />
      <DoubleRing position={[0, -6, -8]} scale={1.2} />
      <GoldSphere position={[-6, -14, -7]} scale={0.8} />
      <WobblyCube position={[6, -16, -5]} scale={1.0} />
      <FloatingOctahedron position={[2, -10, -5]} scale={0.7} color="#25A2DC" />
      <HeroInfinity position={[-3, -18, -10]} scale={0.7} />

      {/* ==========================================
          CONTACT AREA (y: -22 to -35)
          ========================================== */}
      <AnimatedTorus position={[-4, -26, -5]} scale={1.6} color="#D4AF37" emissiveIntensity={0.4} />
      <ArchitecturalSphere position={[5, -30, -6]} scale={2.2} color="#1B8BBE" />
      <BlueSphere position={[0, -24, -4]} scale={0.9} />
      <GoldRing position={[-2, -32, -4]} scale={2.0} rotation={[0, 0, Math.PI / 6]} />
      <HeroInfinity position={[3, -28, -10]} scale={0.8} />
      <FloatingOctahedron position={[-5, -34, -6]} scale={0.6} color="#D4AF37" />
      <GoldSphere position={[4, -22, -5]} scale={0.7} />

      {/* === PARTICLES === */}
      <ParticleField count={400} />
      <GoldParticles count={80} />

      {/* === FOG — pushed further for more visibility === */}
      <fog attach="fog" args={['#0B0F18', 10, 55]} />
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
