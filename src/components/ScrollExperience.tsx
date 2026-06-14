'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// The logo SVG path data — same outline, used for stroke + fill
const LOGO_PATH_D = "M 0,1 L 0,345 L 19,345 L 19,85 L 21,83 L 84,83 L 98,84 L 108,85 L 115,86 L 121,87 L 127,88 L 132,89 L 137,90 L 142,91 L 146,92 L 150,93 L 154,94 L 157,95 L 161,96 L 164,97 L 167,98 L 170,99 L 173,100 L 176,101 L 179,102 L 182,103 L 185,104 L 188,106 L 190,106 L 193,108 L 195,108 L 200,111 L 202,111 L 228,124 L 230,126 L 235,128 L 237,130 L 240,131 L 242,133 L 245,134 L 248,136 L 251,138 L 254,140 L 257,142 L 261,145 L 264,147 L 268,150 L 272,153 L 277,157 L 283,162 L 291,169 L 315,193 L 322,201 L 327,207 L 330,211 L 334,216 L 337,220 L 339,223 L 342,227 L 344,230 L 346,233 L 348,236 L 349,239 L 351,241 L 353,244 L 354,247 L 356,249 L 358,254 L 360,256 L 372,280 L 372,282 L 375,287 L 375,289 L 377,292 L 377,294 L 379,297 L 380,300 L 380,302 L 382,305 L 383,308 L 384,311 L 385,314 L 386,317 L 387,321 L 388,324 L 389,327 L 390,331 L 391,335 L 392,339 L 393,343 L 394,348 L 395,353 L 396,358 L 397,364 L 398,371 L 399,379 L 400,389 L 401,406 L 401,793 L 559,793 L 571,792 L 579,791 L 585,790 L 591,789 L 595,788 L 599,787 L 603,786 L 607,785 L 610,784 L 613,783 L 616,782 L 619,780 L 621,780 L 624,779 L 631,775 L 633,775 L 637,773 L 639,771 L 646,768 L 648,766 L 651,765 L 654,763 L 657,761 L 660,759 L 663,757 L 667,754 L 671,751 L 676,747 L 683,741 L 697,727 L 703,720 L 707,715 L 711,710 L 713,707 L 716,703 L 718,700 L 720,697 L 721,694 L 723,692 L 724,689 L 726,687 L 729,680 L 731,678 L 735,670 L 735,668 L 740,659 L 740,657 L 742,654 L 742,652 L 744,649 L 745,646 L 745,644 L 747,641 L 748,638 L 749,635 L 750,632 L 751,629 L 752,626 L 753,622 L 754,619 L 755,615 L 756,612 L 757,608 L 758,603 L 759,599 L 760,593 L 761,588 L 762,581 L 763,573 L 764,560 L 764,539 L 763,534 L 762,530 L 761,527 L 759,524 L 759,522 L 758,520 L 756,517 L 748,509 L 745,507 L 740,505 L 737,503 L 734,501 L 730,498 L 723,492 L 719,488 L 713,481 L 711,478 L 709,475 L 704,465 L 703,462 L 702,459 L 701,454 L 700,449 L 699,436 L 699,433 L 700,422 L 701,416 L 702,412 L 703,409 L 704,406 L 705,403 L 708,398 L 708,396 L 709,394 L 711,392 L 714,389 L 717,388 L 720,389 L 722,390 L 724,392 L 725,394 L 726,397 L 726,399 L 729,405 L 731,408 L 738,415 L 741,417 L 744,419 L 746,419 L 749,421 L 752,422 L 759,423 L 762,423 L 769,422 L 772,421 L 775,420 L 783,416 L 788,412 L 790,410 L 793,406 L 797,398 L 798,395 L 799,390 L 799,380 L 798,375 L 797,372 L 793,364 L 791,361 L 784,354 L 781,352 L 775,349 L 772,348 L 768,347 L 755,347 L 751,348 L 748,349 L 738,354 L 735,356 L 731,359 L 727,362 L 719,369 L 714,374 L 707,382 L 703,387 L 700,391 L 698,394 L 696,397 L 694,400 L 692,403 L 684,419 L 683,422 L 682,425 L 681,428 L 680,431 L 679,434 L 678,438 L 677,443 L 676,450 L 675,461 L 675,659 L 674,666 L 673,672 L 672,676 L 671,680 L 670,683 L 669,686 L 668,689 L 667,692 L 665,695 L 665,697 L 661,705 L 659,707 L 657,712 L 655,715 L 653,718 L 651,721 L 647,726 L 629,744 L 625,747 L 621,750 L 618,752 L 615,753 L 613,755 L 599,762 L 597,762 L 594,764 L 591,765 L 588,766 L 585,767 L 582,768 L 578,769 L 575,770 L 571,771 L 565,772 L 544,772 L 539,771 L 535,770 L 532,769 L 520,763 L 517,761 L 514,759 L 507,753 L 504,750 L 499,744 L 496,740 L 494,737 L 488,725 L 487,722 L 486,719 L 485,715 L 484,711 L 483,703 L 483,479 L 422,417 L 459,380 L 462,376 L 465,372 L 466,369 L 468,367 L 476,351 L 477,348 L 478,345 L 479,342 L 480,339 L 481,335 L 482,330 L 483,323 L 483,0 Z";

