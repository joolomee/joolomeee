"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { GradientOrb } from "@/components/Decorations";
import CrystalLogo from "@/components/CrystalLogo";

/* ────────────────────────────────────────────────────────────
   Step Icons
   ──────────────────────────────────────────────────────────── */

const stepIcons = [
  // Step 1 — Seedling / Spark (creation)
  <svg key="spark" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V12" />
    <path d="M12 12C12 12 7 9 7 5c0-2.5 2.5-4 5-4s5 1.5 5 4c0 4-5 7-5 7z" />
    <path d="M7 17c-2 0-4 1-4 3" />
    <path d="M17 17c2 0 4 1 4 3" />
  </svg>,
  // Step 2 — Lightbulb (shaping)
  <svg key="bulb" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
  </svg>,
  // Step 3 — Refresh / Upgrade (elevation)
  <svg key="refresh" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2v6h-6" />
    <path d="M3 12a9 9 0 0115.36-6.36L21 8" />
    <path d="M3 22v-6h6" />
    <path d="M21 12a9 9 0 01-15.36 6.36L3 16" />
  </svg>,
  // Step 4 — Rocket / Chart (growth)
  <svg key="rocket" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>,
];

/* ────────────────────────────────────────────────────────────
   Floating Crystal Decorations
   ──────────────────────────────────────────────────────────── */

