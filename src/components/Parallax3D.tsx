'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * 3D Parallax Depth Effect
 * 
 * Creates a multi-layer parallax system where different elements
 * move at different speeds on scroll, producing a true 3D depth feel.
 * 
 * Performance: Uses requestAnimationFrame + CSS transforms (GPU-accelerated)
 * No layout thrashing — reads scroll once, applies transforms via style
 */

interface ParallaxLayer {
  id: string;
  speed: number;      // -1 to 1, negative = moves opposite direction
  zDepth: number;     // Z-index depth for perspective layering
  children: React.ReactNode;
  className?: string;
}

interface Parallax3DProps {
  layers: ParallaxLayer[];
  perspective?: number;
}

export default function Parallax3D({ layers, perspective = 1200 }: Parallax3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>(0);
  const tickingRef = useRef(false);

  useEffect(() => {
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
  }, []);

  return (
    <div
      ref={containerRef}
      className="parallax-3d-container"
      style={{
        perspective: `${perspective}px`,
        perspectiveOrigin: '50% 50%',
      }}
    >
      {layers.map((layer) => {
        const yOffset = scrollY * layer.speed * 0.3;
        const zTranslate = layer.zDepth * 0.5;
        const scale = 1 + layer.zDepth * 0.005;
        const opacity = 1 - Math.abs(layer.zDepth) * 0.01;

        return (
          <div
            key={layer.id}
            className={`parallax-3d-layer ${layer.className || ''}`}
            style={{
              transform: `translate3d(0, ${yOffset}px, ${zTranslate}px) scale(${scale})`,
              opacity: Math.max(0.3, opacity),
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
          >
            {layer.children}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Standalone hook for 3D parallax scroll transform
 * Can be used directly in any component for custom parallax effects
 */
export function useParallax3D(speed: number = 0.5) {
  const [transform, setTransform] = useState('');
  const rafRef = useRef<number>(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        rafRef.current = requestAnimationFrame(() => {
          const y = window.scrollY * speed * 0.3;
          setTransform(`translate3d(0, ${y}px, 0)`);
          tickingRef.current = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return transform;
}
