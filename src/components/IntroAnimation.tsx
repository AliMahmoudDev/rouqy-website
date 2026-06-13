'use client';

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import Image from 'next/image';

interface IntroAnimationProps {
  onComplete: () => void;
}

/**
 * 🎬 HARMENS Cinematic Intro v6.0 — "The Grand Architectural Reveal"
 *
 * A stunning ~7-second cinematic loading experience:
 *
 * Phase 1 (0-0.8s):     Cinematic bars close + golden crosshair lines sweep + expanding rings
 * Phase 2 (0.8-2.2s):   HARMENS letters converge from scattered dust with 3D rotation
 * Phase 3 (2.2-3.2s):   Logo crystallizes from golden energy + orbit ring + lens flare
 * Phase 4 (3.2-4.4s):   Arabic + English subtitle materialize with golden shimmer
 * Phase 5 (4.4-5.2s):   Elegant hold — all elements breathe together with subtle animations
 * Phase 6 (5.2-6.0s):   Grand reveal — golden pulse explosion + particle burst
 * Phase 7 (6.0-7.0s):   Cinematic bars open + smooth fade → site emerges
 */

// Deterministic pseudo-random function for SSR consistency
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<
    'sweep' | 'letters' | 'logo' | 'subtitle' | 'hold' | 'pulse' | 'fade' | 'done'
  >('sweep');
  const [mounted, setMounted] = useState(false);
  const onCompleteStable = useCallback(onComplete, [onComplete]);
  const startTimeRef = useRef<number>(0);

  // Only run animations after mount (client-only)
  useEffect(() => {
    setMounted(true);
    startTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Extended 7-second timeline with more phases for smoother pacing
    timers.push(setTimeout(() => setPhase('letters'), 800));      // Phase 2 at 0.8s
    timers.push(setTimeout(() => setPhase('logo'), 2200));        // Phase 3 at 2.2s
    timers.push(setTimeout(() => setPhase('subtitle'), 3200));    // Phase 4 at 3.2s
    timers.push(setTimeout(() => setPhase('hold'), 4400));        // Phase 5 at 4.4s — breathe
    timers.push(setTimeout(() => setPhase('pulse'), 5200));       // Phase 6 at 5.2s — explosion
    timers.push(setTimeout(() => setPhase('fade'), 6000));        // Phase 7 at 6.0s — fade out
    timers.push(setTimeout(() => {
      setPhase('done');
      onCompleteStable();
    }, 7000)); // Complete at 7s

    return () => timers.forEach(clearTimeout);
  }, [mounted, onCompleteStable]);

  if (phase === 'done') return null;

  const brandName = 'HARMENS';
  const arabicText = 'هارمينز للتصميم الداخلي';
  const tagline = 'DESIGNED TO BE FELT BEFORE IT\'S SEEN';

  // Pre-calculate deterministic letter offsets (consistent SSR + client)
  const letterOffsets = useMemo(() =>
    brandName.split('').map((_, i) => ({
      x: (seededRandom(i * 7 + 1) - 0.5) * 600,
      y: (seededRandom(i * 13 + 2) - 0.5) * 400,
      z: (seededRandom(i * 19 + 3) - 0.5) * 300,
      rotateX: (seededRandom(i * 23 + 4) - 0.5) * 180,
      rotateY: (seededRandom(i * 29 + 5) - 0.5) * 180,
      rotateZ: (seededRandom(i * 31 + 6) - 0.5) * 50,
    })),
  []
  );

  // Deterministic ambient particles
  const ambientParticles = useMemo(() =>
    Array.from({ length: 60 }).map((_, i) => ({
      startX: seededRandom(i * 11 + 100) * 100,
      startY: seededRandom(i * 17 + 200) * 100,
      size: 1 + seededRandom(i * 23 + 300) * 2.5,
      duration: 3 + seededRandom(i * 29 + 400) * 5,
      delay: seededRandom(i * 31 + 500) * 2,
      isGold: i % 3 === 0,
      isWhite: i % 5 === 0,
    })),
  []
  );

  // Deterministic burst particles for pulse phase
  const burstParticles = useMemo(() =>
    Array.from({ length: 80 }).map((_, i) => {
      const angle = (i / 80) * Math.PI * 2;
      const distance = 150 + seededRandom(i * 37 + 600) * 600;
      const isGold = i % 2 === 0;
      const isWhite = i % 5 === 0;
      return { angle, distance, isGold, isWhite, size: 1 + seededRandom(i * 41 + 700) * 3, delay: seededRandom(i * 43 + 800) * 0.3 };
    }),
  []
  );

  // Decorative geometric lines that appear during hold phase
  const geoLines = useMemo(() =>
    Array.from({ length: 8 }).map((_, i) => ({
      angle: seededRandom(i * 47 + 900) * 360,
      length: 60 + seededRandom(i * 53 + 1000) * 120,
      startX: 30 + seededRandom(i * 59 + 1100) * 40,
      startY: 30 + seededRandom(i * 61 + 1200) * 40,
      delay: seededRandom(i * 67 + 1300) * 0.5,
      isGold: i % 2 === 0,
    })),
  []
  );

  const isFading = phase === 'fade';
  const isPostPulse = phase === 'pulse' || phase === 'fade';
  const isSweep = phase === 'sweep';
  const isHold = phase === 'hold';

  // Calculate progress percentage for the progress bar
  const getProgress = () => {
    switch (phase) {
      case 'sweep': return 0;
      case 'letters': return 15;
      case 'logo': return 35;
      case 'subtitle': return 55;
      case 'hold': return 75;
      case 'pulse': return 90;
      case 'fade': return 100;
      default: return 0;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: '#050810',
        opacity: isFading ? 0 : 1,
        filter: isFading ? 'blur(12px)' : 'blur(0px)',
        transition: 'all 1s cubic-bezier(0.65, 0.05, 0, 1)',
        boxShadow: 'inset 0 0 150px rgba(0,0,0,0.8)',
        animation: !isFading ? 'vignette-pulse-intro 5s ease-in-out infinite' : 'none',
      }}
    >
      {/* ====== CINEMATIC LETTERBOX BARS ====== */}
      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 z-30 bg-black"
        style={{
          height: isFading ? 0 : '8vh',
          animation: isFading
            ? 'cinematic-bar-out 1s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            : 'cinematic-bar-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      />
      {/* Bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 bg-black"
        style={{
          height: isFading ? 0 : '8vh',
          animation: isFading
            ? 'cinematic-bar-out 1s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            : 'cinematic-bar-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      />

      {/* === BACKGROUND LAYERS === */}

      {/* Animated noise texture */}
      <div className="noise-overlay absolute inset-0 pointer-events-none z-0 opacity-[0.03]" />

      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 120% 80% at 50% 50%, #0B1220 0%, #050810 50%, #020408 100%)',
        }}
      />

      {/* ====== Rotating background geometric pattern — appears during hold ====== */}
      {isHold && (
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {/* Rotating diamond grid */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '600px',
              height: '600px',
              marginTop: '-300px',
              marginLeft: '-300px',
              border: '1px solid rgba(212,175,55,0.04)',
              transform: 'rotate(45deg)',
              animation: 'intro-diamond-rotate 8s linear infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '450px',
              height: '450px',
              marginTop: '-225px',
              marginLeft: '-225px',
              border: '1px solid rgba(37,162,220,0.03)',
              transform: 'rotate(45deg)',
              animation: 'intro-diamond-rotate 12s linear infinite reverse',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '300px',
              height: '300px',
              marginTop: '-150px',
              marginLeft: '-150px',
              border: '1px solid rgba(212,175,55,0.05)',
              transform: 'rotate(45deg)',
              animation: 'intro-diamond-rotate 6s linear infinite',
            }}
          />
        </div>
      )}

      {/* ====== LENS FLARE — sweeps during logo phase ====== */}
      {(phase === 'logo' || phase === 'subtitle' || phase === 'hold') && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            top: '45%',
            width: '60%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.15), rgba(255,255,255,0.3), rgba(212,175,55,0.15), transparent)',
            filter: 'blur(2px)',
            animation: 'lens-flare 3s ease-in-out forwards',
            opacity: isHold ? 0.5 : 1,
            transition: 'opacity 0.8s ease',
          }}
        />
      )}

      {/* Central golden glow — heartbeat of the animation */}
      <div
        className="absolute"
        style={{
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(212,175,55,0.1) 35%, transparent 60%)',
          filter: 'blur(80px)',
          opacity: isSweep ? 0 : isHold ? 0.8 : phase === 'pulse' ? 1 : isFading ? 0 : 0.7,
          transform: isSweep
            ? 'scale(0)'
            : isHold
            ? 'scale(1.8)'
            : phase === 'pulse'
            ? 'scale(3.5)'
            : isFading
            ? 'scale(4)'
            : 'scale(1.5)',
          transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
          animation: isHold ? 'intro-glow-breathe 2s ease-in-out infinite' : 'none',
        }}
      />

      {/* Blue ambient glow */}
      <div
        className="absolute"
        style={{
          width: 900,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(37,162,220,0.1) 0%, transparent 60%)',
          filter: 'blur(100px)',
          opacity: isSweep ? 0 : isFading ? 0 : isHold ? 0.6 : 0.5,
          transform: isHold ? 'scale(1.2)' : phase === 'pulse' ? 'scale(3)' : 'scale(1)',
          transition: 'all 1.5s ease-out',
          animation: isHold ? 'intro-blue-breathe 3s ease-in-out infinite' : 'none',
        }}
      />

      {/* ====== AMBIENT FLOATING PARTICLES ====== */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {ambientParticles.map((p, i) => (
            <div
              key={`ambient-${i}`}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: p.isWhite ? '#FFFFFF' : p.isGold ? '#D4AF37' : '#25A2DC',
                boxShadow: p.isGold
                  ? '0 0 8px rgba(212,175,55,0.5)'
                  : p.isWhite
                  ? '0 0 6px rgba(255,255,255,0.4)'
                  : '0 0 5px rgba(37,162,220,0.3)',
                left: `${p.startX}%`,
                top: `${p.startY}%`,
                opacity: isSweep ? 0 : isFading ? 0 : isHold ? 0.8 : 0.6,
                animation: !isSweep && !isFading ? `particle-rise ${p.duration}s linear infinite ${p.delay}s` : 'none',
                transition: 'opacity 0.8s ease',
              }}
            />
          ))}
        </div>
      )}

      {/* ====== PHASE 1: ARCHITECTURAL GOLDEN LINE SWEEP ====== */}
      {isSweep && (
        <>
          {/* Horizontal golden line */}
          <div
            className="absolute"
            style={{
              left: 0,
              right: 0,
              top: '50%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, #D4AF37 20%, #FFFFFF 50%, #D4AF37 80%, transparent 100%)',
              boxShadow: '0 0 20px rgba(212,175,55,0.6), 0 0 60px rgba(212,175,55,0.3)',
              animation: 'intro-line-sweep 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          />
          {/* Vertical line */}
          <div
            className="absolute"
            style={{
              top: 0,
              bottom: 0,
              left: '50%',
              width: '1px',
              background: 'linear-gradient(180deg, transparent 0%, rgba(37,162,220,0.3) 30%, rgba(37,162,220,0.6) 50%, rgba(37,162,220,0.3) 70%, transparent 100%)',
              boxShadow: '0 0 15px rgba(37,162,220,0.4)',
              animation: 'intro-line-sweep-v 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards',
              opacity: 0,
            }}
          />
          {/* Center crosshair dot */}
          <div
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#D4AF37',
              boxShadow: '0 0 20px rgba(212,175,55,0.8), 0 0 40px rgba(212,175,55,0.4)',
              transform: 'translate(-50%, -50%)',
              animation: 'intro-dot-pulse 0.6s ease-out 0.2s forwards',
              opacity: 0,
            }}
          />
          {/* Expanding rings */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`ring-${i}`}
              className="absolute rounded-full"
              style={{
                left: '50%',
                top: '50%',
                width: 30,
                height: 30,
                marginTop: -15,
                marginLeft: -15,
                border: `1px solid rgba(212,175,55,${0.35 - i * 0.06})`,
                animation: `intro-ring-expand 0.8s ease-out ${0.2 + i * 0.15}s forwards`,
                opacity: 0,
              }}
            />
          ))}
        </>
      )}

      {/* ====== PHASE 2: HARMENS LETTERS — 3D convergence ====== */}
      <div className="relative z-10 flex items-center justify-center gpu-accelerated" style={{ perspective: '1200px' }}>
        {brandName.split('').map((letter, index) => {
          const offset = letterOffsets[index];
          const letterDelay = index * 0.06;
          const isLetterVisible = phase === 'letters' || phase === 'logo' || phase === 'subtitle' || phase === 'hold';
          const shouldShow = isLetterVisible || phase === 'pulse';

          return (
            <span
              key={`letter-${index}`}
              className="inline-block text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold gpu-accelerated"
              style={{
                color: '#FFFFFF',
                opacity: shouldShow ? 1 : isFading ? 0 : 0,
                transform: isSweep
                  ? `translate3d(${offset.x}px, ${offset.y}px, ${offset.z}px) rotateX(${offset.rotateX}deg) rotateY(${offset.rotateY}deg) rotateZ(${offset.rotateZ}deg) scale(0.2)`
                  : isHold
                  ? `translate3d(0, ${Math.sin(index * 0.8) * 4}px, 0) scale(1.02)`
                  : isFading
                  ? `translate3d(${offset.x * 0.5}px, ${offset.y * 0.7}px, -200px) rotateX(${offset.rotateX * 0.3}deg) rotateY(${offset.rotateY * 0.3}deg) scale(0)`
                  : `translate3d(0, 0, 0) rotateX(0) rotateY(0) rotateZ(0) scale(1)`,
                filter: isSweep
                  ? 'blur(12px) brightness(4)'
                  : phase === 'letters'
                  ? 'blur(0px) brightness(1)'
                  : isHold
                  ? 'blur(0px) brightness(1.1)'
                  : isFading
                  ? 'blur(6px) brightness(2)'
                  : 'blur(0px) brightness(1)',
                textShadow: shouldShow
                  ? '0 0 40px rgba(212,175,55,0.3), 0 0 80px rgba(37,162,220,0.15), 0 0 120px rgba(212,175,55,0.1)'
                  : 'none',
                transition: `all ${isFading ? '0.8s' : isHold ? '1.5s' : '1s'} cubic-bezier(0.16, 1, 0.3, 1) ${isFading ? (index * 0.02) : letterDelay}s`,
                letterSpacing: '0.02em',
                animation: shouldShow && !isFading && !isHold ? 'letter-glow 3s ease-in-out infinite' : isHold ? 'letter-float 2s ease-in-out infinite' : 'none',
                animationDelay: isHold ? `${index * 0.15}s` : '0s',
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* ====== Decorative line under HARMENS ====== */}
      <div className="relative z-10 mt-4 md:mt-6 flex items-center gap-3 justify-center">
        <div
          style={{
            width: phase === 'letters' || phase === 'logo' || phase === 'subtitle' || phase === 'hold' ? '40px' : '0px',
            height: '1px',
            background: '#D4AF37',
            opacity: phase === 'letters' ? 0.5 : phase === 'logo' || phase === 'subtitle' || phase === 'hold' ? 1 : isFading ? 0 : 0,
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            boxShadow: '0 0 8px rgba(212,175,55,0.4)',
          }}
        />
        <div
          style={{
            width: 6,
            height: 6,
            border: '1px solid #25A2DC',
            transform: 'rotate(45deg)',
            opacity: phase === 'logo' || phase === 'subtitle' || phase === 'hold' ? 1 : isFading ? 0 : 0,
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
            boxShadow: '0 0 6px rgba(37,162,220,0.3)',
            animation: isHold ? 'intro-diamond-spin 4s linear infinite' : 'none',
          }}
        />
        <div
          style={{
            width: phase === 'letters' || phase === 'logo' || phase === 'subtitle' || phase === 'hold' ? '40px' : '0px',
            height: '1px',
            background: '#25A2DC',
            opacity: phase === 'letters' ? 0.5 : phase === 'logo' || phase === 'subtitle' || phase === 'hold' ? 1 : isFading ? 0 : 0,
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            boxShadow: '0 0 8px rgba(37,162,220,0.4)',
          }}
        />
      </div>

      {/* ====== PHASE 3: LOGO — Crystallizes from golden energy ====== */}
      <div
        className="absolute z-10 gpu-accelerated"
        style={{
          opacity: phase === 'logo' || phase === 'subtitle' ? 1 : phase === 'hold' ? 0.9 : phase === 'pulse' ? 0.7 : isFading ? 0 : 0,
          transform: phase === 'logo'
            ? 'scale(1) translateY(0px)'
            : phase === 'subtitle'
            ? 'scale(0.65) translateY(150px)'
            : phase === 'hold'
            ? 'scale(0.6) translateY(150px)'
            : phase === 'pulse'
            ? 'scale(2) translateY(150px)'
            : isFading
            ? 'scale(0) translateY(250px)'
            : 'scale(0) translateY(0px)',
          filter: phase === 'logo'
            ? 'brightness(1.2) blur(0px)'
            : isHold
            ? 'brightness(1.1) blur(0px)'
            : phase === 'pulse'
            ? 'brightness(4) blur(8px)'
            : isFading
            ? 'brightness(3) blur(12px)'
            : 'brightness(5) blur(20px)',
          transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          animation: isHold ? 'intro-logo-breathe 3s ease-in-out infinite' : 'none',
        }}
      >
        {/* Logo shimmer light sweep */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            opacity: phase === 'logo' ? 1 : isHold ? 0.5 : 0,
            background: 'linear-gradient(105deg, transparent 20%, rgba(255,223,100,0.5) 42%, rgba(255,240,180,0.8) 50%, rgba(255,223,100,0.5) 58%, transparent 80%)',
            backgroundSize: '200% 100%',
            animation: phase === 'logo' ? 'shimmer 1.5s ease-in-out' : isHold ? 'shimmer 4s ease-in-out infinite' : 'none',
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Decorative orbit ring around logo */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            width: 200,
            height: 200,
            marginTop: -100,
            marginLeft: -100,
            borderRadius: '50%',
            border: '1px solid rgba(212,175,55,0.15)',
            opacity: phase === 'logo' || phase === 'subtitle' || phase === 'hold' ? 1 : 0,
            animation: phase === 'logo' || phase === 'subtitle' || phase === 'hold' ? 'spin-slow 8s linear infinite' : 'none',
            transition: 'opacity 0.5s ease',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -3,
              left: '50%',
              marginLeft: -3,
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#D4AF37',
              boxShadow: '0 0 12px rgba(212,175,55,0.6)',
            }}
          />
        </div>

        <Image
          src="/harmens-logo-tran.png"
          alt="HARMENS"
          width={130}
          height={130}
          className="relative z-10"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.4)) drop-shadow(0 0 60px rgba(212,175,55,0.15))',
          }}
          priority
        />
      </div>

      {/* ====== PHASE 4: Arabic + English subtitle ====== */}
      <div
        className="relative z-10 mt-8 flex items-center justify-center"
        style={{
          opacity: phase === 'subtitle' || phase === 'hold' ? 1 : phase === 'pulse' ? 0.7 : isFading ? 0 : 0,
          transform: isFading ? 'translateY(-30px) scale(0.8)' : 'translateY(0) scale(1)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {arabicText.split('').map((char, index) => (
          <span
            key={`ar-${index}`}
            className="text-lg md:text-2xl"
            style={{
              color: '#D4AF37',
              textShadow: '0 0 15px rgba(212,175,55,0.3), 0 0 30px rgba(212,175,55,0.1)',
              direction: 'rtl',
              display: 'inline-block',
              opacity: phase === 'subtitle' || phase === 'hold' ? 1 : phase === 'pulse' ? 0.5 : 0,
              transform: phase === 'subtitle'
                ? 'translateY(0) scale(1)'
                : phase === 'hold'
                ? 'translateY(0) scale(1)'
                : isFading
                ? 'translateY(-15px) scale(0.5)'
                : 'translateY(25px) scale(0.7)',
              filter: phase === 'subtitle' || phase === 'hold' ? 'blur(0px)' : 'blur(3px)',
              transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${3.2 + index * 0.025}s`,
              animation: isHold ? 'intro-text-shimmer 2s ease-in-out infinite' : 'none',
              animationDelay: isHold ? `${index * 0.1}s` : '0s',
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Tagline below Arabic */}
      <div
        className="relative z-10 mt-3 flex items-center justify-center"
        style={{
          opacity: phase === 'subtitle' || phase === 'hold' ? 1 : phase === 'pulse' ? 0.5 : isFading ? 0 : 0,
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
        }}
      >
        {tagline.split('').map((char, index) => (
          <span
            key={`tag-${index}`}
            className="text-[9px] md:text-[11px] tracking-[0.35em] uppercase"
            style={{
              color: '#A0AEC0',
              display: 'inline-block',
              opacity: phase === 'subtitle' || phase === 'hold' ? 0.6 : phase === 'pulse' ? 0.3 : 0,
              transform: phase === 'subtitle' || phase === 'hold' ? 'translateY(0)' : 'translateY(8px)',
              transition: `all 0.4s ease ${3.6 + index * 0.012}s`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* ====== PHASE 5: HOLD — Geometric decorative lines radiate ====== */}
      {isHold && (
        <div className="absolute inset-0 z-5 pointer-events-none">
          {geoLines.map((line, i) => (
            <div
              key={`geo-${i}`}
              className="absolute"
              style={{
                left: `${line.startX}%`,
                top: `${line.startY}%`,
                width: `${line.length}px`,
                height: '1px',
                background: line.isGold
                  ? `linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)`
                  : `linear-gradient(90deg, transparent, rgba(37,162,220,0.1), transparent)`,
                transform: `rotate(${line.angle}deg)`,
                opacity: 0,
                animation: `intro-geo-line 1.5s ease-out ${line.delay}s forwards`,
              }}
            />
          ))}

          {/* Floating corner accents during hold */}
          <div
            className="absolute"
            style={{
              top: '20%',
              right: '15%',
              width: '20px',
              height: '20px',
              borderTop: '1px solid rgba(212,175,55,0.15)',
              borderRight: '1px solid rgba(212,175,55,0.15)',
              animation: 'intro-corner-fade 1s ease-out forwards',
              opacity: 0,
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: '25%',
              left: '12%',
              width: '20px',
              height: '20px',
              borderBottom: '1px solid rgba(37,162,220,0.12)',
              borderLeft: '1px solid rgba(37,162,220,0.12)',
              animation: 'intro-corner-fade 1s ease-out 0.2s forwards',
              opacity: 0,
            }}
          />
        </div>
      )}

      {/* ====== PHASE 6: Grand reveal — Golden pulse explosion ====== */}
      {phase === 'pulse' && (
        <>
          {/* Ripple rings */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={`pulse-ring-${i}`}
              className="absolute z-5 rounded-full"
              style={{
                border: `1px solid rgba(212, 175, 55, ${0.4 - i * 0.05})`,
                animation: `ripple-expand 1s ease-out ${i * 0.1}s forwards`,
              }}
            />
          ))}

          {/* Blue ripples */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`pulse-blue-${i}`}
              className="absolute z-5 rounded-full"
              style={{
                border: `1px solid rgba(37, 162, 220, ${0.2 - i * 0.04})`,
                animation: `ripple-expand 1.2s ease-out ${0.15 + i * 0.12}s forwards`,
              }}
            />
          ))}

          {/* Burst particles — golden dust */}
          {burstParticles.map((p, i) => (
            <div
              key={`explode-${i}`}
              className="absolute z-10 rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: p.isWhite ? '#FFFFFF' : p.isGold ? '#D4AF37' : '#25A2DC',
                boxShadow: p.isWhite
                  ? '0 0 6px rgba(255,255,255,0.6)'
                  : p.isGold
                  ? '0 0 8px rgba(212,175,55,0.8)'
                  : '0 0 6px rgba(37,162,220,0.6)',
                left: '50%',
                top: '50%',
                animation: `particle-drift 1.2s ease-out ${p.delay}s forwards`,
                '--drift-x': `${Math.cos(p.angle) * p.distance}px`,
                '--drift-y': `${Math.sin(p.angle) * p.distance}px`,
              } as React.CSSProperties}
            />
          ))}

          {/* Golden flash overlay */}
          <div
            className="absolute inset-0 z-15 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.35) 0%, transparent 60%)',
              animation: 'intro-flash 0.6s ease-out forwards',
            }}
          />
        </>
      )}

      {/* ====== PROGRESS INDICATOR ====== */}
      <div className="absolute bottom-8 left-0 right-0 z-20 px-8 md:px-16">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[9px] tracking-[0.6em] uppercase"
            style={{
              color: 'rgba(160, 174, 192, 0.3)',
              opacity: isFading ? 0 : 1,
              transition: 'opacity 0.3s ease',
            }}
          >
            Loading Experience
          </span>
          <span
            className="text-[10px] tracking-[0.2em] font-light"
            style={{
              color: 'rgba(212, 175, 55, 0.4)',
              opacity: isFading ? 0 : 1,
              transition: 'opacity 0.3s ease',
            }}
          >
            {getProgress()}%
          </span>
        </div>
        <div className="h-[1px] w-full bg-[#1C2738]/60 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full"
            style={{
              width: `${getProgress()}%`,
              background: 'linear-gradient(90deg, #D4AF37, #25A2DC)',
              transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          <div
            className="absolute top-[-2px] h-[5px] w-[5px] rounded-full"
            style={{
              left: `${getProgress()}%`,
              background: '#25A2DC',
              boxShadow: '0 0 10px rgba(37,162,220,0.8), 0 0 20px rgba(37,162,220,0.3)',
              transition: 'left 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </div>

      {/* ====== Corner architectural brackets ====== */}
      {/* Top-left */}
      <div
        className="absolute top-6 left-6 z-10"
        style={{
          opacity: phase === 'logo' || phase === 'subtitle' || phase === 'hold' ? 0.4 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <div className="w-6 h-[1px] bg-[#D4AF37]/40" />
        <div className="w-[1px] h-6 bg-[#D4AF37]/40" />
      </div>
      {/* Top-right */}
      <div
        className="absolute top-6 right-6 z-10"
        style={{
          opacity: phase === 'logo' || phase === 'subtitle' || phase === 'hold' ? 0.4 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <div className="w-6 h-[1px] bg-[#D4AF37]/40 ml-auto" />
        <div className="w-[1px] h-6 bg-[#D4AF37]/40 ml-auto" />
      </div>
      {/* Bottom-left */}
      <div
        className="absolute bottom-14 left-6 z-10"
        style={{
          opacity: phase === 'logo' || phase === 'subtitle' || phase === 'hold' ? 0.4 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <div className="w-[1px] h-6 bg-[#25A2DC]/40" />
        <div className="w-6 h-[1px] bg-[#25A2DC]/40" />
      </div>
      {/* Bottom-right */}
      <div
        className="absolute bottom-14 right-6 z-10"
        style={{
          opacity: phase === 'logo' || phase === 'subtitle' || phase === 'hold' ? 0.4 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <div className="w-[1px] h-6 bg-[#25A2DC]/40 ml-auto" />
        <div className="w-6 h-[1px] bg-[#25A2DC]/40 ml-auto" />
      </div>

      {/* ====== Decorative thin lines ====== */}
      {!isSweep && !isFading && (
        <>
          <div
            className="absolute top-12 left-[15%] right-[15%] z-5"
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(37,162,220,0.08), transparent)',
              opacity: phase === 'logo' || phase === 'subtitle' || phase === 'hold' ? 1 : 0,
              transition: 'opacity 1s ease',
            }}
          />
          <div
            className="absolute bottom-24 left-[15%] right-[15%] z-5"
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.08), transparent)',
              opacity: phase === 'logo' || phase === 'subtitle' || phase === 'hold' ? 1 : 0,
              transition: 'opacity 1s ease',
            }}
          />
        </>
      )}
    </div>
  );
}
