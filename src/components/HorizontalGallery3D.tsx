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
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  // Lightweight 3D update — direct style, no GSAP
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
      isDragging.current = true;
      startX.current = e.clientX;
      scrollLeftStart.current = container.scrollLeft;
      container.style.cursor = 'grabbing';
      container.style.scrollSnapType = 'none';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - startX.current;
      container.scrollLeft = scrollLeftStart.current - dx;
      requestAnimationFrame(updateCard3D);
    };

    const handleMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      container.style.cursor = 'grab';
      container.style.scrollSnapType = 'x proximity';
    };

    // ===== 3D update on native scroll (mobile + trackpad) =====
    const handleScroll = () => {
      requestAnimationFrame(updateCard3D);
    };

    // Add listeners — NO custom touch handlers, browser handles mobile scroll natively
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
        Mobile: NATIVE horizontal scroll via overflow-x + touch-action: pan-y
        - touch-action: pan-y → browser handles vertical scroll, element handles horizontal
        - No JS touch handlers → native momentum/inertia = butter smooth
        Desktop: Mouse drag via mousedown/mousemove
      */}
      <div
        ref={containerRef}
        className="flex items-center gap-6 md:gap-8 px-6 md:px-16 pb-4 select-none"
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x proximity',
          touchAction: 'pan-y',          // Vertical scroll → page, Horizontal → gallery
          overscrollBehaviorX: 'contain', // Prevent browser back/forward on overscroll
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          cursor: 'grab',
        }}
      >
        <style>{`
          .gallery-scroll-hide::-webkit-scrollbar { display: none; }
        `}</style>

        {galleryItems.map((item, i) => (
          <div
            key={i}
            data-gallery-card
            className="flex-shrink-0 w-[280px] md:w-[380px] h-[380px] md:h-[480px] rounded-2xl overflow-hidden group"
            style={{
              scrollSnapAlign: 'center',
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
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                <div className="mt-3 h-[2px] w-10 transition-all duration-500 group-hover:w-20" style={{
                  background: `linear-gradient(90deg, ${item.accent}, transparent)`,
                }} />
              </div>

              <div className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/15 flex items-center justify-center opacity-30 group-hover:opacity-70 transition-opacity duration-300" style={{
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
