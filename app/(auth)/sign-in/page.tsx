"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { loginUser } from "@/lib/auth-utils"; // Ensure this matches your utility file path

export default function SignInPage() {
  const router = useRouter();

  // 1. STATE: Form inputs and error handling
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // 2. LOGIC: Validate credentials against localStorage
    const result = loginUser(email, password);

    if (result.success) {
      // 3. REFRESH: Re-validate middleware and server components
      router.refresh();
      
      // 4. REDIRECT: Logic for Admin vs Regular User
      if (result.user.role === 'admin') {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    } else {
      // 5. ERROR: Show a luxury-styled error message
      setError(result.message);
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
        <p className="text-white/40 text-sm font-light uppercase tracking-widest">Sign in to your private profile</p>
      </div>

      <form className="space-y-6" onSubmit={handleLogin}>
        {/* Error Feedback */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-xs uppercase tracking-widest"
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}

        <div className="space-y-4">
          {/* Email Input */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF7A]/50 group-focus-within:text-[#D4AF7A] transition-colors" size={18} />
            <input 
              required 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#D4AF7A] transition-all" 
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-[#D4AF7A] text-black py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 flex items-center justify-center gap-2 shadow-lg"
        >
          Sign In <ArrowRight size={16} />
        </button>
      </form>
      
      {/* THE REDIRECT LINK: For users who don't have an account */}
      <div className="mt-10 text-center border-t border-white/5 pt-8">
        <p className="text-white/40 text-xs font-light uppercase tracking-widest">
          New to the sanctuary?{" "}
          <Link 
            href="/sign-up" 
            className="text-[#D4AF7A] font-bold hover:text-white transition-colors ml-1 underline underline-offset-4 decoration-[#D4AF7A]/30"
          >
            Create an Account
          </Link>
        </p>
      </div>

      {/* Admin Quick-Start Tip (Remove for Production) */}
      <div className="mt-12 p-4 bg-white/[0.02] border border-dashed border-white/10 text-center">
        <p className="text-white/20 text-[9px] uppercase tracking-widest mb-1">Testing Admin Access</p>
        <p className="text-[#D4AF7A]/60 text-[10px] italic">admin@thesalon.com • admin123</p>
      </div>
    </motion.div>
  );
}