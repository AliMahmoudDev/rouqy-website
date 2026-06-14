'use client';

import { useRef, useCallback, useState } from 'react';

/**
 * 3D Card Tilt Effect — Premium luxury feel
 * Tracks mouse position within card bounds and applies
 * perspective + rotateX/rotateY transforms with a glare overlay
 * 
 * Performance: Uses CSS transforms (GPU-accelerated), requestAnimationFrame for smooth updates
 * No WebGL, no lag — pure CSS 3D
 */

interface CardTilt3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;      // Max tilt in degrees (default: 8)
  glareOpacity?: number; // Glare overlay max opacity (default: 0.15)
  scale?: number;        // Scale on hover (default: 1.02)
  perspective?: number;  // CSS perspective (default: 1000)
}

export default function CardTilt3D({
  children,
  className = '',
  maxTilt = 15,
  glareOpacity = 0.3,
  scale = 1.05,
  perspective = 800,
}: CardTilt3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, background: '' });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const card = cardRef.current!;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation based on mouse position
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        setTransform(
          `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
        );

        // Glare follows mouse
        const glareAngle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
        setGlareStyle({
          opacity: glareOpacity,
          background: `linear-gradient(${glareAngle + 180}deg, rgba(255,255,255,0.25) 0%, rgba(212,175,55,0.1) 30%, rgba(29,55,45,0.05) 50%, transparent 70%)`,
        });
      });
    },
    [maxTilt, glareOpacity, scale, perspective]
  );

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setTransform('');
    setGlareStyle({ opacity: 0, background: '' });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`card-tilt-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transform || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
        transition: transform ? 'none' : 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
      {/* Glare overlay */}
      <div
        className="card-tilt-glare"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 5,
          borderRadius: 'inherit',
          opacity: glareStyle.opacity,
          background: glareStyle.background || 'transparent',
          transition: glareStyle.opacity === 0 ? 'opacity 0.4s ease' : 'none',
          mixBlendMode: 'overlay',
        }}
      />
      {/* Edge glow that follows tilt direction */}
      <div
        className="card-tilt-edge"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 4,
          borderRadius: 'inherit',
          boxShadow: transform
            ? 'inset 0 0 40px rgba(29,55,45,0.15), inset 0 0 80px rgba(212,175,55,0.08), 0 0 30px rgba(29,55,45,0.1)'
            : 'none',
          opacity: transform ? 1 : 0,
          transition: transform ? 'none' : 'opacity 0.4s ease',
        }}
      />
    </div>
  );
}
