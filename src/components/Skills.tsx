"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n";

const categories = [
  {
    key: "design" as const,
    fallbackLabel: "Design",
    skills: [
      "Figma",
      "Adobe Creative Suite",
      "Sketch",
      "Blender",
      "Principle",
      "Framer",
      "Canva Pro",
    ],
  },
  {
    key: "development" as const,
    fallbackLabel: "Development",
    skills: [
      "HTML/CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "WordPress",
      "Webflow",
    ],
  },
  {
    key: "branding" as const,
    fallbackLabel: "Branding",
    skills: [
      "Brand Strategy",
      "Visual Identity",
      "Typography",
      "Color Theory",
      "Logo Design",
      "Packaging",
      "Art Direction",
      "Photography Direction",
    ],
  },
  {
    key: "tools" as const,
    fallbackLabel: "Tools & Platforms",
    skills: [
      "Git",
      "Notion",
      "Jira",
      "Slack",
      "Google Analytics",
      "Hotjar",
      "Mailchimp",
      "HubSpot",
    ],
  },
];

const marqueeWords = [
  "DESIGN",
  "BRAND",
  "CODE",
  "CREATE",
  "GROW",
  "INSPIRE",
  "BUILD",
  "DREAM",
];

/* ──────────────── Skill Pill ──────────────── */
function SkillPill({
  skill,
  catIndex,
  skillIndex,
  isInView,
}: {
  skill: string;
  catIndex: number;
  skillIndex: number;
  isInView: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7, y: 10 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{
        duration: 0.35,
        delay: 0.3 + catIndex * 0.1 + skillIndex * 0.04,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.08,
        backgroundColor: "rgba(232, 120, 122, 0.1)",
        borderColor: "rgba(232, 120, 122, 0.5)",
        color: "#E8787A",
        boxShadow: "0 0 20px rgba(232, 120, 122, 0.15)",
      }}
      className="px-4 py-2 rounded-full border border-[#1e1e1e] text-sm text-[#8a8a8a] cursor-default transition-all duration-300 inline-block"
    >
      {skill}
    </motion.span>
  );
}

/* ──────────────── Category Card ──────────────── */
function CategoryCard({
  category,
  index,
  isInView,
  t,
}: {
  category: (typeof categories)[number];
  index: number;
  isInView: boolean;
  t: any;
}) {
  const translated = t.skills?.categories?.[index];
  const label = translated?.label || category.fallbackLabel;
  const skills = translated?.skills || category.skills;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.15 + index * 0.12,
        ease: "easeOut",
      }}
      className="card-glow bg-[#111111] rounded-2xl p-8 hover-lift group"
    >
      {/* Number badge + Category name */}
      <h3 className="text-lg font-bold mb-6 text-[#f5f5f5] flex items-center gap-3">
        <span className="w-9 h-9 rounded-lg bg-[#E8787A]/10 flex items-center justify-center text-[#E8787A] text-sm font-mono shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="group-hover:text-[#E8787A] transition-colors duration-300">
          {label}
        </span>
      </h3>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill: string, j: number) => (
          <SkillPill
            key={skill}
            skill={skill}
            catIndex={index}
            skillIndex={j}
            isInView={isInView}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ──────────────── Marquee Row ──────────────── */
function MarqueeRow() {
  const items = [...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords];

  return (
    <div className="overflow-hidden border-y border-[#1e1e1e] py-8 mt-20">
      <div className="marquee flex items-center whitespace-nowrap">
        {items.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="text-5xl md:text-7xl font-bold mx-4 md:mx-6 select-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px #1e1e1e",
              WebkitTextFillColor: "transparent",
            }}
          >
            {word}
          </span>
        ))}
        {/* Separator dots between words are built into the repeated content */}
        {items.map((word, i) => (
          <span
            key={`dup-${word}-${i}`}
            className="text-5xl md:text-7xl font-bold mx-4 md:mx-6 select-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px #1e1e1e",
              WebkitTextFillColor: "transparent",
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────── Skills Section ──────────────── */
export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-[#E8787A] text-sm font-mono tracking-wider">05</span>
          <span className="w-12 h-px bg-[#E8787A]/50" />
          <span className="text-sm text-[#8a8a8a] uppercase tracking-widest">
            {t.skills?.label || "Skills & Tools"}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          {t.skills?.heading ? (
            <span dangerouslySetInnerHTML={{ __html: t.skills.heading }} />
          ) : (
            <>
              My <span className="gradient-text">Toolkit</span>
            </>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#8a8a8a] text-lg max-w-2xl mb-16"
        >
          {t.skills?.subtitle ||
            "The technologies, tools, and methodologies I use to bring ideas to life."}
        </motion.p>

        {/* Skills Grid - 2x2 */}
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.key}
              category={cat}
              index={i}
              isInView={isInView}
              t={t}
            />
          ))}
        </div>

        {/* Full-width marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <MarqueeRow />
        </motion.div>
      </div>
    </section>
  );
}
