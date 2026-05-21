"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routing } from "@/routing";
import { motion } from "framer-motion";
import { ES, US } from "country-flag-icons/react/3x2";

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

  const LANGS = [
    { code: "es", Flag: ES },
    { code: "en", Flag: US },
  ];

  return (
    <div className="flex items-center gap-3" style={{ position: "absolute", top: "1.5rem", right: "1.5rem", zIndex: 9999 }}>
      {LANGS.map(({ code, Flag }, i) => (
        <div key={code} className="flex items-center gap-3">
          {i !== 0 && (
            <span className="text-white/15 text-xs select-none">|</span>
          )}
          <Link href={getLocalePath(code)} scroll={false}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="cursor-pointer transition-all duration-300"
              style={{ opacity: locale === code ? 1 : 0.3 }}
            >
              <Flag className="w-6 h-4 rounded-sm" />
            </motion.div>
          </Link>
        </div>
      ))}
    </div>
  );
}