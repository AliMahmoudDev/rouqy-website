'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Portfolio data
const PROJECTS = [
  {
    id: 1,
    image: '/portfolio/project-1.jpg',
    title: 'Al Wadi Residence',
    category: 'Residential',
    description: 'A 650m² private villa blending contemporary minimalism with Saudi heritage motifs',
  },
  {
    id: 2,
    image: '/portfolio/project-2.jpg',
    title: 'The Marble Suite',
    category: 'Bathroom Design',
    description: 'Full marble spa bathroom with custom brass fixtures and ambient lighting',
  },
  {
    id: 3,
    image: '/portfolio/project-3.jpg',
    title: 'Noor Kitchen',
    category: 'Kitchen',
    description: 'Dark cabinetry meets warm brass in this chef-grade open kitchen concept',
  },
  {
    id: 4,
    image: '/portfolio/project-4.jpg',
    title: 'Grand Lobby',
    category: 'Hospitality',
    description: 'Double-height hotel lobby with green marble columns and custom chandelier',
  },
  {
    id: 5,
    image: '/portfolio/project-5.jpg',
    title: 'Velvet Chambers',
    category: 'Bedroom',
    description: 'Intimate master suite with dark wood paneling and green velvet accents',
  },
  {
    id: 6,
    image: '/portfolio/project-6.jpg',
    title: 'Emerald Dining',
    category: 'Dining Room',
    description: 'Statement dining space with dramatic pendant lighting and curated art',
  },
];

/**
 * Portfolio Section — pinned, one project at a time
 * 
 * All cards are stacked on top of each other (absolute positioned).
 * Section is pinned. As user scrolls:
 *   1. First card appears (fade + slide up)
 *   2. First card fades out upward, second card fades in from below
 *   3. Repeat for all cards
 * Only ONE card is visible at any time.
 */
