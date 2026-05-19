"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";
import { FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

const LINKS = [
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+593 988 230 845",
    href: "https://wa.me/593988230845",
    color: "hover:border-green-500/40 hover:bg-green-500/5",
    iconColor: "group-hover:text-green-400",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "fernando-guevara-bayas",
    href: "https://www.linkedin.com/in/fernando-guevara-bayas-788981184/",
    color: "hover:border-blue-500/40 hover:bg-blue-500/5",
    iconColor: "group-hover:text-blue-400",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "ferguevara2000",
    href: "https://github.com/ferguevara2000",
    color: "hover:border-white/30 hover:bg-white/5",
    iconColor: "group-hover:text-white",
  },
  {
    icon: Mail,
    label: "Email",
    value: "fguevara4731@hotmail.com",
    href: "mailto:fguevara4731@hotmail.com",
    color: "hover:border-orange-500/40 hover:bg-orange-500/5",
    iconColor: "group-hover:text-orange-400",
  },
];

export default function Contact() {
  const t = useTranslations("contact");
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      style={{ paddingTop: "3rem" }}
      id="contacto"
      className="relative w-full px-6 py-24 sm:py-32 flex justify-center"
    >
      <div className="w-full max-w-5xl flex flex-col gap-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col gap-4 items-center text-center"
        >
          <span className="text-xs text-white/30 tracking-widest uppercase font-mono">
            {t("label")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg text-white/40 font-light max-w-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={`group flex items-center gap-5 rounded-2xl border border-white/8 bg-white/3 transition-all duration-300 cursor-pointer ${link.color}`}
              style={{ padding: "1.5rem" }}
            >
              {/* Icono */}
              <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-white/8 bg-white/5 flex-shrink-0 transition-colors duration-300">
                <link.icon
                  size={22}
                  className={`text-white/30 transition-colors duration-300 ${link.iconColor}`}
                />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-xs text-white/30 font-mono tracking-widest uppercase">
                  {link.label}
                </span>
                <span className="text-sm text-white/70 group-hover:text-white transition-colors duration-300 truncate">
                  {link.value}
                </span>
              </div>

              {/* Flecha */}
              <div className="ml-auto text-white/20 group-hover:text-white/60 transition-all duration-300 group-hover:translate-x-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}