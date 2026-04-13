"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import CrystalLogo from "./CrystalLogo";

const NAV_KEYS = [
  "about",
  "services",
  "work",
  "process",
  "skills",
  "experience",
  "contact",
] as const;

type Locale = "en" | "pt" | "es" | "fr" | "de";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN", pt: "PT", es: "ES", fr: "FR", de: "DE",
};

const LOCALE_FLAGS: Record<Locale, string> = {
  en: "\u{1F1EC}\u{1F1E7}", pt: "\u{1F1F5}\u{1F1F9}", es: "\u{1F1EA}\u{1F1F8}", fr: "\u{1F1EB}\u{1F1F7}", de: "\u{1F1E9}\u{1F1EA}",
};

export default function Navigation() {
  const { locale, setLocale, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // ── Scroll detection ──
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── IntersectionObserver for active section ──
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_KEYS.forEach((key) => {
      const el = document.getElementById(key);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(key);
          }
        },
        {
          rootMargin: "-20% 0px -60% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // ── Close language dropdown on outside click ──
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Lock body scroll when mobile menu open ──
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback(
    (key: string) => {
      setIsMobileMenuOpen(false);
      const el = document.getElementById(key);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  const handleLocaleChange = useCallback(
    (loc: Locale) => {
      setLocale(loc);
      setIsLangOpen(false);
      setIsMobileLangOpen(false);
    },
    [setLocale]
  );

  // ── Animation Variants ──
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.25, ease: "easeIn" as const, delay: 0.1 },
    },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        delay: 0.1 + i * 0.06,
        ease: "easeOut" as const,
      },
    }),
    exit: (i: number) => ({
      opacity: 0,
      y: -15,
      filter: "blur(4px)",
      transition: {
        duration: 0.2,
        delay: i * 0.02,
      },
    }),
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -8, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" as const },
    },
    exit: {
      opacity: 0,
      y: -8,
      scale: 0.95,
      transition: { duration: 0.15, ease: "easeIn" as const },
    },
  };

  const nav = t.nav as Record<string, string>;

  return (
    <>
      {/* ── Desktop / Main Header ── */}
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-white/[0.04] py-3"
            : "py-5 lg:py-6"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* ── Logo ── */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="relative group flex items-center gap-2 text-xl font-bold tracking-tight text-[#f5f5f5] hover:text-[#f5f5f5] transition-colors duration-300"
          >
            <span className="hidden sm:inline">
              <CrystalLogo size={22} color="#E8787A" />
            </span>
            <span>
              joolomee
              <span className="text-[#E8787A] group-hover:opacity-70 transition-opacity duration-300">
                .
              </span>
            </span>
          </a>

          {/* ── Desktop Nav Links ── */}
          <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_KEYS.map((key) => {
              const isActive = activeSection === key;
              return (
                <li key={key}>
                  <button
                    onClick={() => handleNavClick(key)}
                    className={`relative px-3 xl:px-4 py-2 text-[13px] tracking-wide uppercase transition-colors duration-300 ${
                      isActive
                        ? "text-[#E8787A]"
                        : "text-[#8a8a8a] hover:text-[#f5f5f5]"
                    }`}
                  >
                    {nav[key] || key}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 xl:left-4 xl:right-4 h-[2px] bg-[#E8787A] rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop Right: Lang + CTA ── */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#8a8a8a] hover:text-[#f5f5f5] hover:bg-white/[0.04] transition-all duration-300 border border-transparent hover:border-[#1e1e1e]"
                aria-label="Change language"
              >
                <span className="text-sm leading-none">
                  {LOCALE_FLAGS[locale]}
                </span>
                <span className="uppercase tracking-wider">
                  {LOCALE_LABELS[locale]}
                </span>
                <motion.svg
                  animate={{ rotate: isLangOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-3 h-3"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full right-0 mt-2 w-36 py-1.5 rounded-xl bg-[#111111] border border-[#1e1e1e] shadow-2xl shadow-black/40 overflow-hidden"
                  >
                    {(Object.keys(LOCALE_LABELS) as Locale[]).map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleLocaleChange(loc)}
                        className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-xs transition-all duration-200 ${
                          locale === loc
                            ? "text-[#E8787A] bg-[#E8787A]/[0.06] font-semibold"
                            : "text-[#8a8a8a] hover:text-[#f5f5f5] hover:bg-white/[0.04]"
                        }`}
                      >
                        <span className="text-sm leading-none">
                          {LOCALE_FLAGS[loc]}
                        </span>
                        <span className="uppercase tracking-wider">
                          {LOCALE_LABELS[loc]}
                        </span>
                        {locale === loc && (
                          <motion.span
                            layoutId="lang-check"
                            className="ml-auto text-[#E8787A]"
                          >
                            <svg
                              className="w-3 h-3"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M2 6L5 9L10 3"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </motion.span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2 rounded-full bg-[#E8787A] text-[#0a0a0a] text-sm font-semibold hover:bg-[#F2A5A7] transition-colors duration-300 shadow-lg shadow-[#E8787A]/20"
            >
              {nav.letsTalk || "Let's Talk"}
            </motion.a>
          </div>

          {/* ── Mobile Menu Button ── */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-[5px] rounded-lg hover:bg-white/[0.04] transition-colors"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={
                isMobileMenuOpen
                  ? { rotate: 45, y: 6.5, width: 20 }
                  : { rotate: 0, y: 0, width: 20 }
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="block h-[1.5px] bg-[#f5f5f5] origin-center rounded-full"
              style={{ width: 20 }}
            />
            <motion.span
              animate={
                isMobileMenuOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.2 }}
              className="block w-5 h-[1.5px] bg-[#f5f5f5] rounded-full"
            />
            <motion.span
              animate={
                isMobileMenuOpen
                  ? { rotate: -45, y: -6.5, width: 20 }
                  : { rotate: 0, y: 0, width: 14 }
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="block h-[1.5px] bg-[#f5f5f5] origin-center rounded-full self-end"
              style={{ width: 14 }}
            />
          </button>
        </nav>
      </motion.header>

      {/* ── Mobile Full-Screen Overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden"
          >
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 -right-20 w-64 h-64 bg-[#E8787A]/5 rounded-full blur-[100px]" />
              <div className="absolute bottom-1/3 -left-20 w-48 h-48 bg-[#F2A5A7]/5 rounded-full blur-[80px]" />
            </div>

            <nav className="relative z-10 flex flex-col items-center">
              <ul className="flex flex-col items-center gap-5 mb-10">
                {NAV_KEYS.map((key, i) => (
                  <motion.li
                    key={key}
                    custom={i}
                    variants={mobileLinkVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <button
                      onClick={() => handleNavClick(key)}
                      className={`text-3xl sm:text-4xl font-light tracking-wide transition-colors duration-300 ${
                        activeSection === key
                          ? "text-[#E8787A]"
                          : "text-[#f5f5f5] hover:text-[#E8787A]"
                      }`}
                    >
                      {nav[key] || key}
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile CTA */}
              <motion.a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                custom={NAV_KEYS.length}
                variants={mobileLinkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="px-10 py-3.5 rounded-full bg-[#E8787A] text-[#0a0a0a] text-lg font-semibold mb-10 shadow-lg shadow-[#E8787A]/20"
              >
                {nav.letsTalk || "Let's Talk"}
              </motion.a>

              {/* Mobile Language Switcher */}
              <motion.div
                custom={NAV_KEYS.length + 1}
                variants={mobileLinkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-center gap-3"
              >
                <button
                  onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                  className="flex items-center gap-2 text-[#8a8a8a] text-sm"
                >
                  <span className="text-base">{LOCALE_FLAGS[locale]}</span>
                  <span className="uppercase tracking-widest font-medium">
                    {LOCALE_LABELS[locale]}
                  </span>
                  <motion.svg
                    animate={{ rotate: isMobileLangOpen ? 180 : 0 }}
                    className="w-3.5 h-3.5"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {isMobileLangOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-center gap-3 pt-2">
                        {(Object.keys(LOCALE_LABELS) as Locale[]).map(
                          (loc) => (
                            <button
                              key={loc}
                              onClick={() => handleLocaleChange(loc)}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                                locale === loc
                                  ? "text-[#E8787A] bg-[#E8787A]/10 border border-[#E8787A]/20"
                                  : "text-[#8a8a8a] hover:text-[#f5f5f5] border border-[#1e1e1e] hover:border-[#2a2a2a]"
                              }`}
                            >
                              <span className="text-sm">
                                {LOCALE_FLAGS[loc]}
                              </span>
                              <span className="uppercase tracking-wider">
                                {LOCALE_LABELS[loc]}
                              </span>
                            </button>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
