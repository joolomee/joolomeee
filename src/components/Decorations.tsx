"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ────────────────────────────────────────────────────────────
   1. FloatingShapes
   ──────────────────────────────────────────────────────────── */

interface FloatingShape {
  id: number;
  type: "circle" | "triangle" | "hexagon" | "crystal";
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  rotation: number;
}

function ShapeSVG({ type, size, color }: { type: FloatingShape["type"]; size: number; color: string }) {
  switch (type) {
    case "circle":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="1" />
        </svg>
      );
    case "triangle":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <polygon points="20,4 36,36 4,36" stroke={color} strokeWidth="1" fill="none" />
        </svg>
      );
    case "hexagon":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <polygon
            points="20,2 36,11 36,29 20,38 4,29 4,11"
            stroke={color}
            strokeWidth="1"
            fill="none"
          />
        </svg>
      );
    case "crystal":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <polygon points="20,2 30,14 26,36 14,36 10,14" stroke={color} strokeWidth="1" fill={color} fillOpacity={0.1} />
          <line x1="20" y1="2" x2="20" y2="36" stroke={color} strokeWidth="0.5" opacity={0.5} />
        </svg>
      );
  }
}

export function FloatingShapes() {
  const [shapes, setShapes] = useState<FloatingShape[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 6 : 14;

    const types: FloatingShape["type"][] = ["circle", "triangle", "hexagon", "crystal"];
    const generated: FloatingShape[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      type: types[i % types.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: isMobile ? 12 + Math.random() * 16 : 18 + Math.random() * 28,
      opacity: 0.06 + Math.random() * 0.12,
      duration: 12 + Math.random() * 20,
      delay: Math.random() * -20,
      rotation: Math.random() * 360,
    }));
    setShapes(generated);
  }, []);

  if (shapes.length === 0) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {shapes.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          initial={{ opacity: 0, rotate: s.rotation }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            rotate: [s.rotation, s.rotation + 60, s.rotation + 120, s.rotation + 180, s.rotation + 360],
            opacity: [s.opacity, s.opacity * 1.4, s.opacity * 0.7, s.opacity * 1.2, s.opacity],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        >
          <ShapeSVG type={s.type} size={s.size} color="#E8787A" />
        </motion.div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   2. BotanicalLeaf
   ──────────────────────────────────────────────────────────── */

interface BotanicalLeafProps {
  rotation?: number;
  scale?: number;
  opacity?: number;
  className?: string;
  color?: string;
}

export function BotanicalLeaf({
  rotation = 0,
  scale = 1,
  opacity = 0.1,
  className = "",
  color = "#E8787A",
}: BotanicalLeafProps) {
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ transform: `rotate(${rotation}deg) scale(${scale})`, opacity }}
      aria-hidden="true"
    >
      <svg
        width="200"
        height="280"
        viewBox="0 0 200 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main leaf shape (monstera-inspired) */}
        <path
          d="M100 270 C100 270 40 220 30 160 C22 115 45 80 60 60 C70 47 85 30 100 10
             C115 30 130 47 140 60 C155 80 178 115 170 160 C160 220 100 270 100 270Z"
          fill={color}
          fillOpacity={0.15}
          stroke={color}
          strokeWidth="1"
          strokeOpacity={0.3}
        />
        {/* Central vein */}
        <path
          d="M100 10 L100 270"
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity={0.3}
        />
        {/* Left veins */}
        <path d="M100 60 C80 70 60 80 45 100" stroke={color} strokeWidth="0.8" strokeOpacity={0.2} />
        <path d="M100 100 C78 112 55 125 38 148" stroke={color} strokeWidth="0.8" strokeOpacity={0.2} />
        <path d="M100 145 C80 158 60 175 48 195" stroke={color} strokeWidth="0.8" strokeOpacity={0.2} />
        <path d="M100 190 C82 205 68 220 60 238" stroke={color} strokeWidth="0.8" strokeOpacity={0.2} />
        {/* Right veins */}
        <path d="M100 60 C120 70 140 80 155 100" stroke={color} strokeWidth="0.8" strokeOpacity={0.2} />
        <path d="M100 100 C122 112 145 125 162 148" stroke={color} strokeWidth="0.8" strokeOpacity={0.2} />
        <path d="M100 145 C120 158 140 175 152 195" stroke={color} strokeWidth="0.8" strokeOpacity={0.2} />
        <path d="M100 190 C118 205 132 220 140 238" stroke={color} strokeWidth="0.8" strokeOpacity={0.2} />
        {/* Monstera cutouts (holes) */}
        <ellipse
          cx="72"
          cy="130"
          rx="14"
          ry="20"
          transform="rotate(-15 72 130)"
          fill="#0a0a0a"
          fillOpacity={0.8}
        />
        <ellipse
          cx="132"
          cy="125"
          rx="12"
          ry="18"
          transform="rotate(12 132 125)"
          fill="#0a0a0a"
          fillOpacity={0.8}
        />
        <ellipse
          cx="78"
          cy="188"
          rx="10"
          ry="14"
          transform="rotate(-8 78 188)"
          fill="#0a0a0a"
          fillOpacity={0.8}
        />
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   3. GradientOrb
   ──────────────────────────────────────────────────────────── */

interface GradientOrbProps {
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  opacity?: number;
  className?: string;
}

export function GradientOrb({
  size = 384,
  top,
  left,
  right,
  bottom,
  opacity = 0.1,
  className = "",
}: GradientOrbProps) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        opacity,
        background:
          "radial-gradient(circle at center, rgba(232,120,122,0.5) 0%, rgba(242,165,167,0.25) 40%, transparent 70%)",
        filter: `blur(${Math.round(size / 3)}px)`,
      }}
      aria-hidden="true"
    />
  );
}

/* ────────────────────────────────────────────────────────────
   4. GridDots
   ──────────────────────────────────────────────────────────── */

interface GridDotsProps {
  spacing?: number;
  dotSize?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

export function GridDots({
  spacing = 32,
  dotSize = 1,
  color = "#E8787A",
  opacity = 0.12,
  className = "",
}: GridDotsProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        opacity,
        backgroundImage: `radial-gradient(${color} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
      }}
      aria-hidden="true"
    />
  );
}
