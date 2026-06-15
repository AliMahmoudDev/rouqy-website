'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// Logo SVG path data (from client's inline SVG)
const LOGO_PATH_D = "M345.55,167.19c0,6.3-2.72,11.08-8.16,14.35-2.81,1.53-5.64,2.28-8.47,2.28-2.19,0-4.24-.42-6.21-1.3-4.78-2.17-7.94-5.86-9.46-11.1-.44-1.5-1.53-2.28-3.27-2.28-1.08,0-1.95.55-2.61,1.64-3.03,5.66-4.55,11.65-4.55,17.95,0,2.61.2,5.22.64,7.83,1.53,8.93,7.19,16.43,16.98,22.53,3.47,1.53,6.04,3.91,7.67,7.16,1.61,3.27,2.43,6.77,2.43,10.46,0,12.85-2.17,25.56-6.52,38.18-8.91,27.2-24.59,46.9-47.01,59.08-11.3,6.08-24.25,9.24-38.82,9.46h-64.41v-162.48c0-79.26-64.23-143.49-143.47-143.49H10.03v113.01H1.5V1.5h208.23v133.7c0,12.67-5.04,24.83-14,33.78l-12.51,12.54,26.51,26.51v94.25c0,3.2.47,6.3,1.33,9.22,2.12,7.15,6.22,11.73,8.15,13.66,1.79,1.79,6.71,6.58,14.55,8.39,7.69,1.78,14.33-.19,19.56-1.75.75-.22,2.97-.9,5.75-2.09,13.27-5.66,22.84-15.23,28.72-28.72,2.83-6.74,4.22-14.04,4.22-21.87v-76.06c0-11.3,2.94-21.38,8.82-30.18,5.88-8.82,12.51-15.39,19.9-19.74,2.83-1.53,5.66-2.3,8.49-2.3,6.1,0,10.77,2.74,14.04,8.18,1.53,2.61,2.28,5.33,2.28,8.16Z";

const projects = [
  { bg: 'url(/project1.jpg) center/cover' },
  { bg: 'url(/project2.jpg) center/cover' },
  { bg: 'url(/project3.jpg) center/cover' },
  { bg: 'url(/project4.jpg) center/cover' },
  { bg: 'url(/project5.jpg) center/cover' },
  { bg: 'url(/project6.jpg) center/cover' },
];

