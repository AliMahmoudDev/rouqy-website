'use client';

import { useEffect, useState, useRef } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

// Logo SVG path data
const LOGO_PATH_D = "M 0,1 L 0,345 L 19,345 L 19,85 L 21,83 L 84,83 L 98,84 L 108,85 L 115,86 L 121,87 L 127,88 L 132,89 L 137,90 L 142,91 L 146,92 L 150,93 L 154,94 L 157,95 L 161,96 L 164,97 L 167,98 L 170,99 L 173,100 L 176,101 L 179,102 L 182,103 L 185,104 L 188,106 L 190,106 L 193,108 L 195,108 L 200,111 L 202,111 L 228,124 L 230,126 L 235,128 L 237,130 L 240,131 L 242,133 L 245,134 L 248,136 L 251,138 L 254,140 L 257,142 L 261,145 L 264,147 L 268,150 L 272,153 L 277,157 L 283,162 L 291,169 L 315,193 L 322,201 L 327,207 L 330,211 L 334,216 L 337,220 L 339,223 L 342,227 L 344,230 L 346,233 L 348,236 L 349,239 L 351,241 L 353,244 L 354,247 L 356,249 L 358,254 L 360,256 L 372,280 L 372,282 L 375,287 L 375,289 L 377,292 L 377,294 L 379,297 L 380,300 L 380,302 L 382,305 L 383,308 L 384,311 L 385,314 L 386,317 L 387,321 L 388,324 L 389,327 L 390,331 L 391,335 L 392,339 L 393,343 L 394,348 L 395,353 L 396,358 L 397,364 L 398,371 L 399,379 L 400,389 L 401,406 L 401,793 L 559,793 L 571,792 L 579,791 L 585,790 L 591,789 L 595,788 L 599,787 L 603,786 L 607,785 L 610,784 L 613,783 L 616,782 L 619,780 L 621,780 L 624,779 L 631,775 L 633,775 L 637,773 L 639,771 L 646,768 L 648,766 L 651,765 L 654,763 L 657,761 L 660,759 L 663,757 L 667,754 L 671,751 L 676,747 L 683,741 L 697,727 L 703,720 L 707,715 L 711,710 L 713,707 L 716,703 L 718,700 L 720,697 L 721,694 L 723,692 L 724,689 L 726,687 L 729,680 L 731,678 L 735,670 L 735,668 L 740,659 L 740,657 L 742,654 L 742,652 L 744,649 L 745,646 L 745,644 L 747,641 L 748,638 L 749,635 L 750,632 L 751,629 L 752,626 L 753,622 L 754,619 L 755,615 L 756,612 L 757,608 L 758,603 L 759,599 L 760,593 L 761,588 L 762,581 L 763,573 L 764,560 L 764,539 L 763,534 L 762,530 L 761,527 L 759,524 L 759,522 L 758,520 L 756,517 L 748,509 L 745,507 L 740,505 L 737,503 L 734,501 L 730,498 L 723,492 L 719,488 L 713,481 L 711,478 L 709,475 L 704,465 L 703,462 L 702,459 L 701,454 L 700,449 L 699,436 L 699,433 L 700,422 L 701,416 L 702,412 L 703,409 L 704,406 L 705,403 L 708,398 L 708,396 L 709,394 L 711,392 L 714,389 L 717,388 L 720,389 L 722,390 L 724,392 L 725,394 L 726,397 L 726,399 L 729,405 L 731,408 L 738,415 L 741,417 L 744,419 L 746,419 L 749,421 L 752,422 L 759,423 L 762,423 L 769,422 L 772,421 L 775,420 L 783,416 L 788,412 L 790,410 L 793,406 L 797,398 L 798,395 L 799,390 L 799,380 L 798,375 L 797,372 L 793,364 L 791,361 L 784,354 L 781,352 L 775,349 L 772,348 L 768,347 L 755,347 L 751,348 L 748,349 L 738,354 L 735,356 L 731,359 L 727,362 L 719,369 L 714,374 L 707,382 L 703,387 L 700,391 L 698,394 L 696,397 L 694,400 L 692,403 L 684,419 L 683,422 L 682,425 L 681,428 L 680,431 L 679,434 L 678,438 L 677,443 L 676,450 L 675,461 L 675,659 L 674,666 L 673,672 L 672,676 L 671,680 L 670,683 L 669,686 L 668,689 L 667,692 L 665,695 L 665,697 L 661,705 L 659,707 L 657,712 L 655,715 L 653,718 L 651,721 L 647,726 L 629,744 L 625,747 L 621,750 L 618,752 L 615,753 L 613,755 L 599,762 L 597,762 L 594,764 L 591,765 L 588,766 L 585,767 L 582,768 L 578,769 L 575,770 L 571,771 L 565,772 L 544,772 L 539,771 L 535,770 L 532,769 L 520,763 L 517,761 L 514,759 L 507,753 L 504,750 L 499,744 L 496,740 L 494,737 L 488,725 L 487,722 L 486,719 L 485,715 L 484,711 L 483,703 L 483,479 L 422,417 L 459,380 L 462,376 L 465,372 L 466,369 L 468,367 L 476,351 L 477,348 L 478,345 L 479,342 L 480,339 L 481,335 L 482,330 L 483,323 L 483,0 Z";

