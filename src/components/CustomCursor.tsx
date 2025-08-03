"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

// Enhanced custom cursor component with trailing effect and magnetic attraction
const CustomCursor = () => {
  // State to track mouse position with smooth animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animation for smooth cursor movement
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Trailing cursor with slower spring
  const trailingSpringConfig = { damping: 30, stiffness: 400 };
  const trailingX = useSpring(mouseX, trailingSpringConfig);
  const trailingY = useSpring(mouseY, trailingSpringConfig);

  // State to track cursor effects
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<HTMLElement | null>(null);

  // Ref for performance optimization
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailingRef = useRef<HTMLDivElement>(null);

  // Mouse position tracking effect
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Show cursor when mouse moves
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Add event listeners for mouse movement
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Effect to handle cursor variants and magnetic attraction
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for magnetic elements
      if (target.classList.contains("magnetic")) {
        setMagneticTarget(target);
      } else {
        setMagneticTarget(null);
      }

      // Check for different element types to apply different cursor effects
      if (target.tagName === "BUTTON" || target.closest("button")) {
        setCursorVariant("button");
      } else if ((target.tagName === "A" || target.closest("a")) && target.classList.contains("magnetic")) {
        setCursorVariant("button"); // Use button size for magnetic links
      } else if (target.tagName === "A" || target.closest("a")) {
        setCursorVariant("link");
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        setCursorVariant("input");
      } else if (target.classList.contains("cursor-text")) {
        setCursorVariant("text");
      } else {
        setCursorVariant("default");
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add event listeners
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Cleanup
    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Cursor variants for different effects
  const cursorVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "#ffffff",
      scale: 1,
      mixBlendMode: "difference" as const,
      opacity: 1,
    },
    button: {
      width: 40,
      height: 40,
      backgroundColor: "#ffffff",
      scale: 1.3,
      mixBlendMode: "difference" as const,
      opacity: 0.9,
    },
    link: {
      width: 40,
      height: 40,
      backgroundColor: "#ffffff",
      scale: 1.2,
      mixBlendMode: "difference" as const,
      opacity: 0.95,
    },
    input: {
      width: 12,
      height: 12,
      backgroundColor: "#10b981",
      scale: 1,
      mixBlendMode: "difference" as const,
      opacity: 1,
    },
    text: {
      width: 4,
      height: 16,
      backgroundColor: "#000000",
      scale: 1,
      mixBlendMode: "difference" as const,
      opacity: 1,
    },
    clicking: {
      scale: 0.7,
      backgroundColor: "#ef4444",
      opacity: 1,
    },
  };

  // Trailing cursor variants
  const trailingVariants = {
    default: {
      width: 16,
      height: 16,
      scale: 1,
      opacity: 0.5,
      mixBlendMode: "difference" as const,
    },
    button: {
      width: 20,
      height: 20,
      backgroundColor: "#ffffff",
      scale: 1.1,
      opacity: 0.3,
    },
    link: {
      width: 20,
      height: 20,
      backgroundColor: "#ffffff",
      scale: 1,
      opacity: 0.4,
    },
    input: {
      width: 6,
      height: 6,
      backgroundColor: "#10b981",
      scale: 1,
      opacity: 0.5,
    },
    text: {
      width: 2,
      height: 8,
      backgroundColor: "#000000",
      scale: 1,
      opacity: 0.5,
    },
    clicking: {
      scale: 0.5,
      backgroundColor: "#ef4444",
      opacity: 0.6,
    },
  };

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 rounded-full"
        animate={isClicking ? "clicking" : cursorVariant}
        variants={cursorVariants}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        initial={{ opacity: 0 }}
      />

      {/* Trailing cursor */}
      <motion.div
        ref={trailingRef}
        className="fixed pointer-events-none z-40 rounded-full"
        animate={isClicking ? "clicking" : cursorVariant}
        variants={trailingVariants}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 35,
          mass: 0.8,
        }}
        style={{
          x: trailingX,
          y: trailingY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        initial={{ opacity: 0 }}
      />
    </>
  );
};

export default CustomCursor;
