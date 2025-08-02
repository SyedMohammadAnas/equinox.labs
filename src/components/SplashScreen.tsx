"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SplashScreen Component
 *
 * Features:
 * - Full-screen overlay with countdown timer
 * - Countdown from 0 to 100 displayed in bottom right
 * - Curtain-like animation that raises the entire screen upward after countdown
 * - Smooth transitions using Framer Motion
 */
export default function SplashScreen() {
  // State to track the current count (0-100)
  const [count, setCount] = useState(0);

  // State to control when the curtain animation should start
  const [isCounting, setIsCounting] = useState(true);

  // State to control the curtain animation
  const [isCurtainRising, setIsCurtainRising] = useState(false);

  // Effect to handle the countdown timer
  useEffect(() => {
    if (isCounting && count < 100) {
      // Increment count every 50ms for smooth counting animation
      const timer = setTimeout(() => {
        setCount(prev => prev + 1);
      }, 20);

      return () => clearTimeout(timer);
    } else if (count >= 100 && isCounting) {
      // When count reaches 100, start the curtain animation
      setIsCounting(false);
      setIsCurtainRising(true);
    }
  }, [count, isCounting]);

      // Animation variants for the curtain effect
  const curtainVariants = {
    // Initial state: covers the entire screen
    initial: {
      y: 0,
      height: "100vh",
    },
    // Rising animation: moves upward like a curtain
    rising: {
      y: "-100vh",
      height: "100vh",
    },
  };

    // Animation variants for the count display - removed to prevent jittering
  // const countVariants = {
  //   initial: { opacity: 0 },
  //   animate: {
  //     opacity: 1,
  //   },
  // };

  return (
    <AnimatePresence>
      {/* Only render the splash screen if it's still counting or curtain is rising */}
      {(isCounting || isCurtainRising) && (
        <motion.div
          className="fixed inset-0 z-50 bg-[#F5F5DC] text-black flex items-center justify-center"
          variants={curtainVariants}
          initial="initial"
          animate={isCurtainRising ? "rising" : "initial"}
          transition={{
            duration: isCurtainRising ? 1.5 : 0,
            ease: "easeInOut",
          }}
          onAnimationComplete={() => {
            // Remove the component from DOM after animation completes
            if (isCurtainRising) {
              setIsCurtainRising(false);
            }
          }}
        >
          {/* Main content area */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Countdown display in bottom right - smooth transitions without jittering */}
            {/*
              Countdown display with responsive text size:
              - Large on desktop (10rem)
              - Smaller on mobile (4rem)
            */}
            <div className="absolute -bottom-2 sm:-bottom-9 right-5 text-[4rem] sm:text-[10rem] font-sans font-semibold">
              {count}
            </div>

            {/* Please wait message in bottom left */}
            {/* Please wait message in bottom left - now bold */}
            <div className="absolute bottom-5  left-5 sm:left-10 text-sm sm:text-xl font-sans font-bold ">
              (Can&apos;t you just wait?)
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
