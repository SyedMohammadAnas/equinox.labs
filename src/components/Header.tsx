"use client";

import React, { useEffect, useState } from "react";

/**
 * Header Component
 *
 * A header section with a completely transparent background featuring
 * contact information and a call-to-action button.
 *
 * Features:
 * - Transparent background for seamless page integration
 * - Three-column information layout on the left
 * - Each column has primary heading and secondary text
 * - Pill-shaped button on the right side
 * - Changes to white text/button when footer is visible
 * - Responsive design with proper spacing
 * - Uses Lota Grotesque font family automatically
 * - Professional and clean layout
 */
const Header: React.FC = () => {
  // State to track if we've scrolled past TechStack component
  const [hasScrolledPastTech, setHasScrolledPastTech] = useState(false);

  // Effect to detect when scrolled past TechStack component
  useEffect(() => {
    const handleScroll = () => {
      // Find the TechStack section by looking for elements with 'data-no-cursor-morph' attribute
      // or by finding section elements that contain the technology grid
      const techSection = document.querySelector('section[data-no-cursor-morph]');

      if (techSection) {
        const rect = techSection.getBoundingClientRect();
        // Check if we've scrolled past the TechStack component
        // The section is considered "passed" when its bottom is above the viewport top
        const hasPassed = rect.bottom < 0;
        setHasScrolledPastTech(hasPassed);
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Check initially
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className="fixed top-0 left-0 w-full bg-transparent px-8 py-5 z-40">
      {/* Header Container - Flexbox layout for information blocks and button */}
      <div className="max-w-full flex items-center justify-between gap-8 pointer-events-auto">
        {/* Left Section - Information Blocks */}
        <div className="flex gap-12 md:gap-16 lg:gap-80">
          {/* First Information Block - Location */}
          <div className="flex flex-col justify-center">
            {/* Primary Text - Changes to white when scrolled past TechStack */}
            <h2 className={`text-base md:text-2xl font-bold transition-colors duration-300 ${hasScrolledPastTech ? 'text-white' : 'text-[#333333] dark:text-white'}`}>
              IND Based
            </h2>
            {/* Secondary Text - Changes to light gray when scrolled past TechStack */}
            <span className={`text-sm md:text-xl font-light transition-colors duration-300 ${hasScrolledPastTech ? 'text-gray-300' : 'text-gray-500 dark:text-gray-600'}`}>
              Working globally
            </span>
          </div>

          {/* Second Information Block - Current Employer */}
          <div className="flex flex-col justify-center">
            {/* Primary Text - Changes to white when scrolled past TechStack */}
            <h2 className={`text-base md:text-2xl font-bold transition-colors duration-300 ${hasScrolledPastTech ? 'text-white' : 'text-[#333333] dark:text-white'}`}>
              Building at
            </h2>
            {/* Secondary Text - Changes to light gray when scrolled past TechStack */}
            <span className={`text-sm md:text-xl font-light transition-colors duration-300 ${hasScrolledPastTech ? 'text-gray-300' : 'text-gray-500 dark:text-gray-600'}`}>
              SRM University
            </span>
          </div>

          {/* Third Information Block - Availability */}
          <div className="flex flex-col justify-center">
            {/* Primary Text - Changes to white when scrolled past TechStack */}
            <h2 className={`text-base md:text-2xl font-bold transition-colors duration-300 ${hasScrolledPastTech ? 'text-white' : 'text-[#333333] dark:text-white'}`}>
              Freelance availability
            </h2>
            {/* Secondary Text - Changes to light gray when scrolled past TechStack */}
            <span className={`text-sm md:text-xl font-light transition-colors duration-300 ${hasScrolledPastTech ? 'text-gray-300' : 'text-gray-500 dark:text-gray-600'}`}>
              January 2026
            </span>
          </div>
        </div>

        {/* Right Section - Call to Action Button */}
        <div className="flex-shrink-0">
          {/* Get in Touch Button - Changes to white button when scrolled past TechStack */}
          <button className={`px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-xl transition-all duration-300 whitespace-nowrap ${
            hasScrolledPastTech
              ? 'bg-white text-black hover:bg-gray-100'
              : 'bg-[#1a1a1a] dark:bg-white text-white dark:text-black hover:bg-[#2a2a2a] dark:hover:bg-gray-100'
          }`}>
            Get in touch
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
