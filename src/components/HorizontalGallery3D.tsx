'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

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
    accent: '#25A2DC',
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
    accent: '#25A2DC',
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
    accent: '#25A2DC',
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
    accent: '#25A2DC',
  },
];

export default function HorizontalGallery3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
  });

  // Lightweight 3D update — NO transitions, direct style only
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

      // Direct style — NO transition during drag or scroll
      card.style.transition = 'none';
      card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.opacity = `${opacity}`;
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ===== DESKTOP: Mouse drag =====
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();

      dragRef.current = {
        active: true,
        startX: e.clientX,
        scrollLeft: container.scrollLeft,
      };
      setIsDragging(true);

      // FIX #2: Disable scroll snap during drag (prevents snap fighting with drag)
      container.style.scrollSnapType = 'none';
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return;

      // FIX #1: NO transition during drag — move instantly with mouse
      const dx = e.clientX - dragRef.current.startX;
      container.scrollLeft = dragRef.current.scrollLeft - dx;
      requestAnimationFrame(updateCard3D);
    };

    const handleMouseUp = () => {
      if (!dragRef.current.active) return;

      dragRef.current.active = false;
      setIsDragging(false);

      // FIX #2: Re-enable scroll snap AFTER drag ends (smooth snap to card)
      container.style.scrollSnapType = 'x mandatory';
      container.style.cursor = 'grab';
    };

    // ===== 3D update on native scroll =====
    const handleScroll = () => {
      requestAnimationFrame(updateCard3D);
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
    };
  }, [updateCard3D]);

  return (
    <section className="relative py-20 md:py-32 bg-[#0B0F18] overflow-hidden">
      {/* Section header */}
      <div className="px-6 md:px-16 mb-10 md:mb-14">
        <span className="text-[10px] tracking-[0.6em] uppercase text-[#25A2DC]/60 block mb-3">Gallery</span>
        <h2 className="text-3xl md:text-5xl font-bold text-white" style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #25A2DC 50%, #D4AF37 100%)',
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
        KEY FIXES:
        1. scroll-snap-type: NONE during drag, mandatory AFTER drag ends
        2. Card transitions: NONE during drag/scroll
        3. touch-action: pan-x pan-y → native mobile scroll in both directions
        4. No custom touch handlers → browser handles mobile natively = smooth inertia
      */}
      <div
        ref={containerRef}
        className="flex items-center gap-6 md:gap-8 px-6 md:px-16 pb-4 select-none"
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
          // Default: mandatory snap when NOT dragging; JS sets to 'none' during drag
          scrollSnapType: isDragging ? 'none' : 'x mandatory',
          touchAction: 'pan-x pan-y',
          overscrollBehaviorX: 'contain',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          cursor: isDragging ? 'grabbing' : 'grab',
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
              scrollSnapAlign: 'center',
              // FIX #1: No transition during drag, smooth transition after release
              transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
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
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  transition: isDragging ? 'none' : 'transform 0.7s ease',
                  transform: 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (!isDragging) (e.target as HTMLElement).style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.transform = 'scale(1)';
                }}
                draggable={false}
                loading="lazy"
              />
              <div className="absolute inset-0" style={{
                background: `linear-gradient(to top, rgba(11,15,24,0.9) 0%, rgba(11,15,24,0.2) 40%, transparent 100%)`,
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
                <div className="mt-3 h-[2px] w-10" style={{
                  background: `linear-gradient(90deg, ${item.accent}, transparent)`,
                  transition: isDragging ? 'none' : 'width 0.5s ease',
                }} />
              </div>

              <div className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/15 flex items-center justify-center opacity-30" style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(8px)',
                transition: isDragging ? 'none' : 'opacity 0.3s ease',
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
