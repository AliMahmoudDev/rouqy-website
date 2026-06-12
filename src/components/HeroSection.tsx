'use client';

import { useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

interface HeroSectionProps {
  introComplete: boolean;
}

/* CSS-only floating particles */
function FloatingParticles() {
  return (
    <div className="hero-particles">
      {/* Gold particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`gold-${i}`}
          className="hero-particle"
          style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            background: '#D4AF37',
            boxShadow: '0 0 6px rgba(212,175,55,0.4)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0,
            animation: `particle-rise ${8 + Math.random() * 12}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
      {/* Blue particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`blue-${i}`}
          className="hero-particle"
          style={{
            width: `${1.5 + Math.random() * 2}px`,
            height: `${1.5 + Math.random() * 2}px`,
            background: '#25A2DC',
            boxShadow: '0 0 4px rgba(37,162,220,0.3)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0,
            animation: `particle-fall ${10 + Math.random() * 15}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
      {/* Sparkle dots */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`spark-${i}`}
          className="hero-particle"
          style={{
            width: '2px',
            height: '2px',
            background: '#FFFFFF',
            boxShadow: '0 0 8px rgba(255,255,255,0.5)',
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            opacity: 0,
            animation: `sparkle ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

/* Animated decorative orbiting rings */
function OrbitingRings() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Large gold ring - orbiting */}
      <div
        className="absolute"
        style={{
          width: '500px',
          height: '500px',
          top: '50%',
          left: '50%',
          marginTop: '-250px',
          marginLeft: '-250px',
          border: '1px solid rgba(212,175,55,0.08)',
          borderRadius: '50%',
          animation: 'spin-slow 30s linear infinite',
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
      {/* Medium blue ring - orbiting reverse */}
      <div
        className="absolute"
        style={{
          width: '350px',
          height: '350px',
          top: '50%',
          left: '50%',
          marginTop: '-175px',
          marginLeft: '-175px',
          border: '1px solid rgba(37,162,220,0.06)',
          borderRadius: '50%',
          animation: 'spin-reverse-slow 25s linear infinite',
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
        className="absolute"
        style={{
          width: '200px',
          height: '200px',
          top: '50%',
          left: '50%',
          marginTop: '-100px',
          marginLeft: '-100px',
          border: '1px solid rgba(212,175,55,0.05)',
          borderRadius: '50%',
          animation: 'spin-slow 18s linear infinite',
        }}
      />
    </div>
  );
}

export default function HeroSection({ introComplete }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Only use Framer for scroll-based transforms (can't do with CSS)
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (introComplete) {
      // Small delay to trigger CSS animations
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
      {/* Video Background Layer */}
      <div className="video-bg-container">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=40"
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
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-[#161E2D] via-[#161E2D]/80 to-transparent z-10 pointer-events-none" />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Orbiting Rings */}
      <OrbitingRings />

      {/* Decorative gradient orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 animate-breathe pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
          top: '10%',
          right: '-10%',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(37,162,220,0.15) 0%, transparent 70%)',
          bottom: '20%',
          left: '-5%',
          filter: 'blur(50px)',
          animation: 'breathe 5s ease-in-out infinite 1s',
        }}
      />

      {/* Content - CSS animations, Framer only for scroll parallax */}
      <div
        className="relative z-20 text-center max-w-6xl mx-auto gpu-accelerated"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Logo */}
        <div className={`mb-8 md:mb-10 flex justify-center ${mounted ? 'hero-enter-logo' : 'opacity-0'}`}>
          <div className="relative">
            <div className="hero-logo-glow" />
            <Image
              src="/harmens-logo-tran.png"
              alt="HARMENS"
              width={120}
              height={120}
              className="relative z-10"
              priority
            />
          </div>
        </div>

        {/* Brand Name */}
        <h1
          className={`text-6xl sm:text-7xl md:text-8xl lg:text-[140px] font-bold tracking-tight text-white uppercase leading-[0.9] ${
            mounted ? 'hero-enter-title' : 'opacity-0'
          }`}
          style={{ letterSpacing: mounted ? '-0.02em' : '0.3em', transition: 'letter-spacing 1.5s cubic-bezier(0.65, 0.05, 0, 1) 0.3s' }}
        >
          HARMENS
        </h1>

        {/* Decorative line */}
        <div className={`mx-auto mt-6 md:mt-8 ${mounted ? 'hero-enter-line' : 'opacity-0'}`}>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" style={{ width: '80px', margin: '0 auto' }} />
        </div>

        {/* Tagline with text shimmer effect */}
        <p
          className={`mt-6 md:mt-8 text-base md:text-lg lg:text-xl tracking-[0.3em] uppercase font-light ${
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
          className={`mt-2 text-xs md:text-sm tracking-[0.2em] text-[#A0AEC0]/50 font-light ${
            mounted ? 'hero-enter-tagline' : 'opacity-0'
          }`}
          style={{ animationDelay: '1.2s' }}
        >
          Crafting Timeless Luxury Interiors
        </p>

        {/* CTA Button with animated border */}
        <div className={`mt-10 md:mt-14 ${mounted ? 'hero-enter-cta' : 'opacity-0'}`}>
          <a
            href="#portfolio"
            className="cta-animated group relative inline-flex items-center gap-4 px-8 py-4 text-xs md:text-sm tracking-[0.35em] uppercase font-normal text-[#A0AEC0] border border-[#2D3A4D] hover:border-[#25A2DC] hover:text-white transition-all duration-500 hover:bg-[#25A2DC]/10"
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

      {/* Scroll Indicator - CSS only */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 ${mounted ? 'hero-enter-scroll' : 'opacity-0'}`}>
        <span className="text-[#A0AEC0]/60 text-[10px] tracking-[0.5em] uppercase">
          Scroll
        </span>
        <div style={{ animation: 'bounce-slow 2s ease-in-out infinite' }}>
          <svg className="w-4 h-4 text-[#25A2DC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        {/* Animated line */}
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
