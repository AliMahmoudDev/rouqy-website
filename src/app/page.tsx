'use client';

import { useState, useEffect } from 'react';
import IntroAnimation from '@/components/IntroAnimation';
import HeroSection from '@/components/HeroSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';
import Scene3D from '@/components/Scene3D';

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if user has already seen the intro (session storage)
    const hasSeenIntro = sessionStorage.getItem('harmens-intro-seen');
    if (hasSeenIntro) {
      setIntroComplete(true);
      setShowContent(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    sessionStorage.setItem('harmens-intro-seen', 'true');
    // Smooth transition: content appears as intro fades
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <main className="relative min-h-screen bg-[#0B0F18]">
      {/* CSS Background Scene — no WebGL, no lag */}
      <Scene3D />

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
