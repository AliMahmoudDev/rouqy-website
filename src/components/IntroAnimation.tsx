'use client';

import { useEffect, useState, useRef } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

/**
 * Logo Draw Animation — The logo "draws itself" on screen
 * 
 * Phase 1 (0-3s): Logo is progressively revealed with a drawing/painting effect
 *                  A glowing "pen tip" moves across revealing the logo
 * Phase 2 (3-4s): Logo is fully visible, hold
 * Phase 3 (4-4.6s): Everything fades out → hero appears
 */
export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<'drawing' | 'hold' | 'exit'>('drawing');
  const [drawProgress, setDrawProgress] = useState(0);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    // Drawing phase: 0 → 3 seconds
    const DRAW_DURATION = 3000;
    const HOLD_DURATION = 1000;
    const EXIT_DURATION = 600;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      if (elapsed < DRAW_DURATION) {
        // Phase 1: Drawing — ease-out for natural feel (starts fast, slows at end)
        const raw = elapsed / DRAW_DURATION;
        const eased = 1 - Math.pow(1 - raw, 2.5); // ease-out cubic-ish
        setDrawProgress(eased);
        animRef.current = requestAnimationFrame(animate);
      } else if (elapsed < DRAW_DURATION + 200) {
        // Snap to fully drawn
        setDrawProgress(1);
        setPhase('hold');
        animRef.current = requestAnimationFrame(animate);
      } else if (elapsed < DRAW_DURATION + HOLD_DURATION) {
        // Hold phase
        animRef.current = requestAnimationFrame(animate);
      } else if (elapsed < DRAW_DURATION + HOLD_DURATION + EXIT_DURATION) {
        // Exit phase
        setPhase('exit');
        animRef.current = requestAnimationFrame(animate);
      } else {
        // Done
        onComplete();
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [onComplete]);

  // Calculate the "pen tip" position based on draw progress
  // Arabic calligraphy draws roughly from right to left, top to bottom
  // We'll use a diagonal reveal path that follows this direction
  const penX = 100 - drawProgress * 120; // moves from right side to left
  const penY = 30 + drawProgress * 50;   // moves slightly downward

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
      {/* Logo container with progressive reveal */}
      <div className="relative">
        {/* The actual logo image */}
        <div
          style={{
            width: '160px',
            height: '136px',
            overflow: 'hidden',
            position: 'relative',
          }}
          className="md:w-52 md:h-44"
        >
          {/* Full logo — clipped by the drawing progress */}
          <img
            src="/rouqy-logo-green.png"
            alt="ROUQY"
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              clipPath: `inset(0 ${Math.max(0, (1 - drawProgress) * 100)}% 0 0)`,
              WebkitClipPath: `inset(0 ${Math.max(0, (1 - drawProgress) * 100)}% 0 0)`,
            }}
          />

          {/* Soft edge gradient on the reveal boundary — creates a "brush stroke" feel */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{
              right: `${Math.max(0, (1 - drawProgress) * 100)}%`,
              width: '30px',
              transform: 'translateX(50%)',
              background: 'linear-gradient(to right, transparent, #13140f)',
              opacity: drawProgress > 0.02 && drawProgress < 0.98 ? 1 : 0,
              transition: 'opacity 0.2s',
            }}
          />
        </div>

        {/* Glowing pen tip — follows the drawing edge */}
        {drawProgress > 0.01 && drawProgress < 0.99 && (
          <div
            className="absolute pointer-events-none"
            style={{
              right: `${Math.max(0, (1 - drawProgress) * 100)}%`,
              top: '50%',
              transform: 'translate(50%, -50%)',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(143,191,168,0.9) 0%, rgba(29,55,45,0.6) 40%, transparent 70%)',
              boxShadow: '0 0 20px rgba(143,191,168,0.5), 0 0 40px rgba(29,55,45,0.3)',
              transition: 'opacity 0.3s',
            }}
          />
        )}
      </div>

      {/* Subtle ambient glow behind the logo as it draws */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(29,55,45,0.08) 0%, transparent 70%)',
          opacity: drawProgress * 0.8,
          filter: 'blur(40px)',
          transition: 'opacity 0.5s',
        }}
      />
    </div>
  );
}
