"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set mock cookie (expires in 1 day)
    document.cookie = "isLoggedIn=true; path=/; max-age=86400"; 
    
    // Tell Next.js to re-validate the middleware/server components
    router.refresh();
    
    // Send user to home or they can now click services
    router.push("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-10">
        <h2 className="text-white text-4xl font-light italic tracking-tight mb-2">Welcome Back</h2>
        <p className="text-white/40 text-sm font-light uppercase tracking-widest">Sign in to explore our services</p>
      </div>

      <form className="space-y-6" onSubmit={handleLogin}>
        <div className="space-y-4">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF7A]/50 group-focus-within:text-[#D4AF7A] transition-colors" size={18} />
            <input 
              required 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#D4AF7A] transition-all" 
            />
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF7A]/50 group-focus-within:text-[#D4AF7A] transition-colors" size={18} />
            <input 
              required 
              type="password" 
              placeholder="Password" 
              className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#D4AF7A] transition-all" 
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-[#D4AF7A] text-black py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 flex items-center justify-center gap-2"
        >
          Sign In <ArrowRight size={16} />
        </button>
      </form>
      
      <p className="text-white/40 text-xs text-center mt-8 uppercase tracking-widest">
        New to the salon? <Link href="/sign-up" className="text-[#D4AF7A] font-bold hover:underline">Register Now</Link>
      </p>
    </motion.div>
  );
}