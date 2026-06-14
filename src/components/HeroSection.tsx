'use client';

import { useState, useEffect } from 'react';

interface HeroSectionProps {
  introComplete: boolean;
}

/**
 * ROUQY Hero Section — Minimal, elegant, matches reference design
 * 
 * Layout:
 * - Full viewport black background
 * - Top: ROUQY icon logo (left) + nav links (right)
 * - Center: Large "ROUQY" text (SVG for future animation capability)
 * - Bottom: Thin decorative vertical line
 */
export default function HeroSection({ introComplete }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (introComplete) {
      const timer = setTimeout(() => setMounted(true), 50);
      return () => clearTimeout(timer);
    }
  }, [introComplete]);

  if (!introComplete) return null;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#13140f]"
    >
      {/* ====== MAIN CONTENT ====== */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center">
        
        {/* Center: Large ROUQY text — SVG for future animation */}
        <div
          className={`transition-all duration-1000 ease-out ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <img
            src="/rouqy-text-white.svg"
            alt="ROUQY"
            className="w-[70vw] max-w-[900px] md:w-[60vw] lg:w-[50vw] object-contain"
            style={{
              filter: 'drop-shadow(0 0 60px rgba(255,255,255,0.03))',
            }}
          />
        </div>

        {/* Bottom: Decorative vertical line */}
        <div
          className={`absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="w-[1px] h-16 md:h-20 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
