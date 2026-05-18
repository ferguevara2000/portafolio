"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Home, FolderKanban, NotebookPen, Mail } from "lucide-react";
import { FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

const NAV_ITEMS = [
  { icon: Home, key: "home", href: "#home" },
  { icon: FolderKanban, key: "projects", href: "#proyectos" },
  { icon: NotebookPen, key: "blog", href: "#blog" },
];

const SOCIAL_ITEMS = [
  { icon: FaGithub, key: "github", href: "https://github.com/ferguevara2000" },
  { icon: FaWhatsapp, key: "whatsapp", href: "https://wa.me/593988230845" },
  { icon: FaLinkedin, key: "linkedin", href: "https://linkedin.com/in/fernando-guevara-bayas-788981184" },
  { icon: Mail, key: "email", href: "mailto:fguevara4731@outlook.com" },
];

function NavIcon({
  icon: Icon,
  label,
  href,
  mouseX,
  navHovered
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  navHovered: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return 0;
    return val - (bounds.left + bounds.width / 2);
  });

  const scale = useTransform(distance, [-40, 0, 40], [1, 1.35, 1]);
  const translateY = useTransform(distance, [-40, 0, 40], [0, -8, 0]);

  const springScale = useSpring(1, { stiffness: 300, damping: 22 });
  const springY = useSpring(0, { stiffness: 300, damping: 22 });

  useEffect(() => {
    if (!navHovered) {
      springScale.set(1);
      springY.set(0);
      return;
    }
    const unsubScale = scale.on("change", (v) => springScale.set(v));
    const unsubY = translateY.on("change", (v) => springY.set(v));
    return () => {
      unsubScale();
      unsubY();
    };
  }, [navHovered, scale, translateY, springScale, springY]);

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            style={{ minWidth: "80px", minHeight: "36px" }}
            className="absolute -top-14 left-1/2 -translate-x-1/2 rounded-lg bg-white text-xs font-medium text-black flex items-center justify-center"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        style={{ scale: springScale, y: springY }}
        className="relative flex items-center justify-center w-11 h-11 cursor-pointer text-white/40 hover:text-white transition-colors duration-200"
        aria-label={label}
      >
        <AnimatePresence>
          {hovered && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-1 rounded-full bg-white/8 border border-white/10"
            />
          )}
        </AnimatePresence>
        <span className="relative z-10">
          <Icon size={18} />
        </span>
      </motion.a>
    </div>
  );
}

export default function Navbar() {
  const t = useTranslations("nav");
  const [navHovered, setNavHovered] = useState(false);
  const [ready, setReady] = useState(false);
  const mouseX = useMotionValue(-9999);

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center">
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          paddingLeft: navHovered ? "1rem" : "0.5rem",
          paddingRight: navHovered ? "1rem" : "0.5rem",
          gap: navHovered ? "0.75rem" : "0.25rem",
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseEnter={() => {
          setReady(true);
          setNavHovered(true);
        }}
        onMouseLeave={() => {
          mouseX.set(-9999);
          setNavHovered(false);
        }}
        className="flex items-center py-5 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md"
      >
        {NAV_ITEMS.map((item) => (
          <NavIcon key={item.key} label={t(item.key)} href={item.href} icon={item.icon} mouseX={mouseX} navHovered={navHovered && ready} />
        ))}

        <div className="w-px h-7 bg-white/10 mx-4" />

        {SOCIAL_ITEMS.map((item) => (
          <NavIcon key={item.key} label={t(item.key)} href={item.href} icon={item.icon} mouseX={mouseX} navHovered={navHovered && ready} />
        ))}
      </motion.nav>
    </div>
  );
}