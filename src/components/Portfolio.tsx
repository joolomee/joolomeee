"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";

const projects = [
  {
    id: "cognifit-longevity",
    url: "https://brain.cognifit.com/longevity",
    color: "#4F46E5",
    gradient: {
      bg: "linear-gradient(135deg, #312e81 0%, #1e1b4b 40%, #0f0b2e 100%)",
      accent: "linear-gradient(45deg, #6366f1, #818cf8)",
      orb1: "radial-gradient(circle, rgba(99,102,241,0.6) 0%, transparent 70%)",
      orb2: "radial-gradient(circle, rgba(129,140,248,0.4) 0%, transparent 70%)",
      orb3: "radial-gradient(circle, rgba(67,56,202,0.5) 0%, transparent 60%)",
    },
    shapes: [
      { type: "circle", cx: "75%", cy: "25%", r: 60, stroke: "#6366f1", opacity: 0.3 },
      { type: "circle", cx: "30%", cy: "70%", r: 40, stroke: "#818cf8", opacity: 0.2 },
      { type: "rect", x: "55%", y: "50%", w: 80, h: 80, stroke: "#a5b4fc", opacity: 0.15, rotate: 45 },
      { type: "line", x1: "10%", y1: "20%", x2: "50%", y2: "80%", stroke: "#6366f1", opacity: 0.12 },
      { type: "circle", cx: "85%", cy: "75%", r: 25, stroke: "#c7d2fe", opacity: 0.2 },
      { type: "hexagon", cx: "20%", cy: "35%", r: 35, stroke: "#818cf8", opacity: 0.18 },
    ],
    fallback: {
      subtitle: "Brain Training Platform",
      title: "CogniFit Longevity",
      description:
        "Led the design and marketing strategy for CogniFit's Longevity platform — a neuroscience-backed brain training experience trusted by doctors worldwide. Designed the complete user interface, brand touchpoints, and conversion-optimized landing pages for 60+ cognitive training games serving millions of users globally.",
      tags: ["UI/UX Design", "Marketing", "Health Tech", "Neuroscience"],
      metrics: [
        { label: "Users Worldwide", value: "6M+" },
        { label: "Brain Games", value: "60+" },
        { label: "Years of Science", value: "20+" },
      ],
    },
  },
  {
    id: "dalma-farm-living",
    url: "https://dalmafarmliving.bio",
    color: "#059669",
    gradient: {
      bg: "linear-gradient(135deg, #064e3b 0%, #022c22 40%, #0a1f18 100%)",
      accent: "linear-gradient(45deg, #10b981, #34d399)",
      orb1: "radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)",
      orb2: "radial-gradient(circle, rgba(52,211,153,0.35) 0%, transparent 70%)",
      orb3: "radial-gradient(circle, rgba(5,150,105,0.45) 0%, transparent 60%)",
    },
    shapes: [
      { type: "leaf", cx: "70%", cy: "30%", r: 50, stroke: "#10b981", opacity: 0.25 },
      { type: "circle", cx: "25%", cy: "65%", r: 55, stroke: "#34d399", opacity: 0.2 },
      { type: "rect", x: "60%", y: "60%", w: 60, h: 90, stroke: "#6ee7b7", opacity: 0.12, rotate: 15 },
      { type: "line", x1: "15%", y1: "15%", x2: "85%", y2: "45%", stroke: "#10b981", opacity: 0.1 },
      { type: "circle", cx: "80%", cy: "80%", r: 30, stroke: "#a7f3d0", opacity: 0.18 },
      { type: "diamond", cx: "40%", cy: "25%", r: 28, stroke: "#34d399", opacity: 0.15 },
    ],
    fallback: {
      subtitle: "Organic Farm & Living",
      title: "D'ALMA Farm Living",
      description:
        "Built the complete brand identity for D'ALMA Farm Living from the ground up — a premium organic lifestyle brand rooted in Portuguese traditions. Directed the full visual ecosystem: logo, packaging, digital presence, and photography art direction that captures the essence of sustainable farm-to-table living.",
      tags: ["Brand Identity", "Packaging", "Digital", "Photography Direction"],
      metrics: [
        { label: "Brand Built", value: "From Zero" },
        { label: "Deliverables", value: "Full Identity" },
        { label: "Positioning", value: "Organic Lifestyle" },
      ],
    },
  },
  {
    id: "tcpi-tecnoprojecto",
    url: "https://tcpi.pt",
    color: "#D97706",
    gradient: {
      bg: "linear-gradient(135deg, #78350f 0%, #451a03 40%, #1c0a00 100%)",
      accent: "linear-gradient(45deg, #f59e0b, #fbbf24)",
      orb1: "radial-gradient(circle, rgba(245,158,11,0.5) 0%, transparent 70%)",
      orb2: "radial-gradient(circle, rgba(251,191,36,0.35) 0%, transparent 70%)",
      orb3: "radial-gradient(circle, rgba(217,119,6,0.45) 0%, transparent 60%)",
    },
    shapes: [
      { type: "rect", x: "65%", y: "20%", w: 100, h: 60, stroke: "#f59e0b", opacity: 0.25, rotate: 0 },
      { type: "circle", cx: "30%", cy: "50%", r: 45, stroke: "#fbbf24", opacity: 0.2 },
      { type: "triangle", cx: "75%", cy: "65%", r: 40, stroke: "#fcd34d", opacity: 0.15 },
      { type: "line", x1: "20%", y1: "80%", x2: "80%", y2: "20%", stroke: "#f59e0b", opacity: 0.1 },
      { type: "rect", x: "15%", y: "15%", w: 50, h: 50, stroke: "#fde68a", opacity: 0.12, rotate: 30 },
      { type: "hexagon", cx: "50%", cy: "80%", r: 32, stroke: "#fbbf24", opacity: 0.18 },
    ],
    fallback: {
      subtitle: "Industrial Engineering",
      title: "TCPI Tecnoprojecto Internacional",
      description:
        "Spearheaded the corporate rebrand of TCPI Tecnoprojecto Internacional — a 39-year-old industrial engineering firm within the Ponticelli Group. Modernized the entire visual identity system while honoring decades of heritage, creating a design language that bridges traditional engineering prestige with contemporary global ambition.",
      tags: ["Corporate Rebrand", "Visual Identity", "Industrial Design"],
      metrics: [
        { label: "Company Heritage", value: "39 Years" },
        { label: "Parent Group", value: "Ponticelli" },
        { label: "Reach", value: "Global Operations" },
      ],
    },
  },
];

