import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="bazardor" suppressHydrationWarning>
      <body
        className={`${hind.variable} min-h-screen bg-canvas font-sans font-light text-ink`}
        suppressHydrationWarning
      >
        <Header />
        <Ticker />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}