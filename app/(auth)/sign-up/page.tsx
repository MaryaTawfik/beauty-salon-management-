"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { User, Mail, Lock, Phone, ArrowRight } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    document.cookie = "isLoggedIn=true; path=/; max-age=86400"; 
    router.refresh();
    router.push("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-10">
        <h2 className="text-white text-4xl font-light italic tracking-tight mb-2">Join Us</h2>
        <p className="text-white/40 text-sm font-light uppercase tracking-widest">Create your luxury profile</p>
      </div>

      <form className="space-y-4" onSubmit={handleRegister}>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF7A]/50 group-focus-within:text-[#D4AF7A]" size={18} />
          <input required type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#D4AF7A] transition-all" />
        </div>
        <div className="relative group">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF7A]/50 group-focus-within:text-[#D4AF7A]" size={18} />
          <input required type="tel" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#D4AF7A] transition-all" />
        </div>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF7A]/50 group-focus-within:text-[#D4AF7A]" size={18} />
          <input required type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#D4AF7A] transition-all" />
        </div>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF7A]/50 group-focus-within:text-[#D4AF7A]" size={18} />
          <input required type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#D4AF7A] transition-all" />
        </div>

        <button type="submit" className="w-full bg-[#D4AF7A] text-black py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 flex items-center justify-center gap-2 mt-4">
          Create Account <ArrowRight size={16} />
        </button>
      </form>
      
      <p className="text-white/40 text-xs text-center mt-8 uppercase tracking-widest">
        Already a member? <Link href="/sign-in" className="text-[#D4AF7A] font-bold hover:underline">Log In</Link>
      </p>
    </motion.div>
  );
}  