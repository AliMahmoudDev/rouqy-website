'use client';

import Image from 'next/image';

/**
 * 🎲 Premium 3D Showcase — "Floating Gallery"
 *
 * A 3D hexagonal arrangement of portfolio frames that
 * gently floats up and down — no rotation, no hover effects.
 * Just a subtle, elegant breathing motion.
 *
 * - 6 frames in hexagonal 3D arrangement (visible depth)
 * - Gentle float animation (up/down) — very subtle
 * - Slight static tilt so 3D depth is visible
 * - Gold corner bracket frames with glass overlay
 * - CSS-only animation for zero lag
 */

const showcaseImages = [
  { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80', label: 'Dining Room', category: 'RESIDENTIAL' },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', label: 'Modern Living', category: 'LUXURY' },
  { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80', label: 'Grand Hall', category: 'COMMERCIAL' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', label: 'Royal Suite', category: 'HOSPITALITY' },
  { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80', label: 'Lounge', category: 'RESIDENTIAL' },
  { src: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80', label: 'Villa Interior', category: 'LUXURY' },
];

export default function RotatingShowcase3D() {
  const faceCount = showcaseImages.length;
  const angleStep = 360 / faceCount;
  const cardWidth = 260;
  const cardHeight = 180;
  const translateZ = Math.round(cardWidth / (2 * Math.tan(Math.PI / faceCount)));

  return (
    <div
      className="relative select-none"
      style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}
    >
      {/* ====== AMBIENT GLOW — beneath the showcase ====== */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: -60,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 400,
          height: 120,
          background: 'radial-gradient(ellipse, rgba(212,175,55,0.12) 0%, rgba(37,162,220,0.06) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ====== REFLECTION SURFACE ====== */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: -40,
          left: '50%',
          transform: 'translateX(-50%) scaleX(1) scaleY(-0.3)',
          width: cardWidth + 40,
          height: cardHeight,
          opacity: 0.08,
          background: 'linear-gradient(180deg, rgba(212,175,55,0.3), transparent)',
          filter: 'blur(8px)',
          borderRadius: 12,
        }}
      />

      {/* ====== THE 3D PRISM — static tilt + gentle float ====== */}
      <div
        className="showcase-prism"
        style={{
          width: cardWidth,
          height: cardHeight,
          transformStyle: 'preserve-3d',
          // Static slight tilt so you can see the 3D depth + gentle float
          animation: 'showcase-float 6s ease-in-out infinite',
          willChange: 'transform',
        }}
      >
        {showcaseImages.map((face, i) => {
          const angle = angleStep * i;
          return (
            <div
              key={i}
              className="absolute showcase-card"
              style={{
                width: cardWidth,
                height: cardHeight,
                backfaceVisibility: 'hidden',
                transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              {/* ====== CARD FRAME ====== */}
              <div
                className="absolute inset-0"
                style={{
                  borderRadius: 10,
                  border: '1px solid rgba(212,175,55,0.2)',
                  boxShadow: `
                    inset 0 0 30px rgba(0,0,0,0.4),
                    0 0 40px rgba(0,0,0,0.5),
                    0 0 15px rgba(212,175,55,0.05)
                  `,
                  overflow: 'hidden',
                }}
              >
                {/* Image */}
                <Image
                  src={face.src}
                  alt={face.label}
                  fill
                  className="object-cover"
                  sizes="260px"
                />

                {/* Dark overlay gradient — cinematic */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
                      linear-gradient(180deg,
                        rgba(11,15,24,0.15) 0%,
                        rgba(11,15,24,0.0) 30%,
                        rgba(11,15,24,0.0) 50%,
                        rgba(11,15,24,0.6) 100%
                      )
                    `,
                  }}
                />

                {/* Gold top accent line */}
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{
                    height: 2,
                    background: 'linear-gradient(90deg, transparent 10%, rgba(212,175,55,0.6) 50%, transparent 90%)',
                  }}
                />

                {/* Gold bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    height: 1,
                    background: 'linear-gradient(90deg, transparent 10%, rgba(212,175,55,0.3) 50%, transparent 90%)',
                  }}
                />

                {/* ====== CORNER BRACKETS — Luxury Frame ====== */}
                <div className="absolute top-2 left-2 pointer-events-none" style={{ opacity: 0.7 }}>
                  <div style={{ width: 16, height: 1, background: '#D4AF37' }} />
                  <div style={{ width: 1, height: 16, background: '#D4AF37' }} />
                </div>
                <div className="absolute top-2 right-2 pointer-events-none" style={{ opacity: 0.7 }}>
                  <div style={{ width: 16, height: 1, background: '#D4AF37', marginLeft: 'auto' }} />
                  <div style={{ width: 1, height: 16, background: '#D4AF37', marginLeft: 'auto' }} />
                </div>
                <div className="absolute bottom-8 left-2 pointer-events-none" style={{ opacity: 0.5 }}>
                  <div style={{ width: 12, height: 1, background: '#25A2DC' }} />
                  <div style={{ width: 1, height: 12, background: '#25A2DC' }} />
                </div>
                <div className="absolute bottom-8 right-2 pointer-events-none" style={{ opacity: 0.5 }}>
                  <div style={{ width: 12, height: 1, background: '#25A2DC', marginLeft: 'auto' }} />
                  <div style={{ width: 1, height: 12, background: '#25A2DC', marginLeft: 'auto' }} />
                </div>

                {/* ====== LABEL AREA ====== */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span
                    className="text-[7px] tracking-[0.5em] uppercase block"
                    style={{ color: 'rgba(37,162,220,0.6)' }}
                  >
                    {face.category}
                  </span>
                  <span
                    className="text-[11px] tracking-[0.25em] uppercase block mt-0.5"
                    style={{
                      color: 'rgba(212,175,55,0.9)',
                      textShadow: '0 1px 6px rgba(0,0,0,0.8)',
                    }}
                  >
                    {face.label}
                  </span>
                </div>

                {/* Glass reflection sweep */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ====== DECORATIVE ORBITING DOT ====== */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: translateZ * 2 + 60,
          height: translateZ * 2 + 60,
          left: '50%',
          top: '50%',
          marginLeft: -(translateZ + 30),
          marginTop: -(translateZ + 30),
          borderRadius: '50%',
          border: '1px solid rgba(212,175,55,0.04)',
          animation: 'spin-slow 40s linear infinite',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -3,
            left: '50%',
            marginLeft: -3,
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#D4AF37',
            boxShadow: '0 0 10px rgba(212,175,55,0.5)',
          }}
        />
      </div>
    </div>
  );
}
