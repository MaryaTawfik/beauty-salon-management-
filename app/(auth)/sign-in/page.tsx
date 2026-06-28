"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();

  // 1. STATE: Track what the user is typing
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 2. LOGIC: Determine the role
    // We check if the typed email is exactly the admin email
    const role = email === 'admin@thesalon.com' ? 'admin' : 'user';

    // 3. COOKIES: Set mock cookies (Middleware will read these)
    document.cookie = "isLoggedIn=true; path=/; max-age=86400"; 
    document.cookie = `role=${role}; path=/; max-age=86400`;

    // 4. REFRESH: Tell Next.js to re-validate the server components and middleware
    router.refresh();
    
    // 5. REDIRECT: Send to Admin Dashboard or Home based on role
    if (role === 'admin') {
      router.push("/admin");
    } else {
      router.push("/");
    }
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
          
          {/* Email Input */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF7A]/50 group-focus-within:text-[#D4AF7A] transition-colors" size={18} />
            <input 
              required 
              type="email" 
              placeholder="Email Address" 
              value={email} // Connect to state
              onChange={(e) => setEmail(e.target.value)} // Update state
              className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#D4AF7A] transition-all" 
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF7A]/50 group-focus-within:text-[#D4AF7A] transition-colors" size={18} />
            <input 
              required 
              type="password" 
              placeholder="Password" 
              value={password} // Connect to state
              onChange={(e) => setPassword(e.target.value)} // Update state
              className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#D4AF7A] transition-all" 
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-[#D4AF7A] text-black py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 flex items-center justify-center gap-2 shadow-lg active:scale-95"
        >
          Sign In <ArrowRight size={16} />
        </button>
      </form>
      
      <p className="text-white/40 text-xs text-center mt-8 uppercase tracking-widest font-light">
        New to the salon? <Link href="/sign-up" className="text-[#D4AF7A] font-bold hover:underline">Register Now</Link>
      </p>
      
      {/* Dev Tip: Show user the secret login for Admin */}
      <div className="mt-12 p-4 border border-white/5 bg-white/[0.02] text-center">
        <p className="text-white/20 text-[9px] uppercase tracking-widest">Dev Admin Access</p>
        <p className="text-white/40 text-[10px]">Email: admin@thesalon.com</p>
      </div>
    </motion.div>
  );
}