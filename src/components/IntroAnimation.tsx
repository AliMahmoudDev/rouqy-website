'use client';

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import Image from 'next/image';

interface IntroAnimationProps {
  onComplete: () => void;
}

/**
 * 🎬 HARMENS Cinematic Intro v7.0 — "Living Blueprint"
 *
 * A visually rich 7-second loading experience with REAL movement:
 *
 * Phase 1 (0-1.0s):   Dark void → Golden grid blueprint draws itself → Geometric shapes fly in
 * Phase 2 (1.0-2.5s): HARMENS letters fly in from BOTH sides with glowing trails + sparks
 * Phase 3 (2.5-3.5s): Logo drops in from above with bounce + orbit ring spins around it
 * Phase 3.5 (3.5-4.6s): Logo HOLDS centered — viewer reads the brand name
 * Phase 4 (4.6-5.9s): Logo shrinks down, Arabic text types itself letter by letter + English fades in below
 * Phase 5 (5.9-6.9s): Everything breathes + floating furniture silhouettes drift + particles rise
 * Phase 6 (6.9-7.6s): Golden shockwave explodes outward + all elements scatter
 * Phase 7 (7.6-8.1s): Cinematic wipe → site emerges
 */

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<
    'grid' | 'letters' | 'logo' | 'logoHold' | 'subtitle' | 'breathe' | 'explode' | 'wipe' | 'done'
  >('grid');
  const [mounted, setMounted] = useState(false);
  const onCompleteStable = useCallback(onComplete, [onComplete]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setPhase('letters'), 1000));
    timers.push(setTimeout(() => setPhase('logo'), 2500));
    timers.push(setTimeout(() => setPhase('logoHold'), 3500));
    timers.push(setTimeout(() => setPhase('subtitle'), 4600));
    timers.push(setTimeout(() => setPhase('breathe'), 5900));
    timers.push(setTimeout(() => setPhase('explode'), 6900));
    timers.push(setTimeout(() => setPhase('wipe'), 7600));
    timers.push(setTimeout(() => {
      setPhase('done');
      onCompleteStable();
    }, 8800));

    return () => timers.forEach(clearTimeout);
  }, [mounted, onCompleteStable]);

  if (phase === 'done') return null;

  const brandName = 'HARMENS';
  const arabicText = 'هارمينز للتصميم الداخلي';
  const tagline = 'DESIGNED TO BE FELT BEFORE IT\'S SEEN';

  // Letter entrance directions — alternating from left and right
  const letterDirections = useMemo(() =>
    brandName.split('').map((_, i) => ({
      fromLeft: i % 2 === 0,
      startY: -30 + seededRandom(i * 17 + 1) * 60,
      rotateStart: (seededRandom(i * 23 + 2) - 0.5) * 120,
      delay: i * 0.08,
    })),
  []
  );

  // Floating spark particles during letters phase
  const sparkParticles = useMemo(() =>
    Array.from({ length: 40 }).map((_, i) => ({
      x: seededRandom(i * 11 + 100) * 100,
      y: seededRandom(i * 17 + 200) * 100,
      size: 1 + seededRandom(i * 23 + 300) * 3,
      duration: 1.5 + seededRandom(i * 29 + 400) * 2,
      delay: seededRandom(i * 31 + 500) * 1.5,
      isGold: i % 2 === 0,
    })),
  []
  );

  // Explosion burst particles
  const burstParticles = useMemo(() =>
    Array.from({ length: 70 }).map((_, i) => {
      const angle = (i / 70) * Math.PI * 2;
      const distance = 200 + seededRandom(i * 37 + 600) * 700;
      return {
        angle,
        distance,
        size: 1 + seededRandom(i * 41 + 700) * 4,
        delay: seededRandom(i * 43 + 800) * 0.2,
        isGold: i % 2 === 0,
        isWhite: i % 5 === 0,
      };
    }),
  []
  );

  // Floating decorative shapes (furniture-inspired silhouettes)
  const floatingShapes = useMemo(() => [
    { icon: '◇', x: 15, y: 20, size: 40, duration: 6, delay: 0, color: '#D4AF37' },
    { icon: '⬡', x: 80, y: 25, size: 30, duration: 7, delay: 0.5, color: '#25A2DC' },
    { icon: '△', x: 10, y: 70, size: 25, duration: 5, delay: 1, color: '#D4AF37' },
    { icon: '○', x: 85, y: 65, size: 35, duration: 8, delay: 0.3, color: '#25A2DC' },
    { icon: '□', x: 50, y: 15, size: 20, duration: 6, delay: 0.8, color: '#D4AF37' },
    { icon: '⬟', x: 25, y: 80, size: 28, duration: 7, delay: 1.2, color: '#25A2DC' },
  ], []);

  // Grid lines for Phase 1
  const gridLines = useMemo(() => {
    const lines: { horizontal: boolean; position: number; delay: number }[] = [];
    for (let i = 0; i < 8; i++) {
      lines.push({ horizontal: true, position: 10 + i * 12, delay: i * 0.06 });
      lines.push({ horizontal: false, position: 10 + i * 12, delay: i * 0.06 + 0.03 });
    }
    return lines;
  }, []);

  const isWiping = phase === 'wipe';
  const isGrid = phase === 'grid';

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: '#050810',
        transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), filter 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: isWiping ? 0 : 1,
        filter: isWiping ? 'blur(20px) brightness(2)' : 'blur(0px) brightness(1)',
      }}
    >
      {/* ====== CINEMATIC BARS ====== */}
      <div
        className="absolute top-0 left-0 right-0 z-30 bg-black"
        style={{
          height: isWiping ? 0 : '6vh',
          animation: isWiping
            ? 'cinematic-bar-out 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            : 'cinematic-bar-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-30 bg-black"
        style={{
          height: isWiping ? 0 : '6vh',
          animation: isWiping
            ? 'cinematic-bar-out 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            : 'cinematic-bar-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      />

      {/* ====== DEEP BACKGROUND ====== */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 120% 80% at 50% 50%, #0B1220 0%, #050810 50%, #020408 100%)',
      }} />
      <div className="noise-overlay absolute inset-0 pointer-events-none z-0 opacity-[0.03]" />

      {/* ====== CENTRAL GLOWS ====== */}
      <div
        className="absolute"
        style={{
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0.08) 35%, transparent 60%)',
          filter: 'blur(80px)',
          opacity: isGrid ? 0 : phase === 'breathe' ? 0.9 : phase === 'explode' ? 1 : isWiping ? 0 : 0.7,
          transform: isGrid ? 'scale(0)' : phase === 'explode' ? 'scale(4)' : isWiping ? 'scale(5)' : 'scale(1.5)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          animation: phase === 'breathe' ? 'intro-glow-breathe 2s ease-in-out infinite' : 'none',
        }}
      />
      <div
        className="absolute"
        style={{
          width: 800, height: 300, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(37,162,220,0.1) 0%, transparent 60%)',
          filter: 'blur(100px)',
          opacity: isGrid ? 0 : phase === 'breathe' ? 0.6 : isWiping ? 0 : 0.5,
          transition: 'all 1s ease-out',
        }}
      />

      {/* ====== PHASE 1: GOLDEN GRID DRAWS ITSELF ====== */}
      {isGrid && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Horizontal grid lines drawing from center */}
          {gridLines.filter(l => l.horizontal).map((line, i) => (
            <div
              key={`hgrid-${i}`}
              className="absolute left-[10%] right-[10%]"
              style={{
                top: `${line.position}%`,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.12), rgba(212,175,55,0.2), rgba(212,175,55,0.12), transparent)',
                animation: `intro-grid-draw-h 0.5s ease-out ${line.delay}s forwards`,
                opacity: 0,
              }}
            />
          ))}
          {/* Vertical grid lines drawing from center */}
          {gridLines.filter(l => !l.horizontal).map((line, i) => (
            <div
              key={`vgrid-${i}`}
              className="absolute top-[10%] bottom-[10%]"
              style={{
                left: `${line.position}%`,
                width: '1px',
                background: 'linear-gradient(180deg, transparent, rgba(37,162,220,0.08), rgba(37,162,220,0.15), rgba(37,162,220,0.08), transparent)',
                animation: `intro-grid-draw-v 0.5s ease-out ${line.delay}s forwards`,
                opacity: 0,
              }}
            />
          ))}
          {/* Center crosshair — prominent */}
          <div
            style={{
              position: 'absolute', top: '50%', left: 0, right: 0, height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, #D4AF37 30%, #FFFFFF 50%, #D4AF37 70%, transparent 100%)',
              boxShadow: '0 0 30px rgba(212,175,55,0.6)',
              animation: 'intro-line-sweep 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          />
          <div
            style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px',
              background: 'linear-gradient(180deg, transparent 0%, #25A2DC 30%, #FFFFFF 50%, #25A2DC 70%, transparent 100%)',
              boxShadow: '0 0 25px rgba(37,162,220,0.5)',
              animation: 'intro-line-sweep-v 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards',
              opacity: 0,
            }}
          />
          {/* Expanding rings from center */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`ring-${i}`}
              className="absolute rounded-full"
              style={{
                left: '50%', top: '50%', width: 40, height: 40, marginTop: -20, marginLeft: -20,
                border: `1.5px solid rgba(212,175,55,${0.4 - i * 0.08})`,
                animation: `intro-ring-expand 0.8s ease-out ${0.3 + i * 0.15}s forwards`,
                opacity: 0,
              }}
            />
          ))}
          {/* Center dot pulse */}
          <div
            style={{
              position: 'absolute', left: '50%', top: '50%', width: 8, height: 8,
              borderRadius: '50%', background: '#D4AF37',
              boxShadow: '0 0 20px rgba(212,175,55,0.8), 0 0 60px rgba(212,175,55,0.3)',
              transform: 'translate(-50%, -50%)',
              animation: 'intro-dot-pulse 0.6s ease-out 0.2s forwards',
              opacity: 0,
            }}
          />
        </div>
      )}

      {/* ====== SPARK PARTICLES — during letters, logo, subtitle ====== */}
      {mounted && !isGrid && !isWiping && (
        <div className="absolute inset-0 pointer-events-none z-5">
          {sparkParticles.map((p, i) => (
            <div
              key={`spark-${i}`}
              className="absolute rounded-full"
              style={{
                width: p.size, height: p.size,
                background: p.isGold ? '#D4AF37' : '#25A2DC',
                boxShadow: p.isGold ? '0 0 8px rgba(212,175,55,0.6)' : '0 0 6px rgba(37,162,220,0.5)',
                left: `${p.x}%`, top: `${p.y}%`,
                opacity: phase === 'explode' ? 0 : 0.7,
                animation: `sparkle ${p.duration}s ease-in-out infinite ${p.delay}s`,
                transition: 'opacity 0.3s ease',
              }}
            />
          ))}
        </div>
      )}

      {/* ====== PHASE 2: LETTERS FLY IN FROM SIDES ====== */}
      <div className="relative z-10 flex items-center justify-center" style={{ perspective: '1000px' }}>
        {brandName.split('').map((letter, index) => {
          const dir = letterDirections[index];
          const isVisible = phase === 'letters' || phase === 'logo' || phase === 'logoHold' || phase === 'subtitle' || phase === 'breathe';
          const shouldShow = isVisible || phase === 'explode';

          return (
            <span
              key={`letter-${index}`}
              className="inline-block text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold gpu-accelerated"
              style={{
                color: '#FFFFFF',
                opacity: shouldShow ? 1 : isWiping ? 0 : 0,
                // FLY IN from left or right with rotation
                transform: isGrid
                  ? `translateX(${dir.fromLeft ? '-120vw' : '120vw'}) translateY(${dir.startY}px) rotateY(${dir.rotateStart}deg) scale(0.3)`
                  : isWiping
                  ? `translateX(${dir.fromLeft ? '-50vw' : '50vw'}) rotateY(${dir.rotateStart * 0.5}deg) scale(0)`
                  : phase === 'explode'
                  ? `translateX(${(dir.fromLeft ? -1 : 1) * (200 + index * 30)}px) translateY(${dir.startY * 3}px) rotateZ(${dir.rotateStart}deg) scale(0)`
                  : phase === 'breathe'
                  ? `translateX(0) translateY(${Math.sin(Date.now() / 1000 + index) * 3}px) rotateY(0) scale(1)`
                  : `translateX(0) translateY(0) rotateY(0) scale(1)`,
                filter: isGrid
                  ? 'blur(8px) brightness(3)'
                  : phase === 'breathe'
                  ? 'blur(0px) brightness(1.1)'
                  : isWiping
                  ? 'blur(4px) brightness(2)'
                  : 'blur(0px) brightness(1)',
                textShadow: shouldShow && !isWiping
                  ? '0 0 30px rgba(212,175,55,0.4), 0 0 60px rgba(37,162,220,0.2)'
                  : 'none',
                transition: isGrid
                  ? 'none'
                  : phase === 'explode'
                  ? `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.02}s`
                  : isWiping
                  ? `all 0.5s ease ${index * 0.03}s`
                  : `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${dir.delay}s`,
                letterSpacing: '0.02em',
                animation: phase === 'breathe' ? `letter-float 2.5s ease-in-out infinite ${index * 0.15}s` : 'none',
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* ====== GOLDEN TRAIL behind letters — visible during letters phase ====== */}
      {phase === 'letters' && (
        <div className="absolute inset-0 z-5 pointer-events-none">
          {/* Left streak */}
          <div style={{
            position: 'absolute', left: 0, top: '45%', width: '40%', height: '3px',
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), rgba(212,175,55,0.6))',
            filter: 'blur(2px)',
            animation: 'intro-trail-left 1.2s ease-out forwards',
            opacity: 0,
          }} />
          {/* Right streak */}
          <div style={{
            position: 'absolute', right: 0, top: '52%', width: '40%', height: '3px',
            background: 'linear-gradient(270deg, transparent, rgba(37,162,220,0.3), rgba(37,162,220,0.6))',
            filter: 'blur(2px)',
            animation: 'intro-trail-right 1.2s ease-out forwards',
            opacity: 0,
          }} />
          {/* Impact sparks at center */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`impact-${i}`}
              className="absolute rounded-full"
              style={{
                left: '50%', top: '50%',
                width: 2 + seededRandom(i * 7) * 4,
                height: 2 + seededRandom(i * 7) * 4,
                background: i % 2 === 0 ? '#D4AF37' : '#FFFFFF',
                boxShadow: i % 2 === 0 ? '0 0 10px rgba(212,175,55,0.8)' : '0 0 8px rgba(255,255,255,0.6)',
                animation: `intro-impact-spark 0.8s ease-out ${0.6 + i * 0.05}s forwards`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* ====== Decorative line under HARMENS ====== */}
      <div className="relative z-10 mt-4 md:mt-6 flex items-center gap-3 justify-center">
        <div style={{
          width: (phase === 'letters' || phase === 'logo' || phase === 'logoHold' || phase === 'subtitle' || phase === 'breathe') ? '50px' : '0px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #D4AF37)',
          opacity: phase === 'letters' ? 0.6 : (phase === 'logo' || phase === 'logoHold' || phase === 'subtitle' || phase === 'breathe') ? 1 : isWiping ? 0 : 0,
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 0 10px rgba(212,175,55,0.5)',
        }} />
        <div style={{
          width: 8, height: 8,
          border: '2px solid #D4AF37',
          transform: 'rotate(45deg)',
          opacity: (phase === 'logo' || phase === 'logoHold' || phase === 'subtitle' || phase === 'breathe') ? 1 : isWiping ? 0 : 0,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          boxShadow: '0 0 10px rgba(212,175,55,0.4)',
          animation: phase === 'breathe' ? 'intro-diamond-spin 4s linear infinite' : 'none',
        }} />
        <div style={{
          width: (phase === 'letters' || phase === 'logo' || phase === 'logoHold' || phase === 'subtitle' || phase === 'breathe') ? '50px' : '0px',
          height: '2px',
          background: 'linear-gradient(270deg, transparent, #25A2DC)',
          opacity: phase === 'letters' ? 0.6 : (phase === 'logo' || phase === 'logoHold' || phase === 'subtitle' || phase === 'breathe') ? 1 : isWiping ? 0 : 0,
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 0 10px rgba(37,162,220,0.5)',
        }} />
      </div>

      {/* ====== PHASE 3: LOGO 3D SPIN FROM BEHIND ====== */}
      <div
        className="absolute z-10 gpu-accelerated"
        style={{
          perspective: '1000px',
          opacity: phase === 'logo' || phase === 'logoHold' || phase === 'subtitle' ? 1 : phase === 'breathe' ? 0.9 : phase === 'explode' ? 0.5 : isWiping ? 0 : 0,
          transform: isGrid || phase === 'letters'
            ? 'perspective(1000px) rotateY(180deg) rotateX(30deg) scale(0.3) translateY(45px) translateZ(-200px)'
            : phase === 'logo' || phase === 'logoHold'
            ? 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1) translateY(45px) translateZ(0px)'
            : phase === 'subtitle' || phase === 'breathe'
            ? 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(0.55) translateY(205px) translateZ(0px)'
            : phase === 'explode'
            ? 'perspective(1000px) rotateY(60deg) rotateX(10deg) scale(2.5) translateY(205px) translateZ(100px)'
            : 'perspective(1000px) rotateY(180deg) scale(0) translateY(345px)',
          filter: isGrid || phase === 'letters'
            ? 'brightness(4) blur(15px)'
            : phase === 'explode'
            ? 'brightness(5) blur(10px)'
            : isWiping
            ? 'brightness(3) blur(12px)'
            : 'brightness(1.1) blur(0px)',
          transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
          animation: phase === 'breathe' ? 'intro-logo-breathe 3s ease-in-out infinite' : 'none',
        }}
      >
        {/* 3D Glow ring that expands on logo appearance */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '50%', top: '50%', width: 40, height: 40, marginTop: -20, marginLeft: -20,
            borderRadius: '50%',
            border: '2px solid rgba(212,175,55,0.6)',
            opacity: phase === 'logo' || phase === 'logoHold' ? 1 : 0,
            animation: phase === 'logo' || phase === 'logoHold' ? 'intro-ring-expand 1.5s ease-out forwards' : 'none',
          }}
        />
        {/* 3D Shine sweep — diagonal light reflection */}
        <div
          className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
          style={{
            opacity: phase === 'logo' || phase === 'logoHold' ? 1 : phase === 'breathe' ? 0.4 : 0,
            animation: phase === 'logo' || phase === 'logoHold' ? 'intro-shine-sweep 1s ease-out 0.5s' : phase === 'breathe' ? 'intro-shine-sweep 4s ease-in-out infinite' : 'none',
            transition: 'opacity 0.3s ease',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '60%',
              height: '200%',
              background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
            }}
          />
        </div>
        {/* Orbit ring */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '50%', top: '50%', width: 220, height: 220, marginTop: -110, marginLeft: -110,
            borderRadius: '50%', border: '1.5px solid rgba(212,175,55,0.2)',
            opacity: phase === 'logo' || phase === 'logoHold' || phase === 'subtitle' || phase === 'breathe' ? 1 : 0,
            animation: 'spin-slow 6s linear infinite',
            transition: 'opacity 0.5s ease',
          }}
        >
          <div style={{
            position: 'absolute', top: -4, left: '50%', marginLeft: -4,
            width: 8, height: 8, borderRadius: '50%',
            background: '#D4AF37', boxShadow: '0 0 15px rgba(212,175,55,0.7)',
          }} />
        </div>
        <Image
          src="/harmens-logo-tran.png"
          alt="HARMENS"
          width={140}
          height={140}
          className="relative z-10"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.5)) drop-shadow(0 0 60px rgba(212,175,55,0.2))',
            animation: phase === 'logo' || phase === 'logoHold' ? 'intro-logo-glow-3d 1.5s ease-out' : 'none',
          }}
          priority
        />
      </div>

      {/* ====== PHASE 4: ARABIC + ENGLISH SUBTITLE ====== */}
      <div
        className="relative z-10 mt-8 flex items-center justify-center"
        style={{
          opacity: phase === 'subtitle' || phase === 'breathe' ? 1 : phase === 'explode' ? 0.5 : isWiping ? 0 : 0,
          transform: isWiping ? 'translateY(-30px) scale(0.8)' : 'translateY(0) scale(1)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {arabicText.split('').map((char, index) => (
          <span
            key={`ar-${index}`}
            className="text-xl md:text-3xl"
            style={{
              color: '#D4AF37',
              textShadow: '0 0 20px rgba(212,175,55,0.4), 0 0 40px rgba(212,175,55,0.15)',
              direction: 'rtl',
              display: 'inline-block',
              opacity: phase === 'subtitle' || phase === 'breathe' ? 1 : phase === 'explode' ? 0.3 : 0,
              transform: phase === 'subtitle' || phase === 'breathe' ? 'translateY(0) scale(1)' : isWiping ? 'translateY(-20px) scale(0.5)' : 'translateY(30px) scale(0.7)',
              filter: phase === 'subtitle' || phase === 'breathe' ? 'blur(0px)' : 'blur(4px)',
              transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${3.5 + index * 0.03}s`,
              animation: phase === 'breathe' ? `intro-text-shimmer 2s ease-in-out infinite ${index * 0.1}s` : 'none',
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Tagline */}
      <div
        className="relative z-10 mt-3 flex items-center justify-center"
        style={{
          opacity: phase === 'subtitle' || phase === 'breathe' ? 1 : isWiping ? 0 : 0,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
        }}
      >
        {tagline.split('').map((char, index) => (
          <span
            key={`tag-${index}`}
            className="text-[10px] md:text-xs tracking-[0.35em] uppercase"
            style={{
              color: '#A0AEC0',
              display: 'inline-block',
              opacity: phase === 'subtitle' || phase === 'breathe' ? 0.7 : 0,
              transform: phase === 'subtitle' || phase === 'breathe' ? 'translateY(0)' : 'translateY(10px)',
              transition: `all 0.35s ease ${3.8 + index * 0.01}s`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* ====== PHASE 5: BREATHE — Floating decorative shapes ====== */}
      {phase === 'breathe' && (
        <div className="absolute inset-0 z-5 pointer-events-none">
          {floatingShapes.map((shape, i) => (
            <div
              key={`shape-${i}`}
              className="absolute"
              style={{
                left: `${shape.x}%`, top: `${shape.y}%`,
                fontSize: shape.size,
                color: shape.color,
                opacity: 0.15,
                animation: `intro-shape-drift ${shape.duration}s ease-in-out infinite ${shape.delay}s`,
                textShadow: `0 0 20px ${shape.color}40`,
              }}
            >
              {shape.icon}
            </div>
          ))}
          {/* Rotating diamond frames */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 500, height: 500, marginTop: -250, marginLeft: -250,
            border: '1px solid rgba(212,175,55,0.06)',
            animation: 'intro-diamond-rotate 10s linear infinite',
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 350, height: 350, marginTop: -175, marginLeft: -175,
            border: '1px solid rgba(37,162,220,0.05)',
            animation: 'intro-diamond-rotate 14s linear infinite reverse',
          }} />
        </div>
      )}

      {/* ====== PHASE 6: EXPLODE — Golden shockwave ====== */}
      {phase === 'explode' && (
        <>
          {/* Ripple rings */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={`pulse-ring-${i}`}
              className="absolute z-5 rounded-full"
              style={{
                border: `2px solid rgba(212, 175, 55, ${0.5 - i * 0.06})`,
                animation: `ripple-expand 0.8s ease-out ${i * 0.08}s forwards`,
              }}
            />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`pulse-blue-${i}`}
              className="absolute z-5 rounded-full"
              style={{
                border: `1.5px solid rgba(37, 162, 220, ${0.3 - i * 0.05})`,
                animation: `ripple-expand 1s ease-out ${0.1 + i * 0.1}s forwards`,
              }}
            />
          ))}

          {/* Burst particles */}
          {burstParticles.map((p, i) => (
            <div
              key={`explode-${i}`}
              className="absolute z-10 rounded-full"
              style={{
                width: p.size, height: p.size,
                background: p.isWhite ? '#FFFFFF' : p.isGold ? '#D4AF37' : '#25A2DC',
                boxShadow: p.isWhite ? '0 0 8px rgba(255,255,255,0.7)' : p.isGold ? '0 0 10px rgba(212,175,55,0.9)' : '0 0 8px rgba(37,162,220,0.7)',
                left: '50%', top: '50%',
                animation: `particle-drift 1s ease-out ${p.delay}s forwards`,
                '--drift-x': `${Math.cos(p.angle) * p.distance}px`,
                '--drift-y': `${Math.sin(p.angle) * p.distance}px`,
              } as React.CSSProperties}
            />
          ))}

          {/* Golden flash */}
          <div
            className="absolute inset-0 z-15 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.4) 0%, transparent 55%)',
              animation: 'intro-flash 0.5s ease-out forwards',
            }}
          />
        </>
      )}

      {/* ====== PHASE 7: WIPE — Smooth gradient dissolve ====== */}
      {isWiping && (
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, #050810 0%, #050810 100%)',
            opacity: 0,
            animation: 'intro-wipe-smooth 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        />
      )}

      {/* ====== PROGRESS BAR ====== */}
      <div className="absolute bottom-8 left-0 right-0 z-20 px-8 md:px-16" style={{
        opacity: isWiping ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] tracking-[0.6em] uppercase" style={{ color: 'rgba(160, 174, 192, 0.3)' }}>
            Loading Experience
          </span>
          <span className="text-[10px] tracking-[0.2em] font-light" style={{ color: 'rgba(212, 175, 55, 0.5)' }}>
            {isGrid ? '0' : phase === 'letters' ? '14' : phase === 'logo' ? '28' : phase === 'logoHold' ? '40' : phase === 'subtitle' ? '55' : phase === 'breathe' ? '75' : phase === 'explode' ? '90' : '100'}%
          </span>
        </div>
        <div className="h-[1px] w-full bg-[#1C2738]/60 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full"
            style={{
              width: `${isGrid ? 0 : phase === 'letters' ? 14 : phase === 'logo' ? 28 : phase === 'logoHold' ? 40 : phase === 'subtitle' ? 55 : phase === 'breathe' ? 75 : phase === 'explode' ? 90 : 100}%`,
              background: 'linear-gradient(90deg, #D4AF37, #25A2DC)',
              transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          <div
            className="absolute top-[-2px] h-[5px] w-[5px] rounded-full"
            style={{
              left: `${isGrid ? 0 : phase === 'letters' ? 14 : phase === 'logo' ? 28 : phase === 'logoHold' ? 40 : phase === 'subtitle' ? 55 : phase === 'breathe' ? 75 : phase === 'explode' ? 90 : 100}%`,
              background: '#25A2DC',
              boxShadow: '0 0 10px rgba(37,162,220,0.8), 0 0 20px rgba(37,162,220,0.3)',
              transition: 'left 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </div>

      {/* ====== CORNER BRACKETS ====== */}
      {['logo', 'logoHold', 'subtitle', 'breathe'].includes(phase) && (
        <>
          <div className="absolute top-6 left-6 z-10" style={{ opacity: 0.4 }}>
            <div className="w-8 h-[1px] bg-[#D4AF37]/50" />
            <div className="w-[1px] h-8 bg-[#D4AF37]/50" />
          </div>
          <div className="absolute top-6 right-6 z-10" style={{ opacity: 0.4 }}>
            <div className="w-8 h-[1px] bg-[#D4AF37]/50 ml-auto" />
            <div className="w-[1px] h-8 bg-[#D4AF37]/50 ml-auto" />
          </div>
          <div className="absolute bottom-14 left-6 z-10" style={{ opacity: 0.4 }}>
            <div className="w-[1px] h-8 bg-[#25A2DC]/50" />
            <div className="w-8 h-[1px] bg-[#25A2DC]/50" />
          </div>
          <div className="absolute bottom-14 right-6 z-10" style={{ opacity: 0.4 }}>
            <div className="w-[1px] h-8 bg-[#25A2DC]/50 ml-auto" />
            <div className="w-8 h-[1px] bg-[#25A2DC]/50 ml-auto" />
          </div>
        </>
      )}
    </div>
  );
}
