'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Mail, ArrowUpRight, Phone, MapPin } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const budgetRanges = [
  '$50K - $100K',
  '$100K - $250K',
  '$250K - $500K',
  '$500K+',
];

const contactInfo = [
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@rouqy.design',
    href: 'https://www.instagram.com/rouqy.design/',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@rouqy.com',
    href: 'mailto:info@rouqy.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+966 XX XXX XXXX',
    href: 'tel:+966XXXXXXXXX',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Riyadh, Saudi Arabia',
    href: null,
  },
];

const stats = [
  { value: '200+', label: 'Projects Completed' },
  { value: '15+', label: 'Years Experience' },
  { value: '24h', label: 'Response Time' },
  { value: '98%', label: 'Client Satisfaction' },
];

/**
 * Contact Section — Professional form + info, ROUQY branded
 * 
 * Dark green theme with scroll-driven GSAP animations.
 * Left: Contact form with name, email, budget, message.
 * Right: Stats, contact links, social.
 * Bottom: Minimal footer.
 */
export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx: gsap.Context | null = null;
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      ScrollTrigger.refresh();

      ctx = gsap.context(() => {
        // Header animation
        const header = containerRef.current!.querySelector('.contact-header');
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
                scrub: 1.2,
              },
            }
          );
        }

        // Form container animation
        const formContainer = containerRef.current!.querySelector('.contact-form-container');
        if (formContainer) {
          gsap.fromTo(formContainer,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: formContainer,
                start: 'top 85%',
                end: 'top 45%',
                scrub: 1.2,
              },
            }
          );
        }

        // Info container animation
        const infoContainer = containerRef.current!.querySelector('.contact-info-container');
        if (infoContainer) {
          gsap.fromTo(infoContainer,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: infoContainer,
                start: 'top 82%',
                end: 'top 42%',
                scrub: 1.2,
              },
            }
          );
        }

        // Stats stagger
        const statItems = containerRef.current!.querySelectorAll('.stat-item');
        statItems.forEach((item, i) => {
          gsap.fromTo(item,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: i * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                end: 'top 55%',
                scrub: 1,
              },
            }
          );
        });

        // Contact links stagger
        const contactLinks = containerRef.current!.querySelectorAll('.contact-link');
        contactLinks.forEach((link, i) => {
          gsap.fromTo(link,
            { x: 30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              delay: i * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: link,
                start: 'top 90%',
                end: 'top 55%',
                scrub: 1,
              },
            }
          );
        });

        // Footer animation
        const footer = containerRef.current!.querySelector('.contact-footer');
        if (footer) {
          gsap.fromTo(footer,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: footer,
                start: 'top 95%',
                end: 'top 80%',
                scrub: 1,
              },
            }
          );
        }

      }, containerRef);
    }, 600);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  // IntersectionObserver fallback
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const computedOpacity = window.getComputedStyle(el).opacity;
            if (parseFloat(computedOpacity) < 0.1) {
              gsap.to(el, { opacity: 1, y: 0, x: 0, duration: 0.8, ease: 'power2.out' });
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    const elements = containerRef.current.querySelectorAll(
      '.contact-header, .contact-form-container, .contact-info-container, .stat-item, .contact-link, .contact-footer'
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      budget: selectedBudget,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFormState('sent');
        (e.target as HTMLFormElement).reset();
        setSelectedBudget('');
        setTimeout(() => setFormState('idle'), 4000);
      } else {
        setFormState('error');
        setTimeout(() => setFormState('idle'), 3000);
      }
    } catch {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000);
    }
  };

  const inputClasses = (fieldName: string) =>
    `w-full bg-transparent border-b text-white placeholder:text-white/20 text-sm md:text-base py-3 md:py-4 transition-all duration-500 outline-none ${
      focusedField === fieldName
        ? 'border-[#8fbfa8]'
        : 'border-[#2a3a2e] hover:border-white/20'
    }`;

  return (
    <div ref={containerRef} className="relative bg-[#13140f]">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 70% 50%, rgba(29,55,45,0.04) 0%, transparent 70%)',
        }}
      />

      <section className="relative z-10 py-20 md:py-36 px-5 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="contact-header mb-12 md:mb-20" style={{ opacity: 0 }}>
          <span className="block text-[#8fbfa8]/50 text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.5em] uppercase font-light mb-4 md:mb-6">
            Get in Touch
          </span>
          <h2 className="text-white text-3xl md:text-5xl lg:text-7xl font-bold tracking-[0.1em] md:tracking-[0.15em] uppercase">
            Contact
          </h2>
          <div className="w-12 md:w-16 h-[1px] bg-[#8fbfa8]/30 mt-4 md:mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 max-w-7xl">
          {/* Left — Contact Form */}
          <div className="contact-form-container" style={{ opacity: 0 }}>
            <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
              {/* Name */}
              <div className="relative">
                <label className="block text-[#8fbfa8]/40 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 transition-colors duration-300">
                  {focusedField === 'name' ? 'Your Name' : 'Name'}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={inputClasses('name')}
                  placeholder="Full name"
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
                <div
                  className="absolute bottom-0 left-0 h-[1px] bg-[#8fbfa8] transition-all duration-500"
                  style={{
                    width: focusedField === 'name' ? '100%' : '0%',
                  }}
                />
              </div>

              {/* Email */}
              <div className="relative">
                <label className="block text-[#8fbfa8]/40 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 transition-colors duration-300">
                  {focusedField === 'email' ? 'Your Email' : 'Email'}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={inputClasses('email')}
                  placeholder="your@email.com"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
                <div
                  className="absolute bottom-0 left-0 h-[1px] bg-[#8fbfa8] transition-all duration-500"
                  style={{
                    width: focusedField === 'email' ? '100%' : '0%',
                  }}
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <label className="block text-[#8fbfa8]/40 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 transition-colors duration-300">
                  {focusedField === 'phone' ? 'Your Phone' : 'Phone'}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={inputClasses('phone')}
                  placeholder="+966 XX XXX XXXX"
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                />
                <div
                  className="absolute bottom-0 left-0 h-[1px] bg-[#8fbfa8] transition-all duration-500"
                  style={{
                    width: focusedField === 'phone' ? '100%' : '0%',
                  }}
                />
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-[#8fbfa8]/40 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3">
                  Budget Range
                </label>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {budgetRanges.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setSelectedBudget(range === selectedBudget ? '' : range)}
                      className={`px-3 md:px-4 py-2 text-[10px] md:text-xs tracking-[0.15em] uppercase border transition-all duration-400 ${
                        selectedBudget === range
                          ? 'border-[#8fbfa8]/60 bg-[#1d372d]/20 text-[#8fbfa8]'
                          : 'border-[#2a3a2e] text-white/30 hover:border-white/20 hover:text-white/50'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <label className="block text-[#8fbfa8]/40 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 transition-colors duration-300">
                  {focusedField === 'message' ? 'Tell Us About Your Project' : 'Message'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className={`${inputClasses('message')} resize-none`}
                  placeholder="Describe your vision..."
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                />
                <div
                  className="absolute bottom-0 left-0 h-[1px] bg-[#8fbfa8] transition-all duration-500"
                  style={{
                    width: focusedField === 'message' ? '100%' : '0%',
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formState === 'sending'}
                className="group relative w-full md:w-auto overflow-hidden border border-[#8fbfa8]/30 text-[#8fbfa8] tracking-[0.25em] uppercase text-xs md:text-sm h-12 md:h-14 px-10 md:px-14 transition-all duration-500 hover:border-[#8fbfa8] hover:text-white"
              >
                {/* Hover fill effect */}
                <span
                  className="absolute inset-0 bg-[#8fbfa8] origin-left transition-transform duration-500 ease-out"
                  style={{
                    transform: formState === 'sending' || formState === 'sent'
                      ? 'scaleX(1)'
                      : 'scaleX(0)',
                    transformOrigin: 'left',
                  }}
                />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {formState === 'sending' ? (
                    'Sending...'
                  ) : formState === 'sent' ? (
                    'Sent Successfully'
                  ) : formState === 'error' ? (
                    'Try Again'
                  ) : (
                    <>
                      Send Message
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </span>
              </button>

              {/* Status Messages */}
              {formState === 'sent' && (
                <p className="text-[#8fbfa8]/70 text-xs md:text-sm tracking-wider">
                  Thank you! We&apos;ll get back to you within 24 hours.
                </p>
              )}
              {formState === 'error' && (
                <p className="text-red-400/70 text-xs md:text-sm tracking-wider">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>

          {/* Right — Info & Stats */}
          <div className="contact-info-container space-y-10 md:space-y-14" style={{ opacity: 0 }}>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-item group cursor-default" style={{ opacity: 0 }}>
                  <p className="text-2xl md:text-4xl font-bold text-white tracking-tight transition-colors duration-500 group-hover:text-[#8fbfa8]">
                    {stat.value}
                  </p>
                  <p className="text-white/25 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-1">
                    {stat.label}
                  </p>
                  <div className="mt-2 h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-[#8fbfa8]/40 to-transparent transition-all duration-700" />
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#2a3a2e] to-transparent" />

            {/* Contact Links */}
            <div className="space-y-4 md:space-y-5">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div
                    key={item.label}
                    className="contact-link group flex items-center gap-4 transition-colors duration-300"
                    style={{ opacity: 0 }}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 border border-[#2a3a2e] group-hover:border-[#8fbfa8]/30 flex items-center justify-center transition-all duration-400">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-white/40 group-hover:text-[#8fbfa8] transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#8fbfa8]/30 text-[10px] md:text-xs tracking-[0.25em] uppercase">
                        {item.label}
                      </p>
                      <p className="text-white/60 text-sm md:text-base group-hover:text-white transition-colors duration-300">
                        {item.value}
                      </p>
                    </div>
                    {item.href && (
                      <ArrowUpRight className="w-4 h-4 text-[#8fbfa8] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0" />
                    )}
                  </div>
                );

                if (item.href) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block"
                    >
                      {content}
                    </a>
                  );
                }
                return <div key={item.label}>{content}</div>;
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="contact-footer px-5 md:px-16 lg:px-24 py-6 md:py-8 border-t border-[#2a3a2e]/50" style={{ opacity: 0 }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-[10px] md:text-xs tracking-[0.2em] uppercase">
            &copy; {new Date().getFullYear()} ROUQY. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/rouqy.design/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-[#8fbfa8]/60 transition-colors duration-300 tracking-[0.2em] uppercase text-[10px] md:text-xs"
            >
              Instagram
            </a>
            <a
              href="mailto:info@rouqy.com"
              className="text-white/20 hover:text-[#8fbfa8]/60 transition-colors duration-300 tracking-[0.2em] uppercase text-[10px] md:text-xs"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
