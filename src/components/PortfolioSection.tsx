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
 * Portfolio Section — scroll-driven project reveal
 * 
 * Each project appears one at a time as user scrolls.
 * Image slides in + label fades in → hold → image slides out + label fades out
 * 
 * Uses GSAP ScrollTrigger with pinning for each project.
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

      cards.forEach((card, i) => {
        const image = card.querySelector('.project-image');
        const label = card.querySelector('.project-label');
        const overlay = card.querySelector('.project-overlay');

        // Set initial states
        gsap.set(image, { scale: 1.15, opacity: 0 });
        gsap.set(label, { opacity: 0, y: 40 });
        gsap.set(overlay, { opacity: 1 });

        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top top',
            end: '+=150vh',
            pin: true,
            pinSpacing: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        // --- Image scales down and fades in (0-25%) ---
        cardTl.to(image, {
          scale: 1,
          opacity: 1,
          duration: 0.25,
          ease: 'power2.out',
        });

        // --- Overlay fades out (0-25%) ---
        cardTl.to(overlay, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
        }, '<');

        // --- Label fades in (15-30%) ---
        cardTl.to(label, {
          opacity: 1,
          y: 0,
          duration: 0.15,
          ease: 'power2.out',
        }, '-=0.15');

        // --- Hold the project (30-65%) ---
        cardTl.to({}, { duration: 0.35 });

        // --- Label fades out (65-75%) ---
        cardTl.to(label, {
          opacity: 0,
          y: -20,
          duration: 0.1,
          ease: 'power2.in',
        });

        // --- Image scales up slightly and fades out (75-100%) ---
        cardTl.to(image, {
          scale: 1.05,
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
        });

        // --- Overlay fades back in ---
        cardTl.to(overlay, {
          opacity: 1,
          duration: 0.15,
          ease: 'power2.in',
        }, '-=0.15');
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <div ref={containerRef} className="relative bg-[#13140f]">
      {/* Section header */}
      <div className="relative h-[50vh] md:h-[60vh] flex flex-col items-center justify-center bg-[#13140f]">
        <span className="text-[#8fbfa8]/50 text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.5em] uppercase font-light mb-4 md:mb-6">
          Selected Works
        </span>
        <h2 className="text-white text-3xl md:text-6xl lg:text-7xl font-bold tracking-[0.1em] md:tracking-[0.15em] uppercase">
          Portfolio
        </h2>
        <div className="w-12 md:w-16 h-[1px] bg-[#8fbfa8]/30 mt-4 md:mt-6" />
      </div>

      {/* Project cards — each pinned for scroll animation */}
      {PROJECTS.map((project, i) => (
        <div
          key={project.id}
          className="project-card relative h-screen w-full overflow-hidden bg-[#13140f]"
        >
          {/* Background overlay (fades out to reveal image) */}
          <div
            className="project-overlay absolute inset-0 z-10 bg-[#13140f]"
            style={{ opacity: 1 }}
          />

          {/* Project image */}
          <div className="absolute inset-0 flex items-center justify-center px-6 md:px-16 lg:px-24">
            <img
              src={project.image}
              alt={project.title}
              className="project-image w-full h-[75vh] md:h-[80vh] object-cover"
              style={{ opacity: 0 }}
            />
          </div>

          {/* Project label — appears below image */}
          <div
            className="project-label absolute bottom-6 md:bottom-12 lg:bottom-16 left-6 md:left-16 lg:left-24 z-20"
            style={{ opacity: 0 }}
          >
            <span className="block text-[#8fbfa8]/60 text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase font-light mb-1 md:mb-2">
              {project.category}
            </span>
            <h3 className="text-white text-xl md:text-4xl lg:text-5xl font-bold tracking-[0.08em] md:tracking-[0.12em] uppercase mb-2 md:mb-3">
              {project.title}
            </h3>
            <p className="text-white/45 text-[11px] md:text-base max-w-md leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      ))}

      {/* Bottom spacer */}
      <div className="h-[30vh] bg-[#13140f]" />
    </div>
  );
}
