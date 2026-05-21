import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Footer from "@/components/layout/Footer";
import FixedUI from "@/components/layout/FixedUI";

export const metadata: Metadata = {
  title: "Fernando Guevara Portfolio",
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
          <FixedUI />
          <SmoothScroll>
            {children}
            <Footer />
            <Navbar />
            </SmoothScroll>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}