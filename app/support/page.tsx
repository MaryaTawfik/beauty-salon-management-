"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Headset, ChevronDown, Calendar, Gift, Tag, Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SupportPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Ref for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Ref for the anchor at the bottom of messages
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Initial Load & Persistence
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('salon_chat');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([{
        id: 'init',
        text: "Welcome to L'ÉLITE. I am your digital concierge. How may I assist you today?",
        sender: 'salon',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  }, []);

  // 2. AUTO-SCROLL LOGIC
  // This triggers every time the messages array updates
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('salon_chat', JSON.stringify(messages));
      
      // Smooth scroll to the bottom anchor
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isMounted, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    
    setIsTyping(true);
    setTimeout(() => {
      const salonMsg = {
        id: (Date.now() + 1).toString(),
        text: "Our concierge team has been notified. We will respond to your request shortly.",
        sender: 'salon',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, salonMsg]);
      setIsTyping(false);
    }, 2000);
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-[#121212] pt-24 pb-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 h-[80vh]">
        
        {/* LEFT COLUMN: FAQ (Remains the same) */}
        <div className="hidden lg:block space-y-8 overflow-y-auto pr-4 custom-scrollbar">
           <h1 className="text-3xl font-light italic text-white tracking-tight">Concierge</h1>
           {/* ... FAQ content ... */}
        </div>

        {/* RIGHT COLUMN: RE-ARCHITECTED CHAT INTERFACE */}
        <div className="lg:col-span-2 flex flex-col bg-[#1a1a1a] border border-white/5 relative overflow-hidden shadow-2xl">
          
          {/* A. FIXED HEADER (flex-shrink-0) */}
          <div className="flex-shrink-0 p-5 border-b border-white/5 bg-[#1a1a1a] z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#D4AF7A]/10 flex items-center justify-center text-[#D4AF7A]">
                  <Headset size={20} />
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#1a1a1a] rounded-full" />
              </div>
              <div>
                <h3 className="text-white text-sm font-medium">L'ÉLITE Support</h3>
                <p className="text-[9px] text-green-500 uppercase tracking-[0.2em] font-bold">Always Online</p>
              </div>
            </div>
          </div>

          {/* B. SCROLLABLE MESSAGE LIST (flex-1) */}
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#121212]/30"
          >
            {messages.map((m) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={m.id} 
                className={cn("flex w-full", m.sender === 'user' ? "justify-end" : "justify-start")}
              >
                <div className={cn(
                  "max-w-[85%] md:max-w-[70%] p-4 shadow-xl",
                  m.sender === 'user' 
                    ? "bg-[#D4AF7A] text-[#121212] rounded-l-2xl rounded-tr-2xl" 
                    : "bg-white/5 text-white/90 rounded-r-2xl rounded-tl-2xl border border-white/5"
                )}>
                  <p className="text-sm font-light leading-relaxed">{m.text}</p>
                  <p className="text-[8px] uppercase mt-2 opacity-50 text-right font-bold tracking-tighter">
                    {m.timestamp}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-2xl flex gap-1.5">
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-[#D4AF7A] rounded-full" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-[#D4AF7A] rounded-full" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-[#D4AF7A] rounded-full" />
                </div>
              </div>
            )}

            {/* This is the invisible anchor that the auto-scroll targets */}
            <div ref={messagesEndRef} className="h-2" />
          </div>

          {/* C. FIXED FOOTER INPUT (flex-shrink-0) */}
          <div className="flex-shrink-0 p-4 bg-[#1a1a1a] border-t border-white/5">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }}
              className="flex gap-3 bg-white/5 p-2 border border-white/10 focus-within:border-[#D4AF7A]/50 transition-all"
            >
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent border-none py-3 px-4 text-sm text-white placeholder:text-white/20 outline-none"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="bg-[#D4AF7A] text-[#121212] px-5 flex items-center justify-center transition-all hover:bg-white disabled:opacity-30 disabled:grayscale"
              >
                <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}