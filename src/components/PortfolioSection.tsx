'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Golden Wave Dining',
    category: 'Residential',
    location: 'Riyadh, KSA',
    area: '450 sqm',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    span: 'col-span-2 row-span-2',
    aspect: 'aspect-square',
  },
  {
    title: 'Modern Sanctuary',
    category: 'Interior Design',
    location: 'Abu Dhabi, UAE',
    area: '320 sqm',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    span: 'col-span-1 row-span-1',
    aspect: 'aspect-[4/5]',
  },
  {
    title: 'Minimalist Suite',
    category: 'Luxury Living',
    location: 'Riyadh, KSA',
    area: '280 sqm',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    span: 'col-span-1 row-span-1',
    aspect: 'aspect-[4/5]',
  },
  {
    title: 'Chandelier Hall',
    category: 'Architectural',
    location: 'Doha, Qatar',
    area: '580 sqm',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
    span: 'col-span-1 row-span-2',
    aspect: 'aspect-[3/4]',
  },
  {
    title: 'Contemporary Space',
    category: 'Commercial',
    location: 'Kuwait City, Kuwait',
    area: '380 sqm',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    span: 'col-span-1 row-span-1',
    aspect: 'aspect-[4/5]',
  },
  {
    title: 'Fireplace Lounge',
    category: 'Residential',
    location: 'Jeddah, KSA',
    area: '310 sqm',
    image: 'https://images.unsplash.com/photo-1616137466211-f73a09a65f30?w=600&q=80',
    span: 'col-span-1 row-span-1',
    aspect: 'aspect-[4/5]',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.65, 0.05, 0, 1] },
  },
};

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative z-10 py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
        >
          <p className="text-[#25A2DC] text-sm tracking-[0.4em] uppercase mb-4">Portfolio</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Selected Works
          </h2>
          <div className="mt-4 w-16 h-[2px] bg-[#25A2DC]" />
        </motion.div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`group relative overflow-hidden cursor-pointer ${project.span}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: [0.65, 0.05, 0, 1],
                  },
                },
              }}
            >
              {/* Image */}
              <div className={`relative w-full ${project.aspect} overflow-hidden`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#161E2D]/90 via-[#161E2D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Project info on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white text-lg md:text-xl font-semibold tracking-wide">
                        {project.title}
                      </h3>
                      <p className="text-[#25A2DC] text-xs md:text-sm tracking-wider uppercase mt-1">
                        {project.category}
                      </p>
                      <p className="text-[#A0AEC0] text-xs mt-2">
                        {project.location} &middot; {project.area}
                      </p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[#25A2DC] opacity-70" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