export default function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sectionRef.current) return;

    let ctx: gsap.Context | null = null;
    let timer: ReturnType<typeof setTimeout>;

    timer = setTimeout(() => {
      if (!containerRef.current || !sectionRef.current) return;

      ScrollTrigger.refresh();

      ctx = gsap.context(() => {
        const cards = containerRef.current!.querySelectorAll('.project-card');
        const header = containerRef.current!.querySelector('.portfolio-header');

        // Total scroll distance for the pinned section
        // Header enter + each card (enter + hold + exit)
        const SCROLL_PER_CARD = '150vh';
        const HEADER_SCROLL = '100vh';

        // Main pinned timeline
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${HEADER_SCROLL} + ${PROJECTS.length * parseInt(SCROLL_PER_CARD)}vh`,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        // --- Phase 0: Header fades in ---
        if (header) {
          mainTl.fromTo(header,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 3, ease: 'power2.out' }
          );
        }

        // Hold header briefly
        mainTl.to({}, { duration: 2 });

        // --- Phase 1: Header fades out, first card starts appearing ---
        if (header) {
          mainTl.to(header, {
            opacity: 0,
            y: -30,
            duration: 2,
            ease: 'power2.in',
          });
        }

        // Animate each card
        cards.forEach((card, index) => {
          const image = card.querySelector('.project-image');
          const label = card.querySelector('.project-label');

          // First card: just appear (no previous card to exit)
          if (index === 0) {
            mainTl.fromTo(card,
              { opacity: 0 },
              { opacity: 1, duration: 2, ease: 'power2.out' }
            );

            // Image scale in
            if (image) {
              mainTl.fromTo(image,
                { scale: 1.1 },
                { scale: 1, duration: 3, ease: 'power2.out' },
                '-=1.5'
              );
            }

            // Label slide in
            if (label) {
              mainTl.fromTo(label,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 2, ease: 'power2.out' },
                '-=1.5'
              );
            }

            // Hold
            mainTl.to({}, { duration: 5 });

            // Exit first card (unless it's the last)
            if (cards.length > 1) {
              mainTl.to(card, {
                opacity: 0,
                y: -40,
                duration: 2,
                ease: 'power2.in',
              });
              if (label) {
                mainTl.to(label, {
                  opacity: 0,
                  y: -20,
                  duration: 1.5,
                  ease: 'power2.in',
                }, '-=1.5');
              }
            }
          } else {
            // All other cards: appear after previous exits

            // Card appears from below
            mainTl.fromTo(card,
              { opacity: 0, y: 60 },
              { opacity: 1, y: 0, duration: 2.5, ease: 'power2.out' }
            );

            // Image scale in
            if (image) {
              mainTl.fromTo(image,
                { scale: 1.08 },
                { scale: 1, duration: 3, ease: 'power2.out' },
                '-=1.5'
              );
            }

            // Label slide in
            if (label) {
              mainTl.fromTo(label,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 2, ease: 'power2.out' },
                '-=1.5'
              );
            }

            // Hold — let user see the project
            mainTl.to({}, { duration: 5 });

            // Exit card (unless it's the last)
            if (index < cards.length - 1) {
              mainTl.to(card, {
                opacity: 0,
                y: -40,
                duration: 2,
                ease: 'power2.in',
              });
              if (label) {
                mainTl.to(label, {
                  opacity: 0,
                  y: -20,
                  duration: 1.5,
                  ease: 'power2.in',
                }, '-=1.5');
              }
            }
          }
        });

        // Final hold on last card
        mainTl.to({}, { duration: 3 });

        // Last card fades out
        const lastCard = cards[cards.length - 1];
        if (lastCard) {
          mainTl.to(lastCard, {
            opacity: 0,
            duration: 3,
            ease: 'power2.inOut',
          });
        }

      }, containerRef);
    }, 800);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#13140f]">
      {/* Pinned portfolio section */}
      <section
        ref={sectionRef}
        className="relative h-screen overflow-hidden bg-[#13140f]"
      >
        {/* Subtle background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(29,55,45,0.05) 0%, transparent 70%)',
          }}
        />

        {/* Header — fades in then out */}
        <div className="portfolio-header absolute inset-0 flex flex-col items-center justify-center z-10">
          <span className="text-[#8fbfa8]/50 text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.5em] uppercase font-light mb-4 md:mb-6">
            Selected Works
          </span>
          <h2 className="text-white text-3xl md:text-6xl lg:text-7xl font-bold tracking-[0.1em] md:tracking-[0.15em] uppercase">
            Portfolio
          </h2>
          <div className="w-12 md:w-16 h-[1px] bg-[#8fbfa8]/30 mt-4 md:mt-6" />
        </div>

        {/* Project cards — ALL stacked on top of each other, only one visible at a time */}
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className="project-card absolute inset-0 flex flex-col items-center justify-center z-20 px-4 md:px-16 lg:px-24"
            style={{ opacity: index === 0 ? 0 : 0 }}
          >
            {/* Project image — landscape, centered */}
            <div className="relative overflow-hidden w-full max-w-5xl rounded-sm">
              <img
                src={project.image}
                alt={project.title}
                className="project-image w-full aspect-[16/9] object-cover"
              />
              {/* Subtle gradient overlay at bottom of image */}
              <div
                className="absolute bottom-0 left-0 right-0 h-20 md:h-28 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, #13140f 0%, transparent 100%)',
                }}
              />
            </div>

            {/* Project label — below image */}
            <div className="project-label pt-4 md:pt-6 text-center max-w-xl">
              <span className="block text-[#8fbfa8]/60 text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase font-light mb-1.5 md:mb-2">
                {project.category}
              </span>
              <h3 className="text-white text-xl md:text-3xl lg:text-4xl font-bold tracking-[0.08em] md:tracking-[0.12em] uppercase mb-2 md:mb-3">
                {project.title}
              </h3>
              <p className="text-white/40 text-[11px] md:text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Project counter */}
            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {PROJECTS.map((_, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 rounded-full ${
                    i === index
                      ? 'w-6 h-[3px] bg-[#8fbfa8]/60'
                      : 'w-[3px] h-[3px] bg-white/15'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
