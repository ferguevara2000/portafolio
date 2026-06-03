"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Home, FolderKanban, NotebookPen, Mail, Menu, X } from "lucide-react";
import { FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { smoothScrollTo } from "@/lib/smoothScrool";

type NavItem = {
  icon: React.ElementType;
  key: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { icon: Home, key: "home", href: "#home" },
  { icon: FolderKanban, key: "projects", href: "#proyectos" },
  { icon: NotebookPen, key: "blog", href: "#blog" },
];

const SOCIAL_ITEMS: NavItem[] = [
  { icon: FaGithub, key: "github", href: "https://github.com/ferguevara2000" },
  { icon: FaWhatsapp, key: "whatsapp", href: "https://wa.me/+593988230845" },
  { icon: FaLinkedin, key: "linkedin", href: "https://linkedin.com/in/fernando-guevara-bayas-788981184" },
  { icon: Mail, key: "email", href: "mailto:fguevara4731@hotmail.com" },
];

// ————— Versión desktop —————
function NavIcon({
  icon: Icon,
  label,
  href,
  mouseX,
  navHovered,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  navHovered: boolean;
}) {
  const handleClick = (e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      smoothScrollTo(href.slice(1));
    }
  };
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
        onClick={handleClick}
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
          <Icon size={22} />
        </span>
      </motion.a>
    </div>
  );
}

// ————— Versión móvil —————
function MobileNav({ t }: { t: (key: string) => string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-14 h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/60 hover:text-white transition-colors duration-200"
        aria-label="Menu"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Menu expandido */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-md p-4 flex flex-col gap-1 w-52"
          >
            <p className="text-white/20 text-xs font-mono tracking-widest uppercase px-2 pb-2">
              Navegación
            </p>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith("#")) {
                    e.preventDefault();
                    smoothScrollTo(item.href.slice(1));
                  }
                  setOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <item.icon size={16} />
                <span className="text-sm">{t(item.key)}</span>
              </a>
            ))}

            <div className="w-full h-px bg-white/10 my-1" />

            <p className="text-white/20 text-xs font-mono tracking-widest uppercase px-2 pb-1">
              Social
            </p>
            {SOCIAL_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <item.icon size={16} />
                <span className="text-sm">{t(item.key)}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ————— Componente principal —————
export default function Navbar() {
  const t = useTranslations("nav");
  const [navHovered, setNavHovered] = useState(false);
  const [ready, setReady] = useState(false);
  const mouseX = useMotionValue(-9999);

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center">

      {/* Desktop */}
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          paddingLeft: navHovered ? "2.5rem" : "1.5rem",
          paddingRight: navHovered ? "2.5rem" : "1.5rem",
          gap: navHovered ? "0.75rem" : "0.25rem",
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseEnter={() => { setReady(true); setNavHovered(true); }}
        onMouseLeave={() => { mouseX.set(-9999); setNavHovered(false); }}
        className="hidden sm:flex items-center py-5 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md"
      >
        {NAV_ITEMS.map((item) => (
          <NavIcon key={item.key} label={t(item.key)} href={item.href} icon={item.icon} mouseX={mouseX} navHovered={navHovered && ready} />
        ))}
        <div className="w-px h-7 bg-white/10 mx-4" />
        {SOCIAL_ITEMS.map((item) => (
          <NavIcon key={item.key} label={t(item.key)} href={item.href} icon={item.icon} mouseX={mouseX} navHovered={navHovered && ready} />
        ))}
      </motion.nav>

      {/* Móvil */}
      <div className="relative flex sm:hidden">
        <MobileNav t={t} />
      </div>

    </div>
  );
}