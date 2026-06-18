import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/80 border-b border-white/5 px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-serif tracking-widest text-[#D4AF7A] font-bold">
        L'ÉLITE SALON
      </div>
      
      <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wider text-gray-300">
        <Link href="#hero" className="hover:text-[#D4AF7A] transition">Home</Link>
        <Link href="#experience" className="hover:text-[#D4AF7A] transition">The Experience</Link>
        <Link href="#products" className="hover:text-[#D4AF7A] transition">Bespoke Products</Link>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-sm uppercase tracking-wider text-gray-300 hover:text-[#D4AF7A] transition">
          Login
        </button>
        <a 
          href="#payment" 
          className="bg-gradient-to-r from-[#D4AF7A] to-amber-600 hover:brightness-110 text-black font-semibold text-xs uppercase tracking-widest px-5 py-2.5 rounded shadow-lg transition"
        >
          Book Now
        </a>
      </div>
    </nav>
  );
}