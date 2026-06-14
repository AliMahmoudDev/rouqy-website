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
 * Portfolio Section — scroll-up reveal
 * 
 * Each project card rises from below as user scrolls.
 * Uses GSAP ScrollTrigger with scrub for smooth scroll-driven animation.
 * Fallback: IntersectionObserver ensures visibility even if ScrollTrigger misfires.
 */
export default function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx: gsap.Context | null = null;
    let timer: ReturnType<typeof setTimeout>;

    // Wait for layout to settle after the pinned section above
    timer = setTimeout(() => {
      if (!containerRef.current) return;

      // Refresh ScrollTrigger to recalculate positions after pinned section
      ScrollTrigger.refresh();

      ctx = gsap.context(() => {
        // Header animation
        const header = containerRef.current!.querySelector('.portfolio-header');
        if (header) {
          gsap.fromTo(header,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                end: 'top 45%',
                scrub: 1.2,
              },
            }
          );
        }

        // Each card scrolls up from below
        const cards = containerRef.current!.querySelectorAll('.project-card');
        cards.forEach((card) => {
          const image = card.querySelector('.project-image');
          const label = card.querySelector('.project-label');

          // Card rises from below — main scroll-driven animation
          gsap.fromTo(card,
            { y: 120, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 92%',
                end: 'top 50%',
                scrub: 1.2,
                // Force visibility on first enter
                onEnter: () => {
                  gsap.set(card, { visibility: 'visible' });
                },
              },
            }
          );

          // Image scales down slightly as it enters
          if (image) {
            gsap.fromTo(image,
              { scale: 1.08 },
              {
                scale: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 88%',
                  end: 'top 35%',
                  scrub: 1.2,
                },
              }
            );
          }

          // Label fades in slightly after card
          if (label) {
            gsap.fromTo(label,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 75%',
                  end: 'top 40%',
                  scrub: 1.2,
                },
              }
            );
          }

          // Fade out as card leaves viewport at top
          gsap.to(card, {
            y: -40,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: card,
              start: 'bottom 25%',
              end: 'bottom top',
              scrub: 1,
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

  // Fallback: IntersectionObserver to ensure cards become visible
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            // If card is still invisible (ScrollTrigger didn't fire), force it visible
            const computedOpacity = window.getComputedStyle(card).opacity;
            if (parseFloat(computedOpacity) < 0.1) {
              gsap.to(card, { opacity: 1, y: 0, visibility: 'visible', duration: 0.8, ease: 'power2.out' });
            }
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = containerRef.current.querySelectorAll('.project-card');
    cards.forEach((card) => observer.observe(card));

    // Refresh ScrollTrigger when images load (they shift layout)
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    return () => {
      observer.disconnect();
      window.removeEventListener('load', handleLoad);
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

      {/* Project cards — landscape images, each scrolls naturally from bottom to top */}
      <div className="px-4 md:px-16 lg:px-24 pb-16 space-y-10 md:space-y-16">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="project-card"
            style={{ opacity: 0, visibility: 'hidden' }}
          >
            {/* Project image — landscape aspect ratio */}
            <div className="relative overflow-hidden w-full rounded-sm">
              <img
                src={project.image}
                alt={project.title}
                className="project-image w-full aspect-[16/9] md:aspect-[16/9] object-cover"
              />
              {/* Subtle gradient overlay at bottom of image */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, #13140f 0%, transparent 100%)',
                }}
              />
            </div>

            {/* Project label — below image */}
            <div className="project-label pt-4 md:pt-6 pb-6 md:pb-10">
              <span className="block text-[#8fbfa8]/60 text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase font-light mb-1.5 md:mb-2">
                {project.category}
              </span>
              <h3 className="text-white text-xl md:text-3xl lg:text-4xl font-bold tracking-[0.08em] md:tracking-[0.12em] uppercase mb-2 md:mb-3">
                {project.title}
              </h3>
              <p className="text-white/40 text-[11px] md:text-sm max-w-lg leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom spacer */}
      <div className="h-[15vh] bg-[#13140f]" />
    </div>
  );
}
