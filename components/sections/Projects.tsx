"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import { useState } from "react";
import { PROJECTS, Project, ProjectCategory } from "@/content/projects";
import { Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

const CATEGORIES: ProjectCategory[] = ["Web App", "Mobile App", "Next.js", "Angular", "Python"];
const PROJECTS_PER_PAGE = 4;

const STATUS_STYLES = {
  published: { label: "Publicado", color: "bg-green-500/10 text-green-400 border-green-500/20" },
  in_progress: { label: "En proceso", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  archived: { label: "Archivado", color: "bg-white/5 text-white/30 border-white/10" },
};

function ProjectCard({ project }: { project: Project }) {
  const status = STATUS_STYLES[project.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col rounded-2xl border border-white/8 bg-white/3 overflow-hidden hover:border-white/15 transition-colors duration-300"
    >
      {/* Imagen */}
      <div className="relative w-full aspect-video bg-white/5 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-4 p-6" style={{ padding: "1.5rem" }}>

        {/* Título + Status */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-medium text-white leading-snug">
            {project.title}
          </h3>
          <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full border ${status.color}`} style={{ padding: "0.3rem" }}>
            {status.label}
          </span>
        </div>

        {/* Rol */}
        <span className="text-xs text-white/30 font-mono tracking-wider uppercase">
          {project.role}
        </span>

        {/* Descripción */}
        <p className="text-sm text-white/50 font-light leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Separador */}
        <div className="w-full h-px bg-white/8" />

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-full border border-white/8 bg-white/3 text-white/40"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Botones */}
        <div className="flex items-center gap-3 mt-auto pt-2">
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              style={{ padding: "0.3rem" }}
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-black font-medium bg-white hover:bg-white/80 rounded-full px-4 py-2 transition-all duration-200"
            >
              <Globe size={13} />
              Website
            </a>
          )}
          {project.github.map((url, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              style={{ padding: "0.3rem" }}
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-black font-medium bg-white hover:bg-white/80 rounded-full px-4 py-2 transition-all duration-200"
            >
              <FaGithub size={13} />
              {project.github.length > 1 ? (i === 0 ? "Frontend" : "Backend") : "Source"}
            </a>
          ))}
        </div>

      </div>
    </motion.div>
  );
}

export default function Projects() {
  const t = useTranslations("projects");
  const { ref, inView } = useInView();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");
  const [page, setPage] = useState(1);

  const filtered = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.categories.includes(activeCategory));

  const totalPages = Math.ceil(filtered.length / PROJECTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * PROJECTS_PER_PAGE, page * PROJECTS_PER_PAGE);

  const handleCategory = (cat: ProjectCategory | "All") => {
    setActiveCategory(cat);
    setPage(1);
  };

  return (
    <section
      ref={ref}
      style={{paddingTop:"50px"}}
      id="proyectos"
      className="relative w-full px-6 py-24 sm:py-32 flex justify-center"
    >
      <div className="w-full max-w-5xl flex flex-col gap-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col gap-3 items-center text-center"
        >
          <span className="text-xs text-white/30 tracking-widest uppercase font-mono">
            {t("label")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t("title")}
          </h2>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-wrap gap-2"
        >
          {(["All", ...CATEGORIES] as (ProjectCategory | "All")[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              style={{ padding: "0.3rem" }}
              className={`text-xs px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-white text-black border-white"
                  : "border-white/10 text-white/40 hover:text-white hover:border-white/30"
              }`}
            >
              {cat === "All" ? t("all") : cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + page}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {paginated.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Paginador */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-3"
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded-full border text-xs font-medium transition-all duration-200 cursor-pointer ${
                  page === i + 1
                    ? "bg-white text-black border-white"
                    : "border-white/10 text-white/40 hover:text-white hover:border-white/30"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}