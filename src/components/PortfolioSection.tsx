'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Maximize2 } from 'lucide-react';
import { useRef } from 'react';

const projects = [
  {
    title: 'Golden Wave Dining',
    category: 'Residential',
    location: 'Riyadh, KSA',
    area: '450 sqm',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=85',
    size: 'large', // 2x2 in grid
  },
  {
    title: 'Modern Sanctuary',
    category: 'Interior Design',
    location: 'Abu Dhabi, UAE',
    area: '320 sqm',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=85',
    size: 'tall', // 1x2
  },
  {
    title: 'Minimalist Suite',
    category: 'Luxury Living',
    location: 'Riyadh, KSA',
    area: '280 sqm',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=85',
    size: 'normal',
  },
  {
    title: 'Chandelier Hall',
    category: 'Architectural',
    location: 'Doha, Qatar',
    area: '580 sqm',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=85',
    size: 'large',
  },
  {
    title: 'Contemporary Space',
    category: 'Commercial',
    location: 'Kuwait City, Kuwait',
    area: '380 sqm',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=85',
    size: 'normal',
  },
  {
    title: 'Fireplace Lounge',
    category: 'Residential',
    location: 'Jeddah, KSA',
    area: '310 sqm',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1616137466211-f73a09a65f30?w=700&q=85',
    size: 'tall',
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.65, 0.05, 0, 1] },
  },
};

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.2], [60, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative z-10 py-32 md:py-40 px-4 md:px-8 lg:px-12"
    >
      {/* Decorative floating lines */}
      <div className="absolute top-0 left-[10%] w-[1px] h-40 decorative-line-vertical opacity-30 animate-float" />
      <div className="absolute top-20 right-[15%] w-[1px] h-32 decorative-line-vertical opacity-20 animate-float-rotate" style={{ animationDelay: '1s' }} />

      <div className="max-w-[1400px] mx-auto">
        {/* === Section Header === */}
        <motion.div
          className="mb-20 md:mb-28"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <div className="flex items-center gap-6 mb-6">
            <motion.div
              className="w-12 h-[1px] bg-[#25A2DC]"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.65, 0.05, 0, 1] }}
            />
            <p className="text-[#25A2DC] text-xs tracking-[0.5em] uppercase font-light">
              Portfolio
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[0.95]">
              Selected<br />
              <span className="text-[#A0AEC0] font-light">Works</span>
            </h2>
            <motion.p
              className="text-[#A0AEC0]/60 text-sm tracking-wider max-w-xs leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Each project is a testament to our commitment to crafting spaces that transcend the ordinary.
            </motion.p>
          </div>

          {/* Animated gold line */}
          <motion.div
            className="mt-8 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, #D4AF37, #25A2DC, transparent)',
            }}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: '100%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.65, 0.05, 0, 1] }}
          />
        </motion.div>

        {/* === Project Grid - Bento-style layout === */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={cardVariant}
              className={`project-card group relative cursor-pointer ${
                project.size === 'large'
                  ? 'md:col-span-2 md:row-span-2'
                  : project.size === 'tall'
                  ? 'md:col-span-1 md:row-span-2'
                  : 'md:col-span-1 md:row-span-1'
              }`}
            >
              {/* Image Container */}
              <div
                className={`relative w-full overflow-hidden ${
                  project.size === 'large'
                    ? 'aspect-square'
                    : project.size === 'tall'
                    ? 'aspect-[3/4]'
                    : 'aspect-[4/5]'
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                  sizes={
                    project.size === 'large'
                      ? '(max-width: 768px) 100vw, 50vw'
                      : '(max-width: 768px) 100vw, 25vw'
                  }
                />

                {/* Dark gradient overlay - always slightly visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F18]/80 via-[#0B0F18]/10 to-transparent" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0B0F18]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top-right number */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
                  <span className="text-white/20 text-5xl md:text-7xl font-bold tracking-tighter leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <div className="w-10 h-10 border border-[#25A2DC]/50 flex items-center justify-center bg-[#0B0F18]/40 backdrop-blur-sm">
                    <ArrowUpRight className="w-4 h-4 text-[#25A2DC]" />
                  </div>
                </div>

                {/* Bottom info - always visible, enhanced on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
                  {/* Category badge - always visible */}
                  <div className="mb-3">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-1">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-lg md:text-xl lg:text-2xl font-semibold tracking-wide transition-all duration-500">
                    {project.title}
                  </h3>

                  {/* Details - appear on hover */}
                  <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-20 opacity-0 group-hover:opacity-100">
                    <div className="flex items-center gap-4 mt-2 text-[#A0AEC0] text-xs tracking-wider">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize2 className="w-3 h-3" />
                        {project.area}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Animated border line at bottom */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#25A2DC] to-[#D4AF37]"
                  initial={{ width: '0%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{ width: '0%' }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* === Bottom Stats Bar === */}
        <motion.div
          className="mt-16 md:mt-24 pt-8 border-t border-[#2D3A4D]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: '200+', label: 'Projects Completed' },
              { value: '5', label: 'Countries' },
              { value: '25+', label: 'Years Experience' },
              { value: '98%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[#A0AEC0] text-xs tracking-[0.2em] uppercase mt-1">
                  {stat.label}
                </p>
                {i < 3 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-[#2D3A4D]" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
