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
 */
const Footer: React.FC = () => {
  return (
    <footer
      className="fixed bottom-0 left-0 w-full min-h-[100dvh] bg-gray-900 text-white z-[-1] flex flex-col justify-center items-center p-8"
      id="footer"
    >
      {/* Footer Content Container */}
      <div className="max-w-4xl mx-auto text-center">
        {/* Footer Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">
            My Brand Portfolio
          </h2>
          <p className="text-gray-300 text-lg">
            Creating amazing digital experiences
          </p>
        </div>

        {/* Footer Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">hello@mybrand.com</p>
            <p className="text-gray-400">+1 (555) 123-4567</p>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <ul className="text-gray-400 space-y-2">
              <li>Web Development</li>
              <li>UI/UX Design</li>
              <li>Brand Strategy</li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow</h3>
            <ul className="text-gray-400 space-y-2">
              <li>Twitter</li>
              <li>LinkedIn</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-gray-400">
            © 2024 My Brand Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
