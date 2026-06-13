'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import IntroAnimation from '@/components/IntroAnimation';
import HeroSection from '@/components/HeroSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';
import CursorGlow from '@/components/CursorGlow';
import StackingCards3D from '@/components/StackingCards3D';
import HorizontalGallery3D from '@/components/HorizontalGallery3D';
import ImageUnframe3D from '@/components/ImageUnframe3D';
import ParallaxFooter3D from '@/components/ParallaxFooter3D';

// Dynamic imports for client-only components
const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false });

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    setTimeout(() => setShowContent(true), 100);
  };

  const navLinks = [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <main className="relative min-h-screen bg-[#0B0F18]">
      {/* Custom Cursor Glow Effect */}
      <CursorGlow />

      {/* CSS Background Scene — no WebGL, no lag */}
      <Scene3D />

      {/* Navigation Bar */}
      {introComplete && (
        <nav
          className="fixed top-0 left-0 right-0 z-50"
          style={{
            transform: showContent ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.7s cubic-bezier(0.65, 0.05, 0, 1)',
          }}
        >
          {/* Nav background */}
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              background: scrolled
                ? 'rgba(11, 15, 24, 0.92)'
                : 'rgba(11, 15, 24, 0.4)',
              backdropFilter: scrolled
                ? 'blur(20px) saturate(180%)'
                : 'blur(8px)',
              WebkitBackdropFilter: scrolled
                ? 'blur(20px) saturate(180%)'
                : 'blur(8px)',
              borderBottom: '1px solid rgba(45, 58, 77, 0.2)',
            }}
          />

          {/* Mobile: centered logo only | Desktop: logo left + nav right */}
          <div className="relative max-w-7xl mx-auto px-5 md:px-12 h-16 md:h-20 flex items-center justify-center md:justify-between">
            {/* Logo */}
            <a
              href="#hero"
              className="flex items-center group"
            >
              <div className="relative w-14 h-14 md:w-14 md:h-14 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/harmens-logo-tran.png"
                  alt="HARMENS"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                  style={{
                    filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.3))',
                  }}
                  priority
                />
              </div>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#A0AEC0]/70 text-xs tracking-[0.3em] uppercase hover:text-white transition-all duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[#25A2DC] to-[#D4AF37] group-hover:w-full transition-all duration-500" />
                </a>
              ))}
              <a
                href="#contact"
                className="text-[10px] tracking-[0.3em] uppercase px-5 py-2 border border-[#25A2DC]/30 text-[#25A2DC] hover:bg-[#25A2DC]/10 hover:border-[#25A2DC]/60 hover:shadow-[0_0_20px_rgba(37,162,220,0.15)] transition-all duration-300"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </nav>
      )}

      {/* Cinematic Intro Animation */}
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Main Content — appears with CSS entrance animations */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.8s cubic-bezier(0.65, 0.05, 0, 1)',
        }}
      >
        {showContent && (
          <>
            <HeroSection introComplete={introComplete} />
            <div className="section-divider relative z-10 -mt-8 md:-mt-12" />
            <PortfolioSection />
            <div className="section-divider relative z-10" />
            
            {/* ====== 3D EFFECT SECTIONS (Experimental) ====== */}
            <StackingCards3D />
            <div className="section-divider relative z-10" />
            <HorizontalGallery3D />
            <div className="section-divider relative z-10" />
            <ImageUnframe3D />
            <div className="section-divider relative z-10" />
            <ParallaxFooter3D />
            <div className="section-divider relative z-10" />
            
            <ContactSection />
          </>
        )}
      </div>
    </main>
  );
}
