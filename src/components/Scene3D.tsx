'use client';

import { useState, useEffect, useMemo } from 'react';

/* ============================================
   HARMENS CSS Background Scene v5.0
   — ZERO WebGL, Pure CSS 3D transforms
   — Fixed hydration (deterministic random)
   — Mobile-optimized: shapes hidden on small screens
   ============================================ */

// Deterministic pseudo-random for SSR consistency
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export default function Scene3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-calculate all random values deterministically
  const stars = useMemo(() =>
    Array.from({ length: 40 }).map((_, i) => ({
      width: 1 + seededRandom(i * 7 + 1) * 2,
      height: 1 + seededRandom(i * 7 + 1) * 2,
      isGold: i % 3 === 0,
      opacity: 0.15 + seededRandom(i * 11 + 2) * 0.35,
      left: seededRandom(i * 13 + 3) * 100,
      top: seededRandom(i * 17 + 4) * 100,
      duration: 3 + seededRandom(i * 19 + 5) * 4,
      delay: seededRandom(i * 23 + 6) * 3,
    })),
  []
  );

  // Reduced particles for mobile (fewer, only visible on larger screens)
  const particles = useMemo(() =>
    Array.from({ length: 8 }).map((_, i) => ({
      width: 1.5 + seededRandom(i * 29 + 10) * 2.5,
      height: 1.5 + seededRandom(i * 29 + 10) * 2.5,
      isGold: i % 2 === 0,
      left: 5 + seededRandom(i * 31 + 11) * 90,
      duration: 8 + seededRandom(i * 37 + 12) * 14,
      delay: seededRandom(i * 41 + 13) * 8,
    })),
  []
  );

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ perspective: '1200px' }}>

      {/* ====== STAR FIELD — CSS dots (visible on all screens but subtle) ====== */}
      {mounted && (
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '120s' }}>
          {stars.map((s, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full"
              style={{
                width: s.width,
                height: s.height,
                background: s.isGold ? '#D4AF37' : '#25A2DC',
                opacity: s.opacity,
                left: `${s.left}%`,
                top: `${s.top}%`,
                boxShadow: s.isGold
                  ? '0 0 4px rgba(212,175,55,0.3)'
                  : '0 0 4px rgba(37,162,220,0.3)',
                animation: `sparkle ${s.duration}s ease-in-out infinite ${s.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* ====== FLOATING PARTICLES — CSS only (reduced on mobile) ====== */}
      {mounted && particles.map((p, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: p.width,
            height: p.height,
            background: p.isGold ? 'rgba(212,175,55,0.6)' : 'rgba(37,162,220,0.5)',
            boxShadow: p.isGold
              ? '0 0 6px rgba(212,175,55,0.4)'
              : '0 0 5px rgba(37,162,220,0.3)',
            left: `${p.left}%`,
            opacity: 0,
            animation: `particle-rise ${p.duration}s linear infinite ${p.delay}s`,
          }}
        />
      ))}

      {/* ====== HERO AREA SHAPES — Hidden on mobile ====== */}

      {/* === GOLD INFINITY RING — The centerpiece === */}
      <div
        className="absolute hidden md:block"
        style={{
          width: '450px',
          height: '450px',
          top: '10%',
          left: '50%',
          marginLeft: '-225px',
          animation: 'spin-3d 20s linear infinite, breathe 6s ease-in-out infinite',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Outer gold ring */}
        <div
          className="absolute inset-0 rounded-full animate-border-glow-gold"
          style={{
            border: '2.5px solid rgba(212,175,55,0.5)',
            boxShadow: '0 0 50px rgba(212,175,55,0.25), inset 0 0 50px rgba(212,175,55,0.08)',
          }}
        />
        {/* Inner ring */}
        <div
          className="absolute rounded-full"
          style={{
            inset: '25px',
            border: '2px solid rgba(212,175,55,0.35)',
            animation: 'spin-reverse-slow 15s linear infinite',
          }}
        />
        {/* Cross ring */}
        <div
          className="absolute rounded-full"
          style={{
            inset: '50px',
            border: '1.5px solid rgba(37,162,220,0.25)',
            animation: 'spin-slow 25s linear infinite',
            transform: 'rotateX(60deg)',
          }}
        />
        {/* Center dot */}
        <div
          className="absolute rounded-full"
          style={{
            width: 8,
            height: 8,
            background: '#D4AF37',
            boxShadow: '0 0 25px rgba(212,175,55,0.8), 0 0 50px rgba(212,175,55,0.4)',
            top: '50%',
            left: '50%',
            marginTop: -4,
            marginLeft: -4,
          }}
        />
      </div>

      {/* === BLUE SPHERE — Left === */}
      <div
        className="absolute rounded-full hidden md:block"
        style={{
          width: '220px',
          height: '220px',
          top: '18%',
          left: '8%',
          background: 'radial-gradient(circle at 35% 35%, rgba(37,162,220,0.35) 0%, rgba(37,162,220,0.12) 50%, transparent 70%)',
          boxShadow: '0 0 80px rgba(37,162,220,0.18), inset 0 0 40px rgba(37,162,220,0.1)',
          border: '1.5px solid rgba(37,162,220,0.15)',
          animation: 'float-3d 10s ease-in-out infinite, breathe 5s ease-in-out infinite',
        }}
      />

      {/* === WIREFRAME ICOSAHEDRON — Right === */}
      <div
        className="absolute hidden lg:block"
        style={{
          width: '300px',
          height: '300px',
          top: '10%',
          right: '3%',
          animation: 'spin-slow 30s linear infinite, float 8s ease-in-out infinite',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Outer wireframe circle */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '1.5px solid rgba(37,162,220,0.3)',
            boxShadow: '0 0 30px rgba(37,162,220,0.12)',
          }}
        />
        {/* Inner wireframe */}
        <div
          className="absolute rounded-full"
          style={{
            inset: '35px',
            border: '1.5px solid rgba(37,162,220,0.2)',
            animation: 'spin-reverse-slow 20s linear infinite',
          }}
        />
        {/* Cross lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{ width: '1px', height: '100%', background: 'linear-gradient(180deg, transparent, rgba(37,162,220,0.25), transparent)' }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{ height: '1px', width: '100%', background: 'linear-gradient(90deg, transparent, rgba(37,162,220,0.25), transparent)' }} />
        </div>
        {/* Diagonal lines */}
        <div
          className="absolute inset-0"
          style={{
            border: '1.5px solid rgba(37,162,220,0.12)',
            borderRadius: '50%',
            transform: 'rotate(45deg) scaleY(0.6)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            border: '1.5px solid rgba(37,162,220,0.12)',
            borderRadius: '50%',
            transform: 'rotate(-45deg) scaleY(0.6)',
          }}
        />
      </div>

      {/* === GOLD SPHERE — Lower left === */}
      <div
        className="absolute rounded-full hidden md:block"
        style={{
          width: '140px',
          height: '140px',
          top: '55%',
          left: '12%',
          background: 'radial-gradient(circle at 35% 35%, rgba(212,175,55,0.4) 0%, rgba(212,175,55,0.15) 50%, transparent 70%)',
          boxShadow: '0 0 60px rgba(212,175,55,0.18), inset 0 0 30px rgba(212,175,55,0.08)',
          border: '1.5px solid rgba(212,175,55,0.18)',
          animation: 'morph 8s ease-in-out infinite, float-3d 12s ease-in-out infinite 2s',
        }}
      />

      {/* === ROTATING TORUS — Right side === */}
      <div
        className="absolute hidden lg:block"
        style={{
          width: '180px',
          height: '180px',
          top: '42%',
          right: '10%',
          animation: 'spin-3d 12s linear infinite, float 7s ease-in-out infinite 1s',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '3px solid rgba(212,175,55,0.35)',
            boxShadow: '0 0 30px rgba(212,175,55,0.15)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            inset: '12px',
            border: '1.5px solid rgba(37,162,220,0.2)',
            animation: 'spin-reverse-slow 8s linear infinite',
          }}
        />
      </div>

      {/* === DOUBLE RING (Saturn) — Upper left === */}
      <div
        className="absolute hidden md:block"
        style={{
          top: '5%',
          left: '3%',
          width: '120px',
          height: '120px',
          animation: 'spin-slow 25s linear infinite, float-rotate 9s ease-in-out infinite',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Core */}
        <div
          className="absolute rounded-full"
          style={{
            width: 30,
            height: 30,
            top: '50%',
            left: '50%',
            marginTop: -15,
            marginLeft: -15,
            background: 'radial-gradient(circle, rgba(27,139,190,0.4) 0%, rgba(27,139,190,0.15) 60%, transparent 80%)',
            boxShadow: '0 0 20px rgba(37,162,220,0.2)',
          }}
        />
        {/* Ring 1 */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: '1.5px solid rgba(37,162,220,0.2)',
            transform: 'rotateX(70deg)',
          }}
        />
        {/* Ring 2 - Gold */}
        <div
          className="absolute rounded-full"
          style={{
            inset: '-10px',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '50%',
            transform: 'rotateX(70deg) rotateZ(45deg)',
          }}
        />
      </div>

      {/* === THIN GOLD RINGS — Scattered === */}
      <div
        className="absolute rounded-full animate-border-glow-gold hidden lg:block"
        style={{
          width: '200px',
          height: '200px',
          top: '8%',
          right: '25%',
          border: '1px solid rgba(212,175,55,0.12)',
          animation: 'spin-slow 35s linear infinite, float 6s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full hidden md:block"
        style={{
          width: '130px',
          height: '130px',
          top: '50%',
          left: '25%',
          border: '1px solid rgba(212,175,55,0.08)',
          animation: 'spin-reverse-slow 28s linear infinite, float-rotate 8s ease-in-out infinite 2s',
        }}
      />

      {/* === OCTAHEDRON — Geometric accent === */}
      <div
        className="absolute hidden lg:block"
        style={{
          width: '80px',
          height: '80px',
          top: '20%',
          left: '30%',
          animation: 'spin-3d 15s linear infinite, float 7s ease-in-out infinite 3s',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            border: '1.5px solid rgba(212,175,55,0.2)',
            transform: 'rotate(45deg)',
            boxShadow: '0 0 15px rgba(212,175,55,0.08)',
          }}
        />
      </div>

      {/* === CUBE — Architectural accent === */}
      <div
        className="absolute hidden lg:block"
        style={{
          width: '70px',
          height: '70px',
          top: '35%',
          right: '18%',
          animation: 'tilt-rotate 12s ease-in-out infinite, float 9s ease-in-out infinite 1s',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            border: '1.5px solid rgba(37,162,220,0.15)',
            boxShadow: '0 0 15px rgba(37,162,220,0.06)',
          }}
        />
        {/* Inner diamond */}
        <div
          className="absolute"
          style={{
            width: '40px',
            height: '40px',
            top: '50%',
            left: '50%',
            marginTop: -20,
            marginLeft: -20,
            border: '1px solid rgba(37,162,220,0.1)',
            transform: 'rotate(45deg)',
          }}
        />
      </div>

      {/* ====== PORTFOLIO AREA SHAPES — Hidden on mobile ====== */}

      {/* Gold wireframe sphere */}
      <div
        className="absolute hidden md:block"
        style={{
          width: '200px',
          height: '200px',
          top: '75%',
          left: '8%',
          animation: 'spin-slow 28s linear infinite, float 10s ease-in-out infinite',
        }}
      >
        <div className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(212,175,55,0.12)' }} />
        <div className="absolute rounded-full" style={{ inset: '20px', border: '1px solid rgba(212,175,55,0.08)', animation: 'spin-reverse-slow 18s linear infinite' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{ width: '1px', height: '100%', background: 'linear-gradient(180deg, transparent, rgba(212,175,55,0.1), transparent)' }} />
        </div>
      </div>

      {/* Blue sphere */}
      <div
        className="absolute rounded-full hidden md:block"
        style={{
          width: '120px',
          height: '120px',
          top: '68%',
          right: '10%',
          background: 'radial-gradient(circle at 35% 35%, rgba(37,162,220,0.2) 0%, rgba(37,162,220,0.06) 50%, transparent 70%)',
          boxShadow: '0 0 40px rgba(37,162,220,0.08)',
          border: '1px solid rgba(37,162,220,0.08)',
          animation: 'float-3d 9s ease-in-out infinite 1s, breathe 6s ease-in-out infinite',
        }}
      />

      {/* Rotating ring */}
      <div
        className="absolute hidden md:block"
        style={{
          width: '120px',
          height: '120px',
          top: '85%',
          left: '30%',
          border: '1.5px solid rgba(37,162,220,0.12)',
          borderRadius: '50%',
          animation: 'spin-3d 18s linear infinite, float 8s ease-in-out infinite 2s',
        }}
      />

      {/* Gold ring */}
      <div
        className="absolute rounded-full animate-border-glow-gold hidden lg:block"
        style={{
          width: '160px',
          height: '160px',
          top: '80%',
          right: '25%',
          border: '1px solid rgba(212,175,55,0.1)',
          animation: 'spin-reverse-slow 22s linear infinite, float-rotate 7s ease-in-out infinite',
        }}
      />

      {/* ====== CONTACT AREA SHAPES — Hidden on mobile ====== */}

      {/* Large blue wireframe */}
      <div
        className="absolute hidden md:block"
        style={{
          width: '220px',
          height: '220px',
          top: '115%',
          right: '8%',
          animation: 'spin-slow 32s linear infinite, float 11s ease-in-out infinite',
        }}
      >
        <div className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(27,139,190,0.12)' }} />
        <div className="absolute rounded-full" style={{ inset: '25px', border: '1px solid rgba(27,139,190,0.08)', animation: 'spin-reverse-slow 22s linear infinite' }} />
      </div>

      {/* Gold torus */}
      <div
        className="absolute hidden md:block"
        style={{
          width: '150px',
          height: '150px',
          top: '125%',
          left: '12%',
          border: '2px solid rgba(212,175,55,0.15)',
          borderRadius: '50%',
          animation: 'spin-3d 16s linear infinite, float 8s ease-in-out infinite 3s',
          boxShadow: '0 0 20px rgba(212,175,55,0.06)',
        }}
      />

      {/* Small gold ring */}
      <div
        className="absolute rounded-full hidden lg:block"
        style={{
          width: '180px',
          height: '180px',
          top: '140%',
          left: '35%',
          border: '1px solid rgba(212,175,55,0.08)',
          animation: 'spin-slow 40s linear infinite, float-rotate 10s ease-in-out infinite',
        }}
      />

      {/* ====== AMBIENT GLOW ORBS — visible on all screens (subtle background only) ====== */}

      {/* Top-left blue glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          top: '-15%',
          left: '-15%',
          background: 'radial-gradient(circle, rgba(37,162,220,0.04) 0%, transparent 60%)',
          filter: 'blur(60px)',
          animation: 'breathe 8s ease-in-out infinite',
        }}
      />

      {/* Center gold glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          top: '10%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.03) 0%, transparent 60%)',
          filter: 'blur(80px)',
          animation: 'breathe 10s ease-in-out infinite 2s',
        }}
      />

      {/* Bottom-right blue glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          bottom: '-10%',
          right: '-10%',
          background: 'radial-gradient(circle, rgba(37,162,220,0.03) 0%, transparent 60%)',
          filter: 'blur(70px)',
          animation: 'breathe 9s ease-in-out infinite 4s',
        }}
      />

    </div>
  );
}
