'use client';

import { useState } from 'react';
import IntroAnimation from '@/components/IntroAnimation';
import HeroSection from '@/components/HeroSection';
import CursorGlow from '@/components/CursorGlow';

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    setTimeout(() => setShowContent(true), 100);
  };

  // Nav links for ROUQY
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <main className="relative min-h-screen bg-[#13140f]">
      {/* Custom Cursor Glow Effect */}
      <CursorGlow />

      {/* Navigation Bar — minimal, matches reference */}
      {introComplete && (
        <nav
          className="fixed top-0 left-0 right-0 z-50"
          style={{
            transform: showContent ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.7s cubic-bezier(0.65, 0.05, 0, 1)',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-10 flex items-center justify-between">
            {/* Logo — ROUQY icon */}
            <a href="#hero" className="flex items-center group">
              <img
                src="/rouqy-logo-white.svg"
                alt="ROUQY"
                className="h-7 md:h-8 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </a>

            {/* Nav Links */}
            <div className="flex items-center gap-8 md:gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/70 text-xs md:text-sm tracking-[0.2em] uppercase hover:text-white transition-colors duration-300 font-light"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Intro / Loading Animation */}
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Hero Section only — other sections hidden while we focus on Hero */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.8s cubic-bezier(0.65, 0.05, 0, 1)',
        }}
      >
        {showContent && <HeroSection introComplete={introComplete} />}
      </div>
    </main>
  );
}
