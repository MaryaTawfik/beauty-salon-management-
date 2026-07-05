"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Headset, Trash2 } from 'lucide-react';
import { useChat } from '@/app/context/ChatContext';
import { getActiveUser } from '@/lib/auth-utils';
import { cn } from '@/lib/utils';

export default function ChatPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { allMessages, sendMessage, markAsUserRead, clearChat, isMounted } = useChat();
  const [input, setInput] = useState("");
  const user = getActiveUser();
  const endRef = useRef<HTMLDivElement>(null);

  // --- THE CRITICAL FIX: HISTORY FILTER ---
  // Show messages I sent to admin OR messages admin sent to me
  const myChat = allMessages.filter(m => 
    (m.senderEmail === user?.email && m.receiverEmail === 'admin') || 
    (m.senderEmail === 'admin' && m.receiverEmail === user?.email)
  );

  // Auto-scroll to latest message and mark as read
  useEffect(() => {
    if (isOpen && user?.email) {
      markAsUserRead(user.email);
      // Timeout ensures the DOM has rendered the new messages before scrolling
      setTimeout(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [isOpen, myChat.length]);

  if (!isMounted || !user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 right-6 md:right-10 w-[90vw] md:w-[400px] h-[550px] bg-[#1a1a1a] border border-[#D4AF7A]/30 shadow-2xl z-[500] flex flex-col overflow-hidden"
        >
          {/* Header Area */}
          <div className="p-5 border-b border-white/5 bg-[#121212] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#D4AF7A]/10 flex items-center justify-center text-[#D4AF7A]">
                  <Headset size={20} />
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#121212]" />
              </div>
              <div>
                <h3 className="text-white text-sm font-medium italic">Digital Concierge</h3>
                <p className="text-[9px] text-green-500 uppercase tracking-widest font-bold">Always Active</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => { if(confirm("Wipe history?")) clearChat(user.email); }} className="p-2 text-white/10 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
              <button onClick={onClose} className="p-2 text-white/20 hover:text-white"><X size={20}/></button>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#121212]/40 custom-scrollbar">
            {/* Welcome Greeting */}
            <div className="flex justify-start">
              <div className="max-w-[85%] p-4 bg-white/5 border border-white/10 rounded-tr-2xl rounded-br-2xl text-white/80 text-[11px] leading-relaxed">
                Welcome to L'ÉLITE. We are here to guide your beauty journey. How may we assist you?
              </div>
            </div>

            {/* Historic & New Messages */}
            {myChat.map((m) => (
              <div key={m.id} className={cn("flex w-full", m.senderEmail === user.email ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-[80%] p-3 text-[11px] shadow-lg",
                  m.senderEmail === user.email 
                    ? "bg-[#D4AF7A] text-[#121212] rounded-tl-xl rounded-bl-xl rounded-tr-sm font-medium" 
                    : "bg-white/5 text-white/90 border border-white/5 rounded-tr-xl rounded-br-xl rounded-tl-sm font-light"
                )}>
                  <p>{m.text}</p>
                  <span className="text-[7px] mt-1 block opacity-40 uppercase text-right">{m.timestamp}</span>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Footer Input */}
          <form 
            onSubmit={(e) => { e.preventDefault(); if(input.trim()){ sendMessage(input, 'admin'); setInput(""); } }}
            className="p-4 bg-[#121212] border-t border-white/5 flex gap-2"
          >
            <input 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Your inquiry..."
              className="flex-1 bg-white/5 border border-white/10 p-3 text-xs text-white outline-none focus:border-[#D4AF7A] transition-all"
            />
            <button className="bg-[#D4AF7A] text-black px-4 flex items-center justify-center hover:bg-white transition-colors">
              <Send size={16} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}