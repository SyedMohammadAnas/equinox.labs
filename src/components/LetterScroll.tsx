'use client'

import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * Letter Scroll Component
 *
 * Creates a text reveal animation where letters scroll up from below,
 * creating a glitch/reveal effect. Each letter has a duplicate positioned
 * above the original and uses transform animations to create the scroll effect.
 *
 * Features:
 * - Direct scroll position calculation for reliable animation
 * - Responsive text sizing using clamp()
 * - Staggered letter animations triggered by scroll
 * - Glitch/reveal effect with smooth timing
 * - Two-line text layout
 * - Optimized performance with throttled scroll events
 * - Precise scroll progress tracking
 */
const LetterScroll: React.FC = () => {
  const containerRef = useRef<HTMLUListElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
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

  return (
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
  );
};

export default LetterScroll;