/**
 * Intro Animation — Green logo draws itself with SVG stroke animation
 * 
 * Phase 1 (0-3.5s): Stroke draws the outline (geometric line drawing)
 * Phase 2 (3.5-4.5s): Fill fades in (green), stroke fades out
 * Phase 3 (4.5-5s): Hold completed logo
 * Phase 4 (5-5.6s): Fade out → hero appears
 */
export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<'drawing' | 'hold' | 'exit'>('drawing');
  const [drawProgress, setDrawProgress] = useState(0);
  const [fillOpacity, setFillOpacity] = useState(0);
  const [strokeOpacity, setStrokeOpacity] = useState(1);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const pathRef = useRef<SVGPathElement>(null);
  const penTipRef = useRef<HTMLDivElement>(null);
  const pathLengthRef = useRef(0);

  // Measure path length on mount
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      pathLengthRef.current = len;
      pathRef.current.style.strokeDasharray = `${len}`;
      pathRef.current.style.strokeDashoffset = `${len}`;
    }
  }, []);

  useEffect(() => {
    const DRAW_DURATION = 3500;  // 3.5s drawing
    const FILL_DURATION = 1000;  // 1s fill transition
    const HOLD_DURATION = 500;   // 0.5s hold
    const EXIT_DURATION = 600;   // 0.6s exit

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const pathLen = pathLengthRef.current;

      if (elapsed < DRAW_DURATION) {
        // Phase 1: Stroke draws — ease-out for natural feel
        const raw = elapsed / DRAW_DURATION;
        const eased = 1 - Math.pow(1 - raw, 2); // ease-out quad
        setDrawProgress(eased);

        // Update the stroke dashoffset directly for smooth animation
        if (pathRef.current && pathLen > 0) {
          pathRef.current.style.strokeDashoffset = `${pathLen * (1 - eased)}`;
        }

        // Position pen tip along the path
        if (pathRef.current && penTipRef.current && pathLen > 0) {
          try {
            const point = pathRef.current.getPointAtLength(eased * pathLen);
            const svgEl = pathRef.current.closest('svg');
            const container = pathRef.current.closest('.intro-logo-container');
            if (svgEl && container) {
              const svgRect = svgEl.getBoundingClientRect();
              const contRect = container.getBoundingClientRect();
              const scaleX = svgRect.width / 800;
              const scaleY = svgRect.height / 794;
              const x = svgRect.left - contRect.left + point.x * scaleX;
              const y = svgRect.top - contRect.top + point.y * scaleY;
              penTipRef.current.style.left = `${x}px`;
              penTipRef.current.style.top = `${y}px`;
              penTipRef.current.style.opacity = '1';
            }
          } catch(e) { /* path not ready */ }
        }

        animRef.current = requestAnimationFrame(animate);
      } else if (elapsed < DRAW_DURATION + FILL_DURATION) {
        // Phase 2: Fill fades in, stroke fades out
        setDrawProgress(1);
        if (pathRef.current && pathLen > 0) {
          pathRef.current.style.strokeDashoffset = '0';
        }
        if (penTipRef.current) penTipRef.current.style.opacity = '0';

        const fillRaw = (elapsed - DRAW_DURATION) / FILL_DURATION;
        setFillOpacity(fillRaw);
        setStrokeOpacity(1 - fillRaw * 0.7); // stroke doesn't fully disappear, just becomes subtle
        animRef.current = requestAnimationFrame(animate);
      } else if (elapsed < DRAW_DURATION + FILL_DURATION + HOLD_DURATION) {
        // Phase 3: Hold
        setPhase('hold');
        animRef.current = requestAnimationFrame(animate);
      } else if (elapsed < DRAW_DURATION + FILL_DURATION + HOLD_DURATION + EXIT_DURATION) {
        // Phase 4: Exit
        setPhase('exit');
        animRef.current = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        backgroundColor: '#13140f',
        opacity: phase === 'exit' ? 0 : 1,
        transition: 'opacity 0.6s ease-out',
        pointerEvents: 'all',
      }}
    >
      {/* Logo container */}
      <div className="intro-logo-container relative flex items-center justify-center">
        {/* Ambient glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(29,55,45,0.15) 0%, rgba(143,191,168,0.05) 40%, transparent 70%)',
            opacity: drawProgress,
            filter: 'blur(50px)',
            transition: 'opacity 0.3s',
          }}
        />

        {/* SVG Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 794"
          className="w-[40vw] max-w-[180px] md:w-48 md:max-w-[220px] h-auto relative"
          style={{ zIndex: 2 }}
        >
          {/* Filled path — GREEN, hidden initially */}
          <path
            d={LOGO_PATH_D}
            fill="#1d372d"
            fillOpacity={fillOpacity}
            stroke="none"
          />
          {/* Stroke path — GREEN stroke that draws */}
          <path
            ref={pathRef}
            d={LOGO_PATH_D}
            fill="none"
            stroke="#8fbfa8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={strokeOpacity}
          />
        </svg>

        {/* Glowing pen tip */}
        <div
          ref={penTipRef}
          className="absolute pointer-events-none"
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(143,191,168,0.95) 0%, rgba(143,191,168,0.4) 30%, rgba(29,55,45,0.2) 50%, transparent 70%)',
            boxShadow: '0 0 16px rgba(143,191,168,0.6), 0 0 32px rgba(143,191,168,0.3), 0 0 64px rgba(29,55,45,0.15)',
            zIndex: 10,
            opacity: 0,
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    </div>
  );
}