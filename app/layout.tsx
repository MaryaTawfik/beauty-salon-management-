import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { CartProvider } from "@/app/context/CartContext"; 
import { ServiceProvider } from "@/app/context/ServiceContext";
import { ProductProvider } from "@/app/context/ProductContext";
import { BookingProvider } from "@/app/context/BookingContext"; // ADDED
import { ChatProvider } from "./context/ChatContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Salon | Luxury Beauty Rituals",
  description: "Experience the epitome of Ethiopian beauty artistry.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className="scroll-smooth h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#121212] text-white min-h-screen flex flex-col`}>
        <CartProvider>
          <ProductProvider>
            <ServiceProvider>
              <BookingProvider> {/* WRAP EVERYTHING */}
                <ChatProvider>
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
                </ChatProvider>
              </BookingProvider>
            </ServiceProvider>
          </ProductProvider>
        </CartProvider>
      </body>
    </html>
  );
}