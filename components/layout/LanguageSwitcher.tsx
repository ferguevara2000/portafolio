"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routing } from "@/routing";
import { motion } from "framer-motion";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const getLocalePath = (newLocale: string) => {
    const segments = pathname.split("/");
    if (routing.locales.includes(segments[1] as "es" | "en")) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    return segments.join("/") || "/";
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
      {["es", "en"].map((lang, i) => (
        <div key={lang} className="flex items-center gap-3">
          {i !== 0 && (
            <span className="text-white/15 text-xs select-none">|</span>
          )}
          <Link href={getLocalePath(lang)} scroll={false}>
            <motion.span
              whileHover={{ opacity: 1 }}
              className="text-xs font-mono tracking-widest cursor-pointer transition-all duration-300"
              style={{
                color: locale === lang ? "#ffffff" : "rgba(255,255,255,0.2)",
                fontWeight: locale === lang ? 500 : 400,
              }}
            >
              {lang.toUpperCase()}
            </motion.span>
          </Link>
        </div>
      ))}
    </div>
  );
}