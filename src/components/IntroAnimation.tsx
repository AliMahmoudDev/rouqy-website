'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';

interface IntroAnimationProps {
  onComplete: () => void;
}

/**
 * 🎬 HARMENS Cinematic Intro v3.0 — "The Grand Reveal"
 *
 * A truly professional, mind-blowing loading experience:
 *
 * Phase 1 (0-1s):     Black screen → golden particles converge to center
 * Phase 2 (1-2.5s):   HARMENS letters fly in from scattered positions with 3D rotation
 * Phase 3 (2.5-3.5s): Logo materializes from golden light with shimmer
 * Phase 4 (3.5-5s):   Arabic subtitle reveals letter by letter
 * Phase 5 (5-5.5s):   Golden pulse explodes outward from logo
 * Phase 6 (5.5-7s):   Everything disperses — letters scatter, logo shrinks
 * Phase 7 (7-8s):     Smooth fade → site emerges with blur-to-clear transition
 */

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<
    'particles' | 'letters' | 'logo' | 'subtitle' | 'pulse' | 'disperse' | 'fade' | 'done'
  >('particles');

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase('letters'), 1000));
    timers.push(setTimeout(() => setPhase('logo'), 2500));
    timers.push(setTimeout(() => setPhase('subtitle'), 3500));
    timers.push(setTimeout(() => setPhase('pulse'), 5000));
    timers.push(setTimeout(() => setPhase('disperse'), 5500));
    timers.push(setTimeout(() => setPhase('fade'), 7000));
    timers.push(setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 8200));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase === 'done') return null;

  const brandName = 'HARMENS';
  const arabicText = 'هارمينز ديزاين';
  const tagline = 'DESIGNED TO BE FELT';

  // Pre-calculate random positions for each letter (consistent across renders)
  const letterOffsets = useMemo(() => 
    brandName.split('').map(() => ({
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 400,
      rotateX: (Math.random() - 0.5) * 180,
      rotateY: (Math.random() - 0.5) * 180,
      rotateZ: (Math.random() - 0.5) * 90,
    })),
  []
  );

  // Pre-calculate particle positions
  const particleData = useMemo(() =>
    Array.from({ length: 40 }).map((_, i) => {
      const angle = (i / 40) * Math.PI * 2;
      const distance = 200 + Math.random() * 300;
      return {
        startX: Math.cos(angle) * distance,
        startY: Math.sin(angle) * distance,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 0.8,
        isGold: i % 3 === 0,
      };
    }),
  []);

  const isDispersing = phase === 'disperse' || phase === 'fade';
  const isFading = phase === 'fade';

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0F18] overflow-hidden"
      style={{
        opacity: isFading ? 0 : 1,
        filter: isFading ? 'blur(10px)' : 'blur(0px)',
        transition: 'all 1.2s cubic-bezier(0.65, 0.05, 0, 1)',
      }}
    >
      {/* === BACKGROUND LAYERS === */}

      {/* Animated noise texture */}
      <div className="noise-overlay absolute inset-0 pointer-events-none z-0 opacity-[0.04]" />

      {/* Central golden glow — grows throughout */}
      <div
        className="absolute"
        style={{
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(212,175,55,0.08) 30%, transparent 60%)',
          filter: 'blur(80px)',
          opacity: phase === 'particles' ? 0 : phase === 'pulse' ? 1 : isDispersing ? 0 : 0.6,
          transform: phase === 'particles'
            ? 'scale(0)'
            : phase === 'pulse'
            ? 'scale(2.5)'
            : isDispersing
            ? 'scale(4)'
            : 'scale(1.5)',
          transition: 'all 2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Blue ambient glow */}
      <div
        className="absolute"
        style={{
          width: 1200,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(37,162,220,0.06) 0%, transparent 60%)',
          filter: 'blur(100px)',
          opacity: phase === 'particles' ? 0 : isDispersing ? 0 : 0.5,
          transform: phase === 'pulse' ? 'scale(2)' : 'scale(1)',
          transition: 'all 2s ease-out',
        }}
      />

      {/* ====== PHASE 1: CONVERGING PARTICLES ====== */}
      <div className="absolute inset-0 pointer-events-none">
        {particleData.map((p, i) => (
          <div
            key={`conv-${i}`}
            className="absolute"
            style={{
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: p.isGold ? '#D4AF37' : '#25A2DC',
              boxShadow: p.isGold
                ? '0 0 8px rgba(212,175,55,0.6)'
                : '0 0 6px rgba(37,162,220,0.4)',
              left: '50%',
              top: '50%',
              opacity: phase === 'particles' ? 1 : 0,
              transform: phase === 'particles'
                ? `translate(${p.startX}px, ${p.startY}px) scale(1)`
                : 'translate(0, 0) scale(0)',
              transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ====== PHASE 2: HARMENS LETTERS — Fly in from scattered positions ====== */}
      <div className="relative z-10 flex items-center justify-center" style={{ perspective: '1000px' }}>
        {brandName.split('').map((letter, index) => {
          const offset = letterOffsets[index];
          const letterDelay = index * 0.08;
          const isLetterPhase = phase === 'letters' || phase === 'logo' || phase === 'subtitle';
          const shouldShow = isLetterPhase || phase === 'pulse';

          return (
            <span
              key={`letter-${index}`}
              className="inline-block text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold"
              style={{
                color: '#FFFFFF',
                opacity: shouldShow ? 1 : isDispersing ? 0 : 0,
                transform: phase === 'particles'
                  ? `translate3d(${offset.x}px, ${offset.y}px, -200px) rotateX(${offset.rotateX}deg) rotateY(${offset.rotateY}deg) rotateZ(${offset.rotateZ}deg) scale(0.3)`
                  : isDispersing
                  ? `translate3d(${offset.x * 0.8}px, ${offset.y * 1.2}px, -300px) rotateX(${offset.rotateX * 0.5}deg) rotateY(${offset.rotateY * 0.5}deg) scale(0)`
                  : `translate3d(0, 0, 0) rotateX(0) rotateY(0) rotateZ(0) scale(1)`,
                filter: phase === 'particles'
                  ? 'blur(8px) brightness(3)'
                  : phase === 'letters'
                  ? 'blur(0px) brightness(1)'
                  : isDispersing
                  ? 'blur(5px) brightness(2)'
                  : 'blur(0px) brightness(1)',
                textShadow: shouldShow
                  ? '0 0 40px rgba(212,175,55,0.2), 0 0 80px rgba(37,162,220,0.1)'
                  : 'none',
                transition: `all ${isDispersing ? '1.5s' : '1s'} cubic-bezier(0.16, 1, 0.3, 1) ${isDispersing ? (index * 0.03) : letterDelay}s`,
                letterSpacing: '0.02em',
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>

      {/* ====== Decorative line under HARMENS ====== */}
      <div
        className="relative z-10 mt-4 md:mt-6"
        style={{
          width: phase === 'letters' || phase === 'logo' || phase === 'subtitle' || phase === 'pulse' ? '120px' : '0px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #D4AF37, #25A2DC, transparent)',
          opacity: phase === 'letters' ? 0.5 : phase === 'logo' || phase === 'subtitle' ? 1 : isDispersing ? 0 : 0,
          transition: 'all 1s cubic-bezier(0.65, 0.05, 0, 1) 0.5s',
        }}
      />

      {/* ====== PHASE 3: LOGO — Materializes from golden light ====== */}
      <div
        className="absolute z-10"
        style={{
          opacity: phase === 'logo' || phase === 'subtitle' ? 1 : phase === 'pulse' ? 0.8 : isDispersing ? 0 : 0,
          transform: phase === 'logo'
            ? 'scale(1) translateY(0px)'
            : phase === 'subtitle'
            ? 'scale(0.8) translateY(140px)'
            : phase === 'pulse'
            ? 'scale(1.5) translateY(140px)'
            : isDispersing
            ? 'scale(0) translateY(200px)'
            : 'scale(0) translateY(0px)',
          filter: phase === 'logo'
            ? 'brightness(1) blur(0px)'
            : phase === 'pulse'
            ? 'brightness(3) blur(5px)'
            : isDispersing
            ? 'brightness(2) blur(10px)'
            : 'brightness(4) blur(15px)',
          transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Logo shimmer */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            opacity: phase === 'logo' ? 1 : 0,
            background: 'linear-gradient(105deg, transparent 30%, rgba(255,223,100,0.4) 45%, rgba(255,223,100,0.7) 50%, rgba(255,223,100,0.4) 55%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: phase === 'logo' ? 'shimmer 1.5s ease-in-out' : 'none',
            transition: 'opacity 0.5s ease',
          }}
        />

        <Image
          src="/harmens-logo-tran.png"
          alt="HARMENS"
          width={140}
          height={140}
          className="relative z-10"
          style={{
            filter: 'drop-shadow(0 0 40px rgba(212,175,55,0.4))',
          }}
          priority
        />
      </div>

      {/* ====== PHASE 4: Arabic subtitle — Letter by letter ====== */}
      <div
        className="relative z-10 mt-8 flex items-center justify-center"
        style={{
          opacity: phase === 'subtitle' || phase === 'pulse' ? 1 : isDispersing ? 0 : 0,
          transform: isDispersing ? 'translateY(-30px)' : 'translateY(0)',
          transition: 'all 1s cubic-bezier(0.65, 0.05, 0, 1)',
        }}
      >
        {arabicText.split('').map((char, index) => (
          <span
            key={`ar-${index}`}
            className="text-lg md:text-2xl"
            style={{
              color: '#D4AF37',
              textShadow: '0 0 12px rgba(212,175,55,0.3)',
              direction: 'rtl',
              display: 'inline-block',
              opacity: phase === 'subtitle' || phase === 'pulse' ? 1 : 0,
              transform: phase === 'subtitle'
                ? 'translateY(0) scale(1)'
                : isDispersing
                ? 'translateY(-20px) scale(0.5)'
                : 'translateY(20px) scale(0.8)',
              filter: phase === 'subtitle' ? 'blur(0px)' : 'blur(4px)',
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${3.5 + index * 0.04}s`,
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
          opacity: phase === 'subtitle' || phase === 'pulse' ? 1 : isDispersing ? 0 : 0,
          transition: 'all 0.8s cubic-bezier(0.65, 0.05, 0, 1) 0.3s',
        }}
      >
        {tagline.split('').map((char, index) => (
          <span
            key={`tag-${index}`}
            className="text-[10px] md:text-xs tracking-[0.4em] uppercase"
            style={{
              color: '#A0AEC0',
              display: 'inline-block',
              opacity: phase === 'subtitle' || phase === 'pulse' ? 0.6 : 0,
              transform: phase === 'subtitle' ? 'translateY(0)' : 'translateY(8px)',
              transition: `all 0.5s ease ${4 + index * 0.02}s`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* ====== PHASE 5: Golden pulse explosion ====== */}
      {phase === 'pulse' && (
        <>
          {/* Ripple rings */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={`pulse-ring-${i}`}
              className="absolute z-5 rounded-full"
              style={{
                border: `1px solid rgba(212, 175, 55, ${0.3 - i * 0.05})`,
                animation: `ripple-expand 1.5s ease-out ${i * 0.2}s forwards`,
              }}
            />
          ))}

          {/* Exploding particles */}
          {Array.from({ length: 30 }).map((_, i) => {
            const angle = (i / 30) * Math.PI * 2;
            const distance = 200 + Math.random() * 400;
            const isGold = i % 2 === 0;
            return (
              <div
                key={`explode-${i}`}
                className="absolute z-10 rounded-full"
                style={{
                  width: 2 + Math.random() * 3,
                  height: 2 + Math.random() * 3,
                  background: isGold ? '#D4AF37' : '#25A2DC',
                  boxShadow: isGold
                    ? '0 0 8px rgba(212,175,55,0.8)'
                    : '0 0 6px rgba(37,162,220,0.6)',
                  left: '50%',
                  top: '50%',
                  animation: `particle-drift 1.5s ease-out ${0.2 + Math.random() * 0.5}s forwards`,
                  '--drift-x': `${Math.cos(angle) * distance}px`,
                  '--drift-y': `${Math.sin(angle) * distance}px`,
                } as React.CSSProperties}
              />
            );
          })}
        </>
      )}

      {/* ====== PHASE 6: Disperse — floating particles outward ====== */}
      {isDispersing && (
        <>
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * Math.PI * 2;
            const distance = 300 + Math.random() * 500;
            return (
              <div
                key={`disperse-${i}`}
                className="absolute z-10 rounded-full"
                style={{
                  width: 1 + Math.random() * 2,
                  height: 1 + Math.random() * 2,
                  background: i % 2 === 0 ? '#D4AF37' : '#25A2DC',
                  boxShadow: i % 2 === 0
                    ? '0 0 6px rgba(212,175,55,0.6)'
                    : '0 0 4px rgba(37,162,220,0.4)',
                  left: '50%',
                  top: '50%',
                  opacity: 0.8,
                  animation: `particle-drift 2s ease-out ${Math.random() * 0.3}s forwards`,
                  '--drift-x': `${Math.cos(angle) * distance}px`,
                  '--drift-y': `${Math.sin(angle) * distance}px`,
                } as React.CSSProperties}
              />
            );
          })}
        </>
      )}

      {/* ====== PROGRESS INDICATOR — Bottom bar with percentage ====== */}
      <div className="absolute bottom-8 left-0 right-0 z-20 px-8 md:px-16">
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-[10px] tracking-[0.5em] uppercase"
            style={{
              color: 'rgba(160, 174, 192, 0.4)',
              opacity: isDispersing ? 0 : 1,
              transition: 'opacity 0.5s ease',
            }}
          >
            Loading Experience
          </span>
          <span
            className="text-[10px] tracking-[0.3em]"
            style={{
              color: 'rgba(212, 175, 55, 0.5)',
              opacity: isDispersing ? 0 : 1,
              transition: 'opacity 0.5s ease',
            }}
          >
            {phase === 'particles' ? '12' : phase === 'letters' ? '34' : phase === 'logo' ? '56' : phase === 'subtitle' ? '78' : phase === 'pulse' ? '92' : '100'}%
          </span>
        </div>
        {/* Progress bar track */}
        <div className="h-[1px] w-full bg-[#1C2738] relative overflow-hidden">
          {/* Animated fill */}
          <div
            className="absolute top-0 left-0 h-full"
            style={{
              width: phase === 'particles'
                ? '12%'
                : phase === 'letters'
                ? '34%'
                : phase === 'logo'
                ? '56%'
                : phase === 'subtitle'
                ? '78%'
                : phase === 'pulse'
                ? '92%'
                : '100%',
              background: 'linear-gradient(90deg, #D4AF37, #25A2DC)',
              transition: 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          {/* Glowing tip */}
          <div
            className="absolute top-[-2px] h-[5px] w-[5px] rounded-full"
            style={{
              left: phase === 'particles'
                ? '12%'
                : phase === 'letters'
                ? '34%'
                : phase === 'logo'
                ? '56%'
                : phase === 'subtitle'
                ? '78%'
                : phase === 'pulse'
                ? '92%'
                : '100%',
              background: '#25A2DC',
              boxShadow: '0 0 10px rgba(37,162,220,0.6)',
              transition: 'left 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </div>

      {/* ====== Corner decorative elements ====== */}
      {/* Top-left corner line */}
      <div
        className="absolute top-8 left-8 z-10"
        style={{
          opacity: phase === 'subtitle' || phase === 'pulse' ? 0.3 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        <div className="w-8 h-[1px] bg-[#D4AF37]/30 mb-1" />
        <div className="w-[1px] h-8 bg-[#D4AF37]/30" />
      </div>

      {/* Bottom-right corner line */}
      <div
        className="absolute bottom-16 right-8 z-10"
        style={{
          opacity: phase === 'subtitle' || phase === 'pulse' ? 0.3 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        <div className="w-8 h-[1px] bg-[#25A2DC]/30 mb-1 ml-auto" />
        <div className="w-[1px] h-8 bg-[#25A2DC]/30 ml-auto" />
      </div>
    </div>
  );
}
