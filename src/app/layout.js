import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {Toaster} from "react-hot-toast";
import AppShell from "@/components/layout/AppShell";
import { ShopProvider } from "@/context/ShopContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ShopEasy",
  description: "Shop smater with ShopEasy",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><ShopProvider><AppShell>{children}</AppShell></ShopProvider> <Toaster position="top-right" /> </body>
    </html>
  );
}
