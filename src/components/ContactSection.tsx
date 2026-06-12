'use client';

import { motion } from 'framer-motion';
import { Instagram, Mail, Send, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.65, 0.05, 0, 1] },
  },
};

const budgetRanges = [
  '$50K - $100K',
  '$100K - $250K',
  '$250K - $500K',
  '$500K+',
];

export default function ContactSection() {
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

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
    <section id="contact" className="relative z-10 py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
        >
          <p className="text-[#25A2DC] text-sm tracking-[0.4em] uppercase mb-4">Contact</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Let&apos;s Create Together
          </h2>
          <div className="mt-4 w-16 h-[2px] bg-[#25A2DC]" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.65, 0.05, 0, 1] },
              },
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[#A0AEC0] text-sm tracking-wider uppercase">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  className="bg-transparent border-[#2D3A4D] text-white placeholder:text-[#A0AEC0]/40 focus:border-[#25A2DC] rounded-none h-12 text-base"
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
                  className="bg-transparent border-[#2D3A4D] text-white placeholder:text-[#A0AEC0]/40 focus:border-[#25A2DC] rounded-none h-12 text-base"
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
                          ? 'border-[#25A2DC] bg-[#25A2DC]/10 text-[#25A2DC]'
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
                  className="bg-transparent border-[#2D3A4D] text-white placeholder:text-[#A0AEC0]/40 focus:border-[#25A2DC] rounded-none text-base resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button
                type="submit"
                disabled={formState === 'sending'}
                className="w-full md:w-auto bg-[#25A2DC] hover:bg-[#1B8BBE] text-white tracking-widest uppercase text-sm h-12 px-10 rounded-none border border-[#25A2DC] hover:border-[#1B8BBE] transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,162,220,0.3)] flex items-center gap-3"
              >
                {formState === 'sending' ? 'Sending...' : formState === 'sent' ? 'Message Sent!' : 'Send Message'}
                <Send className="w-4 h-4" />
              </Button>

              {formState === 'sent' && (
                <p className="text-[#25A2DC] text-sm mt-2">Thank you! We&apos;ll get back to you within 24 hours.</p>
              )}
              {formState === 'error' && (
                <p className="text-red-400 text-sm mt-2">Something went wrong. Please try again.</p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.2, ease: [0.65, 0.05, 0, 1] },
              },
            }}
          >
            {/* Stats */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">200+</p>
                <p className="text-[#A0AEC0] text-sm tracking-wider uppercase mt-1">Projects Completed</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">25+</p>
                <p className="text-[#A0AEC0] text-sm tracking-wider uppercase mt-1">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">24h</p>
                <p className="text-[#A0AEC0] text-sm tracking-wider uppercase mt-1">Response Time</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">580+</p>
                <p className="text-[#A0AEC0] text-sm tracking-wider uppercase mt-1">Sq Meters Largest Project</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[#2D3A4D]" />

            {/* Contact Links */}
            <div className="space-y-6">
              <a
                href="https://www.instagram.com/harmens.design/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-white hover:text-[#25A2DC] transition-colors duration-300"
              >
                <div className="w-12 h-12 border border-[#2D3A4D] group-hover:border-[#25A2DC] flex items-center justify-center transition-colors duration-300">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm tracking-wider uppercase text-[#A0AEC0]">Instagram</p>
                  <p className="text-base font-medium">@harmens.design</p>
                </div>
                <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#25A2DC]" />
              </a>

              <a
                href="mailto:info@harmensdesign.com"
                className="group flex items-center gap-4 text-white hover:text-[#25A2DC] transition-colors duration-300"
              >
                <div className="w-12 h-12 border border-[#2D3A4D] group-hover:border-[#25A2DC] flex items-center justify-center transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm tracking-wider uppercase text-[#A0AEC0]">Email</p>
                  <p className="text-base font-medium">info@harmensdesign.com</p>
                </div>
                <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#25A2DC]" />
              </a>
            </div>
          </motion.div>
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
