'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import AnimatedText from './AnimatedText';

interface HeroSectionProps {
  introComplete: boolean;
}

export default function HeroSection({ introComplete }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Gradient overlay at bottom for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#161E2D] to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-20 text-center max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 1, ease: [0.65, 0.05, 0, 1] }}
      >
        {/* Brand Name */}
        <AnimatedText
          text="HARMENS"
          className="text-7xl md:text-8xl lg:text-[120px] font-bold tracking-tight text-white uppercase leading-none"
          delay={0.2}
          staggerDelay={0.05}
        />

        {/* Tagline */}
        <motion.p
          className="mt-6 md:mt-8 text-base md:text-lg lg:text-xl tracking-[0.25em] uppercase text-[#A0AEC0] font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={introComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1, ease: [0.65, 0.05, 0, 1] }}
        >
          Designed To Be Felt Before It&apos;s Seen
        </motion.p>

        {/* Sub-tagline */}
        <motion.p
          className="mt-3 text-sm md:text-base tracking-wider text-[#A0AEC0]/60 font-light"
          initial={{ opacity: 0, y: 10 }}
          animate={introComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.3, ease: [0.65, 0.05, 0, 1] }}
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#25A2DC] hover:bg-[#1B8BBE] text-white text-sm md:text-base tracking-widest uppercase font-medium rounded-none transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,162,220,0.3)] border border-[#25A2DC] hover:border-[#1B8BBE]"
          >
            Explore Our Work
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={introComplete ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2.2 }}
      >
        <span className="text-[#A0AEC0] text-xs tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 text-[#25A2DC] animate-bounce-slow" />
      </motion.div>
    </section>
  );
}
