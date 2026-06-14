'use client';

import { useEffect, useRef, useCallback } from 'react';

const galleryItems = [
  {
    title: 'Golden Wave Dining',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85',
    accent: '#D4AF37',
  },
  {
    title: 'Modern Sanctuary',
    category: 'Interior Design',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85',
    accent: '#1d372d',
  },
  {
    title: 'Minimalist Suite',
    category: 'Luxury Living',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85',
    accent: '#D4AF37',
  },
  {
    title: 'Chandelier Hall',
    category: 'Architectural',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85',
    accent: '#1d372d',
  },
  {
    title: 'Contemporary Space',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85',
    accent: '#D4AF37',
  },
  {
    title: 'Fireplace Lounge',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=85',
    accent: '#1d372d',
  },
  {
    title: 'Azure Residence',
    category: 'Penthouse',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85',
    accent: '#D4AF37',
  },
  {
    title: 'Crystal Pavilion',
    category: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=85',
    accent: '#1d372d',
  },
];

export default function HorizontalGallery3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragRef = useRef({
    startX: 0,
    scrollLeft: 0,
  });
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const isSnappingRef = useRef(false);

  // Lightweight 3D update — direct style only, NO transitions
  const updateCard3D = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>('[data-gallery-card]');
    const viewportCenter = window.innerWidth / 2;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const offset = (cardCenter - viewportCenter) / (window.innerWidth / 2);
      const clamped = Math.max(-1, Math.min(1, offset));
      const absClamped = Math.abs(clamped);

      const rotateY = (clamped * clamped * clamped) * 18;
      const scale = 1 - absClamped * absClamped * 0.1;
      const opacity = 1 - absClamped * 0.35;

      // Direct style — NO transition ever during scroll/drag
      card.style.transition = 'none';
      card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.opacity = `${opacity}`;
    });
  }, []);

  // JS-based snap: find the nearest card to center and smooth-scroll to it
  const snapToNearestCard = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>('[data-gallery-card]');
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let nearestCard: HTMLElement | null = null;
    let nearestDistance = Infinity;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestCard = card;
      }
    });

    if (nearestCard && nearestDistance > 5) {
      // Calculate the scroll position that centers the nearest card
      const cardRect = nearestCard.getBoundingClientRect();
      const cardOffsetLeft = cardRect.left - containerRect.left + container.scrollLeft;
      const targetScrollLeft = cardOffsetLeft - (containerRect.width - cardRect.width) / 2;

      isSnappingRef.current = true;
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });

      // After snap animation completes, update 3D one final time with smooth transition
      setTimeout(() => {
        isSnappingRef.current = false;
        updateCard3D();
      }, 400);
    }
  }, [updateCard3D]);

  // Detect scroll end and snap
  const handleScrollEnd = useCallback(() => {
    // Clear any existing timer
    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
    }

    // Wait for scroll to truly stop (debounce)
    scrollEndTimerRef.current = setTimeout(() => {
      if (!isDraggingRef.current) {
        snapToNearestCard();
      }
    }, 120); // Short debounce to detect when scrolling has stopped
  }, [snapToNearestCard]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ===== DESKTOP: Mouse drag =====
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();

      isDraggingRef.current = true;
      dragRef.current = {
        startX: e.clientX,
        scrollLeft: container.scrollLeft,
      };
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const dx = e.clientX - dragRef.current.startX;
      container.scrollLeft = dragRef.current.scrollLeft - dx;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCard3D);
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;

      isDraggingRef.current = false;
      container.style.cursor = 'grab';

      // Snap to nearest card after desktop drag ends
      // Small delay to let any residual movement settle
      setTimeout(() => {
        snapToNearestCard();
      }, 50);
    };

    // ===== 3D update on native scroll (mobile + desktop) =====
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCard3D);

      // Detect scroll end for JS-based snapping
      handleScrollEnd();
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('scroll', handleScroll, { passive: true });

    // Initial 3D state
    updateCard3D();

    const observer = new ResizeObserver(() => updateCard3D());
    observer.observe(container);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateCard3D, handleScrollEnd, snapToNearestCard]);

  return (
    <section className="relative py-20 md:py-32 bg-[#13140f] overflow-hidden">
      {/* Section header */}
      <div className="px-6 md:px-16 mb-10 md:mb-14">
        <span className="text-[10px] tracking-[0.6em] uppercase text-[#8fbfa8]/60 block mb-3">Gallery</span>
        <h2 className="text-3xl md:text-5xl font-bold text-white" style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #1d372d 50%, #D4AF37 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Floating Gallery
        </h2>
        <p className="text-[#A0AEC0]/50 text-sm mt-3 max-w-lg">
          Swipe or drag to explore our projects — each space turns to face you
        </p>
      </div>

      {/* 
        ARCHITECTURE:
        - NO CSS scroll-snap at all (removed to prevent browser state desync)
        - JS-based snap: detects scroll end, finds nearest card, smooth-scrolls to center it
        - touch-action: pan-x pan-y → native mobile scroll with inertia in both directions
        - No custom touch handlers → browser handles mobile natively = buttery smooth
        - Card 3D: direct style updates via rAF, NO CSS transitions during scroll
      */}
      <div
        ref={containerRef}
        className="flex items-center gap-6 md:gap-8 px-6 md:px-16 pb-4 select-none"
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
          // NO scroll-snap-type — JS handles snapping
          scrollSnapType: 'none',
          touchAction: 'pan-x pan-y',
          overscrollBehaviorX: 'contain',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          cursor: isDraggingRef.current ? 'grabbing' : 'grab',
        }}
      >
        <style>{`
          [data-gallery-container]::-webkit-scrollbar { display: none; }
        `}</style>

        {galleryItems.map((item, i) => (
          <div
            key={i}
            data-gallery-card
            className="flex-shrink-0 w-[280px] md:w-[380px] h-[380px] md:h-[480px] rounded-2xl overflow-hidden group"
            style={{
              // NO scroll-snap-align — JS handles snapping
              willChange: 'transform, opacity',
              boxShadow: `
                0 25px 50px rgba(0,0,0,0.4),
                0 0 0 1px rgba(212,175,55,0.08),
                0 0 80px rgba(0,0,0,0.2)
              `,
            }}
          >
            <div className="relative w-full h-full overflow-hidden pointer-events-none">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                draggable={false}
                loading="lazy"
              />
              <div className="absolute inset-0" style={{
                background: `linear-gradient(to top, rgba(19,20,15,0.9) 0%, rgba(19,20,15,0.2) 40%, transparent 100%)`,
              }} />

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <span
                  className="text-[9px] tracking-[0.3em] uppercase px-3 py-1 rounded-full border mb-3 inline-block"
                  style={{
                    color: item.accent,
                    borderColor: `${item.accent}40`,
                    background: `${item.accent}10`,
                  }}
                >
                  {item.category}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white">{item.title}</h3>
                <div className="mt-3 h-[2px] w-10 group-hover:w-16 transition-all duration-500" style={{
                  background: `linear-gradient(90deg, ${item.accent}, transparent)`,
                }} />
              </div>

              <div className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/15 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-300" style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(8px)',
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
                  <path d="M4 2L9 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hint */}
      <div className="flex items-center justify-center gap-2 mt-6 opacity-30">
        <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
          <path d="M1 5H19M15 1L19 5L15 9" stroke="#A0AEC0" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#A0AEC0]">Swipe to explore</span>
        <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
          <path d="M19 5H1M5 1L1 5L5 9" stroke="#A0AEC0" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
}