export default function Home() {
  const [introVisible, setIntroVisible] = useState(true);
  const [heroShow, setHeroShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const aboutSectionRef = useRef<HTMLElement>(null);
  const drawPathRef = useRef<SVGPathElement>(null);
  const fillPathRef = useRef<SVGPathElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const aboutLogoSvgRef = useRef<SVGSVGElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const contactInnerRef = useRef<HTMLDivElement>(null);

  // Intro animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroVisible(false);
      setHeroShow(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Header scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isDesktop = window.innerWidth > 768;

    // About section animation
    if (drawPathRef.current && isDesktop) {
      const length = drawPathRef.current.getTotalLength();

      gsap.set(fillPathRef.current, { opacity: 0 });

      gsap.set(drawPathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.set(aboutContentRef.current, {
        x: -120,
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: 'top top',
          end: '+=4000',
          scrub: true,
          pin: true,
        },
      });

      tl.to(drawPathRef.current, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'none',
      })
        .to(fillPathRef.current, {
          opacity: 1,
          duration: 1,
        })
        .to(drawPathRef.current, {
          opacity: 0,
          duration: 0.5,
        })
        .to(aboutLogoSvgRef.current, {
          scale: 7,
          x: () => window.innerWidth * 0.28,
          duration: 3,
          transformOrigin: 'center center',
        })
        .to(
          aboutContentRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 1.5,
          },
          '-=1.5'
        );
    }

    // Gallery horizontal scroll
    if (galleryTrackRef.current) {
      gsap.to(galleryTrackRef.current, {
        x: () => -(galleryTrackRef.current!.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: projectsSectionRef.current,
          start: 'top top',
          end: () => '+=' + (galleryTrackRef.current!.scrollWidth - window.innerWidth),
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }

    // Contact section animation
    if (contactInnerRef.current) {
      const children = contactInnerRef.current.children;
      gsap.set(children, { y: 40, opacity: 0 });

      gsap.to(children, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contactSectionRef.current,
          start: 'top 70%',
        },
      });
    }

    // Smooth scroll for nav links
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')!;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          const targetY = targetEl.getBoundingClientRect().top + window.scrollY;
          const distance = Math.abs(targetY - window.scrollY);
          const duration = Math.min(1.6, 0.5 + distance / 6000);

          gsap.to(window, {
            duration: duration,
            scrollTo: { y: targetId, offsetY: 80 },
            ease: 'power2.inOut',
          });
        }
      }
    };

    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', handleNavClick);
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      document.querySelectorAll('.nav-links a').forEach((link) => {
        link.removeEventListener('click', handleNavClick);
      });
    };
  }, []);

  return (
    <>
      {/* ====== INTRO ====== */}
      {introVisible && (
        <div id="intro">
          <img src="/logo.svg" className="intro-logo" alt="ROUQY" />
        </div>
      )}

      {/* ====== HEADER ====== */}
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <img src="/logo.svg" alt="ROUQY" className="header-logo" />
      </header>

      {/* ====== HERO ====== */}
      <section className="hero">
        <img
          src="/text.svg"
          alt="ROUQY"
          className={`hero-logo${heroShow ? ' show' : ''}`}
        />
        <div className="scroll-line" />
      </section>

      {/* ====== ABOUT ====== */}
      <section className="about-section" id="about" ref={aboutSectionRef}>
        <div className="about-stage">
          <div className="about-content" ref={aboutContentRef}>
            <span className="about-label">ROUQY</span>
            <div className="about-line" />
            <h2>
              <span className="bold">Where Vision</span>
              <br />
              <span className="light">Meets Refinement.</span>
            </h2>
            <p>
              ROUQY is a luxury interior design studio dedicated to transforming
              ideas into exceptional spaces. From concept development to final
              execution, we deliver tailored environments defined by precision,
              sophistication, and enduring quality.
            </p>
          </div>
          <div className="about-logo">
            <svg
              ref={aboutLogoSvgRef}
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 347.05 344.93"
            >
              <path
                ref={fillPathRef}
                id="fill-logo"
                d={LOGO_PATH_D}
                fill="#fff"
              />
              <path
                ref={drawPathRef}
                id="draw-logo"
                d={LOGO_PATH_D}
                fill="none"
                stroke="#fff"
                strokeMiterlimit="10"
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ====== PROJECTS ====== */}
      <section className="projects-section" id="projects" ref={projectsSectionRef}>
        <div className="gallery-wrap">
          <div className="gallery-track" ref={galleryTrackRef}>
            <div className="gallery-intro">
              <span className="gallery-label">Selected Work</span>
              <h2 className="gallery-heading">
                <span className="bold">Our</span>{' '}
                <span className="light">Projects</span>
              </h2>
            </div>
            {projects.map((project, i) => (
              <div
                key={i}
                className="gallery-img"
                style={{ background: project.bg }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ====== CONTACT ====== */}
      <section className="contact-section" id="contact" ref={contactSectionRef}>
        <div className="contact-inner" ref={contactInnerRef}>
          <span className="contact-label">Get in touch</span>
          <h2 className="contact-title">
            <span className="light">Let&apos;s create</span>
            <br />
            <span className="bold">something refined.</span>
          </h2>
          <div className="contact-grid">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your name" />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="your@email.com" />
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your project"
                />
              </div>
              <button type="button" className="contact-btn">
                Send Message
              </button>
            </form>
            <div className="contact-details">
              <div className="detail">
                <span className="detail-label">Email</span>
                <a href="mailto:info@rouqy.com">info@rouqy.com</a>
              </div>
              <div className="detail">
                <span className="detail-label">Phone</span>
                <a href="tel:+966570533358">+966 57 053 3358</a>
              </div>
              <div className="detail">
                <span className="detail-label">Studio</span>
                <p>Riyadh, Saudi Arabia</p>
              </div>
              <div className="detail">
                <span className="detail-label">Follow</span>
                <div className="socials">
                  <a href="#">Instagram</a>
                  <a href="#">Behance</a>
                  <a href="#">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
