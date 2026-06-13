'use client';

import { useEffect, useRef } from 'react';

/**
 * useParallax3D — Scroll-driven 3D depth parallax
 * 
 * Lightweight approach: Single IntersectionObserver + RAF-throttled scroll.
 * Elements with [data-parallax-depth] attribute get different translateZ
 * based on their depth value and scroll position.
 * 
 * This creates a TRUE 3D depth effect where:
 * - depth="0.2" moves very slowly (background layer)
 * - depth="0.5" moves at medium speed (mid-ground)  
 * - depth="1.0" moves fastest (foreground)
 * 
 * Uses translate3d() for GPU compositing = no repaints = no lag.
 */
export default function useParallax3D<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const layers = container.querySelectorAll('[data-parallax-depth]');

    // Pre-cache layer data for performance
    const layerData = Array.from(layers).map((layer) => ({
      el: layer as HTMLElement,
      depth: parseFloat((layer as HTMLElement).dataset.parallaxDepth || '0'),
    }));

    // Only animate when section is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0, rootMargin: '100px 0px' }
    );
    observer.observe(container);

    const handleScroll = () => {
      if (!isVisibleRef.current) return;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!isVisibleRef.current) return;

        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // How far the section center is from viewport center (normalized -1 to 1)
        const sectionCenter = rect.top + rect.height / 2;
        const viewCenter = windowHeight / 2;
        const progress = (sectionCenter - viewCenter) / windowHeight;

        layerData.forEach(({ el, depth }) => {
          const moveY = progress * depth * 60;
          el.style.transform = `translate3d(0, ${moveY}px, 0)`;
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return ref;
}
