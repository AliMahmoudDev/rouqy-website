'use client';

import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — Professional scroll-triggered animation hook
 * 
 * Zero-lag approach: IntersectionObserver triggers CSS transitions once.
 * No continuous JS — purely CSS-driven animations after trigger.
 * 
 * FIX: After adding .sr-visible, forces a repaint on elements containing
 * images. This fixes Chrome Mobile's GPU compositor bug where images
 * inside animated containers randomly disappear until tap/hover.
 * 
 * Usage:
 *   const ref = useScrollReveal();
 *   // Add data-sr attributes to children
 */

function forceRepaint(el: HTMLElement) {
  // Check if this element or its children contain images
  const hasImages = el.querySelector('img') || el.tagName === 'IMG';
  if (!hasImages) return;

  // Force a repaint after the CSS transition has started
  // This gives Chrome's compositor time to create proper layers for images
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      // Toggle visibility briefly to force full repaint of the element
      const original = el.style.visibility;
      el.style.visibility = 'hidden';
      // Force reflow — reading offsetHeight triggers synchronous layout
      void el.offsetHeight;
      el.style.visibility = original || '';
    });
  });
}

export default function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
  } = {}
) {
  const {
    threshold = 0.05,
    rootMargin = typeof window !== 'undefined' && window.innerWidth >= 768
      ? '300px 0px -20px 0px'
      : '100px 0px -20px 0px',
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
              // Force repaint to fix Chrome Mobile image disappearing bug
              forceRepaint(el);
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
