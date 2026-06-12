'use client';

import { useEffect, useState } from 'react';

/**
 * Custom cursor glow effect that follows the mouse
 * Adds a luxurious interactive feel to the entire site
 */
export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.portfolio-card')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Main cursor glow */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          width: isHovering ? 300 : 200,
          height: isHovering ? 300 : 200,
          left: position.x - (isHovering ? 150 : 100),
          top: position.y - (isHovering ? 150 : 100),
          background: isHovering
            ? 'radial-gradient(circle, rgba(37,162,220,0.08) 0%, rgba(212,175,55,0.04) 30%, transparent 70%)'
            : 'radial-gradient(circle, rgba(37,162,220,0.04) 0%, transparent 70%)',
          transition: 'width 0.4s ease, height 0.4s ease, background 0.4s ease',
          filter: 'blur(1px)',
        }}
      />
      {/* Small precise dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          width: isHovering ? 8 : 4,
          height: isHovering ? 8 : 4,
          left: position.x - (isHovering ? 4 : 2),
          top: position.y - (isHovering ? 4 : 2),
          background: isHovering ? '#D4AF37' : '#25A2DC',
          boxShadow: isHovering
            ? '0 0 10px rgba(212,175,55,0.6), 0 0 20px rgba(212,175,55,0.3)'
            : '0 0 6px rgba(37,162,220,0.5)',
          transition: 'all 0.15s ease-out',
        }}
      />
    </>
  );
}
