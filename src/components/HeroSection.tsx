"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin for GSAP
gsap.registerPlugin(ScrollTrigger);

/**
 * HeroSection Component
 *
 * A sophisticated hero section featuring:
 * - Spread-out text layout: "A SERIOUSLY GOOD" on top, "DESIGN ENGINEER" below
 * - Floating image that tracks mouse movement horizontally
 * - Scroll-triggered expansion: image grows from initial size to 90% viewport height
 * - Scroll indicators at the bottom
 *
 * The hero section creates an immersive experience where the image
 * expands as the user scrolls, with the next section only becoming accessible
 * after the full expansion is complete.
 */
const HeroSection: React.FC = () => {
  // Refs for DOM elements
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // State for mouse position tracking (0-100, where 50 is center)
  const [mousePosition, setMousePosition] = useState({ x: 50 });

  // State to track if mouse tracking is enabled (disabled during scroll)
  const [isMouseTrackingEnabled, setIsMouseTrackingEnabled] = useState(true);

  // Ref to store scroll timeout
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Mouse move event handler
   * Calculates the horizontal position of the mouse relative to window width
   * and updates the state to move the image horizontally within safe bounds
   *
   * Only works when mouse tracking is enabled (not during scroll)
   */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Don't track mouse movement if disabled (during scroll)
    if (!isMouseTrackingEnabled) return;

    // Calculate mouse position as a percentage where 0 is far left, 50 is center, 100 is far right
    const mouseXPercent = (e.clientX / window.innerWidth) * 100;

    // Map to -16 to +16 range (increased from -14 to +14) to keep larger image within viewport bounds
    // This prevents any part of the image from going outside the view
    // Range: -16 (far left) to +16 (far right), with 0 being center
    const x = (mouseXPercent / 100) * 30 - 15; // -16 to +16 range (increased horizontal movement)
    setMousePosition({ x });
  }, [isMouseTrackingEnabled]);

  /**
   * Handle scroll events to disable mouse tracking during scroll
   * and re-enable it after scroll stops with a delay
   */
  const handleScroll = () => {
    // Disable mouse tracking during scroll
    setIsMouseTrackingEnabled(false);

    // Clear existing timeout if any
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Re-enable mouse tracking after scrolling stops (with 300ms delay)
    scrollTimeoutRef.current = setTimeout(() => {
      setIsMouseTrackingEnabled(true);
    }, 300);
  };

  /**
   * Effect hook to add and clean up mouse move and scroll event listeners
   * Only active on desktop (window width > 768px) for better UX
   */
  useEffect(() => {
    // Check if desktop
    if (window.innerWidth > 768) {
      // Add mouse move listener
      window.addEventListener("mousemove", handleMouseMove);

      // Add scroll listener to detect scroll and disable mouse tracking
      window.addEventListener("scroll", handleScroll, { passive: true });

      // Cleanup: remove listeners on component unmount
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);

        // Clear timeout if component unmounts
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [isMouseTrackingEnabled, handleMouseMove]);

  /**
   * GSAP Animation Hook
   * Sets up the scroll-triggered expansion and centering animation for the floating image
   */
  useGSAP(() => {
    if (!imageRef.current || !heroRef.current) return;

    /**
     * Scroll-triggered animation that:
     * - Pins the hero section while scrolling
     * - Moves image from its initial position to center (left: 50%, no horizontal offset)
     * - Expands the image from 60vh to 120vw × 120vh to completely cover the viewport
     * - Creates a smooth scrub animation tied to scroll position
     */
    gsap.to(imageRef.current, {
      left: "50%", // Move to center of screen
      top: "50%", // Move to center vertically
      width: "96vw", // Target width: 120% of viewport width to cover full screen with overflow
      height: "96vh", // Target height: 120% of viewport to cover full screen with overflow
      borderRadius: "1.5rem", // Maintain rounded corners during animation (24px)
      ease: "none", // Linear easing for smooth scroll-linked animation
      scrollTrigger: {
        trigger: heroRef.current, // Hero section is the trigger element
        start: "top top", // Start when hero top reaches viewport top
        end: "bottom top", // End when hero bottom reaches viewport top
        scrub: 1, // Smooth scrubbing with 1 second delay
        pin: true, // Pin the hero section during scroll
        anticipatePin: 1, // Anticipate pin for better performance
        onUpdate: () => {
          // Reset the transform to maintain centering during animation
          const element = imageRef.current;
          if (element) {
            element.style.transform = "translate(-50%, -50%)";
            // Ensure borderRadius is maintained
            if (!element.style.borderRadius) {
              element.style.borderRadius = "1.5rem";
            }
          }
        },
      },
    });
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full min-h-[200vh] bg-white dark:bg-gray-900 overflow-hidden"
    >
      {/* Hero Content Container - Full width for end-to-end text span */}
      <div
        ref={containerRef}
        className="relative w-full h-[100vh] flex flex-col items-center justify-center"
      >
        {/* Text Content Container - Below the image with proper layering, full width */}
        <div className="relative z-20 flex flex-col items-center gap-2 w-full" style={{ transform: 'translateY(250px)' }}>
          {/* Top Text Row - "A SERIOUSLY GOOD" spread from end to end */}
          <div className="flex items-center justify-between w-full max-w-[95vw] md:max-w-[95vw] px-2 md:px-4 lg:px-6">
            {/* Left Text - "A" */}
            <span className="text-sm md:text-base lg:text-xl font-bold text-black dark:text-white uppercase tracking-wider">
              {/* Switched from font-light to font-bold for bold appearance */}
              A
            </span>

            {/* Center Text - "SERIOUSLY" */}
            <span className="text-sm md:text-base lg:text-xl font-bold text-black dark:text-white uppercase tracking-wider">
              {/* Switched from font-light to font-bold for bold appearance */}
              SERIOUSLY
            </span>

            {/* Right Text - "GOOD" */}
            <span className="text-sm md:text-base lg:text-xl font-bold text-black dark:text-white uppercase tracking-wider">
              {/* Switched from font-light to font-bold for bold appearance */}
              GOOD
            </span>
          </div>

          {/* Main Title - "DESIGN ENGINEER" spans end to end */}
          {/*
            Main Title with Green-Colored "&" Symbol and Black Border on Text Only
            - "&" symbol receives color #00ff00, text-stroke used for black border
          */}
          <h1
            className="text-5xl md:text-7xl lg:text-[13rem] font-extrabold text-black dark:text-white uppercase tracking-tighter w-full text-center mx-auto"
          >
            DESIGN
            <span
              style={{
                color: "#00ff00",
                WebkitTextStroke: "2px #000",
                // No border property, only stroke on text
                display: "inline-block",
                margin: "0 0.15em",
              }}
            >
              &amp;
            </span>
            CREATIVE TEAM
          </h1>
        </div>

        {/* Floating Image Container - Positioned ABOVE text, tracks mouse horizontally and expands on scroll */}
        <div
          ref={imageRef}
          className="absolute z-30 overflow-hidden"
          style={{
            // Initial size for the image container - increased from 40vh to 60vh
            width: "60vh",
            height: "60vh",
            // Position above the text: 30% from top, centered horizontally
            top: "30%",
            left: "50%",
            // Rounded corners - using inline style to ensure it persists during GSAP animations
            borderRadius: "2rem", // Same as rounded-3xl (24px)
            // Transform: center the image and apply mouse-based horizontal movement
            // mousePosition.x ranges from -16 to +16, multiplied by 2vw to convert to viewport width units
            transform: `translate(calc(-50% + ${mousePosition.x * 2}vw), -50%)`,
            transition: "transform 0.1s ease-out", // Smooth transition for mouse movement
          }}
        >
          {/* Hero Image - Source from sample folder with proper aspect ratio */}
          <Image
            src="/sample/hero-test.png"
            alt="Hero floating image"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Scroll Indicators - Bottom corners */}
        {/* Left Indicator */}
        <div className="absolute bottom-8 left-8 text-xl font-bold text-black dark:text-white">
          ↓ Scroll for
        </div>

        {/* Right Indicator */}
        <div className="absolute bottom-8 right-8 text-xl font-bold text-black dark:text-white">
          cool sh*t ↓
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
