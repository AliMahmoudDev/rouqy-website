'use client';

import { useRef, useEffect, useState } from 'react';

/**
 * 3D Section Reveal
 * 
 * As sections scroll into view, they "unfold" from a 3D rotated state
 * into their flat final position — like architectural blueprints unfolding.
 * 
 * The effect: starts with rotateX(8deg) + slight perspective push,
 * then smoothly transitions to rotateX(0) as the section enters view.
 * 
 * Performance: IntersectionObserver triggers CSS transition once.
 * No continuous JS — purely CSS transition after trigger.
 */

interface SectionReveal3DProps {
  children: React.ReactNode;
  className?: string;
  rotateX?: number;       // Starting X rotation (default: 8)
  rotateY?: number;       // Starting Y rotation (default: 0)
  translateZ?: number;    // Starting Z translation (default: -60)
  duration?: number;      // Transition duration in ms (default: 1200)
  delay?: number;         // Transition delay in ms (default: 0)
  threshold?: number;     // IntersectionObserver threshold (default: 0.1)
}

export default function SectionReveal3D({
  children,
  className = '',
  rotateX = 8,
  rotateY = 0,
  translateZ = -60,
  duration = 1200,
  delay = 0,
  threshold = 0.1,
}: SectionReveal3DProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold, rootMargin: '0px 0px -80px 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={sectionRef}
      className={`section-reveal-3d ${className}`}
      style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 0%',
      }}
    >
      <div
        className="section-reveal-3d-inner"
        style={{
          transform: revealed
            ? 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)'
            : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(0.98)`,
          opacity: revealed ? 1 : 0,
          transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity ${duration * 0.6}ms ease ${delay}ms`,
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          transformOrigin: '50% 0%',
        }}
      >
        {children}
      </div>
    </div>
  );
}
