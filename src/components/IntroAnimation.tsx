'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<'glow' | 'letters' | 'tagline' | 'fadeOut' | 'done'>('glow');

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Phase 1: Glow appears (0-0.8s)
    timers.push(setTimeout(() => setPhase('letters'), 800));

    // Phase 2: Letters appear one by one (0.8-2.8s)
    timers.push(setTimeout(() => setPhase('tagline'), 2800));

    // Phase 3: Tagline appears (2.8-3.8s)
    timers.push(setTimeout(() => setPhase('fadeOut'), 3800));

    // Phase 4: Fade out (3.8-4.5s)
    timers.push(setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 4500));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const brandName = 'HARMENS';
  const tagline = "Designed To Be Felt Before It's Seen";

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#161E2D]"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.65, 0.05, 0, 1] }}
      >
        {/* Background glow */}
        <motion.div
          className="absolute"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: phase === 'fadeOut' ? 0 : [0, 0.6, 0.4],
            scale: phase === 'fadeOut' ? 2 : [0.5, 1.2, 1],
          }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37, 162, 220, 0.3) 0%, rgba(37, 162, 220, 0.05) 50%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Brand name letters */}
        <div className="relative z-10 flex items-center justify-center">
          {brandName.split('').map((char, index) => (
            <motion.span
              key={index}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={
                phase === 'fadeOut'
                  ? { opacity: 0, y: -20, filter: 'blur(5px)' }
                  : {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      textShadow: [
                        '0 0 0px transparent',
                        '0 0 20px rgba(37, 162, 220, 0.8), 0 0 40px rgba(37, 162, 220, 0.4), 0 0 80px rgba(37, 162, 220, 0.2)',
                        '0 0 4px rgba(37, 162, 220, 0.3)',
                      ],
                    }
              }
              transition={{
                duration: 0.6,
                delay: phase === 'fadeOut' ? index * 0.03 : 0.8 + index * 0.1,
                ease: [0.65, 0.05, 0, 1],
                textShadow: {
                  duration: 2,
                  delay: 0.8 + index * 0.1,
                },
              }}
              style={{
                color: '#FFFFFF',
                display: 'inline-block',
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          className="relative z-10 mt-6 text-sm md:text-base lg:text-lg tracking-[0.3em] uppercase text-[#A0AEC0]"
          initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
          animate={
            phase === 'fadeOut'
              ? { opacity: 0, y: -10 }
              : phase === 'tagline' || phase === 'fadeOut'
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 15 }
          }
          transition={{ duration: 0.8, ease: [0.65, 0.05, 0, 1] }}
        >
          {tagline}
        </motion.p>

        {/* Bottom progress line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-[#25A2DC]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 4.2, ease: 'linear' }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
