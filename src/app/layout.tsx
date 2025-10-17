import { Viewport } from "next";
import { Montserrat } from "next/font/google";

import { RootProviders } from "@/components/providers";
import { generateMetaData, RootHeader } from "@/components/home/seo";

import "@/styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#60a5fa" },
  ],
};

export const metadata = await generateMetaData();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <RootHeader />
      <body className={`${montserrat.className}`}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
