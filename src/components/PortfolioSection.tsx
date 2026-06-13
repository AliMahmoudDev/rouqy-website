'use client';

import Image from 'next/image';
import { ArrowUpRight, MapPin, Maximize2 } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';
import useParallax3D from '@/hooks/useParallax3D';

const projects = [
  {
    title: 'Golden Wave Dining',
    category: 'Residential',
    location: 'Riyadh, KSA',
    area: '450 sqm',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85',
    description: 'A breathtaking dining experience where golden waves of light dance across hand-selected marble surfaces.',
  },
  {
    title: 'Modern Sanctuary',
    category: 'Interior Design',
    location: 'Abu Dhabi, UAE',
    area: '320 sqm',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85',
    description: 'Where tranquility meets modern luxury — a sanctuary designed for the senses.',
  },
  {
    title: 'Minimalist Suite',
    category: 'Luxury Living',
    location: 'Riyadh, KSA',
    area: '280 sqm',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85',
    description: 'Pure elegance through restraint — every element serves both form and function.',
  },
  {
    title: 'Chandelier Hall',
    category: 'Architectural',
    location: 'Doha, Qatar',
    area: '580 sqm',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85',
    description: 'A grand architectural statement where crystal meets gold in a symphony of light.',
  },
  {
    title: 'Contemporary Space',
    category: 'Commercial',
    location: 'Kuwait City, Kuwait',
    area: '380 sqm',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85',
    description: 'Bold commercial design that redefines workspace as an experience.',
  },
  {
    title: 'Fireplace Lounge',
    category: 'Residential',
    location: 'Jeddah, KSA',
    area: '310 sqm',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=85',
    description: 'Intimate luxury where the warmth of fire meets the coolness of contemporary design.',
  },
];

