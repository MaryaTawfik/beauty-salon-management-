import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Imports - Ensure these paths match your folder structure exactly
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { CartProvider } from "@/app/context/CartContext"; 
import { ServiceProvider } from "@/app/context/ServiceContext";
import { ProductProvider } from "@/app/context/ProductContext"; // <--- ADD THIS IMPORT

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
        {/* 2. Nesting Providers: The "Power Grid" of your app */}
        <CartProvider>
          <ProductProvider> {/* <--- ADD THIS WRAPPER */}
            <ServiceProvider>
              
              <Navbar />

              <main className="flex-grow">
                {children}
              </main>

              <Footer />
              
            </ServiceProvider>
          </ProductProvider>
        </CartProvider>
      </body>
    </html>
  );
}