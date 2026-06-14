'use client';

import { useEffect, useRef, useState } from 'react';
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
 * Portfolio Section — vertical scroll reveal
 * 
 * Each project card slides up from below as user scrolls.
 * Image + label appear together from bottom, scroll naturally upward.
 * Like the reference video: content enters from bottom, exits at top.
 */
export default function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current!.querySelectorAll('.project-card');

      cards.forEach((card) => {
        const image = card.querySelector('.project-image');
        const label = card.querySelector('.project-label');

        // Animate each card: slides up from below as it enters viewport
        gsap.fromTo(card, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 40%',
              scrub: 1,
            },
          }
        );

        // Image scales down slightly as it enters
        gsap.fromTo(image,
          { scale: 1.1 },
          {
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 30%',
              scrub: 1,
            },
          }
        );

        // Label fades in slightly after card
        gsap.fromTo(label,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
              end: 'top 35%',
              scrub: 1,
            },
          }
        );

        // Fade out as card leaves viewport at top
        gsap.to(card, {
          y: -60,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: card,
            start: 'bottom 30%',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      // Section header animation
      const header = containerRef.current!.querySelector('.portfolio-header');
      if (header) {
        gsap.fromTo(header,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, [isReady]);

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

      {/* Project cards — each scrolls naturally from bottom to top */}
      <div className="px-5 md:px-16 lg:px-24 pb-16 space-y-8 md:space-y-12">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="project-card"
            style={{ opacity: 0 }}
          >
            {/* Project image */}
            <div className="relative overflow-hidden w-full">
              <img
                src={project.image}
                alt={project.title}
                className="project-image w-full h-[50vh] md:h-[70vh] lg:h-[80vh] object-cover"
              />
              {/* Subtle gradient overlay at bottom of image */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, #13140f 0%, transparent 100%)',
                }}
              />
            </div>

            {/* Project label — below image */}
            <div className="project-label pt-4 md:pt-6 pb-8 md:pb-12">
              <span className="block text-[#8fbfa8]/60 text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase font-light mb-1.5 md:mb-2">
                {project.category}
              </span>
              <h3 className="text-white text-xl md:text-4xl lg:text-5xl font-bold tracking-[0.08em] md:tracking-[0.12em] uppercase mb-2 md:mb-3">
                {project.title}
              </h3>
              <p className="text-white/45 text-[11px] md:text-base max-w-lg leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom spacer */}
      <div className="h-[20vh] bg-[#13140f]" />
    </div>
  );
}
