"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import {
  SiReact, SiNextdotjs, SiAngular,
  SiNodedotjs, SiExpress, SiDjango, SiSpring,
  SiPostgresql, SiMysql, SiMongodb, SiFirebase, SiSupabase,
  SiDocker, SiGit, SiTypescript, SiTailwindcss,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const ROW_ONE = [
  { icon: SiReact, name: "React" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiAngular, name: "Angular" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiExpress, name: "Express" },
  { icon: SiDjango, name: "Django" },
  { icon: SiSpring, name: "Spring Boot" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiTailwindcss, name: "Tailwind" },
];

const ROW_TWO = [
  { icon: SiPostgresql, name: "PostgreSQL" },
  { icon: SiMysql, name: "MySQL" },
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiFirebase, name: "Firebase" },
  { icon: SiSupabase, name: "Supabase" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiGit, name: "Git" },
  { icon: FaAws, name: "AWS" },
];

function InfiniteRow({
  items,
  direction = "left",
  speed = 30,
}: {
  items: { icon: React.ElementType; name: string }[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...items, ...items, ...items];
  const itemWidth = 64 + 32; // w-16 (64px) + gap-8 (32px)
  const totalWidth = items.length * itemWidth;

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-8 w-max"
        animate={{
          x: direction === "left"
            ? [-totalWidth, 0]
            : [0, -totalWidth],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-center w-16 h-16 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/8 hover:border-white/20 transition-all duration-300 group cursor-default flex-shrink-0"
            title={item.name}
          >
            <item.icon
              size={28}
              className="text-white/30 group-hover:text-white/80 transition-colors duration-300"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const t = useTranslations("skills");
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      id="skills"
      style={{ paddingTop: "6rem" }}
      className="relative w-full py-24 sm:py-32 flex flex-col items-center gap-16 overflow-hidden"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col items-center gap-3 px-6 text-center"
      >
        <span className="text-xs text-white/30 tracking-widest uppercase font-mono">
          {t("label")}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          {t("title")}
        </h2>
      </motion.div>

      {/* Carrusel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col gap-6 w-full"
      >
        {/* Máscara de fade en los bordes */}
        <div
          className="relative w-full flex flex-col gap-6"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <InfiniteRow items={ROW_ONE} direction="left" speed={35} />
          <InfiniteRow items={ROW_TWO} direction="right" speed={28} />
        </div>
      </motion.div>
    </section>
  );
}