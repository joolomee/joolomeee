"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { GradientOrb } from "@/components/Decorations";

/* ────────────────────────────────────────────────────────────
   Service card icons (inline SVGs)
   ──────────────────────────────────────────────────────────── */

const serviceIcons = [
  // 0 — Brand Identity: layout grid
  <svg key="brand" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>,
  // 1 — UI/UX: pen tool
  <svg key="uiux" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>,
  // 2 — Web Dev: code
  <svg key="code" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>,
  // 3 — Marketing: megaphone
  <svg key="marketing" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l18-5v12L3 13v-2z" />
    <path d="M11.6 16.8a3 3 0 11-5.8-1.6" />
  </svg>,
];

/* ────────────────────────────────────────────────────────────
   Floating decorative shapes (low opacity background)
   ──────────────────────────────────────────────────────────── */

function FloatingDecor() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Circle */}
      <motion.div
        className="absolute top-[15%] left-[8%] w-16 h-16 rounded-full border border-[#E8787A]/[0.06]"
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Triangle */}
      <motion.div
        className="absolute bottom-[20%] right-[6%] opacity-[0.05]"
        animate={{ y: [0, 15, 0], rotate: [0, -90, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <polygon points="20,4 36,36 4,36" stroke="#E8787A" strokeWidth="1" />
        </svg>
      </motion.div>
      {/* Hexagon */}
      <motion.div
        className="absolute top-[60%] left-[85%] opacity-[0.04]"
        animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
          <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" stroke="#E8787A" strokeWidth="1" />
        </svg>
      </motion.div>
      {/* Small dot cluster */}
      <motion.div
        className="absolute top-[30%] right-[20%] w-2 h-2 rounded-full bg-[#E8787A]/[0.08]"
        animate={{ scale: [1, 1.5, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[35%] left-[15%] w-3 h-3 rounded-full bg-[#F2A5A7]/[0.06]"
        animate={{ scale: [1, 1.8, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Services Component
   ──────────────────────────────────────────────────────────── */

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      {/* Background decorations */}
      <GradientOrb size={400} top="10%" left="-12%" opacity={0.05} />
      <GradientOrb size={350} bottom="-5%" right="-10%" opacity={0.06} />
      <FloatingDecor />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-[#E8787A] text-sm font-mono tracking-wider">02</span>
          <span className="w-12 h-px bg-[#E8787A]/50" />
          <span className="text-sm text-[#8a8a8a] uppercase tracking-widest">
            {t.services.label}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          {t.services.heading.split(" ").map((word, i, arr) => (
            <span key={i}>
              {i === arr.length - 1 ? (
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
          className="text-[#8a8a8a] text-lg max-w-2xl mb-16 leading-relaxed"
        >
          {t.services.subtitle}
        </motion.p>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {t.services.items.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.12 }}
              className="card-glow group"
            >
              <div className="bg-[#111111] rounded-2xl p-8 h-full border border-transparent hover:border-[#E8787A]/20 transition-all duration-500 hover:-translate-y-1">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#E8787A]/10 flex items-center justify-center text-[#E8787A] mb-6 group-hover:bg-[#E8787A]/20 transition-colors duration-300">
                  {serviceIcons[i]}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#f5f5f5] mb-3 group-hover:text-[#E8787A] transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[#8a8a8a] text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full border border-[#1e1e1e] text-[#8a8a8a] group-hover:border-[#E8787A]/20 group-hover:text-[#F2A5A7]/70 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
