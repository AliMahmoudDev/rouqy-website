'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';

interface IntroAnimationProps {
  onComplete: () => void;
}

/**
 * 🎬 HARMENS Cinematic Intro v4.0 — "The Architectural Reveal"
 *
 * A 5-second cinematic loading experience that embodies interior design & architecture:
 *
 * Phase 1 (0-0.8s):   Golden line sweeps across screen — architectural blueprint feel
 * Phase 2 (0.8-2s):   HARMENS letters materialize from dust/light with 3D rotation
 * Phase 3 (2-2.8s):   Logo crystallizes from golden energy + decorative ring appears
 * Phase 4 (2.8-3.8s): Arabic subtitle + tagline fade in with golden shimmer
 * Phase 5 (3.8-4.3s): Grand reveal — golden pulse explodes outward
 * Phase 6 (4.3-5s):   Smooth blur-to-clear fade → site emerges
 */

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<
    'sweep' | 'letters' | 'logo' | 'subtitle' | 'pulse' | 'fade' | 'done'
  >('sweep');

  const onCompleteStable = useCallback(onComplete, [onComplete]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase('letters'), 800));
    timers.push(setTimeout(() => setPhase('logo'), 2000));
    timers.push(setTimeout(() => setPhase('subtitle'), 2800));
    timers.push(setTimeout(() => setPhase('pulse'), 3800));
    timers.push(setTimeout(() => setPhase('fade'), 4300));
    timers.push(setTimeout(() => {
      setPhase('done');
      onCompleteStable();
    }, 5000));

    return () => timers.forEach(clearTimeout);
  }, [onCompleteStable]);

  if (phase === 'done') return null;

  const brandName = 'HARMENS';
  const arabicText = 'هارمينز للتصميم الداخلي';
  const tagline = 'DESIGNED TO BE FELT BEFORE IT\'S SEEN';

  // Pre-calculate random positions for each letter (consistent across renders)
  const letterOffsets = useMemo(() =>
    brandName.split('').map(() => ({
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 500,
      z: (Math.random() - 0.5) * 400,
      rotateX: (Math.random() - 0.5) * 200,
      rotateY: (Math.random() - 0.5) * 200,
      rotateZ: (Math.random() - 0.5) * 60,
    })),
  []
  );

  // Pre-calculate ambient particles that float throughout
  const ambientParticles = useMemo(() =>
    Array.from({ length: 60 }).map((_, i) => ({
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2,
      isGold: i % 3 === 0,
      isWhite: i % 5 === 0,
    })),
  []
  );

  // Golden line sweep data
  const lineSweepCount = 5;

  const isFading = phase === 'fade';
  const isPostPulse = phase === 'pulse' || phase === 'fade';

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050810] overflow-hidden"
      style={{
        opacity: isFading ? 0 : 1,
        filter: isFading ? 'blur(12px)' : 'blur(0px)',
        transition: 'all 0.7s cubic-bezier(0.65, 0.05, 0, 1)',
      }}
    >
      {/* === BACKGROUND LAYERS === */}

      {/* Animated noise texture */}
      <div className="noise-overlay absolute inset-0 pointer-events-none z-0 opacity-[0.03]" />

      {/* Deep space gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 120% 80% at 50% 50%, #0B1220 0%, #050810 50%, #020408 100%)',
        }}
      />

      {/* Central golden glow — the heart of the animation */}
      <div
        className="absolute"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0.08) 35%, transparent 60%)',
          filter: 'blur(80px)',
          opacity: phase === 'sweep' ? 0 : phase === 'pulse' ? 1 : isFading ? 0 : 0.7,
          transform: phase === 'sweep'
            ? 'scale(0)'
            : phase === 'pulse'
            ? 'scale(3)'
            : isFading
            ? 'scale(4)'
            : 'scale(1.5)',
          transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Blue ambient glow — secondary */}
      <div
        className="absolute"
        style={{
          width: 1000,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(37,162,220,0.08) 0%, transparent 60%)',
          filter: 'blur(100px)',
          opacity: phase === 'sweep' ? 0 : isFading ? 0 : 0.5,
          transform: phase === 'pulse' ? 'scale(2.5)' : 'scale(1)',
          transition: 'all 1.5s ease-out',
        }}
      />

      {/* ====== AMBIENT FLOATING PARTICLES — Throughout ====== */}
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
              opacity: phase === 'sweep' ? 0 : isFading ? 0 : 0.6,
              animation: phase !== 'sweep' && !isFading ? `particle-rise ${p.duration}s linear infinite ${p.delay}s` : 'none',
              transition: 'opacity 0.5s ease',
            }}
          />
        ))}
      </div>

      {/* ====== PHASE 1: ARCHITECTURAL GOLDEN LINE SWEEP ====== */}
      {phase === 'sweep' && (
        <>
          {/* Horizontal golden line that sweeps across */}
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
          {/* Secondary vertical lines */}
          <div
            className="absolute"
            style={{
              top: 0,
              bottom: 0,
              left: '50%',
              width: '1px',
              background: 'linear-gradient(180deg, transparent 0%, rgba(37,162,220,0.3) 30%, rgba(37,162,220,0.6) 50%, rgba(37,162,220,0.3) 70%, transparent 100%)',
              boxShadow: '0 0 15px rgba(37,162,220,0.4)',
              animation: 'intro-line-sweep-v 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards',
              opacity: 0,
            }}
          />
          {/* Crosshair dots */}
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
              animation: 'intro-dot-pulse 0.6s ease-out 0.3s forwards',
              opacity: 0,
            }}
          />
          {/* Expanding rings from center */}
          {[0, 1, 2].map((i) => (
            <div
              key={`ring-${i}`}
              className="absolute rounded-full"
              style={{
                left: '50%',
                top: '50%',
                width: 40,
                height: 40,
                marginTop: -20,
                marginLeft: -20,
                border: `1px solid rgba(212,175,55,${0.3 - i * 0.08})`,
                animation: `intro-ring-expand 0.8s ease-out ${0.3 + i * 0.15}s forwards`,
                opacity: 0,
              }}
            />
          ))}
        </>
      )}

      {/* ====== PHASE 2: HARMENS LETTERS — Materialize from scattered dust ====== */}
      <div className="relative z-10 flex items-center justify-center gpu-accelerated" style={{ perspective: '1200px' }}>
        {brandName.split('').map((letter, index) => {
          const offset = letterOffsets[index];
          const letterDelay = index * 0.06;
          const isLetterVisible = phase === 'letters' || phase === 'logo' || phase === 'subtitle';
          const shouldShow = isLetterVisible || phase === 'pulse';

          return (
            <span
              key={`letter-${index}`}
              className="inline-block text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold gpu-accelerated"
              style={{
                color: '#FFFFFF',
                opacity: shouldShow ? 1 : isFading ? 0 : 0,
                transform: phase === 'sweep'
                  ? `translate3d(${offset.x}px, ${offset.y}px, ${offset.z}px) rotateX(${offset.rotateX}deg) rotateY(${offset.rotateY}deg) rotateZ(${offset.rotateZ}deg) scale(0.2)`
                  : isFading
                  ? `translate3d(${offset.x * 0.6}px, ${offset.y * 0.8}px, -200px) rotateX(${offset.rotateX * 0.3}deg) rotateY(${offset.rotateY * 0.3}deg) scale(0)`
                  : `translate3d(0, 0, 0) rotateX(0) rotateY(0) rotateZ(0) scale(1)`,
                filter: phase === 'sweep'
                  ? 'blur(12px) brightness(4)'
                  : phase === 'letters'
                  ? 'blur(0px) brightness(1)'
                  : isFading
                  ? 'blur(6px) brightness(2)'
                  : 'blur(0px) brightness(1)',
                textShadow: shouldShow
                  ? '0 0 40px rgba(212,175,55,0.25), 0 0 80px rgba(37,162,220,0.1), 0 0 120px rgba(212,175,55,0.08)'
                  : 'none',
                transition: `all ${isFading ? '0.7s' : '0.8s'} cubic-bezier(0.16, 1, 0.3, 1) ${isFading ? (index * 0.02) : letterDelay}s`,
                letterSpacing: '0.02em',
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* ====== Decorative line under HARMENS — Architectural blueprint style ====== */}
      <div className="relative z-10 mt-4 md:mt-6 flex items-center gap-3 justify-center">
        <div
          style={{
            width: phase === 'letters' || phase === 'logo' || phase === 'subtitle' ? '40px' : '0px',
            height: '1px',
            background: '#D4AF37',
            opacity: phase === 'letters' ? 0.5 : phase === 'logo' || phase === 'subtitle' ? 1 : isFading ? 0 : 0,
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            boxShadow: '0 0 8px rgba(212,175,55,0.4)',
          }}
        />
        <div
          style={{
            width: 6,
            height: 6,
            border: '1px solid #25A2DC',
            transform: 'rotate(45deg)',
            opacity: phase === 'logo' || phase === 'subtitle' ? 1 : isFading ? 0 : 0,
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
            boxShadow: '0 0 6px rgba(37,162,220,0.3)',
          }}
        />
        <div
          style={{
            width: phase === 'letters' || phase === 'logo' || phase === 'subtitle' ? '40px' : '0px',
            height: '1px',
            background: '#25A2DC',
            opacity: phase === 'letters' ? 0.5 : phase === 'logo' || phase === 'subtitle' ? 1 : isFading ? 0 : 0,
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
            boxShadow: '0 0 8px rgba(37,162,220,0.4)',
          }}
        />
      </div>

      {/* ====== PHASE 3: LOGO — Crystallizes from golden energy ====== */}
      <div
        className="absolute z-10 gpu-accelerated"
        style={{
          opacity: phase === 'logo' || phase === 'subtitle' ? 1 : phase === 'pulse' ? 0.7 : isFading ? 0 : 0,
          transform: phase === 'logo'
            ? 'scale(1) translateY(0px)'
            : phase === 'subtitle'
            ? 'scale(0.7) translateY(150px)'
            : phase === 'pulse'
            ? 'scale(1.8) translateY(150px)'
            : isFading
            ? 'scale(0) translateY(250px)'
            : 'scale(0) translateY(0px)',
          filter: phase === 'logo'
            ? 'brightness(1.2) blur(0px)'
            : phase === 'pulse'
            ? 'brightness(4) blur(8px)'
            : isFading
            ? 'brightness(3) blur(12px)'
            : 'brightness(5) blur(20px)',
          transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Logo shimmer light sweep */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            opacity: phase === 'logo' ? 1 : 0,
            background: 'linear-gradient(105deg, transparent 20%, rgba(255,223,100,0.5) 42%, rgba(255,240,180,0.8) 50%, rgba(255,223,100,0.5) 58%, transparent 80%)',
            backgroundSize: '200% 100%',
            animation: phase === 'logo' ? 'shimmer 1.2s ease-in-out' : 'none',
            transition: 'opacity 0.3s ease',
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
            opacity: phase === 'logo' ? 1 : 0,
            animation: phase === 'logo' ? 'spin-slow 8s linear infinite' : 'none',
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

      {/* ====== PHASE 4: Arabic subtitle — Elegant letter by letter ====== */}
      <div
        className="relative z-10 mt-8 flex items-center justify-center"
        style={{
          opacity: phase === 'subtitle' || phase === 'pulse' ? 1 : isFading ? 0 : 0,
          transform: isFading ? 'translateY(-30px) scale(0.8)' : 'translateY(0) scale(1)',
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
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
              opacity: phase === 'subtitle' || phase === 'pulse' ? 1 : 0,
              transform: phase === 'subtitle'
                ? 'translateY(0) scale(1)'
                : isFading
                ? 'translateY(-15px) scale(0.5)'
                : 'translateY(25px) scale(0.7)',
              filter: phase === 'subtitle' ? 'blur(0px)' : 'blur(3px)',
              transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${2.8 + index * 0.03}s`,
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
          opacity: phase === 'subtitle' || phase === 'pulse' ? 1 : isFading ? 0 : 0,
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
              opacity: phase === 'subtitle' || phase === 'pulse' ? 0.5 : 0,
              transform: phase === 'subtitle' ? 'translateY(0)' : 'translateY(8px)',
              transition: `all 0.4s ease ${3.2 + index * 0.015}s`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* ====== PHASE 5: Grand reveal — Golden pulse explosion ====== */}
      {phase === 'pulse' && (
        <>
          {/* Ripple rings expanding outward */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={`pulse-ring-${i}`}
              className="absolute z-5 rounded-full"
              style={{
                border: `1px solid rgba(212, 175, 55, ${0.4 - i * 0.06})`,
                animation: `ripple-expand 1s ease-out ${i * 0.12}s forwards`,
              }}
            />
          ))}

          {/* Blue ripple — secondary */}
          {[0, 1, 2].map((i) => (
            <div
              key={`pulse-blue-${i}`}
              className="absolute z-5 rounded-full"
              style={{
                border: `1px solid rgba(37, 162, 220, ${0.2 - i * 0.05})`,
                animation: `ripple-expand 1.2s ease-out ${0.15 + i * 0.15}s forwards`,
              }}
            />
          ))}

          {/* Exploding particles — golden dust */}
          {Array.from({ length: 50 }).map((_, i) => {
            const angle = (i / 50) * Math.PI * 2;
            const distance = 150 + Math.random() * 500;
            const isGold = i % 2 === 0;
            const isWhite = i % 5 === 0;
            return (
              <div
                key={`explode-${i}`}
                className="absolute z-10 rounded-full"
                style={{
                  width: 1 + Math.random() * 3,
                  height: 1 + Math.random() * 3,
                  background: isWhite ? '#FFFFFF' : isGold ? '#D4AF37' : '#25A2DC',
                  boxShadow: isWhite
                    ? '0 0 6px rgba(255,255,255,0.6)'
                    : isGold
                    ? '0 0 8px rgba(212,175,55,0.8)'
                    : '0 0 6px rgba(37,162,220,0.6)',
                  left: '50%',
                  top: '50%',
                  animation: `particle-drift 1.2s ease-out ${Math.random() * 0.3}s forwards`,
                  '--drift-x': `${Math.cos(angle) * distance}px`,
                  '--drift-y': `${Math.sin(angle) * distance}px`,
                } as React.CSSProperties}
              />
            );
          })}

          {/* Golden flash overlay */}
          <div
            className="absolute inset-0 z-15 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.3) 0%, transparent 60%)',
              animation: 'intro-flash 0.6s ease-out forwards',
            }}
          />
        </>
      )}

      {/* ====== PROGRESS INDICATOR — Elegant minimal bar ====== */}
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
            {phase === 'sweep' ? '0' : phase === 'letters' ? '25' : phase === 'logo' ? '50' : phase === 'subtitle' ? '75' : '100'}%
          </span>
        </div>
        {/* Progress bar track */}
        <div className="h-[1px] w-full bg-[#1C2738]/60 relative overflow-hidden">
          {/* Animated fill with gradient */}
          <div
            className="absolute top-0 left-0 h-full"
            style={{
              width: phase === 'sweep'
                ? '0%'
                : phase === 'letters'
                ? '25%'
                : phase === 'logo'
                ? '50%'
                : phase === 'subtitle'
                ? '75%'
                : '100%',
              background: 'linear-gradient(90deg, #D4AF37, #25A2DC)',
              transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          {/* Glowing tip */}
          <div
            className="absolute top-[-2px] h-[5px] w-[5px] rounded-full"
            style={{
              left: phase === 'sweep'
                ? '0%'
                : phase === 'letters'
                ? '25%'
                : phase === 'logo'
                ? '50%'
                : phase === 'subtitle'
                ? '75%'
                : '100%',
              background: '#25A2DC',
              boxShadow: '0 0 10px rgba(37,162,220,0.8), 0 0 20px rgba(37,162,220,0.3)',
              transition: 'left 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </div>

      {/* ====== Corner architectural brackets ====== */}
      {/* Top-left corner */}
      <div
        className="absolute top-6 left-6 z-10"
        style={{
          opacity: phase === 'logo' || phase === 'subtitle' ? 0.4 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <div className="w-6 h-[1px] bg-[#D4AF37]/40" />
        <div className="w-[1px] h-6 bg-[#D4AF37]/40" />
      </div>

      {/* Top-right corner */}
      <div
        className="absolute top-6 right-6 z-10"
        style={{
          opacity: phase === 'logo' || phase === 'subtitle' ? 0.4 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <div className="w-6 h-[1px] bg-[#D4AF37]/40 ml-auto" />
        <div className="w-[1px] h-6 bg-[#D4AF37]/40 ml-auto" />
      </div>

      {/* Bottom-left corner */}
      <div
        className="absolute bottom-14 left-6 z-10"
        style={{
          opacity: phase === 'logo' || phase === 'subtitle' ? 0.4 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <div className="w-[1px] h-6 bg-[#25A2DC]/40" />
        <div className="w-6 h-[1px] bg-[#25A2DC]/40" />
      </div>

      {/* Bottom-right corner */}
      <div
        className="absolute bottom-14 right-6 z-10"
        style={{
          opacity: phase === 'logo' || phase === 'subtitle' ? 0.4 : 0,
          transition: 'opacity 0.8s ease',
        }}
      >
        <div className="w-[1px] h-6 bg-[#25A2DC]/40 ml-auto" />
        <div className="w-6 h-[1px] bg-[#25A2DC]/40 ml-auto" />
      </div>

      {/* ====== Decorative thin lines — architectural blueprint style ====== */}
      {phase !== 'sweep' && !isFading && (
        <>
          {/* Top thin line */}
          <div
            className="absolute top-12 left-[15%] right-[15%] z-5"
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(37,162,220,0.08), transparent)',
              opacity: phase === 'logo' || phase === 'subtitle' ? 1 : 0,
              transition: 'opacity 1s ease',
            }}
          />
          {/* Bottom thin line */}
          <div
            className="absolute bottom-24 left-[15%] right-[15%] z-5"
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.08), transparent)',
              opacity: phase === 'logo' || phase === 'subtitle' ? 1 : 0,
              transition: 'opacity 1s ease',
            }}
          />
        </>
      )}
    </div>
  );
}
