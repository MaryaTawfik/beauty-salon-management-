"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { User, Mail, Lock, Phone, ArrowRight } from "lucide-react";
import { registerUser } from "@/lib/auth-utils";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const result = registerUser(form);
    if (result.success) {
      router.push("/sign-in");
    } else {
      setError(result.message);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
      <div className="mb-10">
        <h2 className="text-white text-4xl font-light italic mb-2">Join Us</h2>
        <p className="text-white/40 text-sm font-light uppercase tracking-widest">Create your luxury profile</p>
      </div>

      <form className="space-y-4" onSubmit={handleRegister}>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF7A]/50" size={18} />
          <input required type="text" placeholder="Full Name" onChange={(e) => setForm({...form, fullName: e.target.value})} className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:border-[#D4AF7A] outline-none transition-all" />
        </div>
        <div className="relative group">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF7A]/50" size={18} />
          <input required type="tel" placeholder="Phone Number" onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:border-[#D4AF7A] outline-none transition-all" />
        </div>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF7A]/50" size={18} />
          <input required type="email" placeholder="Email Address" onChange={(e) => setForm({...form, email: e.target.value})} className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:border-[#D4AF7A] outline-none transition-all" />
        </div>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF7A]/50" size={18} />
          <input required type="password" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})} className="w-full bg-white/5 border border-white/10 py-4 pl-12 pr-4 text-white focus:border-[#D4AF7A] outline-none transition-all" />
        </div>

        <button type="submit" className="w-full bg-[#D4AF7A] text-black py-5 font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 flex items-center justify-center gap-2 mt-4">
          Create Account <ArrowRight size={16} />
        </button>
      </form>
      <p className="text-white/40 text-xs text-center mt-8 uppercase tracking-widest">
        Already a member? <Link href="/sign-in" className="text-[#D4AF7A] font-bold hover:underline">Log In</Link>
      </p>
    </motion.div>
  );
}