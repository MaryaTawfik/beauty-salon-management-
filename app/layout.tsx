import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar"; // Adjusted path to your components
import Footer from "@/app/components/Footer"; // Adjusted path to your components
import { CartProvider } from "@/app/context/CartContext"; 
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Salon | Luxury Beauty Rituals",
  description: "Experience the epitome of Ethiopian beauty artistry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#121212] text-white min-h-screen flex flex-col`}
      >
        <CartProvider>
        {/* Global Navigation */}
        <Navbar />

        {/* Dynamic Page Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
        </CartProvider>
      </body>
    </html>
  );
}