function FloatingCrystals() {
  const crystals = [
    { top: "8%", left: "5%", size: 18, delay: 0, duration: 16 },
    { top: "20%", right: "8%", size: 14, delay: 2, duration: 20 },
    { bottom: "25%", left: "10%", size: 12, delay: 4, duration: 18 },
    { bottom: "12%", right: "5%", size: 16, delay: 1, duration: 22 },
    { top: "50%", left: "3%", size: 10, delay: 3, duration: 14 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {crystals.map((c, i) => (
        <motion.div
          key={i}
          className="absolute opacity-[0.06]"
          style={{
            top: c.top,
            left: c.left,
            right: (c as { right?: string }).right,
            bottom: (c as { bottom?: string }).bottom,
          }}
          animate={{
            y: [0, -15, 5, -10, 0],
            x: [0, 8, -5, 3, 0],
            rotate: [0, 10, -5, 8, 0],
          }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: c.delay,
          }}
        >
          <CrystalLogo size={c.size} />
        </motion.div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   GrowthJourney Component
   ──────────────────────────────────────────────────────────── */

export default function GrowthJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  /* Scroll progress for the connecting line animation */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background decorations */}
      <GradientOrb size={500} top="5%" right="-15%" opacity={0.06} />
      <GradientOrb size={400} bottom="10%" left="-12%" opacity={0.05} />
      <FloatingCrystals />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-[#E8787A] text-sm font-mono tracking-wider">03</span>
          <span className="w-12 h-px bg-[#E8787A]/50" />
          <span className="text-sm text-[#8a8a8a] uppercase tracking-widest">
            {t.process.label}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
        >
          {t.process.heading.split(" ").map((word: string, i: number, arr: string[]) => (
            <span key={i}>
              {i >= arr.length - 1 ? (
                <span className="gradient-text">{word}</span>
              ) : (
                word + " "
              )}
            </span>
          ))}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#8a8a8a] text-lg max-w-3xl mb-20 leading-relaxed"
        >
          {t.process.subtitle}
        </motion.p>

        {/* ── Steps Journey ── */}

        {/* Desktop: Horizontal layout */}
        <div className="hidden lg:block relative">
          {/* Connecting line (background track) */}
          <div className="absolute top-[72px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-[2px] bg-[#1e1e1e] z-0" />

          {/* Connecting line (animated gradient fill) */}
          <motion.div
            className="absolute top-[72px] left-[calc(12.5%+28px)] h-[2px] z-[1]"
            style={{
              width: lineProgress,
              background: "linear-gradient(90deg, #E8787A, #F2A5A7, #E8787A)",
              maxWidth: "calc(100% - 25% - 56px)",
            }}
          />

          <div className="grid grid-cols-4 gap-8 relative z-10">
            {t.process.steps.map((step: { title: string; description: string; phase: string }, i: number) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Step Number */}
                <div className="text-3xl font-bold gradient-text mb-4">
                  0{i + 1}
                </div>

                {/* Circular Icon with coral gradient border + pulse */}
                <div className="relative mb-6">
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #E8787A, #F2A5A7)",
                      opacity: 0.2,
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                  />
                  {/* Icon container */}
                  <div className="relative w-16 h-16 rounded-full flex items-center justify-center bg-[#111111] border-2 border-transparent"
                    style={{
                      backgroundClip: "padding-box",
                      borderImage: "linear-gradient(135deg, #E8787A, #F2A5A7) 1",
                    }}
                  >
                    {/* Gradient border wrapper */}
                    <div className="absolute inset-[-2px] rounded-full p-[2px]"
                      style={{
                        background: "linear-gradient(135deg, #E8787A, #F2A5A7)",
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        maskComposite: "exclude",
                        WebkitMaskComposite: "xor",
                      }}
                    />
                    <div className="relative text-[#E8787A]">
                      {stepIcons[i]}
                    </div>
                  </div>
                </div>

                {/* Phase badge */}
                <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#E8787A] bg-[#E8787A]/10 rounded-full mb-3">
                  {step.phase}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#f5f5f5] mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#8a8a8a] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet: Vertical layout */}
        <div className="lg:hidden relative">
          {/* Vertical connecting line (background track) */}
          <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-[#1e1e1e] z-0" />

          {/* Vertical connecting line (animated gradient fill) */}
          <motion.div
            className="absolute left-8 top-0 w-[2px] z-[1]"
            style={{
              height: lineProgress,
              background: "linear-gradient(180deg, #E8787A, #F2A5A7, #E8787A)",
              maxHeight: "100%",
            }}
          />

          <div className="space-y-12 relative z-10">
            {t.process.steps.map((step: { title: string; description: string; phase: string }, i: number) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className="flex gap-6"
              >
                {/* Left: Icon column */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  {/* Step number */}
                  <div className="text-sm font-bold gradient-text mb-2">
                    0{i + 1}
                  </div>

                  {/* Circular icon */}
                  <div className="relative">
                    {/* Pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #E8787A, #F2A5A7)",
                        opacity: 0.2,
                      }}
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.2, 0, 0.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                      }}
                    />
                    <div className="relative w-14 h-14 rounded-full flex items-center justify-center bg-[#111111]">
                      <div className="absolute inset-[-2px] rounded-full p-[2px]"
                        style={{
                          background: "linear-gradient(135deg, #E8787A, #F2A5A7)",
                          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                          maskComposite: "exclude",
                          WebkitMaskComposite: "xor",
                        }}
                      />
                      <div className="relative text-[#E8787A]">
                        {stepIcons[i]}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Text content */}
                <div className="pt-1">
                  {/* Phase badge */}
                  <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#E8787A] bg-[#E8787A]/10 rounded-full mb-3">
                    {step.phase}
                  </span>

                  <h3 className="text-lg font-bold text-[#f5f5f5] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#8a8a8a] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA Statement ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-24 text-center"
        >
          <div className="relative inline-block">
            {/* Subtle glow behind text */}
            <div
              className="absolute inset-0 blur-[60px] opacity-20"
              style={{
                background: "radial-gradient(circle, #E8787A 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <p className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl mx-auto">
              <span className="text-[#f5f5f5]">&ldquo;</span>
              <span className="gradient-text">{t.process.cta}</span>
              <span className="text-[#f5f5f5]">&rdquo;</span>
            </p>
          </div>

          {/* Decorative line under CTA */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            className="section-line mx-auto mt-8 origin-left"
          />
        </motion.div>
      </div>
    </section>
  );
}
