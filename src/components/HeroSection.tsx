'use client';

import { useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for 3D Text Split (client-only)
const TextSplit3D = dynamic(() => import('@/components/TextSplit3D'), { ssr: false });

interface HeroSectionProps {
  introComplete: boolean;
}

// Deterministic pseudo-random for SSR consistency
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/* CSS-only floating particles — deterministic values — REDUCED for performance & mobile */
function FloatingParticles() {
  const goldParticles = Array.from({ length: 4 }).map((_, i) => ({
    width: 2 + seededRandom(i * 7 + 1) * 3,
    height: 2 + seededRandom(i * 7 + 1) * 3,
    left: seededRandom(i * 11 + 2) * 100,
    top: seededRandom(i * 13 + 3) * 100,
    duration: 8 + seededRandom(i * 17 + 4) * 12,
    delay: seededRandom(i * 19 + 5) * 10,
  }));
  const blueParticles = Array.from({ length: 3 }).map((_, i) => ({
    width: 1.5 + seededRandom(i * 23 + 6) * 2,
    height: 1.5 + seededRandom(i * 23 + 6) * 2,
    left: seededRandom(i * 29 + 7) * 100,
    top: seededRandom(i * 31 + 8) * 100,
    duration: 10 + seededRandom(i * 37 + 9) * 15,
    delay: seededRandom(i * 41 + 10) * 10,
  }));
  const sparkleParticles = Array.from({ length: 2 }).map((_, i) => ({
    left: 10 + seededRandom(i * 43 + 11) * 80,
    top: 10 + seededRandom(i * 47 + 12) * 80,
    duration: 2 + seededRandom(i * 53 + 13) * 3,
    delay: seededRandom(i * 59 + 14) * 5,
  }));

  return (
    <div className="hero-particles">
      {goldParticles.map((p, i) => (
        <div
          key={`gold-${i}`}
          className="hero-particle"
          style={{
            width: `${p.width}px`,
            height: `${p.height}px`,
            background: '#D4AF37',
            boxShadow: '0 0 6px rgba(212,175,55,0.4)',
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: 0,
            animation: `particle-rise ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      {blueParticles.map((p, i) => (
        <div
          key={`blue-${i}`}
          className="hero-particle"
          style={{
            width: `${p.width}px`,
            height: `${p.height}px`,
            background: '#25A2DC',
            boxShadow: '0 0 4px rgba(37,162,220,0.3)',
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: 0,
            animation: `particle-fall ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      {sparkleParticles.map((p, i) => (
        <div
          key={`spark-${i}`}
          className="hero-particle"
          style={{
            width: '2px',
            height: '2px',
            background: '#FFFFFF',
            boxShadow: '0 0 8px rgba(255,255,255,0.5)',
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: 0,
            animation: `sparkle ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* 
 * Smooth decorative elements — ALL CSS-driven, zero JS
 * 
 * Key principles:
 * - translate3d() forces GPU compositing = no repaints = no lag
 * - Longer durations (20-40s) = smoother perceived motion
 * - ease-in-out curves = organic, non-robotic movement
 * - No DOM queries in scroll handlers
 */

/* Orbiting rings — smooth continuous rotation with GPU layers */
function OrbitingRings() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Large gold ring */}
      <div
        className="absolute hero-orbit-ring"
        style={{
          width: '500px',
          height: '500px',
          top: '50%',
          left: '50%',
          marginTop: '-250px',
          marginLeft: '-250px',
          border: '1px solid rgba(212,175,55,0.08)',
          borderRadius: '50%',
          animation: 'hero-orbit 40s linear infinite',
        }}
      >
        <div
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: '#D4AF37',
            boxShadow: '0 0 10px rgba(212,175,55,0.5)',
            top: '-4px',
            left: '50%',
            marginLeft: '-4px',
          }}
        />
      </div>
      {/* Medium blue ring */}
      <div
        className="absolute hero-orbit-ring"
        style={{
          width: '350px',
          height: '350px',
          top: '50%',
          left: '50%',
          marginTop: '-175px',
          marginLeft: '-175px',
          border: '1px solid rgba(37,162,220,0.06)',
          borderRadius: '50%',
          animation: 'hero-orbit-reverse 35s linear infinite',
        }}
      >
        <div
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: '#25A2DC',
            boxShadow: '0 0 8px rgba(37,162,220,0.4)',
            top: '-3px',
            left: '50%',
            marginLeft: '-3px',
          }}
        />
      </div>
      {/* Small gold ring */}
      <div
        className="absolute hero-orbit-ring"
        style={{
          width: '200px',
          height: '200px',
          top: '50%',
          left: '50%',
          marginTop: '-100px',
          marginLeft: '-100px',
          border: '1px solid rgba(212,175,55,0.05)',
          borderRadius: '50%',
          animation: 'hero-orbit 28s linear infinite',
        }}
      />
    </div>
  );
}

/* 
 * Smooth floating geometric shapes
 * Uses hero-float-smooth keyframe — long duration, gentle curves
 */
function FloatingShapes() {
  return (
    <>
      {/* Gold diamond — smooth float + gentle rotation */}
      <div
        className="absolute pointer-events-none hero-float-shape"
        style={{
          width: 60,
          height: 60,
          top: '15%',
          right: '12%',
          border: '1px solid rgba(212,175,55,0.12)',
          transform: 'rotate(45deg)',
          animation: 'hero-float-smooth 20s ease-in-out infinite',
        }}
      />
      {/* Blue circle — smooth float */}
      <div
        className="absolute pointer-events-none hero-float-shape"
        style={{
          width: 40,
          height: 40,
          bottom: '25%',
          left: '8%',
          border: '1px solid rgba(37,162,220,0.1)',
          borderRadius: '50%',
          animation: 'hero-float-smooth 25s ease-in-out infinite 3s',
        }}
      />
      {/* Small gold triangle hint — top left */}
      <div
        className="absolute pointer-events-none hero-float-shape"
        style={{
          width: 0,
          height: 0,
          top: '30%',
          left: '15%',
          borderLeft: '12px solid transparent',
          borderRight: '12px solid transparent',
          borderBottom: '20px solid rgba(212,175,55,0.06)',
          animation: 'hero-float-smooth 30s ease-in-out infinite 6s',
        }}
      />
      {/* Tiny blue dot cluster — bottom right */}
      <div
        className="absolute pointer-events-none hero-float-shape"
        style={{
          width: 8,
          height: 8,
          bottom: '35%',
          right: '18%',
          background: 'rgba(37,162,220,0.08)',
          borderRadius: '50%',
          animation: 'hero-float-smooth 22s ease-in-out infinite 1.5s',
        }}
      />
    </>
  );
}

export default function HeroSection({ introComplete }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Framer Motion handles content parallax only (1 element, no lag)
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (introComplete) {
      const timer = setTimeout(() => setMounted(true), 50);
      return () => clearTimeout(timer);
    }
  }, [introComplete]);

  if (!introComplete) return null;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.18 }}
          preload="auto"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="video-bg-overlay" />
      </div>

      {/* Architectural blueprint grid overlay — very subtle */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.012]" style={{
        backgroundImage: `
          linear-gradient(rgba(37,162,220,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(37,162,220,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '120px 120px',
      }} />

      {/* Animated gradient mesh background */}
      <div className="hero-gradient-bg" />

      {/* Noise texture overlay */}
      <div className="noise-overlay absolute inset-0 pointer-events-none z-[1]" />

      {/* Top gradient for smooth blend */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0B0F18] to-transparent z-10 pointer-events-none" />

      {/* Bottom gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 md:h-60 bg-gradient-to-t from-[#161E2D] via-[#161E2D]/80 to-transparent z-10 pointer-events-none" />

      {/* Floating Particles (reduced on mobile) */}
      <FloatingParticles />

      {/* 
       * Decorative layers — pure CSS, no JS scroll handler
       * Each layer uses a CSS class with will-change: transform
       * for GPU compositing. Movement is purely keyframe-driven.
       */}
      {mounted && (
        <>
          {/* Deep background layer — orbiting rings (desktop only) */}
          <div className="absolute inset-0 pointer-events-none hero-parallax-deep hidden md:block">
            <OrbitingRings />
          </div>

          {/* Mid-ground decorative orbs */}
          <div className="absolute inset-0 pointer-events-none hero-parallax-mid">
            <div
              className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full opacity-10 md:opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
                top: '10%',
                right: '-20% md:right-[-10%]',
                filter: 'blur(60px)',
                animation: 'breathe 8s ease-in-out infinite',
              }}
            />
            <div
              className="absolute w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full opacity-10 md:opacity-15"
              style={{
                background: 'radial-gradient(circle, rgba(37,162,220,0.15) 0%, transparent 70%)',
                bottom: '20%',
                left: '-10%',
                filter: 'blur(50px)',
                animation: 'breathe 7s ease-in-out infinite 1.5s',
              }}
            />
          </div>

          {/* Foreground floating shapes (desktop only) */}
          <div className="absolute inset-0 pointer-events-none hero-parallax-fg hidden lg:block">
            <FloatingShapes />
          </div>
        </>
      )}

      {/* Content - Framer only for scroll parallax on this one container */}
      <div
        className="relative z-20 text-center max-w-6xl mx-auto gpu-accelerated"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Logo */}
        <div className={`mb-6 md:mb-10 flex justify-center ${mounted ? 'hero-enter-logo' : 'opacity-0'}`}>
          <div className="relative">
            <div className="hero-logo-glow" />
            <Image
              src="/harmens-logo-tran.png"
              alt="HARMENS"
              width={120}
              height={120}
              className="relative z-10 w-24 h-24 md:w-40 md:h-40"
              priority
            />
          </div>
        </div>

        {/* Brand Name — 3D Text Split (always rendered, animates once per session) */}
        <h1
          className={`text-5xl sm:text-6xl md:text-8xl lg:text-[140px] font-bold tracking-tight text-white uppercase leading-[0.9] ${
            mounted ? 'hero-enter-title' : 'opacity-0'
          }`}
        >
          <TextSplit3D
            text="HARMENS"
            mode="entrance"
            staggerDelay={80}
            entranceDuration={1000}
            letterClassName="text-5xl sm:text-6xl md:text-8xl lg:text-[140px] font-bold tracking-tight text-white uppercase"
          />
        </h1>

        {/* Decorative line */}
        <div className={`mx-auto mt-6 md:mt-8 ${mounted ? 'hero-enter-line' : 'opacity-0'}`}>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" style={{ width: '80px', margin: '0 auto' }} />
        </div>

        {/* Tagline with text shimmer effect */}
        <p
          className={`mt-4 md:mt-8 text-sm md:text-lg lg:text-xl tracking-[0.2em] md:tracking-[0.3em] uppercase font-light px-2 ${
            mounted ? 'hero-enter-tagline' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(90deg, #A0AEC0, #FFFFFF, #A0AEC0)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: mounted ? 'text-gradient-flow 4s ease infinite 1s' : 'none',
          }}
        >
          Designed To Be Felt Before It&apos;s Seen
        </p>

        {/* Sub-tagline */}
        <p
          className={`mt-2 text-[10px] md:text-sm tracking-[0.15em] md:tracking-[0.2em] text-[#A0AEC0]/50 font-light px-4 ${
            mounted ? 'hero-enter-tagline' : 'opacity-0'
          }`}
          style={{ animationDelay: '1.2s' }}
        >
          Crafting Timeless Luxury Interiors
        </p>

        {/* CTA Button */}
        <div className={`mt-8 md:mt-14 ${mounted ? 'hero-enter-cta' : 'opacity-0'}`}>
          <a
            href="#portfolio"
            className="cta-animated group relative inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 text-[10px] md:text-sm tracking-[0.25em] md:tracking-[0.35em] uppercase font-normal text-[#A0AEC0] border border-[#2D3A4D] hover:border-[#25A2DC] hover:text-white transition-all duration-500 hover:bg-[#25A2DC]/10"
          >
            <span>Explore Our Work</span>
            <svg
              className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m4-4l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 ${mounted ? 'hero-enter-scroll' : 'opacity-0'}`}>
        <span className="text-[#A0AEC0]/60 text-[10px] tracking-[0.5em] uppercase">
          Scroll
        </span>
        <div style={{ animation: 'bounce-slow 2s ease-in-out infinite' }}>
          <svg className="w-4 h-4 text-[#25A2DC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        <div
          className="w-[1px] h-8 relative overflow-hidden"
          style={{
            background: 'rgba(37,162,220,0.15)',
          }}
        >
          <div
            className="absolute w-full h-3 bg-[#25A2DC]"
            style={{ animation: 'particle-fall 2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
}
