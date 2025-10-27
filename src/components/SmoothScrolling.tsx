'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SmoothScrolling Component
 * Provides buttery-smooth kinetic scrolling using Lenis library
 * Integrates seamlessly with GSAP ScrollTrigger animations
 *
 * Features:
 * - Momentum-based scrolling
 * - 60fps performance with requestAnimationFrame
 * - Custom easing for natural feel
 * - Native touch scrolling on mobile for best UX
 */
export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis with optimized settings for smooth scrolling
    const lenis = new Lenis({
      // Scroll duration - higher values = slower but smoother
      duration: 1.2,

      // Custom easing function for natural deceleration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      // Orientation settings
      orientation: 'vertical' as const,
      gestureOrientation: 'vertical' as const,

      // Smooth wheel scrolling (desktop)
      smoothWheel: true,
      wheelMultiplier: 1,

      // Disable smooth touch for native mobile experience
      touchMultiplier: 2,

      // Disable infinite scroll
      infinite: false,
    });

    // Animation frame function to update Lenis on each frame
    function raf(time: number) {
      lenis.raf(time);

      // Update ScrollTrigger with each scroll tick for animation sync
      ScrollTrigger.update();

      requestAnimationFrame(raf);
    }

    // Start the animation loop
    requestAnimationFrame(raf);

    // Cleanup function - properly dispose of Lenis instance
    return () => {
      lenis.destroy();
    };
  }, []);

  // Render children without wrapper - Lenis handles the scroll container
  return <>{children}</>;
}
