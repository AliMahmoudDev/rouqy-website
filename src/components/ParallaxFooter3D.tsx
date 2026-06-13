'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxFooter3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const main = mainRef.current;
    const cta = ctaRef.current;
    if (!section || !main || !cta) return;

    // Main content lifts and tilts to reveal CTA behind
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    // Main content tilts back and lifts
    tl.to(main, {
      rotateX: 3,
      scale: 0.97,
      y: -40,
      boxShadow: '0 50px 100px rgba(0,0,0,0.6), 0 0 100px rgba(0,0,0,0.3)',
      duration: 1,
      ease: 'power2.inOut',
    }, 0);

    // CTA section pushes forward
    tl.fromTo(cta, {
      z: -100,
      opacity: 0.5,
      scale: 0.95,
    }, {
      z: 50,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: 'power2.inOut',
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[120vh] bg-[#060810] overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* CTA Section (revealed behind) */}
      <div
        ref={ctaRef}
        className="absolute inset-0 flex items-center justify-center z-0"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Warm ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(37,162,220,0.05) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }} />

        <div className="relative z-10 text-center px-6 md:px-16 max-w-4xl mx-auto">
          <span className="text-[10px] tracking-[0.6em] uppercase text-[#D4AF37]/60 block mb-6">Ready to Begin?</span>
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-6" style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #D4AF37 50%, #25A2DC 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Transform Your<br />Space Today
          </h2>
          <p className="text-[#A0AEC0]/60 text-base md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Let&apos;s create something extraordinary together. Our team of designers is ready to turn your vision into a living masterpiece.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="group relative px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-semibold text-[#0B0F18] overflow-hidden transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #E8C84A)',
                boxShadow: '0 0 40px rgba(212,175,55,0.3), 0 10px 40px rgba(212,175,55,0.2)',
              }}
            >
              <span className="relative z-10">Book a Consultation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#25A2DC] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
            <a
              href="#portfolio"
              className="px-10 py-4 text-[11px] tracking-[0.3em] uppercase font-semibold text-[#A0AEC0]/70 border border-[#A0AEC0]/20 hover:border-[#D4AF37]/40 hover:text-white transition-all duration-500"
            >
              View Portfolio
            </a>
          </div>

          {/* Floating decorative elements */}
          <div className="absolute -top-20 -left-10 w-20 h-20 border border-[#D4AF37]/10 rotate-45 animate-pulse" />
          <div className="absolute -bottom-16 -right-10 w-16 h-16 border border-[#25A2DC]/10 rotate-12 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Main content overlay (lifts to reveal CTA) */}
      <div
        ref={mainRef}
        className="relative z-10 bg-[#0B0F18] min-h-screen flex items-center"
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'top center',
          boxShadow: '0 0 0 rgba(0,0,0,0)',
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-6 md:px-16 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { number: '200+', label: 'Projects Completed', icon: '🏗', accent: '#D4AF37' },
              { number: '25+', label: 'Years of Excellence', icon: '✦', accent: '#25A2DC' },
              { number: '98%', label: 'Client Satisfaction', icon: '◆', accent: '#D4AF37' },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-8 md:p-10 rounded-xl border border-white/5 transition-all duration-500 hover:border-white/10 hover:bg-white/[0.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.02), transparent)',
                }}
              >
                <div className="text-3xl mb-4">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{
                  background: `linear-gradient(135deg, ${stat.accent}, #FFFFFF)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {stat.number}
                </div>
                <div className="text-[#A0AEC0]/50 text-xs tracking-[0.2em] uppercase">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="text-center mt-16 opacity-30">
            <span className="text-[9px] tracking-[0.4em] uppercase text-[#A0AEC0] block mb-3">Scroll to discover more</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
