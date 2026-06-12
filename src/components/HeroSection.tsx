'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

interface HeroSectionProps {
  introComplete: boolean;
}

export default function HeroSection({ introComplete }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const logoScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);
  const logoY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Top gradient for smooth blend with nav */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0B0F18] to-transparent z-10 pointer-events-none" />

      {/* Bottom gradient for smooth transition to portfolio */}
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-[#161E2D] via-[#161E2D]/80 to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-20 text-center max-w-6xl mx-auto"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        {/* Logo in Hero */}
        <motion.div
          className="mb-8 md:mb-10 flex justify-center"
          initial={{ opacity: 0, scale: 0.5, filter: 'brightness(2) blur(10px)' }}
          animate={
            introComplete
              ? {
                  opacity: 1,
                  scale: 1,
                  filter: 'brightness(1) blur(0px)',
                }
              : {}
          }
          transition={{ duration: 1.5, ease: [0.65, 0.05, 0, 1] }}
          style={{ scale: logoScale, y: logoY }}
        >
          <div className="relative">
            {/* Glow behind logo */}
            <div
              className="absolute inset-0 blur-3xl opacity-30"
              style={{
                background:
                  'radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(37,162,220,0.2) 50%, transparent 70%)',
              }}
            />
            <Image
              src="/harmens-logo-tran.png"
              alt="HARMENS"
              width={120}
              height={120}
              className="relative z-10"
              priority
            />
          </div>
        </motion.div>

        {/* Brand Name - HARMENS */}
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[140px] font-bold tracking-tight text-white uppercase leading-[0.9]"
          initial={{ opacity: 0, y: 30, letterSpacing: '0.3em' }}
          animate={
            introComplete
              ? {
                  opacity: 1,
                  y: 0,
                  letterSpacing: '-0.02em',
                }
              : {}
          }
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.65, 0.05, 0, 1],
            letterSpacing: { duration: 1.5, delay: 0.5, ease: [0.65, 0.05, 0, 1] },
          }}
        >
          HARMENS
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          className="mx-auto mt-6 md:mt-8"
          initial={{ width: 0, opacity: 0 }}
          animate={introComplete ? { width: 80, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8, ease: [0.65, 0.05, 0, 1] }}
        >
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mt-6 md:mt-8 text-base md:text-lg lg:text-xl tracking-[0.3em] uppercase text-[#A0AEC0] font-light"
          initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
          animate={introComplete ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, delay: 1, ease: [0.65, 0.05, 0, 1] }}
        >
          Designed To Be Felt Before It&apos;s Seen
        </motion.p>

        {/* Sub-tagline */}
        <motion.p
          className="mt-2 text-xs md:text-sm tracking-[0.2em] text-[#A0AEC0]/50 font-light"
          initial={{ opacity: 0 }}
          animate={introComplete ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.3 }}
        >
          Crafting Timeless Luxury Interiors
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="mt-10 md:mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={introComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.65, 0.05, 0, 1] }}
        >
          <a
            href="#portfolio"
            className="group relative inline-flex items-center gap-3 px-10 py-4 text-sm md:text-base tracking-[0.3em] uppercase font-medium text-white overflow-hidden transition-all duration-500"
          >
            {/* Button background with animated border */}
            <span className="absolute inset-0 bg-[#25A2DC] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute inset-0 border border-[#25A2DC] group-hover:border-[#1B8BBE] transition-colors duration-500" />

            {/* Shimmer effect on hover */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s ease-in-out infinite',
              }}
            />

            <span className="relative z-10 border border-[#25A2DC] group-hover:border-transparent px-10 py-4 transition-colors duration-500">
              Explore Our Work
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={introComplete ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <span className="text-[#A0AEC0]/60 text-[10px] tracking-[0.5em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-[#25A2DC]" />
        </motion.div>
      </motion.div>

      {/* Shimmer keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}
