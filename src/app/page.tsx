'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import IntroAnimation from '@/components/IntroAnimation';
import HeroSection from '@/components/HeroSection';
import PortfolioSection from '@/components/PortfolioSection';
import ContactSection from '@/components/ContactSection';

// Lazy load 3D scene to avoid SSR issues and reduce initial load
const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [sceneLoaded, setSceneLoaded] = useState(false);

  useEffect(() => {
    // Check if user has already seen the intro (session storage)
    const hasSeenIntro = sessionStorage.getItem('harmens-intro-seen');
    if (hasSeenIntro) {
      setIntroComplete(true);
      setShowContent(true);
      // Delay 3D scene load slightly for better performance
      setTimeout(() => setSceneLoaded(true), 300);
    }
  }, []);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    sessionStorage.setItem('harmens-intro-seen', 'true');
    // Smooth transition: content appears as intro fades
    setTimeout(() => {
      setShowContent(true);
      // Delay 3D scene load to avoid lag during hero entrance
      setTimeout(() => setSceneLoaded(true), 600);
    }, 100);
  };

  return (
    <main className="relative min-h-screen bg-[#0B0F18]">
      {/* 3D Background — delayed load for performance */}
      {sceneLoaded && <Scene3D />}

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
            <PortfolioSection />
            <ContactSection />
          </>
        )}
      </div>
    </main>
  );
}