/* ──────────────── SVG Shape Helpers ──────────────── */
function renderShape(
  shape: (typeof projects)[number]["shapes"][number],
  idx: number
) {
  const common = {
    stroke: shape.stroke,
    strokeWidth: 1.5,
    fill: "none",
    opacity: shape.opacity,
  };

  switch (shape.type) {
    case "circle":
      return (
        <circle
          key={idx}
          cx={shape.cx}
          cy={shape.cy}
          r={shape.r}
          {...common}
        />
      );
    case "rect":
      return (
        <rect
          key={idx}
          x={shape.x}
          y={shape.y}
          width={(shape as any).w}
          height={(shape as any).h}
          rx={4}
          transform={`rotate(${(shape as any).rotate || 0} ${shape.x} ${shape.y})`}
          {...common}
        />
      );
    case "line":
      return (
        <line
          key={idx}
          x1={(shape as any).x1}
          y1={(shape as any).y1}
          x2={(shape as any).x2}
          y2={(shape as any).y2}
          {...common}
          strokeDasharray="6 6"
        />
      );
    case "triangle": {
      const cx = parseFloat(String(shape.cx));
      const cy = parseFloat(String(shape.cy));
      const r = shape.r!;
      const points = `${cx},${cy - r} ${cx - r * 0.866},${cy + r * 0.5} ${cx + r * 0.866},${cy + r * 0.5}`;
      return <polygon key={idx} points={points} {...common} />;
    }
    case "hexagon": {
      const cx = parseFloat(String(shape.cx));
      const cy = parseFloat(String(shape.cy));
      const r = shape.r!;
      const pts = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
      }).join(" ");
      return <polygon key={idx} points={pts} {...common} />;
    }
    case "diamond": {
      const cx = parseFloat(String(shape.cx));
      const cy = parseFloat(String(shape.cy));
      const r = shape.r!;
      const pts = `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`;
      return <polygon key={idx} points={pts} {...common} />;
    }
    case "leaf": {
      const cx = parseFloat(String(shape.cx));
      const cy = parseFloat(String(shape.cy));
      const r = shape.r!;
      return (
        <path
          key={idx}
          d={`M ${cx} ${cy - r} Q ${cx + r} ${cy - r * 0.3} ${cx} ${cy + r} Q ${cx - r} ${cy - r * 0.3} ${cx} ${cy - r}`}
          {...common}
        />
      );
    }
    default:
      return null;
  }
}

