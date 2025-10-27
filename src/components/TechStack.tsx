'use client'

import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * TechStack Component
 *
 * Combines letter scroll animation with technology grid and hover highlight functionality.
 * Features smooth scroll-based letter animations and interactive hover effects on the tech grid.
 *
 * Features:
 * - Letter scroll animation with smooth reveal effects
 * - Interactive technology grid with hover highlights
 * - Responsive design for all screen sizes
 * - Smooth animations and transitions
 * - Professional tech stack showcase
 */
const TechStack: React.FC = () => {
  const containerRef = useRef<HTMLUListElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [highlightPosition, setHighlightPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const animationFrameRef = useRef<number | null>(null);

  // Calculate scroll progress based on component position
  const calculateScrollProgress = useCallback(() => {
    if (!containerRef.current) return 0;

    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate when the component starts and ends its animation
    const componentTop = rect.top;

    // Animation starts when component is 20% from bottom of viewport
    const animationStart = windowHeight * 0.8;
    // Animation ends when component is 20% from top of viewport
    const animationEnd = windowHeight * 0.2;

    // Calculate progress based on component position
    let progress = 0;

    if (componentTop <= animationStart && componentTop >= animationEnd) {
      // Component is in animation range
      const totalAnimationDistance = animationStart - animationEnd;
      const currentDistance = animationStart - componentTop;
      progress = Math.max(0, Math.min(1, currentDistance / totalAnimationDistance));
    } else if (componentTop < animationEnd) {
      // Component is above animation range (fully revealed)
      progress = 1;
    } else if (componentTop > animationStart) {
      // Component is below animation range (fully hidden)
      progress = 0;
    }

    return progress;
  }, []);

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    const progress = calculateScrollProgress();
    setScrollProgress(progress);
  }, [calculateScrollProgress]);

  // Throttled scroll event listener
  useEffect(() => {
    const throttledScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleScroll]);

  // Calculate letter transform based on scroll progress and letter index
  const getLetterTransform = (index: number) => {
    const totalLetters = 15; // Total number of letters
    const letterThreshold = index / totalLetters; // When this letter should start revealing
    const letterDuration = 0.12; // How long each letter takes to reveal

    // Calculate reveal progress for this specific letter
    let letterProgress = 0;

    if (scrollProgress >= letterThreshold) {
      // Letter is in reveal phase
      letterProgress = Math.min(1, (scrollProgress - letterThreshold) / letterDuration);
    } else if (scrollProgress < letterThreshold - letterDuration) {
      // Letter is hidden
      letterProgress = 0;
    } else {
      // Letter is in hide phase (scrolling back up)
      letterProgress = Math.max(0, 1 - ((letterThreshold - scrollProgress) / letterDuration));
    }

    // Apply easing function for smoother animation
    const easedProgress = easeOutCubic(letterProgress);

    // Convert progress to transform value
    const translateY = 100 - (easedProgress * 100);
    return `translate(0%, ${Math.max(0, translateY)}%)`;
  };

  // Easing function for smoother animations
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

    // Handle grid item hover with smooth positioning
  const handleGridItemHover = (_itemName: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const containerRect = event.currentTarget.closest('.tech-grid-container')?.getBoundingClientRect();

    if (containerRect) {
      setHighlightPosition({
        x: rect.left - containerRect.left,
        y: rect.top - containerRect.top,
        width: rect.width,
        height: rect.height
      });
    }
  };

  // Handle grid item leave
  const handleGridItemLeave = () => {
    // Hide the highlight when mouse leaves grid area
    setHighlightPosition({ x: 0, y: 0, width: 0, height: 0 });
  };

  return (
    <section className="pb-2 px-4 lg:px-8" data-no-cursor-morph>
      {/* Letter Scroll Animation */}
      <ul
        ref={containerRef}
        className="letter-scroll flex flex-col justify-center items-center h-[500px] lg:h-[800px] py-24"
      >
        {/* First Line: MODERN */}
        <li className="text-[clamp(48px,14vw,250px)] font-bold tracking-tight leading-[0.85] overflow-hidden flex">
          <span
            className="letter relative inline-block transition-transform duration-300 ease-out"
            style={{ transform: getLetterTransform(0) }}
          >
            <span>M</span>
            <span className="absolute bottom-full left-0">M</span>
          </span>
          <span
            className="letter relative inline-block transition-transform duration-300 ease-out"
            style={{ transform: getLetterTransform(1) }}
          >
            <span>O</span>
            <span className="absolute bottom-full left-0">O</span>
          </span>
          <span
            className="letter relative inline-block transition-transform duration-300 ease-out"
            style={{ transform: getLetterTransform(2) }}
          >
            <span>D</span>
            <span className="absolute bottom-full left-0">D</span>
          </span>
          <span
            className="letter relative inline-block transition-transform duration-300 ease-out"
            style={{ transform: getLetterTransform(3) }}
          >
            <span>E</span>
            <span className="absolute bottom-full left-0">E</span>
          </span>
          <span
            className="letter relative inline-block transition-transform duration-300 ease-out"
            style={{ transform: getLetterTransform(4) }}
          >
            <span>R</span>
            <span className="absolute bottom-full left-0">R</span>
          </span>
          <span
            className="letter relative inline-block transition-transform duration-300 ease-out"
            style={{ transform: getLetterTransform(5) }}
          >
            <span>N</span>
            <span className="absolute bottom-full left-0">N</span>
          </span>
        </li>

        {/* Second Line: TECH STACK */}
        <li className="text-[clamp(48px,14vw,250px)] font-bold tracking-tight leading-[0.9] lg:leading-[0.85] overflow-hidden flex">
          <span
            className="letter relative inline-block transition-transform duration-300 ease-out"
            style={{ transform: getLetterTransform(6) }}
          >
            <span>T</span>
            <span className="absolute bottom-full left-0">T</span>
          </span>
          <span
            className="letter relative inline-block transition-transform duration-300 ease-out"
            style={{ transform: getLetterTransform(7) }}
          >
            <span>E</span>
            <span className="absolute bottom-full left-0">E</span>
          </span>
          <span
            className="letter relative inline-block transition-transform duration-300 ease-out"
            style={{ transform: getLetterTransform(8) }}
          >
            <span>C</span>
            <span className="absolute bottom-full left-0">C</span>
          </span>
          <span
            className="letter relative inline-block mr-[clamp(16px,4.5vw,72px)] transition-transform duration-300 ease-out"
            style={{ transform: getLetterTransform(9) }}
          >
            <span>H</span>
            <span className="absolute bottom-full left-0">H</span>
          </span>
          <span
            className="letter relative inline-block transition-transform duration-300 ease-out"
            style={{ transform: getLetterTransform(10) }}
          >
            <span>S</span>
            <span className="absolute bottom-full left-0">S</span>
          </span>
          <span
            className="letter relative inline-block transition-transform duration-300 ease-out"
            style={{ transform: getLetterTransform(11) }}
          >
            <span>T</span>
            <span className="absolute bottom-full left-0">T</span>
          </span>
          <span
            className="letter relative inline-block transition-transform duration-300 ease-out"
            style={{ transform: getLetterTransform(12) }}
          >
            <span>A</span>
            <span className="absolute bottom-full left-0">A</span>
          </span>
          <span
            className="letter relative inline-block transition-transform duration-300 ease-out"
            style={{ transform: getLetterTransform(13) }}
          >
            <span>C</span>
            <span className="absolute bottom-full left-0">C</span>
          </span>
          <span
            className="letter relative inline-block transition-transform duration-300 ease-out"
            style={{ transform: getLetterTransform(14) }}
          >
            <span>K</span>
            <span className="absolute bottom-full left-0">K</span>
          </span>
        </li>
      </ul>

      {/* Technology Grid Section */}
      <h4 className="font-semibold uppercase mb-2">Professional at</h4>
      <div className="relative tech-grid-container">
        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-rows-2">
          {/* Top Row - 3 columns */}
          <div className="grid grid-cols-3 border-b border-neutral-300 h-[clamp(200px,20vw,400px)]">
            <a
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="grid-item flex items-center justify-center border-r border-neutral-300 group cursor-pointer"
              aria-label="Visit React website"
              onMouseEnter={(e) => handleGridItemHover('react', e)}
              onMouseLeave={handleGridItemLeave}
            >
              <img
                alt="React"
                loading="lazy"
                width="90"
                height="90"
                decoding="async"
                className="z-10 transition-all duration-300 group-hover:invert"
                style={{ color: 'transparent' }}
                src="/images/svg/react-logo.svg"
              />
            </a>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="grid-item flex items-center justify-center border-r border-neutral-300 group cursor-pointer"
              aria-label="Visit Next.js website"
              onMouseEnter={(e) => handleGridItemHover('nextjs', e)}
              onMouseLeave={handleGridItemLeave}
            >
              <img
                alt="Next.js"
                loading="lazy"
                width="150"
                height="150"
                decoding="async"
                className="z-10 transition-all duration-300 group-hover:invert"
                style={{ color: 'transparent' }}
                src="/images/svg/nextjs-logotype-light-background.svg"
              />
            </a>
            <a
              href="https://www.typescriptlang.org"
              target="_blank"
              rel="noopener noreferrer"
              className="grid-item flex items-center justify-center group cursor-pointer"
              aria-label="Visit TypeScript website"
              onMouseEnter={(e) => handleGridItemHover('typescript', e)}
              onMouseLeave={handleGridItemLeave}
            >
              <img
                alt="TypeScript"
                loading="lazy"
                width="70"
                height="70"
                decoding="async"
                className="z-10 transition-all duration-300 group-hover:invert"
                style={{ color: 'transparent' }}
                src="/images/svg/typescript-logo.svg"
              />
            </a>
          </div>

          {/* Bottom Row - 7 columns */}
          <div className="grid grid-cols-7 h-[clamp(200px,15vw,400px)]">
            <a
              href="https://gsap.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid-item flex items-center justify-center border-r border-neutral-300 group cursor-pointer"
              aria-label="Visit GSAP website"
              onMouseEnter={(e) => handleGridItemHover('gsap', e)}
              onMouseLeave={handleGridItemLeave}
            >
              <img
                alt="GSAP"
                loading="lazy"
                width="80"
                height="80"
                decoding="async"
                className="z-10 transition-all duration-300 group-hover:invert"
                style={{ color: 'transparent' }}
                src="/images/svg/gsap-black.svg"
              />
            </a>
            <a
              href="https://motion.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid-item flex items-center justify-center border-r border-neutral-300 group cursor-pointer"
              aria-label="Visit Motion website"
              onMouseEnter={(e) => handleGridItemHover('motion', e)}
              onMouseLeave={handleGridItemLeave}
            >
              <img
                alt="Motion"
                loading="lazy"
                width="80"
                height="80"
                decoding="async"
                className="z-10 transition-all duration-300 group-hover:invert"
                style={{ color: 'transparent' }}
                src="/images/svg/motion.svg"
              />
            </a>
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid-item flex items-center justify-center border-r border-neutral-300 group cursor-pointer"
              aria-label="Visit TailwindCSS website"
              onMouseEnter={(e) => handleGridItemHover('tailwind', e)}
              onMouseLeave={handleGridItemLeave}
            >
              <img
                alt="TailwindCSS"
                loading="lazy"
                width="70"
                height="70"
                decoding="async"
                className="z-10 transition-all duration-300 group-hover:invert"
                style={{ color: 'transparent' }}
                src="/images/svg/tailwindcss-logo.svg"
              />
            </a>
            <a
              href="https://www.contentful.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid-item flex items-center justify-center border-r border-neutral-300 group cursor-pointer"
              aria-label="Visit Contentful website"
              onMouseEnter={(e) => handleGridItemHover('contentful', e)}
              onMouseLeave={handleGridItemLeave}
            >
              <img
                alt="Contentful"
                loading="lazy"
                width="50"
                height="50"
                decoding="async"
                className="z-10 transition-all duration-300 group-hover:invert"
                style={{ color: 'transparent' }}
                src="/images/svg/contentful-logo.svg"
              />
            </a>
            <a
              href="https://supabase.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid-item flex items-center justify-center border-r border-neutral-300 group cursor-pointer"
              aria-label="Visit Supabase website"
              onMouseEnter={(e) => handleGridItemHover('supabase', e)}
              onMouseLeave={handleGridItemLeave}
            >
              <img
                alt="Supabase"
                loading="lazy"
                width="50"
                height="50"
                decoding="async"
                className="z-10 transition-all duration-300 group-hover:invert"
                style={{ color: 'transparent' }}
                src="/images/svg/supabase-logo.svg"
              />
            </a>
            <a
              href="https://vercel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid-item flex items-center justify-center border-r border-neutral-300 group cursor-pointer"
              aria-label="Visit Vercel website"
              onMouseEnter={(e) => handleGridItemHover('vercel', e)}
              onMouseLeave={handleGridItemLeave}
            >
              <img
                alt="Vercel"
                loading="lazy"
                width="90"
                height="90"
                decoding="async"
                className="z-10 transition-all duration-300 group-hover:invert"
                style={{ color: 'transparent' }}
                src="/images/svg/vercel-logotype-light.svg"
              />
            </a>
            <a
              href="https://www.figma.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid-item flex items-center justify-center group cursor-pointer"
              aria-label="Visit Figma website"
              onMouseEnter={(e) => handleGridItemHover('figma', e)}
              onMouseLeave={handleGridItemLeave}
            >
              <img
                alt="Figma"
                loading="lazy"
                width="60"
                height="60"
                decoding="async"
                className="z-10 transition-all duration-300 group-hover:invert"
                style={{ color: 'transparent' }}
                src="/images/svg/figma-logo.svg"
              />
            </a>
          </div>
        </div>

        {/* Mobile Grid */}
        <div className="grid grid-cols-2 lg:hidden">
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="grid-item flex items-center justify-center border-r border-b border-neutral-300 group cursor-pointer h-[clamp(200px,20vw,400px)]"
            aria-label="Visit React website"
            onMouseEnter={(e) => handleGridItemHover('react', e)}
            onMouseLeave={handleGridItemLeave}
          >
            <img
              alt="React"
              loading="lazy"
              width="70"
              height="70"
              decoding="async"
              className="z-10 transition-all duration-300 group-hover:invert"
              style={{ color: 'transparent' }}
              src="/images/svg/react-logo.svg"
            />
          </a>
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="grid-item flex items-center justify-center border-b border-neutral-300 group cursor-pointer h-[clamp(200px,20vw,400px)]"
            aria-label="Visit Next.js website"
            onMouseEnter={(e) => handleGridItemHover('nextjs', e)}
            onMouseLeave={handleGridItemLeave}
          >
            <img
              alt="Next.js"
              loading="lazy"
              width="100"
              height="100"
              decoding="async"
              className="z-10 transition-all duration-300 group-hover:invert"
              style={{ color: 'transparent' }}
              src="/images/svg/nextjs-logotype-light-background.svg"
            />
          </a>
          <a
            href="https://www.typescriptlang.org"
            target="_blank"
            rel="noopener noreferrer"
            className="grid-item flex items-center justify-center border-r border-b border-neutral-300 group cursor-pointer h-[clamp(200px,20vw,400px)]"
            aria-label="Visit TypeScript website"
            onMouseEnter={(e) => handleGridItemHover('typescript', e)}
            onMouseLeave={handleGridItemLeave}
          >
            <img
              alt="TypeScript"
              loading="lazy"
              width="64"
              height="64"
              decoding="async"
              className="z-10 transition-all duration-300 group-hover:invert"
              style={{ color: 'transparent' }}
              src="/images/svg/typescript-logo.svg"
            />
          </a>
          <a
            href="https://gsap.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="grid-item flex items-center justify-center border-b border-neutral-300 group cursor-pointer h-[clamp(200px,20vw,400px)]"
            aria-label="Visit GSAP website"
            onMouseEnter={(e) => handleGridItemHover('gsap', e)}
            onMouseLeave={handleGridItemLeave}
          >
            <img
              alt="GSAP"
              loading="lazy"
              width="80"
              height="80"
              decoding="async"
              className="z-10 transition-all duration-300 group-hover:invert"
              style={{ color: 'transparent' }}
              src="/images/svg/gsap-black.svg"
            />
          </a>
          <a
            href="https://motion.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="grid-item flex items-center justify-center border-r border-b border-neutral-300 group cursor-pointer h-[clamp(200px,20vw,400px)]"
            aria-label="Visit Motion website"
            onMouseEnter={(e) => handleGridItemHover('motion', e)}
            onMouseLeave={handleGridItemLeave}
          >
            <img
              alt="Motion"
              loading="lazy"
              width="80"
              height="80"
              decoding="async"
              className="z-10 transition-all duration-300 group-hover:invert"
              style={{ color: 'transparent' }}
              src="/images/svg/motion.svg"
            />
          </a>
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="grid-item flex items-center justify-center border-b border-neutral-300 group cursor-pointer h-[clamp(200px,20vw,400px)]"
            aria-label="Visit TailwindCSS website"
            onMouseEnter={(e) => handleGridItemHover('tailwind', e)}
            onMouseLeave={handleGridItemLeave}
          >
            <img
              alt="TailwindCSS"
              loading="lazy"
              width="70"
              height="70"
              decoding="async"
              className="z-10 transition-all duration-300 group-hover:invert"
              style={{ color: 'transparent' }}
              src="/images/svg/tailwindcss-logo.svg"
            />
          </a>
          <a
            href="https://www.contentful.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="grid-item flex items-center justify-center border-r border-b border-neutral-300 group cursor-pointer h-[clamp(200px,20vw,400px)]"
            aria-label="Visit Contentful website"
            onMouseEnter={(e) => handleGridItemHover('contentful', e)}
            onMouseLeave={handleGridItemLeave}
          >
            <img
              alt="Contentful"
              loading="lazy"
              width="50"
              height="50"
              decoding="async"
              className="z-10 transition-all duration-300 group-hover:invert"
              style={{ color: 'transparent' }}
              src="/images/svg/contentful-logo.svg"
            />
          </a>
          <a
            href="https://supabase.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="grid-item flex items-center justify-center border-b border-neutral-300 group cursor-pointer h-[clamp(200px,20vw,400px)]"
            aria-label="Visit Supabase website"
            onMouseEnter={(e) => handleGridItemHover('supabase', e)}
            onMouseLeave={handleGridItemLeave}
          >
            <img
              alt="Supabase"
              loading="lazy"
              width="50"
              height="50"
              decoding="async"
              className="z-10 transition-all duration-300 group-hover:invert"
              style={{ color: 'transparent' }}
              src="/images/svg/supabase-logo.svg"
            />
          </a>
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="grid-item flex items-center justify-center border-r border-neutral-300 group cursor-pointer h-[clamp(200px,20vw,400px)]"
            aria-label="Visit Vercel website"
            onMouseEnter={(e) => handleGridItemHover('vercel', e)}
            onMouseLeave={handleGridItemLeave}
          >
            <img
              alt="Vercel"
              loading="lazy"
              width="90"
              height="90"
              decoding="async"
              className="z-10 transition-all duration-300 group-hover:invert"
              style={{ color: 'transparent' }}
              src="/images/svg/vercel-logotype-light.svg"
            />
          </a>
          <a
            href="https://www.figma.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="grid-item flex items-center justify-center group cursor-pointer h-[clamp(200px,20vw,400px)]"
            aria-label="Visit Figma website"
            onMouseEnter={(e) => handleGridItemHover('figma', e)}
            onMouseLeave={handleGridItemLeave}
          >
            <img
              alt="Figma"
              loading="lazy"
              width="60"
              height="60"
              decoding="async"
              className="z-10 transition-all duration-300 group-hover:invert"
              style={{ color: 'transparent' }}
              src="/images/svg/figma-logo.svg"
            />
          </a>
        </div>

                {/* Smooth Hover Highlight */}
        <div
          className="highlight hidden sm:block absolute top-0 left-0 bg-neutral-900 pointer-events-none transition-all duration-300 ease-out"
          style={{
            transform: `translate(${highlightPosition.x}px, ${highlightPosition.y}px)`,
            width: highlightPosition.width,
            height: highlightPosition.height
          }}
        />
      </div>
    </section>
  );
};

export default TechStack;
