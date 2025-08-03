import React from "react";

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
 */
const Footer: React.FC = () => {
  return (
    <footer
      className="fixed bottom-0 left-0 w-full min-h-[100dvh] bg-black text-white z-[-1] flex flex-col justify-center p-8"
      id="footer"
    >
      {/* Footer Content Container - Full Width */}
      <div className="w-full">

        {/* Top Section - Navigation Links Grouped on Left */}
        <div className="flex justify-between items-start mb-20 pl-7 w-full">
          {/* Left Side - Grouped Navigation Sections */}
          <div className="flex gap-12">
            {/* Sitemap Section */}
            <div>
              <h3 className="text-2xl mb-4 text-white">Sitemap</h3>
              <ul className="space-y-3 text-gray-300 text-lg font-bold">
                <li className="hover:text-white transition-colors">
                  Home <span className="font-normal">→</span>
                </li>
                <li className="hover:text-white transition-colors">
                  About <span className="font-normal">→</span>
                </li>
                <li className="hover:text-white transition-colors">
                  Music <span className="font-normal">→</span>
                </li>
                <li className="hover:text-white transition-colors">
                  Awards <span className="font-normal">→</span>
                </li>
                <li className="hover:text-white transition-colors">
                  Shop <span className="font-normal">→</span>
                </li>
              </ul>
            </div>

            {/* Connect Section */}
            <div>
              <h3 className="text-2xl  mb-4 text-white">Connect</h3>
              <ul className="space-y-3 text-gray-300 text-lg font-bold">
                <li className="hover:text-white transition-colors">
                  Instagram <span className="font-normal">↗</span>
                </li>
                <li className="hover:text-white transition-colors">
                  TikTok <span className="font-normal">↗</span>
                </li>
                <li className="hover:text-white transition-colors">
                  X <span className="font-normal">↗</span>
                </li>
                <li className="hover:text-white transition-colors">
                  YouTube <span className="font-normal">↗</span>
                </li>
                <li className="hover:text-white transition-colors">
                  Facebook <span className="font-normal">↗</span>
                </li>
                <li className="hover:text-white transition-colors">
                  Spotify <span className="font-normal">↗</span>
                </li>
              </ul>
            </div>

            {/* Platforms Section */}
            <div>
              <h3 className="text-2xl  mb-4 text-white">Platforms</h3>
              <ul className="space-y-3 text-gray-300 text-lg font-bold">
                <li className="hover:text-white transition-colors">
                  Trace Amounts <span className="font-normal">↗</span>
                </li>
                <li className="hover:text-white transition-colors">
                  Kick & Bass <span className="font-normal">↗</span>
                </li>
                <li className="hover:text-white transition-colors">
                  Beatport <span className="font-normal">↗</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Back To Top Link */}
          <div>
            <a href="#" className="text-gray-300 text-xl font-bold hover:text-white transition-colors">
              Back To Top
            </a>
          </div>
        </div>

        {/* Middle Section - Large Logo */}
        <div className="mb-7.5 w-full flex justify-start">
          <h1 className="text-8xl md:text-10xl lg:text-[27rem] text-white">
            Equinox.
          </h1>
        </div>

        {/* Divider Line Above Bottom Section */}
        <hr className="border-t border-white my-6 w-full" />

        {/* Bottom Section - Contact and Location */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
            {/* Location */}
            <div className="text-gray-300 text-lg mb-4 md:mb-0">
              Andhra Pradesh, India
            </div>

            {/* Contact Information */}
            <div className="text-gray-300 text-lg space-x-10">
              <span>adithimakind@gmail.com</span>
              <span>Demos</span>
              <span>Contact Us</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
