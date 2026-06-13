'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import IntroAnimation from '@/components/IntroAnimation';
import HeroSection from '@/components/HeroSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';
import CursorGlow from '@/components/CursorGlow';

// Dynamic imports for client-only components
const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false });

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Track scroll for navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    // Smooth transition: content appears as intro fades
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <main className="relative min-h-screen bg-[#0B0F18]">
      {/* Custom Cursor Glow Effect */}
      <CursorGlow />

      {/* CSS Background Scene — no WebGL, no lag */}
      <Scene3D />

      {/* Floating Navigation Bar */}
      {introComplete && (
        <nav
          className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
          style={{
            background: scrolled ? 'rgba(11, 15, 24, 0.85)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(45, 58, 77, 0.3)' : '1px solid transparent',
            transform: showContent ? 'translateY(0)' : 'translateY(-100%)',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="relative w-16 h-16 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/harmens-logo-tran.png"
                  alt="HARMENS"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                  style={{
                    filter: 'drop-shadow(0 0 16px rgba(212,175,55,0.4))',
                  }}
                  priority
                />
                {/* Glow on hover */}
                <div
                  className="absolute inset-[-6px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)',
                    filter: 'blur(14px)',
                  }}
                />
              </div>
            </a>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
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
            <div className="section-divider relative z-10" />
            <PortfolioSection />
            <div className="section-divider relative z-10" />
            <ContactSection />
          </>
        )}
      </div>
    </main>
  );
}
