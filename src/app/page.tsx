'use client';

import { useState } from 'react';
import IntroAnimation from '@/components/IntroAnimation';
import ScrollExperience from '@/components/ScrollExperience';
import CursorGlow from '@/components/CursorGlow';
import Navbar from '@/components/Navbar';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <main className="relative min-h-screen bg-[#13140f]">
      {/* Custom Cursor Glow Effect */}
      <CursorGlow />

      {/* Navbar — logo only, appears after scroll */}
      {showContent && <Navbar />}

      {/* Intro / Loading Animation */}
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Scroll-Driven Experience */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.8s cubic-bezier(0.65, 0.05, 0, 1)',
        }}
      >
        {showContent && <ScrollExperience />}
      </div>

      {/* Portfolio — project showcase after About */}
      {showContent && <PortfolioSection />}

      {/* Contact Form */}
      {showContent && <ContactSection />}
    </main>
  );
}