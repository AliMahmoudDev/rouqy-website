'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = cardsRef.current.filter(Boolean);

    // Horizontal scroll mapping
    const totalScroll = track.scrollWidth - window.innerWidth;

    const st = gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${totalScroll}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          // 3D rotation based on position relative to viewport center
          cards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const viewportCenter = window.innerWidth / 2;
            const offset = (cardCenter - viewportCenter) / (window.innerWidth / 2); // -1 to 1
            const clampedOffset = Math.max(-1, Math.min(1, offset));

            // Rotate toward center: center = 0deg, edges = ±30deg
            const rotateY = clampedOffset * 30;
            // Scale: center = 1, edges = 0.85
            const scale = 1 - Math.abs(clampedOffset) * 0.15;
            // Opacity: center = 1, edges = 0.5
            const opacity = 1 - Math.abs(clampedOffset) * 0.5;
            // Z translation for depth
            const translateZ = -Math.abs(clampedOffset) * 80;

            gsap.set(card, {
              rotateY,
              scale,
              opacity,
              z: translateZ,
            });
          });
        },
      },
    });

    return () => {
      st.scrollTrigger?.kill();
      st.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#0B0F18] overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Section header */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-24 md:pt-32 pb-8 px-6 md:px-16">
        <span className="text-[10px] tracking-[0.6em] uppercase text-[#25A2DC]/60 block mb-3">3D Gallery</span>
        <h2 className="text-3xl md:text-5xl font-bold text-white" style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #25A2DC 50%, #D4AF37 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Floating Gallery
        </h2>
        <p className="text-[#A0AEC0]/50 text-sm mt-3 max-w-lg">
          Scroll to walk through our 3D exhibition — each project turns to face you as you approach
        </p>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex items-center gap-8 md:gap-12 pt-48 md:pt-44 px-[10vw] will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          width: `${galleryItems.length * 450 + 200}px`,
        }}
      >
        {galleryItems.map((item, i) => (
          <div
            key={i}
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
            className="flex-shrink-0 w-[320px] md:w-[400px] h-[420px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer group"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: `
                0 30px 60px rgba(0,0,0,0.5),
                0 0 0 1px rgba(212,175,55,0.08),
                0 0 100px rgba(0,0,0,0.3)
              `,
              opacity: 0.5,
            }}
          >
            {/* Image */}
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0" style={{
                background: `linear-gradient(to top, rgba(11,15,24,0.9) 0%, rgba(11,15,24,0.2) 40%, transparent 100%)`,
              }} />

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
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
                <h3 className="text-xl md:text-2xl font-bold text-white">{item.title}</h3>
                <div className="mt-3 h-[2px] w-12 transition-all duration-500 group-hover:w-24" style={{
                  background: `linear-gradient(90deg, ${item.accent}, transparent)`,
                }} />
              </div>

              {/* Hover arrow */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:border-white/50" style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(8px)',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white">
                  <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#25A2DC] rounded-full gallery-progress" style={{ width: '0%' }} />
      </div>
    </section>
  );
}