/* ──────────────── Visual Placeholder ──────────────── */
function ProjectVisual({
  project,
  isHovered,
}: {
  project: (typeof projects)[number];
  isHovered: boolean;
}) {
  return (
    <div
      className="relative w-full aspect-[4/3] md:aspect-auto md:h-full rounded-xl overflow-hidden"
      style={{ background: project.gradient.bg }}
    >
      {/* Orbs */}
      <motion.div
        className="absolute w-48 h-48 top-[10%] right-[10%] rounded-full blur-[60px]"
        style={{ background: project.gradient.orb1 }}
        animate={isHovered ? { scale: 1.2, opacity: 0.8 } : { scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute w-36 h-36 bottom-[15%] left-[15%] rounded-full blur-[50px]"
        style={{ background: project.gradient.orb2 }}
        animate={isHovered ? { scale: 1.3, x: 10, y: -10 } : { scale: 1, x: 0, y: 0 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute w-56 h-56 top-[40%] left-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
        style={{ background: project.gradient.orb3 }}
        animate={isHovered ? { scale: 1.15 } : { scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Geometric SVG overlay */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {project.shapes.map((shape, idx) => renderShape(shape, idx))}
      </svg>

      {/* Gradient line accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: project.gradient.accent }}
      />

      {/* Floating dots */}
      <motion.div
        className="absolute w-2 h-2 rounded-full top-[20%] left-[60%]"
        style={{ backgroundColor: project.color }}
        animate={{ y: [0, -8, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full top-[60%] left-[25%]"
        style={{ backgroundColor: project.color }}
        animate={{ y: [0, -6, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute w-1 h-1 rounded-full top-[40%] left-[80%]"
        style={{ backgroundColor: project.color }}
        animate={{ y: [0, -10, 0], opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')]" />
    </div>
  );
}

/* ──────────────── Project Card ──────────────── */
function ProjectCard({
  project,
  index,
  t,
}: {
  project: (typeof projects)[number];
  index: number;
  t: any;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  const translated = t.portfolio?.projects?.[index];
  const data = {
    subtitle: translated?.subtitle || project.fallback.subtitle,
    title: translated?.title || project.fallback.title,
    description: translated?.description || project.fallback.description,
    tags: translated?.tags || project.fallback.tags,
    metrics: translated?.metrics || project.fallback.metrics,
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <motion.div
          className="card-glow bg-[#111111] rounded-2xl overflow-hidden transition-all duration-500"
          whileHover={{ y: -6 }}
          style={{
            boxShadow: isHovered
              ? `0 0 0 1px ${project.color}40, 0 25px 60px ${project.color}15`
              : "0 0 0 1px rgba(30,30,30,0.5)",
          }}
        >
          <div className="grid md:grid-cols-[1fr_1fr] lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left: Info */}
            <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between order-2 md:order-1">
              <div>
                {/* Subtitle tag */}
                <motion.span
                  className="inline-block text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full mb-5"
                  style={{
                    color: project.color,
                    backgroundColor: `${project.color}15`,
                    border: `1px solid ${project.color}25`,
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                >
                  {data.subtitle}
                </motion.span>

                {/* Title */}
                <motion.h3
                  className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-[#f5f5f5] leading-tight mb-5 group-hover:text-white transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 + 0.35 }}
                >
                  {data.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-[#8a8a8a] leading-relaxed text-[0.95rem] mb-6 max-w-lg"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
                >
                  {data.description}
                </motion.p>

                {/* Tags */}
                <motion.div
                  className="flex flex-wrap gap-2 mb-8"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 + 0.45 }}
                >
                  {data.tags.map((tag: string, j: number) => (
                    <motion.span
                      key={tag}
                      className="px-3.5 py-1.5 text-xs rounded-full border border-[#1e1e1e] text-[#8a8a8a] group-hover:border-opacity-60 transition-all duration-300"
                      style={{
                        ...(isHovered
                          ? {
                              borderColor: `${project.color}40`,
                              color: `${project.color}cc`,
                            }
                          : {}),
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.15 + 0.5 + j * 0.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {/* Metrics row */}
              <motion.div
                className="grid grid-cols-3 gap-4 pt-6 border-t border-[#1e1e1e]"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.55 }}
              >
                {data.metrics.map((metric: { label: string; value: string }) => (
                  <div key={metric.label}>
                    <div
                      className="text-xl md:text-2xl font-bold transition-colors duration-300"
                      style={{ color: isHovered ? project.color : "#f5f5f5" }}
                    >
                      {metric.value}
                    </div>
                    <div className="text-[11px] text-[#8a8a8a] mt-0.5 uppercase tracking-wide">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* View Project link */}
              <motion.div
                className="flex items-center gap-2 mt-6 text-sm font-medium transition-all duration-300"
                style={{
                  color: isHovered ? project.color : "#8a8a8a",
                  opacity: isHovered ? 1 : 0.6,
                }}
              >
                <span>{t.portfolio?.viewProject || "View Project"}</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </motion.div>
            </div>

            {/* Right: Visual */}
            <div className="order-1 md:order-2 min-h-[280px] md:min-h-[420px]">
              <ProjectVisual project={project} isHovered={isHovered} />
            </div>
          </div>
        </motion.div>
      </a>
    </motion.div>
  );
}

/* ──────────────── Portfolio Section ──────────────── */
export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="work" className="relative py-32">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E8787A]/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="text-[#E8787A] text-sm font-mono tracking-wider">04</span>
          <span className="w-12 h-px bg-[#E8787A]/50" />
          <span className="text-sm text-[#8a8a8a] uppercase tracking-widest">
            {t.portfolio?.label || "Selected Work"}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          {t.portfolio?.heading ? (
            <span dangerouslySetInnerHTML={{ __html: t.portfolio.heading }} />
          ) : (
            <>
              Featured <span className="gradient-text">Projects</span>
            </>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#8a8a8a] text-lg max-w-2xl mb-16"
        >
          {t.portfolio?.subtitle ||
            "A selection of projects that showcase my approach to design, branding, and digital product development."}
        </motion.p>

        {/* Projects */}
        <div className="space-y-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
