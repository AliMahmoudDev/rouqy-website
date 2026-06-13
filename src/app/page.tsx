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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

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
          {/* Nav background — always visible on mobile, transparent on desktop until scroll */}
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              background: scrolled || mobileMenuOpen
                ? 'rgba(11, 15, 24, 0.92)'
                : 'rgba(11, 15, 24, 0.4)',
              backdropFilter: scrolled || mobileMenuOpen
                ? 'blur(20px) saturate(180%)'
                : 'blur(8px)',
              WebkitBackdropFilter: scrolled || mobileMenuOpen
                ? 'blur(20px) saturate(180%)'
                : 'blur(8px)',
              borderBottom: '1px solid rgba(45, 58, 77, 0.2)',
            }}
          />

          <div className="relative max-w-7xl mx-auto px-5 md:px-12 h-14 md:h-20 flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              className="flex items-center gap-2 group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative w-10 h-10 md:w-14 md:h-14 group-hover:scale-105 transition-transform duration-300">
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

            {/* Mobile Hamburger Button */}
            <button
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg active:bg-white/5 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5 flex flex-col justify-between">
                <span
                  className="block w-full h-[2px] bg-white rounded-full origin-center transition-all duration-300"
                  style={{
                    transform: mobileMenuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
                  }}
                />
                <span
                  className="block w-full h-[2px] bg-white rounded-full transition-all duration-300"
                  style={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    transform: mobileMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
                  }}
                />
                <span
                  className="block w-full h-[2px] bg-white rounded-full origin-center transition-all duration-300"
                  style={{
                    transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
                  }}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div
            className="md:hidden fixed inset-0"
            style={{
              top: '56px',
              opacity: mobileMenuOpen ? 1 : 0,
              pointerEvents: mobileMenuOpen ? 'auto' : 'none',
              transition: 'opacity 0.4s cubic-bezier(0.65, 0.05, 0, 1)',
            }}
          >
            {/* Solid dark background */}
            <div className="absolute inset-0 bg-[#0B0F18]" />

            {/* Subtle gradient accents */}
            <div
              className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(37,162,220,0.04) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-[250px] h-[250px] pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
            />

            {/* Top decorative line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#25A2DC]/30 to-transparent" />

            {/* Menu content — positioned in the upper-middle area */}
            <div className="relative flex flex-col items-center justify-center h-full px-8" style={{ paddingTop: '25vh' }}>
              {navLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-5 text-white text-2xl tracking-[0.35em] uppercase font-light hover:text-[#25A2DC] transition-all duration-300"
                  style={{
                    opacity: mobileMenuOpen ? 1 : 0,
                    transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-15px)',
                    transition: `opacity 0.35s ease ${i * 0.08 + 0.12}s, transform 0.35s ease ${i * 0.08 + 0.12}s`,
                  }}
                >
                  {link.label}
                  <div className="mt-3 mx-auto w-8 h-[1px] bg-[#2D3A4D]/40" />
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 text-[11px] tracking-[0.35em] uppercase px-10 py-3.5 border border-[#25A2DC]/40 text-[#25A2DC] hover:bg-[#25A2DC]/10 hover:border-[#25A2DC]/70 transition-all duration-300"
                style={{
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-15px)',
                  transition: 'opacity 0.35s ease 0.35s, transform 0.35s ease 0.35s',
                }}
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
            <ContactSection />
          </>
        )}
      </div>
    </main>
  );
}
