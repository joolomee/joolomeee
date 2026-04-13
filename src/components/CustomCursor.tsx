"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  /* Raw mouse position (instant, no smoothing) */
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  /* Smoothed values for the outer ring (slight delay) */
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    /* Detect touch-primary devices and bail early */
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    /* Detect hover targets */
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='hover']") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select");
      if (isInteractive) setIsHovering(true);
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='hover']") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select");
      if (isInteractive) setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice) return null;

  const ringSize = isHovering ? 56 : 40;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Inner dot - follows cursor exactly */}
          <motion.div
            className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="rounded-full"
              style={{
                width: 8,
                height: 8,
                backgroundColor: "#E8787A",
              }}
            />
          </motion.div>

          {/* Outer ring - follows with spring delay */}
          <motion.div
            className="fixed top-0 left-0 z-[9997] pointer-events-none"
            style={{
              x: ringX,
              y: ringY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="rounded-full border"
              style={{ borderColor: "rgba(232,120,122,0.5)" }}
              animate={{
                width: ringSize,
                height: ringSize,
                borderWidth: isHovering ? 2 : 1,
                borderColor: isHovering
                  ? "rgba(232,120,122,0.8)"
                  : "rgba(232,120,122,0.5)",
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
