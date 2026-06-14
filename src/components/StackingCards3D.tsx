'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Golden Wave Dining',
    category: 'Residential',
    location: 'Riyadh, KSA',
    area: '450 sqm',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85',
    description: 'A breathtaking dining experience where golden waves of light dance across hand-selected marble surfaces.',
    accent: '#D4AF37',
  },
  {
    title: 'Modern Sanctuary',
    category: 'Interior Design',
    location: 'Abu Dhabi, UAE',
    area: '320 sqm',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85',
    description: 'Where tranquility meets modern luxury — a sanctuary designed for the senses.',
    accent: '#1d372d',
  },
  {
    title: 'Minimalist Suite',
    category: 'Luxury Living',
    location: 'Riyadh, KSA',
    area: '280 sqm',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85',
    description: 'Pure elegance through restraint — every element serves both form and function.',
    accent: '#D4AF37',
  },
  {
    title: 'Chandelier Hall',
    category: 'Architectural',
    location: 'Doha, Qatar',
    area: '580 sqm',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85',
    description: 'A grand architectural statement where crystal meets gold in a symphony of light.',
    accent: '#1d372d',
  },
  {
    title: 'Contemporary Space',
    category: 'Commercial',
    location: 'Kuwait City, Kuwait',
    area: '380 sqm',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85',
    description: 'Bold commercial design that redefines workspace as an experience.',
    accent: '#D4AF37',
  },
];

export default function StackingCards3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    // Pin the section and animate cards
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${cards.length * 100}%`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // Animate each card stacking on top of the previous
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return; // Last card stays

      tl.to(card, {
        scale: 0.92,
        y: -30,
        rotateX: 4,
        filter: 'brightness(0.6)',
        zIndex: cards.length - i,
        duration: 1,
        ease: 'power2.inOut',
      }, i * 1);
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#13140f] overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Section header */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-24 md:pt-32 pb-8 px-6 md:px-16 text-center">
        <span className="text-[10px] tracking-[0.6em] uppercase text-[#D4AF37]/60 block mb-3">3D Showcase</span>
        <h2 className="text-3xl md:text-5xl font-bold text-white" style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #D4AF37 50%, #1d372d 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Stacking Cards
        </h2>
        <p className="text-[#A0AEC0]/50 text-sm mt-3 max-w-lg mx-auto">
          Scroll to flip through our curated collection — each space unfolds like a page in a luxury catalog
        </p>
      </div>

      {/* Cards container */}
      <div className="relative flex items-center justify-center min-h-screen pt-32 md:pt-40 pb-16 px-4 md:px-16">
        {projects.map((project, i) => (
          <div
            key={i}
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
            className="absolute w-[85vw] md:w-[70vw] max-w-[900px] rounded-2xl overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              zIndex: i + 1,
              boxShadow: `
                0 25px 60px rgba(0,0,0,0.5),
                0 0 0 1px rgba(212,175,55,0.1),
                0 0 80px rgba(212,175,55,0.05)
              `,
            }}
          >
            {/* Card image */}
            <div className="relative h-[50vh] md:h-[55vh] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0" style={{
                background: `linear-gradient(to top, rgba(19,20,15,0.95) 0%, rgba(19,20,15,0.3) 50%, transparent 100%)`,
              }} />

              {/* Project info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-[9px] tracking-[0.4em] uppercase px-3 py-1 rounded-full border"
                    style={{
                      color: project.accent,
                      borderColor: `${project.accent}40`,
                      background: `${project.accent}10`,
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="text-[#A0AEC0]/40 text-xs">{project.year}</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-[#A0AEC0]/60 text-sm md:text-base max-w-md">{project.description}</p>
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-[#A0AEC0]/40 text-xs flex items-center gap-1">
                    📍 {project.location}
                  </span>
                  <span className="text-[#A0AEC0]/40 text-xs flex items-center gap-1">
                    📐 {project.area}
                  </span>
                </div>
                {/* Accent line */}
                <div className="mt-4 h-[2px] w-16" style={{
                  background: `linear-gradient(90deg, ${project.accent}, transparent)`,
                }} />
              </div>

              {/* Project number */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8">
                <span className="text-6xl md:text-8xl font-black" style={{
                  color: `${project.accent}15`,
                  lineHeight: 1,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[9px] tracking-[0.4em] uppercase text-[#A0AEC0]">Scroll to explore</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#D4AF37] to-transparent animate-bounce" />
      </div>
    </section>
  );
}
