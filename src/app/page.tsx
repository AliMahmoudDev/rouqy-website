'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import IntroAnimation from '@/components/IntroAnimation';
import HeroSection from '@/components/HeroSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';

// Lazy load 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => null,
});

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
    // Small delay before showing content for smooth transition
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <main className="relative min-h-screen bg-[#161E2D]">
      {/* 3D Background - covers entire page */}
      <Scene3D />

      {/* Cinematic Intro Animation */}
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Main Content */}
      {showContent && (
        <>
          <HeroSection introComplete={introComplete} />
          <PortfolioSection />
          <ContactSection />
        </>
      )}
    </main>
  );
}
