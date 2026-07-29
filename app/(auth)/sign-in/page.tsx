"use client";

import React, { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { loginUser, getActiveUser } from "@/lib/auth-utils";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  // --- THE AUTO-SYNC FIX ---
  // If the user reaches this page but localStorage says they are logged in,
  // it means the cookie was just slow. Redirect them immediately.
  useEffect(() => {
    const user = getActiveUser();
    if (user && user.email) {
      router.replace(callbackUrl);
    }
  }, [router, callbackUrl]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsPending(true);

    const result = loginUser(email, password);

    if (result.success) {
      router.refresh(); // Sync server components
      setTimeout(() => {
        router.push(callbackUrl);
      }, 100); 
    } else {
      setError(result.message);
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
            <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-white focus:border-[#D4AF7A] outline-none transition-all" />
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF7A]/50 group-focus-within:text-[#D4AF7A]" size={18} />
            <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 pl-12 text-white focus:border-[#D4AF7A] outline-none transition-all" />
          </div>
        </div>

        <button type="submit" disabled={isPending} className="w-full bg-[#D4AF7A] text-black py-5 font-bold uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all">
          {isPending ? <Loader2 className="animate-spin" size={18} /> : <>Sign In <ArrowRight size={16}/></>}
        </button>
      </form>
      
      <div className="mt-8 text-center border-t border-white/5 pt-6">
        <p className="text-white/40 text-xs">
          New to the salon? <Link href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-[#D4AF7A] underline ml-1">Create Account</Link>
        </p>
      </div>
    </motion.div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#121212]" />}>
      <SignInForm />
    </Suspense>
  );
}