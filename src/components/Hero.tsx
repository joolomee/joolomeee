"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { FloatingShapes } from "./Decorations";
import CrystalLogo from "./CrystalLogo";

export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  // ── Mouse-tracking spotlight ──
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height, top, left } = container.getBoundingClientRect();
      const x = ((clientX - left) / width) * 100;
      const y = ((clientY - top) / height) * 100;
      container.style.setProperty("--mx", `${x}%`);
      container.style.setProperty("--my", `${y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const hero = t.hero as Record<string, string>;

  // ── Animation variants ──
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const fadeUpSlow = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden spotlight grid-dots"
    >
      {/* ── Floating shapes (background decoration) ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <FloatingShapes />
      </div>

      {/* ── Gradient orbs ── */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-[#E8787A]/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] bg-[#F2A5A7]/6 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Large coral gradient orb behind crystal logo ── */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#E8787A]/10 via-[#F2A5A7]/5 to-transparent rounded-full blur-[160px] pointer-events-none hidden lg:block" />

      {/* ── Botanical leaf decoration (corner) ── */}
      <svg
        className="absolute bottom-10 left-10 w-28 h-28 opacity-[0.04] pointer-events-none hidden lg:block"
        viewBox="0 0 120 120"
        fill="none"
      >
        <path
          d="M10 110 C10 110 20 40 60 20 C100 0 110 10 110 10 C110 10 80 30 60 60 C40 90 10 110 10 110Z"
          stroke="#E8787A"
          strokeWidth="1"
          fill="#E8787A"
          fillOpacity="0.3"
        />
        <path
          d="M10 110 C30 80 50 50 60 20"
          stroke="#E8787A"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <path
          d="M25 95 C40 75 55 50 60 20"
          stroke="#E8787A"
          strokeWidth="0.3"
          opacity="0.3"
        />
        <path
          d="M40 85 C50 65 58 45 60 20"
          stroke="#E8787A"
          strokeWidth="0.3"
          opacity="0.3"
        />
      </svg>

      {/* ── Content Grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 lg:pt-0 lg:pb-0">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-10 lg:gap-16">
          {/* ── Crystal Logo (mobile: above text) ── */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative lg:hidden flex-shrink-0"
          >
            <div className="relative">
              {/* Mobile coral orb behind logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E8787A]/15 via-[#F2A5A7]/8 to-transparent rounded-full blur-[60px] scale-150" />
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <CrystalLogo size={140} color="#E8787A" animated />
              </motion.div>
            </div>
          </motion.div>

          {/* ── Left: Text Content ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left max-w-2xl"
          >
            {/* Availability badge */}
            <motion.div variants={fadeUp} className="mb-8">
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#1e1e1e] bg-[#111111]/50 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-sm text-[#8a8a8a]">
                  {hero.badge || "Available for new projects"}
                </span>
              </span>
            </motion.div>

            {/* Main heading: 3 lines */}
            <div className="mb-8">
              {/* Line 1 - regular white */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem] font-light leading-[1.05] tracking-tight text-[#f5f5f5]"
              >
                {hero.title1 || "Designing Digital"}
              </motion.h1>

              {/* Line 2 - bold gradient */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem] font-bold leading-[1.05] tracking-tight gradient-text"
              >
                {hero.title2 || "Experiences That"}
              </motion.h1>

              {/* Line 3 - regular white */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem] font-light leading-[1.05] tracking-tight text-[#f5f5f5]"
              >
                {hero.title3 || "Truly Matter"}
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              variants={fadeUpSlow}
              className="text-base sm:text-lg md:text-xl text-[#8a8a8a] max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              {hero.subtitle ||
                "Full Stack Designer & Branding Strategist based in Portugal. Crafting interfaces, brands, and digital products for companies that want to stand out."}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpSlow}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
            >
              {/* Primary CTA */}
              <motion.a
                href="#work"
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 40px rgba(232, 120, 122, 0.3)",
                }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E8787A] text-[#0a0a0a] font-semibold text-base hover:bg-[#F2A5A7] transition-colors duration-300 shadow-lg shadow-[#E8787A]/20"
              >
                {hero.cta1 || "View My Work"}
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  &rarr;
                </motion.span>
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="#contact"
                whileHover={{
                  scale: 1.04,
                  borderColor: "rgba(232, 120, 122, 0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#1e1e1e] text-[#f5f5f5] font-medium text-base hover:text-[#E8787A] transition-all duration-300"
              >
                {hero.cta2 || "Get In Touch"}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ── Right: Crystal Logo (desktop) ── */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative flex-shrink-0 hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              {/* Pulsing ring behind logo */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 border border-[#E8787A]/20 rounded-full scale-125"
              />
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.08, 0.15, 0.08],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute inset-0 border border-[#E8787A]/10 rounded-full scale-150"
              />

              {/* Floating crystal */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <CrystalLogo size={320} color="#E8787A" animated />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.span
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[10px] uppercase tracking-[0.25em] text-[#8a8a8a]"
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-[#1e1e1e] flex items-start justify-center p-1.5"
        >
          <motion.span
            animate={{
              y: [0, 8, 0],
              opacity: [1, 0.3, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-[#E8787A]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
