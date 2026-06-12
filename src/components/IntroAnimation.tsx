'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface IntroAnimationProps {
  onComplete: () => void;
}

/**
 * HARMENS Cinematic Intro - "The Golden Thread" v2.0
 * Optimized: More CSS, less Framer Motion for better performance
 *
 * Phase 1 (0-1.5s): Black screen → golden glow appears → grows
 * Phase 2 (1.5-3s): Logo fades in with golden shimmer
 * Phase 3 (3-4.5s): Arabic + English text appear letter by letter
 * Phase 4 (4.5-5.5s): Golden ripple + scattered particles
 * Phase 5 (5.5-7s): FadeOut → hero emerges
 */

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<
    'glow' | 'logo' | 'text' | 'ripple' | 'fadeOut' | 'done'
  >('glow');

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setPhase('logo'), 1500));
    timers.push(setTimeout(() => setPhase('text'), 3000));
    timers.push(setTimeout(() => setPhase('ripple'), 4500));
    timers.push(setTimeout(() => setPhase('fadeOut'), 5500));
    timers.push(setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 7000));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase === 'done') return null;

  const englishText = 'HARMENS DESIGN';
  const arabicText = 'هارمينز ديزاين';

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0F18] overflow-hidden"
      style={{
        opacity: phase === 'fadeOut' ? 0 : 1,
        transition: 'opacity 1s cubic-bezier(0.65, 0.05, 0, 1)',
      }}
    >
      {/* === BACKGROUND: Animated grain/noise === */}
      <div className="noise-overlay absolute inset-0 pointer-events-none z-0" />

      {/* === PHASE 1: Golden Glow — CSS animated === */}
      <div
        className="absolute"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(212,175,55,0.1) 40%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: phase === 'glow' ? 0 : phase === 'fadeOut' ? 0 : 1,
          transform: phase === 'glow' ? 'scale(0)' : phase === 'fadeOut' ? 'scale(3)' : 'scale(2)',
          transition: 'all 3s ease-out',
          animation: phase !== 'glow' && phase !== 'fadeOut' ? 'breathe 4s ease-in-out infinite' : 'none',
        }}
      />

      {/* Secondary ambient glow */}
      <div
        className="absolute"
        style={{
          width: 900,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(37,162,220,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: phase === 'fadeOut' ? 0 : 0.3,
          transition: 'opacity 2s ease 0.5s',
        }}
      />

      {/* === PHASE 2: Logo Reveal — CSS animated === */}
      <div
        className="relative z-10"
        style={{
          opacity: phase === 'logo' || phase === 'text' || phase === 'ripple' ? 1 : phase === 'fadeOut' ? 0 : 0,
          transform: phase === 'logo' || phase === 'text' || phase === 'ripple'
            ? 'scale(1) blur(0px)'
            : phase === 'fadeOut'
            ? 'scale(0.3) translateY(-200px) blur(5px)'
            : 'scale(0.8) blur(10px)',
          filter: phase === 'logo' || phase === 'text' || phase === 'ripple'
            ? 'brightness(1)'
            : 'brightness(3)',
          transition: phase === 'fadeOut'
            ? 'all 1.2s cubic-bezier(0.65, 0.05, 0, 1)'
            : 'all 1.5s cubic-bezier(0.65, 0.05, 0, 1)',
        }}
      >
        {/* Logo shimmer overlay */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            opacity: (phase === 'logo' || phase === 'text') ? 1 : 0,
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,223,100,0.3) 45%, rgba(255,223,100,0.6) 50%, rgba(255,223,100,0.3) 55%, transparent 60%)',
            backgroundSize: '200% 100%',
            animation: (phase === 'logo' || phase === 'text') ? 'shimmer 2s ease-in-out' : 'none',
            transition: 'opacity 0.5s ease',
          }}
        />

        <Image
          src="/harmens-logo-tran.png"
          alt="HARMENS"
          width={180}
          height={180}
          className="relative z-10"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.3))',
          }}
          priority
        />
      </div>

      {/* === PHASE 3: Text Reveal — CSS animated === */}
      {/* Arabic Text */}
      <div
        className="relative z-10 mt-6 flex items-center justify-center"
        style={{
          opacity: (phase === 'text' || phase === 'ripple') ? 1 : 0,
          transform: (phase === 'text' || phase === 'ripple') ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.8s cubic-bezier(0.65, 0.05, 0, 1)',
        }}
      >
        {arabicText.split('').map((char, index) => (
          <span
            key={`ar-${index}`}
            className="text-xl md:text-2xl tracking-wider"
            style={{
              color: '#D4AF37',
              textShadow: '0 0 10px rgba(212,175,55,0.3)',
              direction: 'rtl',
              opacity: phase === 'text' ? 1 : 0,
              transform: phase === 'text' ? 'translateY(0)' : 'translateY(15px)',
              transition: `opacity 0.4s ease ${3 + index * 0.04}s, transform 0.4s ease ${3 + index * 0.04}s`,
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* English Text - Letter by letter */}
      <div
        className="relative z-10 mt-3 flex items-center justify-center"
        style={{
          opacity: (phase === 'text' || phase === 'ripple') ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        {englishText.split('').map((char, index) => (
          <span
            key={`en-${index}`}
            className="text-sm md:text-base tracking-[0.35em] uppercase"
            style={{
              color: '#A0AEC0',
              display: 'inline-block',
              opacity: phase === 'text' ? 1 : 0,
              transform: phase === 'text' ? 'translateY(0) blur(0px)' : 'translateY(10px) blur(4px)',
              filter: phase === 'text' ? 'blur(0px)' : 'blur(4px)',
              transition: `all 0.5s ease ${3.3 + index * 0.05}s`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* === PHASE 4: Golden Ripple Effect — CSS animated === */}
      {phase === 'ripple' && (
        <>
          {[0, 1, 2].map((i) => (
            <div
              key={`ripple-${i}`}
              className="absolute z-5 rounded-full"
              style={{
                width: 0,
                height: 0,
                border: '1px solid rgba(212, 175, 55, 0.2)',
                animation: `ripple-expand 2s ease-out ${i * 0.3}s forwards`,
              }}
            />
          ))}
        </>
      )}

      {/* === PHASE 4.5: Scattered Golden Particles — CSS animated === */}
      {phase === 'ripple' && (
        <>
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * Math.PI * 2;
            const distance = 150 + Math.random() * 200;
            return (
              <div
                key={`particle-${i}`}
                className="absolute z-10 w-1 h-1 rounded-full"
                style={{
                  background: '#D4AF37',
                  boxShadow: '0 0 6px rgba(212,175,55,0.6)',
                  animation: `particle-drift 1.5s ease-out ${4.5 + Math.random() * 0.5}s forwards`,
                  '--drift-x': `${Math.cos(angle) * distance}px`,
                  '--drift-y': `${Math.sin(angle) * distance}px`,
                } as React.CSSProperties}
              />
            );
          })}
        </>
      )}

      {/* === BOTTOM: Progress Line — CSS animated === */}
      <div
        className="absolute bottom-0 left-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #D4AF37, #25A2DC, transparent)',
          animation: 'line-draw 6.5s linear forwards',
        }}
      />
    </div>
  );
}
