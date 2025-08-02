import localFont from 'next/font/local';

/**
 * Helvetica Font Configuration
 *
 * Local font setup for Helvetica variants:
 * - Regular: Helvetica.ttf
 * - Bold: Helvetica-Bold.ttf
 * - Light: helvetica-light-587ebe5a59211.ttf
 * - Oblique: Helvetica-Oblique.ttf
 * - Bold Oblique: Helvetica-BoldOblique.ttf
 * - Rounded Bold: helvetica-rounded-bold-5871d05ead8de.otf
 * - Compressed: helvetica-compressed-5871d14b6903a.otf
 */

// Main Helvetica font (Regular)
export const helvetica = localFont({
  src: [
    {
      path: '../../public/helvetica-255/helvetica-light-587ebe5a59211.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/helvetica-255/Helvetica.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/helvetica-255/Helvetica-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/helvetica-255/Helvetica-Oblique.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/helvetica-255/Helvetica-BoldOblique.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-helvetica',
  display: 'swap',
});

// Helvetica Rounded Bold variant
export const helveticaRounded = localFont({
  src: '../../public/helvetica-255/helvetica-rounded-bold-5871d05ead8de.otf',
  variable: '--font-helvetica-rounded',
  display: 'swap',
});

// Helvetica Compressed variant
export const helveticaCompressed = localFont({
  src: '../../public/helvetica-255/helvetica-compressed-5871d14b6903a.otf',
  variable: '--font-helvetica-compressed',
  display: 'swap',
});

// Export all font variables for easy access
export const fontVariables = {
  helvetica: helvetica.variable,
  helveticaRounded: helveticaRounded.variable,
  helveticaCompressed: helveticaCompressed.variable,
};
