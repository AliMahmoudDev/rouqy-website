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
 * Portfolio Section — 3D flip/rotate transition between projects
 * 
 * Natural scroll, one project visible at a time.
 * As user scrolls past a card:
 *   - The image rotates on Y-axis and scales down (3D flip out)
 *   - The next card rotates in from the opposite side (3D flip in)
 *   - Perspective creates depth and wow factor
 */
export default function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx: gsap.Context | null = null;
    let timer: ReturnType<typeof setTimeout>;

    timer = setTimeout(() => {
      if (!containerRef.current) return;

      ScrollTrigger.refresh();

      ctx = gsap.context(() => {
        // Header animation
        const header = containerRef.current!.querySelector('.portfolio-header');
        if (header) {
          gsap.fromTo(header,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                end: 'top 50%',
                scrub: 1.5,
              },
            }
          );
        }

        // Each card: 3D flip in on enter, 3D flip out on exit
        const cards = containerRef.current!.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
          const image = card.querySelector('.project-image');
          const label = card.querySelector('.project-label');

          // === ENTER: 3D rotate in from below ===
          // Alternate rotation direction for visual variety
          const enterRotateY = index % 2 === 0 ? 25 : -25;

          gsap.fromTo(card,
            {
              opacity: 0,
              rotateX: 15,
              rotateY: enterRotateY,
              scale: 0.85,
              y: 80,
            },
            {
              opacity: 1,
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              y: 0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                end: 'top 30%',
                scrub: 1.8,
              },
            }
          );

          // Image subtle zoom on enter
          if (image) {
            gsap.fromTo(image,
              { scale: 1.15 },
              {
                scale: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 90%',
                  end: 'top 20%',
                  scrub: 1.5,
                },
              }
            );
          }

          // Label enters with delay
          if (label) {
            gsap.fromTo(label,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 70%',
                  end: 'top 25%',
                  scrub: 1.5,
                },
              }
            );
          }

          // === EXIT: 3D rotate out upward ===
          const exitRotateY = index % 2 === 0 ? -20 : 20;

          gsap.fromTo(card,
            {
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              y: 0,
            },
            {
              opacity: 0,
              rotateX: -10,
              rotateY: exitRotateY,
              scale: 0.9,
              y: -60,
              ease: 'power2.in',
              scrollTrigger: {
                trigger: card,
                start: 'center center',
                end: 'top -10%',
                scrub: 1.8,
              },
            }
          );
        });

        // Progress dots
        const dots = containerRef.current!.querySelectorAll('.progress-dot');
        cards.forEach((card, index) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => {
              dots.forEach((d, i) => d.classList.toggle('active', i === index));
            },
            onLeave: () => {
              if (index < dots.length - 1) {
                dots.forEach((d, i) => d.classList.toggle('active', i === index + 1));
              }
            },
            onEnterBack: () => {
              dots.forEach((d, i) => d.classList.toggle('active', i === index));
            },
          });
        });

      }, containerRef);
    }, 800);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#13140f]">
      {/* Section header */}
      <div className="portfolio-header relative py-24 md:py-36 flex flex-col items-center justify-center bg-[#13140f]">
        <span className="text-[#8fbfa8]/50 text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.5em] uppercase font-light mb-4 md:mb-6">
          Selected Works
        </span>
        <h2 className="text-white text-3xl md:text-6xl lg:text-7xl font-bold tracking-[0.1em] md:tracking-[0.15em] uppercase">
          Portfolio
        </h2>
        <div className="w-12 md:w-16 h-[1px] bg-[#8fbfa8]/30 mt-4 md:mt-6" />
      </div>

      {/* Fixed progress dots */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 portfolio-dots">
        {PROJECTS.map((_, i) => (
          <div
            key={i}
            className={`progress-dot transition-all duration-500 rounded-full ${
              i === 0
                ? 'w-5 h-[2px] bg-[#8fbfa8]/60'
                : 'w-[2px] h-[2px] bg-white/15'
            }`}
          />
        ))}
      </div>

      {/* Project cards — each with 3D perspective, full-height zones */}
      <div className="px-4 md:px-16 lg:px-24" style={{ perspective: '1200px' }}>
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            className="project-card flex flex-col items-center justify-center"
            style={{
              minHeight: '100vh',
              paddingTop: index === 0 ? '2vh' : '0',
              paddingBottom: '2vh',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Project image — landscape, centered */}
            <div className="relative overflow-hidden w-full max-w-5xl rounded-sm" style={{ transformStyle: 'preserve-3d' }}>
              <img
                src={project.image}
                alt={project.title}
                className="project-image w-full aspect-[16/9] object-cover"
              />
              {/* Gradient overlay at bottom of image */}
              <div
                className="absolute bottom-0 left-0 right-0 h-16 md:h-24 pointer-events-none"
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

            {/* Project number indicator */}
            <div className="mt-4 md:mt-6 text-white/10 text-xs tracking-[0.3em] uppercase">
              {String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom spacer */}
      <div className="h-[20vh] bg-[#13140f]" />
    </div>
  );
}
