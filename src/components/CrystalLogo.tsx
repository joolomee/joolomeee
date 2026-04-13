"use client";

import { motion } from "framer-motion";

interface CrystalLogoProps {
  size?: number;
  color?: string;
  className?: string;
  animated?: boolean;
}

export default function CrystalLogo({
  size = 48,
  color = "#E8787A",
  className = "",
  animated = false,
}: CrystalLogoProps) {
  const svg = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Glow filter for animated variant */}
      {animated && (
        <defs>
          <filter id="crystal-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}

      <g filter={animated ? "url(#crystal-glow)" : undefined}>
        {/* Top facet - crown */}
        <polygon
          points="50,5 65,25 35,25"
          fill={color}
          opacity={0.95}
        />

        {/* Upper-left facet */}
        <polygon
          points="50,5 35,25 18,45"
          fill={color}
          opacity={0.7}
        />

        {/* Upper-right facet */}
        <polygon
          points="50,5 65,25 82,45"
          fill={color}
          opacity={0.85}
        />

        {/* Center-left facet */}
        <polygon
          points="35,25 18,45 30,55"
          fill={color}
          opacity={0.55}
        />

        {/* Center diamond facet */}
        <polygon
          points="35,25 65,25 70,55 30,55"
          fill={color}
          opacity={0.75}
        />

        {/* Center-right facet */}
        <polygon
          points="65,25 82,45 70,55"
          fill={color}
          opacity={0.65}
        />

        {/* Lower-left facet */}
        <polygon
          points="18,45 30,55 50,95"
          fill={color}
          opacity={0.6}
        />

        {/* Lower-center-left facet */}
        <polygon
          points="30,55 50,65 50,95"
          fill={color}
          opacity={0.8}
        />

        {/* Lower-center-right facet */}
        <polygon
          points="70,55 50,65 50,95"
          fill={color}
          opacity={0.9}
        />

        {/* Lower-right facet */}
        <polygon
          points="82,45 70,55 50,95"
          fill={color}
          opacity={0.5}
        />

        {/* Inner edge lines for facet definition */}
        <line x1="35" y1="25" x2="30" y2="55" stroke={color} strokeWidth="0.5" opacity={0.3} />
        <line x1="65" y1="25" x2="70" y2="55" stroke={color} strokeWidth="0.5" opacity={0.3} />
        <line x1="50" y1="65" x2="50" y2="95" stroke={color} strokeWidth="0.5" opacity={0.2} />
        <line x1="30" y1="55" x2="70" y2="55" stroke={color} strokeWidth="0.5" opacity={0.2} />
        <line x1="50" y1="5" x2="50" y2="65" stroke={color} strokeWidth="0.3" opacity={0.15} />
      </g>
    </svg>
  );

  if (!animated) return svg;

  return (
    <motion.div
      animate={{
        rotate: [0, 3, -3, 0],
        filter: [
          "drop-shadow(0 0 6px rgba(232,120,122,0.3))",
          "drop-shadow(0 0 14px rgba(232,120,122,0.5))",
          "drop-shadow(0 0 6px rgba(232,120,122,0.3))",
        ],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="inline-flex"
    >
      {svg}
    </motion.div>
  );
}
