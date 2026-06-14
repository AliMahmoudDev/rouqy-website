'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Mail, ArrowUpRight, Phone, MapPin } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

/**
 * Contact Section — centered form + contact links
 * 
 * Everything centered. No budget field, no stats.
 * Form on top, contact links below, all centered.
 */
export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
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

        // Contact links stagger
        const contactLinks = containerRef.current!.querySelectorAll('.contact-link');
        contactLinks.forEach((link, i) => {
          gsap.fromTo(link,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
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
              gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    const elements = containerRef.current.querySelectorAll(
      '.contact-header, .contact-form-container, .contact-link, .contact-footer'
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
    `w-full bg-transparent border-b text-white placeholder:text-white/20 text-sm md:text-base py-3 md:py-4 transition-all duration-500 outline-none text-center ${
      focusedField === fieldName
        ? 'border-[#8fbfa8]'
        : 'border-[#2a3a2e] hover:border-white/20'
    }`;

  return (
    <div ref={containerRef} className="relative bg-[#13140f]">
      <section className="relative z-10 py-20 md:py-36 px-5 md:px-16 lg:px-24">
        {/* Section Header — centered */}
        <div className="contact-header mb-12 md:mb-20 flex flex-col items-center text-center" style={{ opacity: 0 }}>
          <span className="text-[#8fbfa8]/50 text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.5em] uppercase font-light mb-4 md:mb-6">
            Get in Touch
          </span>
          <h2 className="text-white text-3xl md:text-5xl lg:text-7xl font-bold tracking-[0.1em] md:tracking-[0.15em] uppercase">
            Contact
          </h2>
          <div className="w-12 md:w-16 h-[1px] bg-[#8fbfa8]/30 mt-4 md:mt-6" />
        </div>

        {/* Form + Info — centered */}
        <div className="max-w-2xl mx-auto">

          {/* Contact Form — centered */}
          <div className="contact-form-container" style={{ opacity: 0 }}>
            <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
              {/* Name */}
              <div className="relative">
                <label className="block text-[#8fbfa8]/40 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 text-center transition-colors duration-300">
                  Name
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
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#8fbfa8] transition-all duration-500"
                  style={{
                    width: focusedField === 'name' ? '100%' : '0%',
                  }}
                />
              </div>

              {/* Email */}
              <div className="relative">
                <label className="block text-[#8fbfa8]/40 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 text-center transition-colors duration-300">
                  Email
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
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#8fbfa8] transition-all duration-500"
                  style={{
                    width: focusedField === 'email' ? '100%' : '0%',
                  }}
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <label className="block text-[#8fbfa8]/40 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 text-center transition-colors duration-300">
                  Phone
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
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#8fbfa8] transition-all duration-500"
                  style={{
                    width: focusedField === 'phone' ? '100%' : '0%',
                  }}
                />
              </div>

              {/* Message */}
              <div className="relative">
                <label className="block text-[#8fbfa8]/40 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2 text-center transition-colors duration-300">
                  Message
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
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#8fbfa8] transition-all duration-500"
                  style={{
                    width: focusedField === 'message' ? '100%' : '0%',
                  }}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="group relative overflow-hidden border border-[#8fbfa8]/30 text-[#8fbfa8] tracking-[0.25em] uppercase text-xs md:text-sm h-12 md:h-14 px-10 md:px-14 transition-all duration-500 hover:border-[#8fbfa8] hover:text-white"
                >
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
              </div>

              {/* Status Messages */}
              {formState === 'sent' && (
                <p className="text-[#8fbfa8]/70 text-xs md:text-sm tracking-wider text-center">
                  Thank you! We&apos;ll get back to you within 24 hours.
                </p>
              )}
              {formState === 'error' && (
                <p className="text-red-400/70 text-xs md:text-sm tracking-wider text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#2a3a2e] to-transparent my-10 md:my-14" />

          {/* Contact Links — centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-xl mx-auto">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              const content = (
                <div
                  key={item.label}
                  className="contact-link group flex items-center gap-3 transition-colors duration-300 justify-center sm:justify-start"
                  style={{ opacity: 0 }}
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 border border-[#2a3a2e] group-hover:border-[#8fbfa8]/30 flex items-center justify-center transition-all duration-400 shrink-0">
                    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/40 group-hover:text-[#8fbfa8] transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-[#8fbfa8]/30 text-[9px] md:text-[10px] tracking-[0.2em] uppercase">
                      {item.label}
                    </p>
                    <p className="text-white/60 text-xs md:text-sm group-hover:text-white transition-colors duration-300">
                      {item.value}
                    </p>
                  </div>
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
