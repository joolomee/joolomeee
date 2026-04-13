"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Inline mini crystal icon for the button */
function MiniCrystal() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-[6px] left-1/2 -translate-x-1/2 opacity-40"
    >
      <polygon points="50,5 65,25 35,25" fill="currentColor" opacity={0.95} />
      <polygon points="50,5 35,25 18,45" fill="currentColor" opacity={0.7} />
      <polygon points="50,5 65,25 82,45" fill="currentColor" opacity={0.85} />
      <polygon points="35,25 18,45 30,55" fill="currentColor" opacity={0.55} />
      <polygon points="35,25 65,25 70,55 30,55" fill="currentColor" opacity={0.75} />
      <polygon points="65,25 82,45 70,55" fill="currentColor" opacity={0.65} />
      <polygon points="18,45 30,55 50,95" fill="currentColor" opacity={0.6} />
      <polygon points="30,55 50,65 50,95" fill="currentColor" opacity={0.8} />
      <polygon points="70,55 50,65 50,95" fill="currentColor" opacity={0.9} />
      <polygon points="82,45 70,55 50,95" fill="currentColor" opacity={0.5} />
    </svg>
  );
}

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center
                     text-white shadow-lg cursor-none
                     md:bottom-8 md:right-8"
          style={{
            background: "linear-gradient(135deg, #E8787A 0%, #C45A5C 100%)",
            boxShadow: "0 4px 24px rgba(232,120,122,0.3)",
          }}
          aria-label="Scroll to top"
          data-cursor="hover"
        >
          {/* Up arrow */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative -top-[2px]"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
          {/* Tiny crystal watermark */}
          <MiniCrystal />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
