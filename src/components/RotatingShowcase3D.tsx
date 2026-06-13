'use client';

import Image from 'next/image';

/**
 * 🎲 3D Rotating Product Showcase
 * 
 * A CSS-only 3D rotating prism with real project images on each face.
 * Uses transform-style: preserve-3d for true 3D rendering.
 * No WebGL, no JS animation loop — pure CSS keyframes = zero lag.
 * 
 * The prism slowly rotates to showcase portfolio work in 3D.
 */

const showcaseImages = [
  { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80', label: 'Dining' },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', label: 'Modern' },
  { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80', label: 'Grand Hall' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', label: 'Suite' },
];

export default function RotatingShowcase3D() {
  const faceCount = showcaseImages.length;
  const angleStep = 360 / faceCount;
  // translateZ for a regular polygon: sideLength / (2 * tan(π/n))
  // For a square prism with ~280px faces: ~280px
  const translateZ = 280;

  return (
    <div
      className="relative"
      style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* Glow underneath the prism */}
      <div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[200px] md:w-[300px] h-[80px] md:h-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(37,162,220,0.15) 0%, rgba(212,175,55,0.08) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* The 3D Prism */}
      <div
        className="showcase-prism"
        style={{
          width: 240,
          height: 320,
          transformStyle: 'preserve-3d',
          animation: 'showcase-rotate 25s linear infinite',
          willChange: 'transform',
        }}
      >
        {showcaseImages.map((face, i) => {
          const angle = angleStep * i;
          return (
            <div
              key={i}
              className="absolute overflow-hidden"
              style={{
                width: 240,
                height: 320,
                backfaceVisibility: 'hidden',
                transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                border: '1px solid rgba(212,175,55,0.15)',
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.3), 0 0 20px rgba(37,162,220,0.05)',
              }}
            >
              {/* Image */}
              <Image
                src={face.src}
                alt={face.label}
                fill
                className="object-cover"
                sizes="240px"
              />
              {/* Dark overlay gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, rgba(11,15,24,0.3) 0%, rgba(11,15,24,0.1) 40%, rgba(11,15,24,0.7) 100%)',
                }}
              />
              {/* Gold top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)',
                }}
              />
              {/* Label */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <span
                  className="text-[9px] tracking-[0.4em] uppercase text-[#D4AF37]/80"
                  style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
                >
                  {face.label}
                </span>
              </div>
              {/* Glass reflection effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, transparent 100%)',
                }}
              />
            </div>
          );
        })}

        {/* Top face — decorative cap */}
        <div
          className="absolute"
          style={{
            width: 240,
            height: 240,
            top: -120 + 160, // center vertically
            left: 0,
            transform: `rotateX(90deg) translateZ(160px)`,
            background: 'rgba(11, 15, 24, 0.6)',
            border: '1px solid rgba(212,175,55,0.08)',
            backfaceVisibility: 'hidden',
          }}
        />
      </div>
    </div>
  );
}
