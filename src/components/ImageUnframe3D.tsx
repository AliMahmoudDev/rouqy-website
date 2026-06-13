'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Bespoke Design',
    description: 'Every project is a unique expression of our client\'s vision, crafted with meticulous attention to detail and an unwavering commitment to excellence.',
    icon: '✦',
    accent: '#D4AF37',
  },
  {
    title: 'Material Mastery',
    description: 'We source the world\'s finest materials — from Italian marble to hand-stitched leather — ensuring every surface tells a story of luxury and craftsmanship.',
    icon: '◈',
    accent: '#25A2DC',
  },
  {
    title: 'Timeless Elegance',
    description: 'Our designs transcend trends. We create spaces that age gracefully, becoming more beautiful and meaningful with each passing year.',
    icon: '◇',
    accent: '#D4AF37',
  },
];

const showcaseImage = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85';

export default function ImageUnframe3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!section || !frame || !image || !content) return;

    // Animate frame receding and image stepping forward
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'center center',
        scrub: 1,
      },
    });

    // Frame: recedes and fades
    tl.fromTo(frame, {
      scale: 1,
      opacity: 1,
      rotateX: 0,
    }, {
      scale: 0.88,
      opacity: 0.3,
      rotateX: 8,
      duration: 1,
      ease: 'power2.inOut',
    }, 0);

    // Image: steps forward out of frame
    tl.fromTo(image, {
      z: 0,
      scale: 1,
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
    }, {
      z: 100,
      scale: 1.05,
      boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 120px rgba(212,175,55,0.15)',
      duration: 1,
      ease: 'power2.inOut',
    }, 0);

    // Content: fades in
    tl.fromTo(content, {
      opacity: 0,
      y: 60,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
    }, 0.3);

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#0B0F18] flex items-center overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 60%)',
        filter: 'blur(80px)',
      }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Image with frame */}
          <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
            {/* Decorative frame */}
            <div
              ref={frameRef}
              className="absolute -inset-4 md:-inset-6 rounded-xl pointer-events-none"
              style={{
                border: '2px solid rgba(212,175,55,0.3)',
                boxShadow: 'inset 0 0 30px rgba(212,175,55,0.05), 0 0 30px rgba(212,175,55,0.05)',
              }}
            >
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/50" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/50" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-[#25A2DC]/50" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-[#25A2DC]/50" />
            </div>

            {/* Image */}
            <div
              ref={imageRef}
              className="relative rounded-xl overflow-hidden h-[400px] md:h-[550px]"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <img
                src={showcaseImage}
                alt="HARMENS Interior Design"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              {/* Shine overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
              }} />
            </div>
          </div>

          {/* Right: Content */}
          <div ref={contentRef} style={{ opacity: 0 }}>
            <span className="text-[10px] tracking-[0.6em] uppercase text-[#D4AF37]/60 block mb-4">Our Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Where Art<br />Meets Home
            </h2>
            <p className="text-[#A0AEC0]/70 text-base md:text-lg leading-relaxed mb-10">
              At HARMENS, we believe every space should tell a story. Our designs are not just interiors — 
              they are living artworks that evolve with you, creating an atmosphere that resonates with your 
              soul before it meets your eyes.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-lg transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${feature.accent}10`,
                      border: `1px solid ${feature.accent}30`,
                      color: feature.accent,
                    }}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm md:text-base mb-1">{feature.title}</h4>
                    <p className="text-[#A0AEC0]/50 text-xs md:text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
