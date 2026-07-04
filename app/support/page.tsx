"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '@/app/context/ChatContext';
import { getActiveUser } from '@/lib/auth-utils';
import { Send, Headset } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function UserSupport() {
  const { allMessages, sendMessage, markAsUserRead, isMounted } = useChat();
  const [input, setInput] = useState("");
  const user = getActiveUser();
  const router = useRouter();
  const endRef = useRef<HTMLDivElement>(null);

  const myChat = allMessages.filter(m => 
    m.senderEmail === user?.email || m.receiverEmail === user?.email
  );

  // 1. CLEAR NOTIFICATION logic: Runs when user looks at the page
  useEffect(() => {
    if (user?.email) {
      markAsUserRead(user.email);
    }
  }, [allMessages.length, user?.email]);

  useEffect(() => {
    if (!user) router.push('/sign-in');
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [myChat]);

  if (!isMounted || !user) return null;

  return (
    <main className="min-h-screen bg-[#121212] pt-24 pb-10 px-4">
      <div className="max-w-4xl mx-auto flex flex-col h-[85vh] bg-[#1a1a1a] border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-[#121212] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#D4AF7A]/10 flex items-center justify-center text-[#D4AF7A] shadow-[0_0_15px_rgba(212,175,122,0.1)]">
              <Headset size={20} />
            </div>
            <div>
              <h2 className="text-white font-light italic text-xl tracking-tight">L'ÉLITE Concierge</h2>
              <p className="text-[9px] text-green-500 uppercase font-bold tracking-widest">Active Support Session</p>
            </div>
          </div>
        </div>

        {/* Message Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#121212]/40">
          
          {/* 2. PERMANENT PROFESSIONAL GREETING */}
          <div className="flex justify-start">
            <div className="max-w-[85%] p-6 bg-white/5 border border-white/10 rounded-tr-2xl rounded-br-2xl text-white/90 shadow-lg">
              <p className="text-sm font-light leading-relaxed">
                Hello! 👋 <span className="text-[#D4AF7A] font-medium">Welcome to our salon.</span><br/><br/>
                Thank you for visiting us. How can we help you today? Feel free to send us any questions, concerns, or feedback, and our team will be happy to assist you.
              </p>
              <p className="text-[8px] mt-4 opacity-30 uppercase font-black tracking-tighter text-[#D4AF7A]">System Greeting • Connected</p>
            </div>
          </div>

          {myChat.map((m) => (
            <div key={m.id} className={cn("flex w-full", m.senderEmail === user.email ? "justify-end" : "justify-start animate-in fade-in slide-in-from-left-2")}>
              <div className={cn("max-w-[75%] p-4 text-sm shadow-2xl transition-all", 
                m.senderEmail === user.email 
                  ? "bg-[#D4AF7A] text-[#121212] rounded-tl-2xl rounded-bl-2xl rounded-tr-sm font-medium" 
                  : "bg-white/5 text-white/80 border border-white/10 rounded-tr-2xl rounded-br-2xl rounded-tl-sm font-light")}>
                <p className="leading-relaxed">{m.text}</p>
                <p className="text-[8px] mt-2 opacity-40 font-bold uppercase tracking-tighter">
                  {m.timestamp === 'System' ? 'Instant Confirmation' : m.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); if(input.trim()){ sendMessage(input, 'admin'); setInput(""); } }} className="p-5 bg-[#121212] border-t border-white/5 flex gap-4">
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder="Compose message to concierge..." 
            className="flex-1 bg-white/5 border border-white/10 p-4 text-sm text-white outline-none focus:border-[#D4AF7A] transition-all" 
          />
          <button className="bg-[#D4AF7A] text-black px-8 hover:bg-white transition-all duration-500 flex items-center justify-center group active:scale-95 shadow-lg">
            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </form>
      </div>
    </main>
  );
}