/* Animated counter component */
function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, started]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function PortfolioSection() {
  const sectionRef = useScrollReveal<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });
  const parallaxRef = useParallax3D<HTMLElement>();

  return (
    <section
      ref={(node) => {
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
        (parallaxRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
      id="portfolio"
      className="relative z-10 pt-24 md:pt-32 pb-32 md:pb-40 px-4 md:px-8 lg:px-12 overflow-hidden"
    >
      {/* Background image for portfolio section — luxury furniture */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=40"
          alt=""
          fill
          className="object-cover"
          style={{ opacity: 0.05 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#161E2D] via-transparent to-[#0B0F18]" />
      </div>

      {/* Architectural blueprint grid lines (hidden on mobile) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] hidden md:block" style={{
        backgroundImage: `
          linear-gradient(rgba(212,175,55,0.4) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,175,55,0.4) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px',
      }} />

      {/* Animated gradient orbs (smaller on mobile) — parallax depth */}
      <div
        className="absolute w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full pointer-events-none animate-breathe"
        data-parallax-depth="0.2"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
          top: '10%',
          right: '-15%',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full pointer-events-none"
        data-parallax-depth="0.3"
        style={{
          background: 'radial-gradient(circle, rgba(37,162,220,0.05) 0%, transparent 70%)',
          bottom: '20%',
          left: '-10%',
          filter: 'blur(50px)',
          animation: 'breathe 6s ease-in-out infinite 1s',
        }}
      />

      {/* Decorative floating lines (hidden on mobile) */}
      <div className="absolute top-0 left-[10%] w-[1px] h-40 decorative-line-vertical opacity-30 animate-float hidden md:block" />
      <div className="absolute top-20 right-[15%] w-[1px] h-32 decorative-line-vertical opacity-20 animate-float-rotate hidden md:block" style={{ animationDelay: '1s' }} />

      {/* ====== MARQUEE TEXT STRIP ====== */}
      <div data-sr="clip-up" data-sr-duration="slow" className="marquee-strip mb-10 md:mb-20 py-4 md:py-6 border-y border-[#2D3A4D]/30">
        <div className="marquee-content">
          {[...Array(3)].map((_, setIdx) => (
            <span key={setIdx} className="inline-flex items-center gap-8 mx-8">
              {['Architecture', 'Interior Design', 'Luxury Living', 'Fit-Out', 'Marble Works', 'Furniture Solutions', 'Concept Design', 'Space Planning'].map((text, i) => (
                <span key={i} className="flex items-center gap-8">
                  <span className="text-[#A0AEC0]/20 text-sm tracking-[0.5em] uppercase whitespace-nowrap">{text}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/30" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto relative">
        {/* === Section Header — organized staggered entrance with 3D === */}
        <div className="mb-12 md:mb-28" data-parallax-depth="0.4">
          <div data-sr="fold-in" data-sr-delay="1" data-sr-duration="slow" className="flex items-center gap-6 mb-6">
            <div className="w-12 h-[1px] bg-[#25A2DC]" style={{ animation: 'line-draw 0.8s cubic-bezier(0.65, 0.05, 0, 1) forwards' }} />
            <p className="text-[#25A2DC] text-xs tracking-[0.5em] uppercase font-light">
              Portfolio
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 data-sr="zoom-3d" data-sr-delay="3" data-sr-duration="grand" data-sr-distance="far" className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[0.95]">
              Selected<br />
              <span className="animate-text-gradient">Works</span>
            </h2>
            <p data-sr="fold-in-right" data-sr-delay="5" data-sr-duration="slow" className="text-[#A0AEC0]/60 text-sm tracking-wider max-w-xs leading-relaxed">
              Each project is a testament to our commitment to crafting spaces that transcend the ordinary.
            </p>
          </div>

          {/* Animated gold line */}
          <div
            data-sr="clip-left"
            data-sr-delay="6"
            data-sr-duration="slow"
            className="mt-8 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, #D4AF37, #25A2DC, transparent)',
              width: '100%',
            }}
          />
        </div>

        {/* === PROJECT GRID — varied animation directions per row === */}
        <div>
          {/* First row: Large hero project + tall project */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 mb-4 md:mb-5">
            {/* Hero project — FLIPS UP FROM BELOW */}
            <div data-sr="flip-up" data-sr-delay="2" data-sr-duration="grand" data-sr-distance="far" className="md:col-span-8" style={{ perspective: '1200px' }}>
              <div className="portfolio-card group relative cursor-pointer" style={{ aspectRatio: '16/9' }}>
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={projects[0].image}
                    alt={projects[0].title}
                    fill
                    className="card-image object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F18]/90 via-[#0B0F18]/20 to-transparent" />
                  <div className="absolute inset-0 bg-[#0B0F18]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="card-number absolute top-6 left-6 z-10">
                    <span className="text-white/15 text-7xl md:text-9xl font-bold tracking-tighter leading-none">01</span>
                  </div>

                  <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <div className="w-12 h-12 border border-[#25A2DC]/50 flex items-center justify-center bg-[#0B0F18]/40 backdrop-blur-sm animate-glow-blue-intense">
                      <ArrowUpRight className="w-5 h-5 text-[#25A2DC]" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                    <div className="card-tag">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-1">
                        {projects[0].category}
                      </span>
                    </div>
                    <h3 className="card-info text-white text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide mt-3">
                      {projects[0].title}
                    </h3>
                    <p className="card-info text-[#A0AEC0]/70 text-sm mt-2 max-w-md">{projects[0].description}</p>
                    <div className="card-info flex items-center gap-4 mt-3 text-[#A0AEC0] text-xs tracking-wider">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{projects[0].location}</span>
                      <span className="flex items-center gap-1"><Maximize2 className="w-3 h-3" />{projects[0].area}</span>
                    </div>
                  </div>

                  <div className="accent-line absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#25A2DC] to-[#D4AF37]" />
                </div>
              </div>
            </div>

            {/* Tall project — FOLDS IN FROM RIGHT */}
            <div data-sr="fold-in-right" data-sr-delay="4" data-sr-duration="grand" data-sr-distance="far" className="md:col-span-4" style={{ perspective: '1200px' }}>
              <div className="portfolio-card group relative cursor-pointer" style={{ aspectRatio: '3/4' }}>
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={projects[1].image}
                    alt={projects[1].title}
                    fill
                    className="card-image object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F18]/90 via-[#0B0F18]/20 to-transparent" />
                  <div className="absolute inset-0 bg-[#0B0F18]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="card-number absolute top-6 left-6 z-10">
                    <span className="text-white/15 text-6xl md:text-7xl font-bold tracking-tighter leading-none">02</span>
                  </div>

                  <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <div className="w-10 h-10 border border-[#25A2DC]/50 flex items-center justify-center bg-[#0B0F18]/40 backdrop-blur-sm">
                      <ArrowUpRight className="w-4 h-4 text-[#25A2DC]" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                    <div className="card-tag">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-1">
                        {projects[1].category}
                      </span>
                    </div>
                    <h3 className="card-info text-white text-xl md:text-2xl font-semibold tracking-wide mt-3">{projects[1].title}</h3>
                    <p className="card-info text-[#A0AEC0]/70 text-xs mt-2">{projects[1].description}</p>
                  </div>

                  <div className="accent-line absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#25A2DC] to-[#D4AF37]" />
                </div>
              </div>
            </div>
          </div>

          {/* Second row: 3 equal cards — alternating left/right with blur */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-5">
            {projects.slice(2, 5).map((project, index) => (
              <div
                key={project.title}
                data-sr={index % 2 === 0 ? 'fold-in' : 'fold-in-right'}
                data-sr-delay={String(index * 2 + 3)}
                data-sr-duration="grand"
                data-sr-distance="normal"
                style={{ perspective: '1200px' }}
              >
                <div className="portfolio-card group relative cursor-pointer" style={{ aspectRatio: '4/5' }}>
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="card-image object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F18]/90 via-[#0B0F18]/20 to-transparent" />
                    <div className="absolute inset-0 bg-[#0B0F18]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="card-number absolute top-5 right-5 z-10">
                      <span className="text-white/15 text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                        {String(index + 3).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="absolute top-5 left-5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <div className="w-10 h-10 border border-[#25A2DC]/50 flex items-center justify-center bg-[#0B0F18]/40 backdrop-blur-sm">
                        <ArrowUpRight className="w-4 h-4 text-[#25A2DC]" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                      <div className="card-tag">
                        <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-1">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="card-info text-white text-lg md:text-xl font-semibold tracking-wide mt-3">{project.title}</h3>
                      <div className="card-info flex items-center gap-3 mt-2 text-[#A0AEC0] text-xs tracking-wider">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{project.location}</span>
                        <span className="flex items-center gap-1"><Maximize2 className="w-3 h-3" />{project.area}</span>
                      </div>
                    </div>

                    <div className="accent-line absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#25A2DC] to-[#D4AF37]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Third row: Full-width — 3D ZOOM IN */}
          <div data-sr="zoom-3d" data-sr-delay="3" data-sr-duration="grand" data-sr-distance="normal" style={{ perspective: '1200px' }}>
            <div className="portfolio-card group relative cursor-pointer mb-4 md:mb-5" style={{ aspectRatio: '21/9' }}>
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={projects[5].image}
                  alt={projects[5].title}
                  fill
                  className="card-image object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F18]/90 via-[#0B0F18]/20 to-transparent" />
                <div className="absolute inset-0 bg-[#0B0F18]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="card-number absolute top-8 left-8 z-10">
                  <span className="text-white/15 text-8xl md:text-[120px] font-bold tracking-tighter leading-none">06</span>
                </div>

                <div className="absolute top-8 right-8 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <div className="w-14 h-14 border border-[#25A2DC]/50 flex items-center justify-center bg-[#0B0F18]/40 backdrop-blur-sm animate-glow-blue-intense">
                    <ArrowUpRight className="w-6 h-6 text-[#25A2DC]" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
                  <div className="max-w-xl">
                    <div className="card-tag">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1.5">
                        {projects[5].category}
                      </span>
                    </div>
                    <h3 className="card-info text-white text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide mt-4">{projects[5].title}</h3>
                    <p className="card-info text-[#A0AEC0]/70 text-sm md:text-base mt-3">{projects[5].description}</p>
                    <div className="card-info flex items-center gap-4 mt-4 text-[#A0AEC0] text-xs tracking-wider">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{projects[5].location}</span>
                      <span className="flex items-center gap-1"><Maximize2 className="w-3 h-3" />{projects[5].area}</span>
                    </div>
                  </div>
                </div>

                <div className="accent-line absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#25A2DC] to-[#D4AF37]" />
              </div>
            </div>
          </div>
        </div>

        {/* === Animated Stats Bar — 3D helix entrance === */}
        <div data-sr="helix" data-sr-delay="2" data-sr-duration="grand" className="mt-10 md:mt-24 pt-6 md:pt-8 border-t border-[#2D3A4D]" data-parallax-depth="0.5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {[
              { value: 200, suffix: '+', label: 'Projects Completed' },
              { value: 5, suffix: '', label: 'Countries' },
              { value: 25, suffix: '+', label: 'Years Experience' },
              { value: 98, suffix: '%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <div key={stat.label} data-sr="up" data-sr-delay={String(i * 2 + 1)} data-sr-duration="slow" data-sr-distance="near" className="text-center md:text-left group">
                <p className="text-2xl md:text-5xl font-bold text-white tracking-tight transition-colors duration-300 group-hover:text-[#25A2DC]">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[#A0AEC0] text-xs tracking-[0.2em] uppercase mt-2">
                  {stat.label}
                </p>
                <div className="mt-2 h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-[#25A2DC] to-[#D4AF37] transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====== SECOND MARQUEE - Reverse direction ====== */}
      <div data-sr="clip-up" data-sr-delay="3" data-sr-duration="slow" className="marquee-strip mt-10 md:mt-20 py-4 md:py-6 border-y border-[#2D3A4D]/30">
        <div className="marquee-content" style={{ animationDirection: 'reverse' }}>
          {[...Array(3)].map((_, setIdx) => (
            <span key={setIdx} className="inline-flex items-center gap-12 mx-10">
              {['Riyadh', 'Abu Dhabi', 'Doha', 'Kuwait', 'Jeddah', 'Dubai', 'Cairo', 'Muscat'].map((city, i) => (
                <span key={i} className="flex items-center gap-12">
                  <span className="text-[#A0AEC0]/15 text-lg tracking-[0.4em] uppercase whitespace-nowrap font-light">{city}</span>
                  <span className="w-1 h-1 rounded-full bg-[#25A2DC]/30" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
