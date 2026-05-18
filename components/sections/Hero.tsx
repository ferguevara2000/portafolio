"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, FileText, Download } from "lucide-react";
import { smoothScrollTo } from "@/lib/smoothScrool";

const ROLES = ["Fullstack Developer"];

function TypewriterText({ words }: { words: string[] }) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setCharIndex((c) => c + 1);
        setDisplayed(current.slice(0, charIndex + 1));
      } else if (!deleting && charIndex === current.length) {
        setDeleting(true);
      } else if (deleting && charIndex > 0) {
        setCharIndex((c) => c - 1);
        setDisplayed(current.slice(0, charIndex - 1));
      } else {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
        setCharIndex(0);
      }
    }, deleting ? 45 : charIndex === words[wordIndex].length ? 2000 : 80);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words]);

  return (
    <span className="inline-flex items-center gap-1">
      <span>{displayed}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-5 sm:h-7 bg-white/60 ml-0.5 translate-y-0.5"
      />
    </span>
  );
}

function fadeUp(i: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] as const },
  };
}

function ScrollButton() {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => smoothScrollTo("about");

  return (
    <motion.div
      onClick={handleClick}
      animate={hovered ? { y: 0 } : { y: [0, 8, 0] }}
      transition={
        hovered
          ? { duration: 0.2 }
          : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex items-center justify-center w-10 h-10 rounded-full border cursor-pointer transition-colors duration-300 ${
        hovered
          ? "bg-white border-white text-black"
          : "bg-transparent border-white text-white"
      }`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 1v12M1 7l6 6 6-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

function ProjectsButton({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href="#proyectos"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ scale: hovered ? 1.06 : 1 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex items-center justify-center gap-3 bg-white text-black text-base font-medium rounded-full px-8 h-14 cursor-pointer w-full sm:w-auto"
      style={{ minWidth: "200px" }}
    >
      <span className="flex items-center gap-2">
        {label}
        <ArrowRight size={18} />
      </span>
    </motion.a>
  );
}

function CVButton({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href="/cv.pdf"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center justify-center gap-3 rounded-full px-8 h-14 overflow-hidden cursor-pointer border transition-colors duration-300 w-full sm:w-auto"
      style={{
        minWidth: "200px",
        borderColor: hovered ? "transparent" : "rgba(255,255,255,0.15)",
        backgroundColor: hovered ? "rgba(255,255,255,0.08)" : "transparent",
      }}
    >
      <motion.span
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: hovered ? 0 : 1, y: hovered ? -20 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute z-10 flex items-center gap-2 text-white/60 text-base font-light"
      >
        <FileText size={18} />
        {label}
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
        transition={{ duration: 0.25 }}
        className="absolute z-10 flex items-center gap-3 text-white text-base font-medium"
      >
        <span>{label}</span>
        <Download size={18} />
      </motion.span>
    </motion.a>
  );
}

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <div className="flex flex-col items-center gap-5 w-full max-w-5xl">

        {/* Badge disponibilidad */}
        <motion.div
          {...fadeUp(0)}
          style={{ minHeight: "32px", minWidth: "180px" }}
          className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          <span className="text-xs text-white/60 tracking-wide">
            {t("available")}
          </span>
        </motion.div>

        {/* Nombre */}
        <motion.h1
          {...fadeUp(1)}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight leading-none sm:whitespace-nowrap"
        >
          Fernando Guevara
        </motion.h1>

        {/* Descripción */}
        <motion.p
          {...fadeUp(2)}
          className="text-lg sm:text-2xl md:text-3xl text-white/70 font-light leading-snug max-w-2xl"
        >
          {t("description")}
        </motion.p>

        {/* Typewriter */}
        <motion.div
          {...fadeUp(3)}
          className="flex items-center gap-2 text-white text-xs sm:text-base tracking-widest uppercase font-light"
        >
          <span className="text-white">◈</span>
          <TypewriterText words={ROLES} />
        </motion.div>

        {/* CTAs */}
        <motion.div
          {...fadeUp(4)}
          className="flex flex-col sm:flex-row items-center gap-3 mt-4 w-full sm:w-auto"
        >
          <ProjectsButton label={t("cta_projects")} />
          <CVButton label={t("cta_cv")} />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          {...fadeUp(5)}
          className="flex flex-col items-center gap-2 mt-6"
        >
          <ScrollButton />
        </motion.div>

      </div>
    </section>
  );
}