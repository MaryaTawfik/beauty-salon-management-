"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { loginUser } from "@/lib/auth-utils";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get where the user wanted to go before being redirected
  const callbackUrl = searchParams.get('callbackUrl') || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsPending(true);

    const result = loginUser(email, password);

    if (result.success) {
      const nextUrl = callbackUrl && callbackUrl !== "/sign-in" ? callbackUrl : "/";

      router.refresh();
      setTimeout(() => {
        router.replace(nextUrl);
      }, 100); 
    } else {
      setError(result.message ?? "Invalid credentials.");
      setIsPending(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
      <div className="mb-10 text-white">
        <h2 className="text-4xl font-light italic mb-2">Welcome Back</h2>
        <p className="text-white/40 text-sm uppercase tracking-widest">Sign in to your luxury ritual</p>
      </div>

      <form className="space-y-6" onSubmit={handleLogin}>
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-xs">
            <AlertCircle size={16} /> {error}
          </motion.div>
        )}

        <div className="space-y-4">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF7A]/50 group-focus-within:text-[#D4AF7A]" size={18} />
            <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-white focus:border-[#D4AF7A] outline-none" />
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF7A]/50 group-focus-within:text-[#D4AF7A]" size={18} />
            <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-white focus:border-[#D4AF7A] outline-none" />
          </div>
        </div>

        <button type="submit" disabled={isPending} className="w-full bg-[#D4AF7A] text-black py-5 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          {isPending ? <Loader2 className="animate-spin" size={18} /> : <>Sign In <ArrowRight size={16}/></>}
        </button>
      </form>
      
      <div className="mt-8 text-center border-t border-white/5 pt-6">
        <p className="text-white/40 text-xs">
          New to the salon? <Link href="/sign-up" className="text-[#D4AF7A] underline ml-1">Create Account</Link>
        </p>
      </div>
    </motion.div>
  );
}

// Next.js 15 requires useSearchParams to be in a Suspense boundary
export default function SignInPage() {
  return (
    <Suspense fallback={<div className="text-white p-20 text-center">Loading Sanctuary...</div>}>
      <SignInForm />
    </Suspense>
  );
}