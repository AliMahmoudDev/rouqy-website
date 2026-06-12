'use client';

import { Instagram, Mail, Send, ArrowUpRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const budgetRanges = [
  '$50K - $100K',
  '$100K - $250K',
  '$250K - $500K',
  '$500K+',
];

export default function ContactSection() {
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const sectionRef = useRef<HTMLElement>(null);

  /* CSS scroll-triggered animations via IntersectionObserver */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .stagger-children');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
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
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative z-10 py-24 md:py-32 px-4 md:px-8 overflow-hidden">
      {/* Background gradient animation */}
      <div className="absolute inset-0 pointer-events-none bg-mesh" />

      {/* Animated grid lines — architectural blueprint style */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(rgba(37,162,220,0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(37,162,220,0.3) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }} />

      {/* Decorative orbs */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none animate-breathe"
        style={{
          background: 'radial-gradient(circle, rgba(37,162,220,0.05) 0%, transparent 70%)',
          top: '20%',
          left: '-10%',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
          bottom: '30%',
          right: '-5%',
          filter: 'blur(40px)',
          animation: 'breathe 5s ease-in-out infinite 1.5s',
        }}
      />

      {/* Floating geometric accents */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 60,
          height: 60,
          top: '10%',
          right: '8%',
          border: '1px solid rgba(212,175,55,0.08)',
          transform: 'rotate(45deg)',
          animation: 'float-rotate 8s ease-in-out infinite, breathe 5s ease-in-out infinite',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 40,
          height: 40,
          bottom: '20%',
          left: '5%',
          border: '1px solid rgba(37,162,220,0.06)',
          borderRadius: '50%',
          animation: 'float 7s ease-in-out infinite 1s',
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div id="contact-header" className="mb-16 md:mb-20 scroll-reveal">
          <p className="text-[#25A2DC] text-sm tracking-[0.4em] uppercase mb-4">Contact</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Let&apos;s Create <span className="animate-text-gradient">Together</span>
          </h2>
          <div className="mt-4 w-16 h-[2px] bg-[#25A2DC]" style={{ animation: 'line-draw 0.8s ease forwards' }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Form */}
          <div id="contact-form" className="scroll-reveal-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[#A0AEC0] text-sm tracking-wider uppercase">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  className="bg-transparent border-[#2D3A4D] text-white placeholder:text-[#A0AEC0]/40 focus:border-[#25A2DC] rounded-none h-12 text-base transition-all duration-300 focus:shadow-[0_0_15px_rgba(37,162,220,0.15)]"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-[#A0AEC0] text-sm tracking-wider uppercase">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="bg-transparent border-[#2D3A4D] text-white placeholder:text-[#A0AEC0]/40 focus:border-[#25A2DC] rounded-none h-12 text-base transition-all duration-300 focus:shadow-[0_0_15px_rgba(37,162,220,0.15)]"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#A0AEC0] text-sm tracking-wider uppercase">
                  Budget Range
                </label>
                <div className="flex flex-wrap gap-2">
                  {budgetRanges.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setSelectedBudget(range)}
                      className={`px-4 py-2 text-xs tracking-wider uppercase border transition-all duration-300 ${
                        selectedBudget === range
                          ? 'border-[#25A2DC] bg-[#25A2DC]/10 text-[#25A2DC] shadow-[0_0_15px_rgba(37,162,220,0.2)]'
                          : 'border-[#2D3A4D] text-[#A0AEC0] hover:border-[#25A2DC]/50 hover:text-[#25A2DC]'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-[#A0AEC0] text-sm tracking-wider uppercase">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="bg-transparent border-[#2D3A4D] text-white placeholder:text-[#A0AEC0]/40 focus:border-[#25A2DC] rounded-none text-base resize-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(37,162,220,0.15)]"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button
                type="submit"
                disabled={formState === 'sending'}
                className="group w-full md:w-auto bg-[#25A2DC] hover:bg-[#1B8BBE] text-white tracking-widest uppercase text-sm h-12 px-10 rounded-none border border-[#25A2DC] hover:border-[#1B8BBE] transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,162,220,0.3)] flex items-center gap-3"
              >
                {formState === 'sending' ? 'Sending...' : formState === 'sent' ? 'Message Sent!' : 'Send Message'}
                <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              {formState === 'sent' && (
                <p className="text-[#25A2DC] text-sm mt-2" style={{ animation: 'fade-in-up 0.5s ease forwards' }}>
                  Thank you! We&apos;ll get back to you within 24 hours.
                </p>
              )}
              {formState === 'error' && (
                <p className="text-red-400 text-sm mt-2" style={{ animation: 'fade-in-up 0.5s ease forwards' }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div id="contact-info" className="space-y-10 scroll-reveal-right">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-8">
              {[
                { value: '200+', label: 'Projects Completed' },
                { value: '25+', label: 'Years Experience' },
                { value: '24h', label: 'Response Time' },
                { value: '580+', label: 'Sq Meters Largest Project' },
              ].map((stat, i) => (
                <div key={stat.label} className="group cursor-default">
                  <p className="text-3xl md:text-4xl font-bold text-white tracking-tight transition-colors duration-300 group-hover:text-[#25A2DC]">
                    {stat.value}
                  </p>
                  <p className="text-[#A0AEC0] text-sm tracking-wider uppercase mt-1">{stat.label}</p>
                  <div className="mt-2 h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-[#25A2DC] to-[#D4AF37] transition-all duration-500" />
                </div>
              ))}
            </div>

            {/* Divider with animation */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#2D3A4D] to-transparent" style={{ animation: 'line-draw 1s ease forwards' }} />

            {/* Contact Links */}
            <div className="space-y-6">
              <a
                href="https://www.instagram.com/harmens.design/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-white hover:text-[#25A2DC] transition-colors duration-300"
              >
                <div className="w-12 h-12 border border-[#2D3A4D] group-hover:border-[#25A2DC] group-hover:shadow-[0_0_15px_rgba(37,162,220,0.2)] flex items-center justify-center transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm tracking-wider uppercase text-[#A0AEC0]">Instagram</p>
                  <p className="text-base font-medium">@harmens.design</p>
                </div>
                <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 text-[#25A2DC]" />
              </a>

              <a
                href="mailto:info@harmensdesign.com"
                className="group flex items-center gap-4 text-white hover:text-[#25A2DC] transition-colors duration-300"
              >
                <div className="w-12 h-12 border border-[#2D3A4D] group-hover:border-[#25A2DC] group-hover:shadow-[0_0_15px_rgba(37,162,220,0.2)] flex items-center justify-center transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm tracking-wider uppercase text-[#A0AEC0]">Email</p>
                  <p className="text-base font-medium">info@harmensdesign.com</p>
                </div>
                <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 text-[#25A2DC]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 md:mt-32 pt-8 border-t border-[#2D3A4D]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[#A0AEC0] text-sm">
          <p className="tracking-wider">&copy; {new Date().getFullYear()} HARMENS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/harmens.design/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#25A2DC] transition-colors duration-300 tracking-wider uppercase text-xs"
            >
              Instagram
            </a>
            <a
              href="mailto:info@harmensdesign.com"
              className="hover:text-[#25A2DC] transition-colors duration-300 tracking-wider uppercase text-xs"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
