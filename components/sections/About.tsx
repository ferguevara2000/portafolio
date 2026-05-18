"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Briefcase, FolderGit2, GraduationCap, Globe } from "lucide-react";
import Image from "next/image";

function fadeUp(i: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] as const },
  };
}

const STATS = [
  { icon: Briefcase, labelKey: "experience", value: "2" },
  { icon: FolderGit2, labelKey: "projects", value: "10+" },
  { icon: Globe, labelKey: "modality", value: "Open" },
  { icon: GraduationCap, labelKey: "education", value: "Ing. Software" },
];

export default function About() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="relative w-full px-6 py-24 sm:py-32 flex justify-center"
    >
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 items-center">

        {/* Columna izquierda — Foto */}
        <motion.div
          {...fadeUp(0)}
          className="relative w-full aspect-[3/4] max-w-xs sm:max-w-sm mx-auto md:mx-0"
        >
          {/* Marco decorativo */}
          <div className="absolute -top-3 -left-3 w-full h-full border border-white/10 rounded-2xl" />


          {/* Foto */}
           <div
            className="relative w-full h-full rounded-2xl overflow-hidden bg-white/5 border border-white/10"
            style={{ position: "relative" }}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (img) img.style.filter = "grayscale(0%)";
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (img) img.style.filter = "grayscale(100%)";
            }}
          >
            <Image
              src="/foto.png"
              alt="Fernando Guevara"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </motion.div>

        {/* Columna derecha — Texto + Stats */}
        <div className="flex flex-col gap-8">

          {/* Etiqueta */}
          <motion.span
            {...fadeUp(0)}
            className="text-xs text-white/30 tracking-widest uppercase font-mono"
          >
            {t("label")}
          </motion.span>

          {/* Texto */}
          <motion.p
            {...fadeUp(1)}
            className="text-lg sm:text-xl text-white/70 font-light leading-relaxed"
          >
            {t("bio")}
          </motion.p>

          {/* Separador */}
          <motion.div
            {...fadeUp(2)}
            className="w-full h-px bg-white/8"
          />

          {/* Stats */}
          <motion.div
            {...fadeUp(3)}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map((stat) => (
              <div
                key={stat.labelKey}
                style={{ minHeight: "100px", minWidth: "100px" }}
                className="flex flex-col justify-center items-center text-center gap-2 p-4 rounded-xl border border-white/8 bg-white/3 hover:bg-white/5 transition-colors duration-300"
              >
                <stat.icon size={16} className="text-white/30" />
                <span className="text-base font-medium text-white">
                  {stat.labelKey === "experience"
                    ? `${stat.value} ${t("years")}`
                    : stat.labelKey === "modality"
                    ? t("modalityValue")
                    : stat.value}
                </span>
                <span className="text-xs text-white/40 font-light">
                  {t(stat.labelKey)}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}