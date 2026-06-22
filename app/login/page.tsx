"use client"
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-zinc-900 border border-white/5 p-8 rounded-lg space-y-6"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif text-[#D4AF7A]">L'ÉLITE SALON</h1>
          <p className="text-gray-400 text-sm font-light">Welcome back to pure elegance</p>
        </div>
        
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
            <input type="email" className="w-full bg-black border border-white/10 rounded px-4 py-3 text-sm focus:border-[#D4AF7A] outline-none transition" placeholder="name@example.com" />
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-widest mb-2">Password</label>
            <input type="password" className="w-full bg-black border border-white/10 rounded px-4 py-3 text-sm focus:border-[#D4AF7A] outline-none transition" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-[#D4AF7A] to-amber-600 text-black text-xs font-bold uppercase tracking-widest py-4 rounded shadow-lg hover:brightness-110 transition">
            Sign In
          </button>
        </form>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-gray-500 hover:text-[#D4AF7A] transition">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}