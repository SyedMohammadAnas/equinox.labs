import React from "react";
import RightArrow from "./icons/RightArrow";
import DiagonalArrow from "./icons/DiagonalArrow";

/**
 * Footer Component
 *
 * A fixed footer that spans the entire screen and reveals itself
 * like a curtain as the user scrolls down the page.
 *
 * Features:
 * - Fixed positioning at the bottom of the viewport
 * - Full screen height and width
 * - Low z-index to stay behind other content
 * - Curtain reveal effect on scroll
 * - Three-section layout: Navigation, Logo, Contact
 * - Full-width layout spanning entire screen
 * - Navigation sections grouped on top left
 * - Uses Helvetica font family automatically (default font)
 * - Mobile-optimized layout with proper alignments
 * - SVG icons for navigation arrows
 * - Independently positioned sections for individual control
 */
const Footer: React.FC = () => {
  return (
    <footer
      className="fixed bottom-0 left-0 w-full min-h-[100dvh] bg-[#111111] text-white z-[-1] p-8"
      id="footer"
    >
      {/* Top Section - Navigation Links Grouped on Left */}
      <div className="flex justify-between items-start md:mt-0 mt-30 md:mb-20 mb-70 md:pl-7 ml-1 md:-ml-6 w-full">
        {/* Left Side - Grouped Navigation Sections */}
        <div className="flex gap-12 md:gap-16">
          {/* Sitemap Section */}
          <div>
            <h3 className="text-2xl mb-4 text-white">Sitemap</h3>
            <ul className="space-y-3 text-sm md:text-lg font-bold">
              <li className="hover:text-white transition-colors flex items-center gap-2">
                Home <RightArrow size={23} color="currentColor" />
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-2">
                About <RightArrow size={23} color="currentColor" />
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-2">
                Music <RightArrow size={23} color="currentColor" />
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-2">
                Awards <RightArrow size={23} color="currentColor" />
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-2">
                Shop <RightArrow size={23} color="currentColor" />
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-2xl  mb-4 text-white">Connect</h3>
            <ul className="space-y-3 text-sm md:text-lg font-bold">
              <li className="hover:text-white transition-colors flex items-center gap-2">
                Instagram <DiagonalArrow size={25} color="currentColor" />
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-2">
                TikTok <DiagonalArrow size={25} color="currentColor" />
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-2">
                X <DiagonalArrow size={25} color="currentColor" />
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-2">
                YouTube <DiagonalArrow size={25} color="currentColor" />
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-2">
                Facebook <DiagonalArrow size={25} color="currentColor" />
              </li>
              <li className="hover:text-white transition-colors flex items-center gap-2">
                Spotify <DiagonalArrow size={25} color="currentColor" />
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side - Back To Top Link (hidden on mobile, visible on md and up) */}
        <div className="hidden md:block">
          <a href="#" className="text-xl font-bold hover:text-white transition-colors">
            Back To Top
          </a>
        </div>
      </div>

      {/* Middle Section - Large Logo with LABS */}
      <div className="md:mb-7.5 w-full">
        {/* Main Logo Container */}
        <div className="relative">
          {/* Equinox Logo - Left Aligned */}
          <h1 className="text-8xl md:-ml-8 -ml-2 md:text-10xl lg:text-[27rem] text-white text-left">
            Equinox.
          </h1>

          {/* LABS Text - Positioned to the right of Equinox */}
          <div className="absolute top-0 right-0 text-base md:text-lg lg:text-6xl md:mt-80 mt-21 font-bold text-white">
            LABS
          </div>
        </div>
      </div>

      {/* Divider Line Above Bottom Section */}
      <hr className="border-t border-white md:my-6 my-1.5 w-full" />

      {/* Bottom Section - Contact and Location */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
          {/* Location */}
          <div className="text-lg md:font-light mb-4 md:mb-0">
            Andhra Pradesh, India
          </div>

          {/* Contact Information */}
          <div className="text-lg md:font-light space-x-4 md:space-x-10 ml-75 -mt-10">
            <span>Contact Us</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
