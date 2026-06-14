'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface IntroAnimationProps {
  onComplete: () => void;
}

/**
 * Simple Logo Reveal — minimal loading screen
 * Background: #13140f | Logo fades in, holds 2s, then fades out
 */
export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');

  useEffect(() => {
    // Phase 1: Logo fades in (0ms → 600ms)
    const enterTimer = setTimeout(() => {
      setPhase('hold');
    }, 600);

    // Phase 2: Logo holds (600ms → 2000ms)
    const holdTimer = setTimeout(() => {
      setPhase('exit');
    }, 2000);

    // Phase 3: Fade out complete → notify parent (2000ms → 2600ms)
    const exitTimer = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        backgroundColor: '#13140f',
        opacity: phase === 'exit' ? 0 : 1,
        transition: 'opacity 0.6s ease-out',
        pointerEvents: 'all',
      }}
    >
      <div
        style={{
          opacity: phase === 'enter' ? 0 : 1,
          transform: phase === 'enter' ? 'scale(0.95)' : 'scale(1)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        }}
      >
        <Image
          src="/rouqy-logo-green.png"
          alt="ROUQY"
          width={160}
          height={136}
          className="w-28 h-24 md:w-40 md:h-34 object-contain"
          priority
        />
      </div>
    </div>
  );
}
