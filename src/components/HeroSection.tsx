'use client';

import { useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import useParallax3D from '@/hooks/useParallax3D';

// Dynamic import for 3D Text Split (client-only)
const TextSplit3D = dynamic(() => import('@/components/TextSplit3D'), { ssr: false });
const RotatingShowcase3D = dynamic(() => import('@/components/RotatingShowcase3D'), { ssr: false });

interface HeroSectionProps {
  introComplete: boolean;
}

// Deterministic pseudo-random for SSR consistency
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/* Minimal floating particles — just a few gold dots for luxury feel */
function FloatingParticles() {
  const goldParticles = Array.from({ length: 3 }).map((_, i) => ({
    width: 1.5 + seededRandom(i * 7 + 1) * 2,
    height: 1.5 + seededRandom(i * 7 + 1) * 2,
    left: seededRandom(i * 11 + 2) * 100,
    top: seededRandom(i * 13 + 3) * 100,
    duration: 10 + seededRandom(i * 17 + 4) * 15,
    delay: seededRandom(i * 19 + 5) * 8,
  }));
  const sparkleParticles = Array.from({ length: 2 }).map((_, i) => ({
    left: 15 + seededRandom(i * 43 + 11) * 70,
    top: 20 + seededRandom(i * 47 + 12) * 60,
    duration: 3 + seededRandom(i * 53 + 13) * 4,
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
            boxShadow: '0 0 6px rgba(212,175,55,0.3)',
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: 0,
            animation: `particle-rise ${p.duration}s linear infinite`,
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
            boxShadow: '0 0 6px rgba(255,255,255,0.4)',
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

export default function HeroSection({ introComplete }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useParallax3D<HTMLElement>();
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
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
      ref={(node) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
        (parallaxRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.15 }}
          preload="auto"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="video-bg-overlay" />
      </div>

      {/* Subtle ambient gradient — single soft glow only */}
      <div className="hero-gradient-bg" />

      {/* Top gradient for smooth blend into nav */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#13140f] to-transparent z-10 pointer-events-none" />

      {/* Bottom gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 md:h-56 bg-gradient-to-t from-[#13140f] via-[#13140f]/70 to-transparent z-10 pointer-events-none" />

      {/* Minimal floating particles */}
      <FloatingParticles />

      {/* Single subtle ambient orb — no clutter */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none z-[1]">
          <div
            className="absolute rounded-full"
            style={{
              width: 500,
              height: 500,
              top: '20%',
              right: '-10%',
              background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 350,
              height: 350,
              bottom: '10%',
              left: '-5%',
              background: 'radial-gradient(circle, rgba(29,55,45,0.04) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>
      )}

      {/* ====== MAIN CONTENT AREA — Two-column on desktop ====== */}
      <div
        className="relative z-20 w-full max-w-7xl mx-auto px-5 md:px-12 lg:px-16 gpu-accelerated"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4 min-h-screen py-28 md:py-32">

          {/* ====== LEFT COLUMN — Text Content ====== */}
          <div className="flex-1 text-center lg:text-left lg:max-w-[55%]">

            {/* Logo — smaller, elegant */}
            <div className={`mb-4 md:mb-6 flex justify-center lg:justify-start ${mounted ? 'hero-enter-logo' : 'opacity-0'}`}>
              <div className="relative">
                <div className="hero-logo-glow" />
                <Image
                  src="/harmens-logo-tran.png"
                  alt="HARMENS"
                  width={100}
                  height={100}
                  className="relative z-10 w-16 h-16 md:w-24 md:h-24"
                  priority
                />
              </div>
            </div>

            {/* Brand Name — reduced size for better balance */}
            <h1
              className={`text-4xl sm:text-5xl md:text-7xl lg:text-[96px] font-bold tracking-tight text-white uppercase leading-[0.92] ${
                mounted ? 'hero-enter-title' : 'opacity-0'
              }`}
            >
              <TextSplit3D
                text="HARMENS"
                mode="entrance"
                staggerDelay={80}
                entranceDuration={1000}
                letterClassName="text-4xl sm:text-5xl md:text-7xl lg:text-[96px] font-bold tracking-tight text-white uppercase"
              />
            </h1>

            {/* Decorative line */}
            <div className={`mx-auto lg:mx-0 mt-5 md:mt-6 ${mounted ? 'hero-enter-line' : 'opacity-0'}`}>
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent lg:bg-gradient-to-r lg:from-[#D4AF37] lg:via-[#D4AF37] lg:to-transparent" style={{ width: '80px' }} />
            </div>

            {/* Tagline — more readable, solid color */}
            <p
              className={`mt-4 md:mt-6 text-sm md:text-base lg:text-lg tracking-[0.2em] md:tracking-[0.3em] uppercase font-light px-2 ${
                mounted ? 'hero-enter-tagline' : 'opacity-0'
              }`}
              style={{
                color: '#C8D0DC',
                textShadow: '0 0 30px rgba(212,175,55,0.1)',
              }}
            >
              Designed To Be Felt Before It&apos;s Seen
            </p>

            {/* Sub-tagline — slightly more visible */}
            <p
              className={`mt-2 text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] font-light px-4 ${
                mounted ? 'hero-enter-tagline' : 'opacity-0'
              }`}
              style={{
                color: 'rgba(160,174,192,0.55)',
                animationDelay: '1.2s',
              }}
            >
              Crafting Timeless Luxury Interiors
            </p>

            {/* CTA Button — premium styling */}
            <div className={`mt-6 md:mt-10 flex justify-center lg:justify-start ${mounted ? 'hero-enter-cta' : 'opacity-0'}`}>
              <a
                href="#portfolio-gallery"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('portfolio-gallery');
                  if (target) {
                    const yOffset = -window.innerHeight * 0.3;
                    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className="group relative inline-flex items-center gap-3 px-6 py-3 md:px-7 md:py-3.5 text-[10px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] uppercase font-normal transition-all duration-500 overflow-hidden"
                style={{
                  color: '#C8D0DC',
                  border: '1px solid rgba(212,175,55,0.25)',
                  background: 'rgba(212,175,55,0.03)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.6)';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.background = 'rgba(212,175,55,0.08)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(212,175,55,0.1), inset 0 0 20px rgba(212,175,55,0.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)';
                  e.currentTarget.style.color = '#C8D0DC';
                  e.currentTarget.style.background = 'rgba(212,175,55,0.03)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span>Explore Our Work</span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m4-4l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* ====== RIGHT COLUMN — 3D Showcase ====== */}
          <div className={`flex-1 flex justify-center lg:justify-end lg:max-w-[45%] ${mounted ? 'hero-enter-cta' : 'opacity-0'}`}>
            {/* Desktop: full size showcase */}
            <div className="hidden lg:block" style={{ transform: 'scale(0.85)', transformOrigin: 'center center' }}>
              <RotatingShowcase3D />
            </div>
            {/* Mobile/Tablet: smaller showcase below content */}
            <div className="lg:hidden mt-4 md:mt-6 flex justify-center" style={{ transform: 'scale(0.5)', transformOrigin: 'top center' }}>
              <RotatingShowcase3D />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 ${mounted ? 'hero-enter-scroll' : 'opacity-0'}`}>
        <span className="text-[#A0AEC0]/40 text-[9px] tracking-[0.5em] uppercase">
          Scroll
        </span>
        <div style={{ animation: 'bounce-slow 2s ease-in-out infinite' }}>
          <svg className="w-3.5 h-3.5 text-[#8fbfa8]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
