import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import Logo from "@/components/layout/Logo";
import SmoothScroll from "@/components/layout/SmoothScroll";

export const metadata: Metadata = {
  title: "Mi portafolio",
  description: "Fullstack Developer",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <Logo />
            <LanguageSwitcher />
            {children}
            <Navbar />
            </SmoothScroll>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}