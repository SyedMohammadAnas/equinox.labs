"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * NavigationWidget Component
 *
 * A persistent bottom-center navigation widget that:
 * - Shows user profile with scrolling text description
 * - Expands vertically to reveal menu items
 * - Uses GSAP for smooth animations
 * - Includes backdrop blur overlay when expanded
 *
 * Features:
 * - Fixed position at bottom center
 * - Hamburger menu to toggle expanded state
 * - Infinitely scrolling text with gradient fade edges
 * - 4 menu items (Home, Work, Lab, Contact) with thumbnails
 * - Smooth expand/collapse animations
 */
const NavigationWidget: React.FC = () => {
  // State to manage open/closed state of the widget
  const [isOpen, setIsOpen] = useState(false);

  // Refs for animation targets
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollingTextRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Effect to handle scrolling text animation
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Check if scrolling text element exists
    if (!scrollingTextRef.current) return;

    // Animate the scrolling text from right to left
    // Using gsap.to for infinite scrolling
    // xPercent: -100 moves the text completely to the left
    // Duration: 20 seconds for smooth, readable speed
    // Repeat: -1 means infinite loop
    // force3D: true enables hardware acceleration for smooth performance
    gsap.to(scrollingTextRef.current, {
      xPercent: -100,
      duration: 20,
      ease: "none",
      repeat: -1,
      force3D: true,
    });

    // Cleanup function to kill animation on unmount
    return () => {
      if (scrollingTextRef.current) {
        gsap.killTweensOf(scrollingTextRef.current);
      }
    };
  }, []);

  // Effect to handle expansion/collapse animation with smooth morphing
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Check if refs are available
    if (!containerRef.current || !contentRef.current) return;

    if (isOpen) {
      // Opening animation - measure actual height and animate to it
      // Get the natural height of the content
      const expandedHeight = contentRef.current.scrollHeight;

      // Container: expand height smoothly to actual measured height
      // Using force3D for hardware acceleration
      // Longer duration for smoother feel
      gsap.to(containerRef.current, {
        height: `${expandedHeight}px`,
        duration: 0.8,
        ease: "power2.out",
        force3D: true,
      });

      // Menu items: fade and slide up with stagger effect
      if (menuItemsRef.current && menuItemsRef.current.children.length > 0) {
        gsap.fromTo(
          menuItemsRef.current.children,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1, // Stagger delay for each item
            force3D: true,
          }
        );
      }
    } else {
      // Closing animation - get collapsed height and animate to it
      // Measure only the top section (without menu items)
      const profileSection = contentRef.current.querySelector(':first-child');
      const collapsedHeight = profileSection ? profileSection.scrollHeight : containerRef.current.scrollHeight;

      // Menu items: fade out and slide down
      if (menuItemsRef.current && menuItemsRef.current.children.length > 0) {
        gsap.to(menuItemsRef.current.children, {
          opacity: 0,
          y: -10,
          duration: 0.4,
          ease: "power2.in",
          stagger: 0.05,
          force3D: true,
          onComplete: () => {
            // After menu items fade, collapse the container
            if (containerRef.current) {
              gsap.to(containerRef.current, {
                height: `${collapsedHeight}px`,
                duration: 0.6,
                ease: "power2.in",
                force3D: true,
              });
            }
          },
        });
      } else {
        // If no menu items, just collapse immediately
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            height: `${collapsedHeight}px`,
            duration: 0.6,
            ease: "power2.in",
            force3D: true,
          });
        }
      }
    }
  }, [isOpen]);

  // Function to toggle open/close state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Menu items data - removed Contact, only 3 items
  const menuItems = [
    { id: 1, label: "Home", thumbnail: "itsjay.us" },
    { id: 2, label: "Work", thumbnail: "LEVEL UP YOUR MUSIC" },
    { id: 3, label: "Lab", thumbnail: "THE LAB" },
  ];

  return (
    <>
      {/* Main widget container - fixed at bottom center */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-[60] pointer-events-none mb-4">
        <div
          ref={containerRef}
          className="bg-neutral-900/95 rounded-[12px] pointer-events-auto max-w-xl"
          style={{ height: "auto" }}
        >
          {/* Content wrapper for measuring height */}
          <div ref={contentRef}>
            {/* Expanded menu items - shown when isOpen is true - at the TOP */}
            {isOpen && (
              <div ref={menuItemsRef} className="pt-5 px-6 space-y-3">
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer group"
                    style={{ opacity: 0 }}
                  >
                    {/* Thumbnail - rounded square - increased size */}
                    <div className="w-14 h-14 rounded-lg bg-neutral-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <span className="text-neutral-400 text-xs font-bold uppercase px-2 text-center leading-tight">
                        {item.thumbnail}
                      </span>
                    </div>

                    {/* Menu item label - increased size */}
                    <span className="text-white font-bold text-base uppercase">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Profile section - always visible at the BOTTOM */}
            <div className="flex items-center gap-4 px-6 py-3.5">
              {/* Left: Avatar section - increased size */}
              <div className="flex-shrink-0">
                {/* Circular avatar container */}
                <div className="w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center overflow-hidden">
                  {/* Placeholder emoji avatar - larger */}
                  <div className="text-3xl">👤</div>
                </div>
              </div>

              {/* Center: Name and scrolling text section */}
              <div className="flex-1 min-w-0">
                {/* User name - increased font size */}
                <h3 className="text-white font-bold text-base uppercase tracking-wide mb-1.5">
                  SYED MOHAMMAD ANAS
                </h3>

                {/* Scrolling text container with gradient fade edges - increased size */}
                <div className="flex justify-center items-center h-4 overflow-hidden relative w-full">
                  {/* Left gradient fade */}
                  <div className="absolute left-0 h-full w-10 bg-gradient-to-r from-neutral-900/95 to-neutral-900/0 z-10" />

                  {/* Right gradient fade */}
                  <div className="absolute right-0 h-full w-10 bg-gradient-to-l from-neutral-900/95 to-neutral-900/0 z-10" />

                  {/* Scrolling text - infinite loop */}
                  <div className="flex overflow-hidden" ref={scrollingTextRef}>
                    {/* Duplicate text for seamless loop */}
                    <p className="text-[11px] tracking-[0.15em] text-neutral-300 uppercase whitespace-nowrap pr-4">
                      Creative Design Engineer, Awwwards Stalker, Product Builder, Next.js Enthusiast,
                    </p>
                    <p className="text-[11px] tracking-[0.15em] text-neutral-300 uppercase whitespace-nowrap pr-4">
                      Creative Design Engineer, Awwwards Stalker, Product Builder, Next.js Enthusiast,
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Hamburger/Close button - increased size */}
              <div className="flex-shrink-0 cursor-pointer" onClick={toggleMenu}>
                {/* Hamburger menu (3 lines) when closed */}
                {!isOpen && (
                  <div className="flex flex-col gap-1.5 w-6">
                    <div className="h-0.5 bg-white rounded-full" />
                    <div className="h-0.5 bg-white rounded-full" />
                    <div className="h-0.5 bg-white rounded-full" />
                  </div>
                )}

                {/* X close button when open - larger */}
                {isOpen && (
                  <div className="flex items-center justify-center w-7 h-7">
                    <div className="relative w-6 h-6">
                      {/* Top-left to bottom-right line */}
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white rounded-full transform -translate-y-1/2 rotate-45" />
                      {/* Top-right to bottom-left line */}
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white rounded-full transform -translate-y-1/2 -rotate-45" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationWidget;
