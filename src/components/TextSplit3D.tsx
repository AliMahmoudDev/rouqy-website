'use client';

import { useEffect, useRef, useState, useMemo } from 'react';

/**
 * 3D Text Split Animation
 * 
 * Splits text into individual characters, each animated with
 * 3D rotation transforms (rotateX + rotateY + translateZ)
 * 
 * Two modes:
 * 1. "entrance" — Letters fly in from behind on mount, ONCE only
 * 2. "scroll" — Letters respond to scroll with 3D transforms
 * 
 * The entrance animation plays only on the first visit per session.
 * After completing, it locks into final position with no transitions
 * so re-mounts (scroll away and back) don't re-trigger animation.
 */

interface TextSplit3DProps {
  text: string;
  mode?: 'entrance' | 'scroll';
  className?: string;
  letterClassName?: string;
  staggerDelay?: number;    // Delay between each letter (ms)
  entranceDuration?: number; // Duration of entrance animation (ms)
  scrollIntensity?: number;  // How much scroll affects 3D rotation (0-1)
}

// Session-level flag: has the entrance animation played this session?
let entrancePlayedThisSession = false;

export default function TextSplit3D({
  text,
  mode = 'entrance',
  className = '',
  letterClassName = '',
  staggerDelay = 60,
  entranceDuration = 800,
  scrollIntensity = 0.3,
}: TextSplit3DProps) {
  // If entrance already played, skip straight to "mounted" state
  const [mounted, setMounted] = useState(() => 
    mode === 'entrance' ? entrancePlayedThisSession : false
  );
  const [locked, setLocked] = useState(() => 
    mode === 'entrance' ? entrancePlayedThisSession : false
  );
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const tickingRef = useRef(false);

  const letters = useMemo(() => text.split(''), [text]);

  useEffect(() => {
    if (mode === 'entrance' && entrancePlayedThisSession) {
      // Already played — stay locked in final position
      return;
    }

    // Trigger entrance animation after mount
    const timer = setTimeout(() => setMounted(true), 50);

    // Lock into final position after animation completes
    // (stagger delay + entrance duration + buffer)
    const totalDuration = letters.length * staggerDelay + entranceDuration + 200;
    const lockTimer = setTimeout(() => {
      setLocked(true);
      if (mode === 'entrance') {
        entrancePlayedThisSession = true;
      }
    }, totalDuration);

    return () => {
      clearTimeout(timer);
      clearTimeout(lockTimer);
    };
  }, [mode, letters.length, staggerDelay, entranceDuration]);

  useEffect(() => {
    if (mode !== 'scroll') return;

    const handleScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        rafRef.current = requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          tickingRef.current = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mode]);

  return (
    <div
      ref={containerRef}
      className={`text-split-3d ${className}`}
      style={{
        perspective: '1000px',
        perspectiveOrigin: '50% 50%',
        display: 'inline-flex',
        flexWrap: 'wrap',
      }}
    >
      {letters.map((letter, i) => {
        const isSpace = letter === ' ';

        // Entrance animation values
        const entranceRotateX = mounted ? 0 : 120 + (i % 3) * 30;
        const entranceRotateY = mounted ? 0 : (i % 2 === 0 ? -50 : 50);
        const entranceTranslateZ = mounted ? 0 : -400;
        const entranceOpacity = mounted ? 1 : 0;

        // Scroll animation values
        const normalizedScroll = scrollY * scrollIntensity * 0.005;
        const scrollRotateX = mode === 'scroll' ? normalizedScroll * (i % 2 === 0 ? 1 : -1) * 12 : 0;
        const scrollRotateY = mode === 'scroll' ? normalizedScroll * (i % 3 === 0 ? 1 : -0.5) * 6 : 0;
        const scrollTranslateZ = mode === 'scroll' ? Math.sin(normalizedScroll + i * 0.5) * 40 : 0;

        const finalRotateX = entranceRotateX + scrollRotateX;
        const finalRotateY = entranceRotateY + scrollRotateY;
        const finalTranslateZ = entranceTranslateZ + scrollTranslateZ;

        return (
          <span
            key={`${letter}-${i}`}
            className={`text-split-letter ${letterClassName}`}
            style={{
              display: 'inline-block',
              transform: `rotateX(${finalRotateX}deg) rotateY(${finalRotateY}deg) translateZ(${finalTranslateZ}px)`,
              opacity: entranceOpacity,
              // When locked: NO transition at all = no re-animation on re-mount
              // When animating: full entrance transition
              // When not yet started: no transition
              transition: locked
                ? 'none'
                : mounted
                  ? `transform ${entranceDuration}ms cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerDelay}ms, opacity ${entranceDuration * 0.6}ms ease ${i * staggerDelay}ms`
                  : 'none',
              transformStyle: 'preserve-3d',
              willChange: locked ? 'auto' : 'transform, opacity',
              backfaceVisibility: 'hidden',
              minWidth: isSpace ? '0.3em' : undefined,
            }}
          >
            {isSpace ? '\u00A0' : letter}
          </span>
        );
      })}
    </div>
  );
}
