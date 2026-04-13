"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { SITE_CONFIG } from "@/lib/constants";
import { GradientOrb, BotanicalLeaf } from "@/components/Decorations";
import CrystalLogo from "@/components/CrystalLogo";

/* ────────────────────────────────────────────────────────────
   Animated Counter
   ──────────────────────────────────────────────────────────── */

function AnimatedCounter({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 50, damping: 20, duration: 2 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);
  const [text, setText] = useState(`0${suffix}`);

  useEffect(() => {
    if (isInView) {
      motionVal.set(value);
    }
  }, [isInView, value, motionVal]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setText(v));
    return unsubscribe;
  }, [display]);

  return <span>{text}</span>;
}

/* ────────────────────────────────────────────────────────────
   Bio paragraph renderer — wraps <hl>…</hl> in highlights
   ──────────────────────────────────────────────────────────── */

function BioParagraph({ text }: { text: string }) {
  const parts = text.split(/(<hl>.*?<\/hl>)/g);
  return (
    <p>
      {parts.map((part, i) => {
        if (part.startsWith("<hl>") && part.endsWith("</hl>")) {
          return (
            <span key={i} className="text-[#f5f5f5] font-medium">
              {part.slice(4, -5)}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

/* ────────────────────────────────────────────────────────────
   Social link icons
   ──────────────────────────────────────────────────────────── */

const socials = [
  {
    name: "LinkedIn",
    href: SITE_CONFIG.linkedin,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/joolomee.design",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: SITE_CONFIG.github,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: `mailto:${SITE_CONFIG.email}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
  },
];

/* ────────────────────────────────────────────────────────────
   About Component
   ──────────────────────────────────────────────────────────── */

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const stats = [
    t.about.stats.years,
    t.about.stats.projects,
    t.about.stats.users,
    t.about.stats.countries,
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Decorative background elements */}
      <GradientOrb size={500} top="-10%" right="-15%" opacity={0.07} />
      <GradientOrb size={300} bottom="5%" left="-10%" opacity={0.05} />

      <div className="absolute top-20 right-10 opacity-[0.04] pointer-events-none hidden lg:block">
        <BotanicalLeaf rotation={25} scale={0.8} opacity={0.08} />
      </div>

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-[#E8787A] text-sm font-mono tracking-wider">01</span>
          <span className="w-12 h-px bg-[#E8787A]/50" />
          <span className="text-sm text-[#8a8a8a] uppercase tracking-widest">
            {t.about.label}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-16"
        >
          {t.about.heading.split(",").map((part: string, i: number, arr: string[]) => (
            <span key={i}>
              {i === 0 ? (
                <>
                  {part.replace(/purpose|propósito/i, "").replace("with ", "with ")}
                  <span className="gradient-text">
                    {part.match(/purpose|propósito/i)?.[0] ?? ""}
                  </span>
                  ,
                </>
              ) : (
                <>
                  <br className="hidden md:block" />
                  {part.replace(/obsession|obsessão/i, "").replace(" .", ".")}
                  <span className="gradient-text">
                    {part.match(/obsession|obsessão/i)?.[0] ?? ""}
                  </span>
                  .
                </>
              )}
            </span>
          ))}
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column — Bio Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-[#8a8a8a] leading-relaxed text-base"
          >
            <BioParagraph text={t.about.bio1} />
            <BioParagraph text={t.about.bio2} />
            <BioParagraph text={t.about.bio3} />

            {/* Social Links Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4 pt-6"
            >
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-11 h-11 rounded-xl border border-[#1e1e1e] bg-[#111111] flex items-center justify-center text-[#8a8a8a] hover:text-[#E8787A] hover:border-[#E8787A]/40 hover:bg-[#E8787A]/5 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column — Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="card-glow hover-lift group"
              >
                <div className="bg-[#111111] rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center">
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      isInView={isInView}
                    />
                  </div>
                  <div className="text-sm text-[#8a8a8a]">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
