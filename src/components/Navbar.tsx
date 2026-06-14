'use client';

import { useEffect, useState } from 'react';

/**
 * Minimal Navbar — white ROUQY logo centered, nothing else
 * Fades in after scroll starts (not during hero)
 */
export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling past first viewport
      if (window.scrollY > window.innerHeight * 0.3) {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-16 md:h-20 pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease-out',
      }}
    >
      <img
        src="/rouqy-logo-white.svg"
        alt="ROUQY"
        className="h-8 md:h-10 object-contain pointer-events-auto"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(143,191,168,0.08))',
        }}
      />
    </nav>
  );
}
