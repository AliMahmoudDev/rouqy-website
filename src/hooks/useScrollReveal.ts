'use client';

import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — Professional scroll-triggered animation hook
 * 
 * Zero-lag approach: IntersectionObserver triggers CSS transitions once.
 * No continuous JS — purely CSS-driven animations after trigger.
 * 
 * Usage:
 *   const ref = useScrollReveal();
 *   // Add data-sr attributes to children:
 *   // data-sr="up" | "down" | "left" | "right" | "scale" | "blur" |
 *   //          "rotate-left" | "rotate-right" | "clip-up" | "clip-left" |
 *   //          "clip-right" | "fade" | "tilt-up"
 *   // data-sr-delay="1" through "12" (delay increments)
 *   // data-sr-duration="fast" | "normal" | "slow" | "grand"
 *   // data-sr-distance="near" | "normal" | "far"
 */
export default function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
  } = {}
) {
  const {
    threshold = 0.12,
    rootMargin = '0px 0px -60px 0px',
    triggerOnce = true,
  } = options;

  const ref = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observedElementsRef = useRef<Set<Element>>(new Set());

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Create a single observer instance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            // Use RAF to ensure CSS transition triggers correctly
            requestAnimationFrame(() => {
              el.classList.add('sr-visible');
            });
            if (triggerOnce) {
              observer.unobserve(el);
              observedElementsRef.current.delete(el);
            }
          } else if (!triggerOnce) {
            const el = entry.target as HTMLElement;
            el.classList.remove('sr-visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    observerRef.current = observer;

    // Observe all elements with data-sr attribute
    const observeElements = () => {
      const elements = container.querySelectorAll('[data-sr]');
      elements.forEach((el) => {
        if (!observedElementsRef.current.has(el)) {
          observer.observe(el);
          observedElementsRef.current.add(el);
        }
      });
    };

    // Initial observation
    observeElements();

    // Re-observe when DOM changes (for dynamically rendered elements)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      observedElementsRef.current.clear();
      observerRef.current = null;
    };
  }, [threshold, rootMargin, triggerOnce]);

  return ref;
}
