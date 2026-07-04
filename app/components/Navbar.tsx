"use client";

import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Stylists", href: "/#experience" },
  { name: "Booking", href: "/#payment" },
  { name: "Profile", href: "/profile" },
  { name: "Favorites", href: "/profile/favorites" },
  { name: "Orders", href: "/profile/orders" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] w-full bg-[#121212]/90 backdrop-blur-md border-b border-white/5 px-4 md:px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <Link
          href="/"
          className="text-xl font-serif tracking-widest text-white hover:text-[#D4AF7A] transition"
        >
          L&apos;ÉLITE SALON
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[10px] md:text-xs uppercase tracking-wider text-gray-300 hover:text-[#D4AF7A] transition"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/#payment"
            className="bg-gradient-to-r from-[#D4AF7A] to-amber-600 hover:brightness-110 text-black text-[10px] md:text-xs font-bold uppercase tracking-widest px-4 py-2 rounded transition-all duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}