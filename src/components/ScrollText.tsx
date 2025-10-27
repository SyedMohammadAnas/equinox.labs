'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ScrollText Component
 * Creates a scroll-driven animation where words translate horizontally based on scroll position.
 * Each word class has different translation ranges to create a wave-like effect.
 */
export default function ScrollText() {
  // Ref for the container to set up ScrollTrigger
  const containerRef = useRef<HTMLDivElement>(null);

  // Text content organized by lines
  const textLines = [
    ['Passionate', 'about', 'merging'],
    ['design', 'and', 'engineering'],
    ['We', 'craft', 'smooth,', 'interactive'],
    ['experiences', 'with', 'purpose.'],
    ['With', 'a', 'focus', 'on', 'motion,'],
    ['performance,', 'and'],
    ['detail,', 'We', 'help', 'bring'],
    ['digital', 'products', 'to', 'life'],
    ['for', 'forward-thinking', 'brands'],
    ['around', 'the', 'world.'],
  ];

  // Flatten to single array of words for animation (not used directly, but lines are used)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined' || !containerRef.current) return;

    const wordOffsets = [
      -1.2, 0, 0.8, 1.2, 1.2, 1.6,
      -1.4, -0.4, -0.4, 1.2, -1.2, 0.8, 1.2,
      -0.8, 0, 1.4, 1.2, 1.2, -1.6, 0,
      1.2, 1.2, 1.0, 1.4, 1.2, 1.2, 1.6, 1.6,
      0, 2.0, 2.1, -1.0, 1.0, 1.4
    ];

    const wordElements = containerRef.current?.querySelectorAll('span');

    if (wordElements && wordElements.length > 0) {
      wordElements.forEach((word, idx) => {
        const xOffset = wordOffsets[idx] || 0;

        gsap.fromTo(
          word,
          {
            x: `${xOffset}em`,
            force3D: true,
          },
          {
            x: '0em',
            force3D: true,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: 1,
              markers: false,
            },
          }
        );
      });
    }

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative hidden lg:block min-h-[100vh] py-40 lg:py-60"
      style={{ paddingLeft: '10vw', paddingRight: '5vw', maxWidth: '100%' }}
    >
      {/* Section Title - "OURSELF" */}
      <div className="mb-8" style={{ marginLeft: '-9vw' }}>
        <h2 className="text-2xl font-bold tracking-tight">OURSELF</h2>
      </div>

      {/* Main Text with Word Classes */}
      <div className="text-[clamp(28px,3.5vw,96px)] font-semibold tracking-tight leading-none max-w-none" style={{ marginLeft: '-5vw' }}>
        {textLines.map((line, lineIndex) => (
          <div key={lineIndex} style={{ marginBottom: '0.05em' }}>
            {line.map((word, wordIndex) => (
              <span
                key={`${lineIndex}-${wordIndex}`}
                style={{
                  display: 'inline-block',
                  paddingRight: '0.35em',
                }}
              >
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
