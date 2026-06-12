'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface IntroAnimationProps {
  onComplete: () => void;
}

/**
 * 🎬 HARMENS Cinematic Intro - "The Golden Thread"
 * 
 * Phase 1 (0-1.5s): Black screen → golden glow appears → grows
 * Phase 2 (1.5-3s): Logo fades in with golden shimmer
 * Phase 3 (3-4.5s): Arabic + English text appear letter by letter
 * Phase 4 (4.5-6s): Golden ripple → logo shrinks to navbar position
 * Phase 5 (6-7s): Everything fades out → hero emerges
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
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0F18] overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: [0.65, 0.05, 0, 1] }}
      >
        {/* === BACKGROUND: Subtle animated grain/noise === */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '128px',
          }}
        />

        {/* === PHASE 1: Golden Glow === */}
        <motion.div
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: phase === 'fadeOut' ? 0 : [0, 0, 0.8, 0.5, 0.3],
            scale: phase === 'fadeOut' ? 3 : [0, 0.3, 1, 1.5, 2],
          }}
          transition={{ duration: 3, ease: 'easeOut' }}
          style={{
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(212,175,55,0.1) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Secondary ambient glow */}
        <motion.div
          className="absolute"
          initial={{ opacity: 0 }}
          animate={{
            opacity: phase === 'fadeOut' ? 0 : [0, 0.3, 0.15],
          }}
          transition={{ duration: 2, delay: 0.5 }}
          style={{
            width: 900,
            height: 400,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse, rgba(37,162,220,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* === PHASE 2: Logo Reveal with Golden Shimmer === */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.8, filter: 'brightness(3) blur(10px)' }}
          animate={
            phase === 'fadeOut'
              ? { opacity: 0, scale: 0.3, y: -200, filter: 'blur(5px)' }
              : phase === 'logo' || phase === 'text' || phase === 'ripple'
              ? {
                  opacity: 1,
                  scale: 1,
                  filter: [
                    'brightness(3) blur(10px)',
                    'brightness(2) blur(5px)',
                    'brightness(1.2) blur(0px)',
                    'brightness(1) blur(0px)',
                  ],
                }
              : { opacity: 0, scale: 0.8, filter: 'brightness(3) blur(10px)' }
          }
          transition={{
            duration: phase === 'fadeOut' ? 1.2 : 1.5,
            ease: [0.65, 0.05, 0, 1],
          }}
        >
          {/* Logo shimmer overlay */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={
              phase === 'logo' || phase === 'text'
                ? { opacity: [0, 1, 0] }
                : { opacity: 0 }
            }
            transition={{ duration: 2, delay: 0.5 }}
            style={{
              background:
                'linear-gradient(105deg, transparent 40%, rgba(255,223,100,0.3) 45%, rgba(255,223,100,0.6) 50%, rgba(255,223,100,0.3) 55%, transparent 60%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s ease-in-out',
            }}
          />

          <Image
            src="/harmens-logo-tran.png"
            alt="HARMENS"
            width={180}
            height={180}
            className="relative z-10 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            priority
          />
        </motion.div>

        {/* === PHASE 3: Text Reveal === */}
        {/* Arabic Text */}
        <motion.div
          className="relative z-10 mt-6 flex items-center justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={
            phase === 'fadeOut'
              ? { opacity: 0, y: -30 }
              : phase === 'text' || phase === 'ripple'
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 10 }
          }
          transition={{ duration: 0.8, ease: [0.65, 0.05, 0, 1] }}
        >
          {arabicText.split('').map((char, index) => (
            <motion.span
              key={`ar-${index}`}
              className="text-xl md:text-2xl tracking-wider"
              initial={{ opacity: 0, y: 15 }}
              animate={
                phase === 'fadeOut'
                  ? { opacity: 0 }
                  : { opacity: 1, y: 0 }
              }
              transition={{
                duration: 0.4,
                delay: phase === 'text' ? 3 + index * 0.04 : 0,
                ease: [0.65, 0.05, 0, 1],
              }}
              style={{
                color: '#D4AF37',
                textShadow: '0 0 10px rgba(212,175,55,0.3)',
                direction: 'rtl',
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* English Text - Letter by letter */}
        <motion.div
          className="relative z-10 mt-3 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={
            phase === 'fadeOut'
              ? { opacity: 0, y: -20 }
              : phase === 'text' || phase === 'ripple'
              ? { opacity: 1 }
              : { opacity: 0 }
          }
          transition={{ duration: 0.5 }}
        >
          {englishText.split('').map((char, index) => (
            <motion.span
              key={`en-${index}`}
              className="text-sm md:text-base tracking-[0.35em] uppercase"
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={
                phase === 'fadeOut'
                  ? { opacity: 0 }
                  : { opacity: 1, y: 0, filter: 'blur(0px)' }
              }
              transition={{
                duration: 0.5,
                delay: phase === 'text' ? 3.3 + index * 0.05 : 0,
                ease: [0.65, 0.05, 0, 1],
              }}
              style={{
                color: '#A0AEC0',
                display: 'inline-block',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.div>

        {/* === PHASE 4: Golden Ripple Effect === */}
        {phase === 'ripple' && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`ripple-${i}`}
                className="absolute z-5 rounded-full border border-[#D4AF37]/20"
                initial={{ width: 0, height: 0, opacity: 0.6 }}
                animate={{
                  width: [0, 400 + i * 200],
                  height: [0, 400 + i * 200],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  ease: 'easeOut',
                }}
                style={{
                  borderStyle: 'solid',
                  borderWidth: '1px',
                  borderColor: 'rgba(212, 175, 55, 0.2)',
                }}
              />
            ))}
          </>
        )}

        {/* === PHASE 4.5: Scattered Golden Particles === */}
        {phase === 'ripple' && (
          <>
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              const distance = 150 + Math.random() * 200;
              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute z-10 w-1 h-1 rounded-full"
                  style={{
                    background: '#D4AF37',
                    boxShadow: '0 0 6px rgba(212,175,55,0.6)',
                  }}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 4.5 + Math.random() * 0.5,
                    ease: 'easeOut',
                  }}
                />
              );
            })}
          </>
        )}

        {/* === BOTTOM: Progress Line === */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px]"
          style={{
            background:
              'linear-gradient(90deg, transparent, #D4AF37, #25A2DC, transparent)',
          }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 6.5, ease: 'linear' }}
        />

        {/* CSS for shimmer */}
        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}
