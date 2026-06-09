import "./globals.css";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";

export const dinNextArabic = localFont({
  src: [
    {
      path: "../public/fonts/DINNextLTArabic-Regular-3.ttf",

    },
  ],
  variable: "--font-din-next-arabic",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", dinNextArabic.variable)}
    >
      <body className={` ${dinNextArabic.variable}`} dir="rtl">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