/**
 * ROUQY Scroll-Driven Experience
 * 
 * ONE continuous pinned section (1100vh):
 * 1. Hero text "ROUQY" fades out (0-6%)
 * 2. Logo appears centered and draws (6-55%)
 * 3. Fill fades in, effects settle (55-65%)
 * 4. SAME logo slides RIGHT (65-80%)
 * 5. About text reveals LEFT (75-90%)
 * 6. Hold final state (90-100%)
 * 
 * Key: drawProgress proxy ensures pen tip + stroke are ALWAYS in sync
 */

export default function ScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // The single pinned section
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const logoSvgRef = useRef<HTMLDivElement>(null);
  const strokePathRef = useRef<SVGPathElement>(null);
  const filledPathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const penTipRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);

  const [isReady, setIsReady] = useState(false);
  const pathLengthRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Measure actual path length after mount
  useEffect(() => {
    if (isReady && strokePathRef.current) {
      const len = strokePathRef.current.getTotalLength();
      pathLengthRef.current = len;
      strokePathRef.current.style.strokeDasharray = `${len}`;
      strokePathRef.current.style.strokeDashoffset = `${len}`;
    }
  }, [isReady]);

  useEffect(() => {
    if (!isReady || !containerRef.current || !pathLengthRef.current) return;

    const pathLen = pathLengthRef.current;

    const ctx = gsap.context(() => {

      // ========================================
      // ONE PINNED SECTION — everything in one timeline
      // ========================================
      
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1100vh',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      // --- PHASE 1: Hero text + indicator fade out (0-4%) ---
      mainTl.to(heroTextRef.current, {
        opacity: 0,
        y: -80,
        scale: 0.85,
        duration: 4,
        ease: 'power2.in',
      });

      mainTl.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: 30,
        duration: 2,
        ease: 'power2.in',
      }, '<');

      // --- Brief pause after hero fades, before logo appears ---
      mainTl.to({}, { duration: 4 });

      // --- PHASE 2: Logo appears centered ---
      mainTl.fromTo(logoSvgRef.current, 
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
      );

      // --- PHASE 3: Grid + pen tip appear (5-6%) ---
      mainTl.to(gridRef.current, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      });

      mainTl.to(penTipRef.current, {
        opacity: 1,
        duration: 0.5,
      });

      // --- PHASE 4: STROKE DRAWS starting at 6% ---
      // Use a proxy object — both stroke AND pen tip read from the SAME value
      // This guarantees perfect sync (like the reference code)
      const drawProxy = { progress: 0 };

      mainTl.to(drawProxy, {
        progress: 1,
        duration: 50,  // 50 units out of ~110 total = ~45% of scroll
        ease: 'none',
        onUpdate: function() {
          const p = drawProxy.progress;
          
          // Set stroke dashoffset from the SAME proxy value
          if (strokePathRef.current && pathLen > 0) {
            strokePathRef.current.style.strokeDashoffset = `${pathLen * (1 - p)}`;
          }
          
          // Set pen tip position from the SAME proxy value
          if (strokePathRef.current && penTipRef.current && pathLen > 0) {
            if (p > 0.005 && p < 0.995) {
              try {
                const point = strokePathRef.current.getPointAtLength(p * pathLen);
                const svgEl = strokePathRef.current.closest('svg');
                const container = logoSvgRef.current;
                if (svgEl && container) {
                  const svgRect = svgEl.getBoundingClientRect();
                  const contRect = container.getBoundingClientRect();
                  const scaleX = svgRect.width / 800;
                  const scaleY = svgRect.height / 794;
                  const x = svgRect.left - contRect.left + point.x * scaleX;
                  const y = svgRect.top - contRect.top + point.y * scaleY;
                  penTipRef.current.style.left = `${x}px`;
                  penTipRef.current.style.top = `${y}px`;
                }
              } catch(e) { /* path not ready */ }
            } else if (p >= 0.995) {
              penTipRef.current.style.opacity = '0';
            }
          }
        }
      });

      // Glow intensifies during drawing (same duration as draw)
      mainTl.to(glowRef.current, {
        opacity: 0.5,
        duration: 50,
        ease: 'none',
      }, '<');

      // --- PHASE 5: Fill fades in ---
      mainTl.to(filledPathRef.current, {
        fillOpacity: 1,
        duration: 6,
        ease: 'power2.inOut',
      });

      // Pen tip fades out
      mainTl.to(penTipRef.current, {
        opacity: 0,
        duration: 3,
        ease: 'power2.out',
      }, '-=4');

      // Stroke becomes subtle
      mainTl.to(strokePathRef.current, {
        stroke: 'rgba(255,255,255,0.12)',
        strokeWidth: 0.5,
        opacity: 0.15,
        duration: 4,
        ease: 'power2.out',
      });

      // Grid fades out
      mainTl.to(gridRef.current, {
        opacity: 0,
        duration: 3,
        ease: 'power2.out',
      }, '-=2');

      // Glow settles
      mainTl.to(glowRef.current, {
        opacity: 0.08,
        duration: 4,
        ease: 'power2.out',
      });

      // --- PHASE 6: Hold the completed logo ---
      mainTl.to({}, { duration: 3 });

      // --- PHASE 7: SAME logo slides RIGHT ---
      mainTl.to(logoSvgRef.current, {
        x: '18vw',
        scale: 0.55,
        duration: 16,
        ease: 'power2.inOut',
      });

      // --- PHASE 8: About text reveals LEFT ---
      mainTl.fromTo(aboutTextRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 10, ease: 'power2.out' },
        '-=10'
      );

      // Stagger text lines
      mainTl.fromTo('.about-line',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 8, stagger: 2, ease: 'power2.out' },
        '-=6'
      );

      // --- PHASE 9: Hold the final state ---
      mainTl.to({}, { duration: 6 });

    }, containerRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <div ref={containerRef} className="relative bg-[#13140f]">
      
      {/* ============================================ */}
      {/* SINGLE PINNED SECTION                        */}
      {/* Hero text → Logo draw → Logo slide → About   */}
      {/* ============================================ */}
      <section 
        ref={sectionRef}
        className="relative h-screen overflow-hidden bg-[#13140f]"
      >
        {/* Subtle radial gradient background */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(29,55,45,0.07) 0%, transparent 70%)',
          }}
        />

        {/* Hero text "ROUQY" — fades out first */}
        <div 
          ref={heroTextRef}
          className="absolute inset-0 flex items-center justify-center z-20 px-4"
        >
          <img
            src="/rouqy-text-white.svg"
            alt="ROUQY"
            className="w-[85vw] max-w-[600px] md:max-w-[900px] lg:max-w-[1100px] md:w-[65vw] lg:w-[55vw] object-contain"
            style={{
              filter: 'drop-shadow(0 0 120px rgba(143,191,168,0.04))',
            }}
          />
        </div>

        {/* Scroll indicator — fades out with hero text */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-4 z-20"
        >
          <span className="text-[#8fbfa8]/35 text-[9px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase font-light">
            Scroll to explore
          </span>
          <div className="w-[1px] h-12 md:h-20 bg-gradient-to-b from-[#8fbfa8]/25 to-transparent relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 w-full h-4 bg-[#8fbfa8]/60"
              style={{ animation: 'scrollPulse 2.5s ease-in-out infinite' }}
            />
          </div>
        </div>

        {/* Centering anchor — CSS handles centering, GSAP never touches this */}
        <div className="absolute left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
          
          {/* GSAP-animated logo container — opacity, scale, x controlled by GSAP */}
          <div 
            ref={logoSvgRef}
            className="relative flex items-center justify-center"
            style={{ opacity: 0 }}
          >
            {/* Grid overlay */}
            <div
              ref={gridRef}
              className="absolute pointer-events-none"
              style={{
                opacity: 0,
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                width: '700px',
                height: '700px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* Ambient glow */}
            <div
              ref={glowRef}
              className="absolute pointer-events-none"
              style={{
                width: '60vw',
                height: '60vw',
                maxWidth: '500px',
                maxHeight: '500px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(143,191,168,0.03) 35%, transparent 65%)',
                opacity: 0,
                filter: 'blur(80px)',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* SVG — white logo stroke + fill */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 794"
              className="w-[55vw] max-w-[260px] md:w-[30vw] md:max-w-[380px] lg:max-w-[420px] h-auto relative"
              style={{ zIndex: 2 }}
            >
              <path
                ref={filledPathRef}
                d={LOGO_PATH_D}
                fill="white"
                fillOpacity={0}
                stroke="none"
              />
              <path
                ref={strokePathRef}
                d={LOGO_PATH_D}
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Glowing pen tip */}
            <div
              ref={penTipRef}
              className="absolute pointer-events-none"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.45) 20%, rgba(143,191,168,0.2) 45%, transparent 70%)',
                boxShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.25), 0 0 80px rgba(143,191,168,0.1)',
                zIndex: 10,
                opacity: 0,
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>
        </div>

        {/* About Text — absolutely positioned LEFT, hidden initially */}
        <div
          ref={aboutTextRef}
          className="absolute left-5 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-[42vw] md:max-w-lg"
          style={{ opacity: 0 }}
        >
          <h2 className="about-line text-white text-2xl md:text-5xl lg:text-6xl font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase mb-4 md:mb-8">
            About
          </h2>
          <div className="about-line w-10 md:w-12 h-[2px] bg-[#8fbfa8]/50 mb-4 md:mb-8" />
          <p className="about-line text-white/65 text-xs md:text-lg leading-relaxed md:leading-relaxed mb-3 md:mb-6">
            At ROUQY, we create timeless interiors where luxury meets purpose. Through thoughtful design, premium materials, and meticulous execution, we shape spaces that inspire, elevate, and endure.
          </p>
          <p className="about-line text-white/40 text-[11px] md:text-base leading-relaxed md:leading-relaxed">
            Every project is a dialogue between vision and craft — where architectural precision meets artistic expression to create environments that transcend the ordinary.
          </p>
        </div>

        <style jsx>{`
          @keyframes scrollPulse {
            0% { transform: translateY(-100%); opacity: 0; }
            20% { opacity: 1; }
            100% { transform: translateY(500%); opacity: 0; }
          }
        `}</style>
      </section>

    </div>
  );
}
