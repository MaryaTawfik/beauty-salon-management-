"use client"
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] w-full bg-[#121212]/90 backdrop-blur-md border-b border-white/5 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link href="/" className="text-xl font-serif tracking-widest text-white hover:text-[#D4AF7A] transition">
          L'ÉLITE SALON
        </Link>

        {/* Navigation Options Links */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xs uppercase tracking-wider text-gray-300 hover:text-[#D4AF7A] transition">
            Home
          </Link>
          
          {/* TEAMMATE'S SERVICES SUBPAGE LINK */}
          <a href="#services" className="text-xs uppercase tracking-wider text-gray-300 hover:text-[#D4AF7A] transition">
            Services
          </a>

          <a href="#products" className="text-xs uppercase tracking-wider text-gray-300 hover:text-[#D4AF7A] transition">
            Products
          </a>
          
          {/* YOUR LOGIN ROUTE LINK */}
          <Link 
            href="/login" 
            className="text-xs uppercase tracking-wider text-gray-300 hover:text-[#D4AF7A] transition"
          >
            Login
          </Link>

          {/* Book Appointment Call To Action */}
          <a
            href="#payment"
            className="bg-gradient-to-r from-[#D4AF7A] to-amber-600 hover:brightness-110 text-black text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded transition-all duration-300"
          >
            Book Now
          </a>
        </div>

      </div>
    </nav>
  );
}