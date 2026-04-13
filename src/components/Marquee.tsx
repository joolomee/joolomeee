"use client";

import { motion } from "framer-motion";
import CrystalLogo from "./CrystalLogo";

const MARQUEE_ITEMS = [
  { text: "JOOLOMEE", outline: false },
  { text: "\u00B7", outline: false },
  { text: "REMEMBER ME", outline: true },
  { text: "\u00B7", outline: false },
  { text: "DESIGN WITH SOUL", outline: false },
  { text: "\u00B7", outline: false },
  { text: "JOOLOMEE", outline: true },
  { text: "\u00B7", outline: false },
  { text: "REMEMBER ME", outline: false },
  { text: "\u00B7", outline: false },
  { text: "DESIGN WITH SOUL", outline: true },
  { text: "\u00B7", outline: false },
];

function MarqueeContent({
  reverse = false,
  showCrystals = false,
}: {
  reverse?: boolean;
  showCrystals?: boolean;
}) {
  // Repeat the items enough times to fill the doubled content (8+ repetitions)
  const repeatedItems = Array.from({ length: 8 }, () => MARQUEE_ITEMS).flat();

  return (
    <div className="flex overflow-hidden group">
      <div
        className={`flex items-center gap-6 md:gap-10 whitespace-nowrap ${
          reverse ? "marquee-reverse" : "marquee"
        }`}
        style={{ willChange: "transform" }}
      >
        {/* First copy */}
        {repeatedItems.map((item, i) => (
          <span key={`a-${i}`} className="flex items-center gap-6 md:gap-10">
            {item.text === "\u00B7" ? (
              <>
                {showCrystals && i % 24 === 0 ? (
                  <span className="opacity-10 flex-shrink-0 transition-opacity duration-500 group-hover:opacity-20">
                    <CrystalLogo size={28} color="#E8787A" />
                  </span>
                ) : (
                  <span className="text-4xl md:text-6xl font-bold text-[#E8787A]/10 transition-colors duration-500 group-hover:text-[#E8787A]/30 select-none">
                    {item.text}
                  </span>
                )}
              </>
            ) : item.outline ? (
              <span
                className="text-4xl md:text-6xl font-bold select-none transition-all duration-500 text-transparent group-hover:text-[#E8787A]/5 flex-shrink-0"
                style={{
                  WebkitTextStroke: "1px rgba(232, 120, 122, 0.1)",
                }}
              >
                {item.text}
              </span>
            ) : (
              <span className="text-4xl md:text-6xl font-bold text-[#E8787A]/10 transition-colors duration-500 group-hover:text-[#E8787A]/30 select-none flex-shrink-0">
                {item.text}
              </span>
            )}
          </span>
        ))}

        {/* Second copy (for seamless loop) */}
        {repeatedItems.map((item, i) => (
          <span key={`b-${i}`} className="flex items-center gap-6 md:gap-10">
            {item.text === "\u00B7" ? (
              <>
                {showCrystals && i % 24 === 0 ? (
                  <span className="opacity-10 flex-shrink-0 transition-opacity duration-500 group-hover:opacity-20">
                    <CrystalLogo size={28} color="#E8787A" />
                  </span>
                ) : (
                  <span className="text-4xl md:text-6xl font-bold text-[#E8787A]/10 transition-colors duration-500 group-hover:text-[#E8787A]/30 select-none">
                    {item.text}
                  </span>
                )}
              </>
            ) : item.outline ? (
              <span
                className="text-4xl md:text-6xl font-bold select-none transition-all duration-500 text-transparent group-hover:text-[#E8787A]/5 flex-shrink-0"
                style={{
                  WebkitTextStroke: "1px rgba(232, 120, 122, 0.1)",
                }}
              >
                {item.text}
              </span>
            ) : (
              <span className="text-4xl md:text-6xl font-bold text-[#E8787A]/10 transition-colors duration-500 group-hover:text-[#E8787A]/30 select-none flex-shrink-0">
                {item.text}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="relative w-full py-6 md:py-8 border-y border-[#1e1e1e] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── Row 1: Scrolling Left ── */}
      <div className="mb-4 md:mb-6">
        <MarqueeContent showCrystals />
      </div>

      {/* ── Row 2: Scrolling Right ── */}
      <div>
        <MarqueeContent reverse showCrystals />
      </div>

      {/* ── Gradient fade edges ── */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
    </motion.section>
  );
}
