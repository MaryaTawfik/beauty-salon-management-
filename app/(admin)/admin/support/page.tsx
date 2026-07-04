"use client";

import React, { useState } from 'react';
import { useChat } from '@/app/context/ChatContext';
import { User, MessageCircle, Send, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminSupport() {
  // 1. FIX: Destructure 'markAsAdminRead' instead of 'markAsRead'
  const { allMessages, sendMessage, markAsAdminRead, isMounted } = useChat();
  
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  // Get unique list of users who sent messages
  const threads = Array.from(new Set(
    allMessages.filter(m => m.senderEmail !== 'admin').map(m => m.senderEmail)
  ));

  const handleSelectUser = (email: string) => {
    setSelectedUser(email);
    // 2. FIX: Call 'markAsAdminRead' here
    markAsAdminRead(email); 
  };

  const activeChat = allMessages.filter(m => 
    m.senderEmail === selectedUser || m.receiverEmail === selectedUser
  );

  if(!isMounted) return null;

  return (
    <div className="mt-10 flex h-[80vh] border border-white/5 bg-[#121212] shadow-2xl">
      {/* Sidebar: List of Users */}
      <div className="w-80 border-r border-white/5 flex flex-col bg-[#0a0a0a]">
        <div className="p-6 border-b border-white/5 text-[#D4AF7A] text-[10px] uppercase font-bold tracking-[0.3em]">
          Active Conversations
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {threads.map(email => {
            // Check if this specific thread has unread messages for admin
            const isUnread = allMessages.some(m => m.senderEmail === email && !m.isAdminRead);
            
            return (
              <button 
                key={email} 
                onClick={() => handleSelectUser(email)}
                className={cn(
                  "w-full p-6 text-left border-b border-white/5 transition-all flex items-center justify-between group", 
                  selectedUser === email ? "bg-[#D4AF7A]/10 border-r-2 border-r-[#D4AF7A]" : "hover:bg-white/5"
                )}
              >
                <div>
                  <p className="text-white text-sm font-medium truncate w-48">{email}</p>
                  <p className="text-white/20 text-[9px] uppercase mt-1">
                    {isUnread ? "New Message" : "View History"}
                  </p>
                </div>
                {isUnread && (
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="p-6 border-b border-white/5 bg-[#121212] flex justify-between items-center">
              <h3 className="text-white font-light italic">
                Chatting with: <span className="text-[#D4AF7A] font-medium">{selectedUser}</span>
              </h3>
              <CheckCheck className="text-white/10" size={18} />
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-4 bg-black/20 custom-scrollbar">
              {activeChat.map(m => (
                <div key={m.id} className={cn("flex w-full", m.senderEmail === 'admin' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "p-4 text-sm max-w-[70%] shadow-lg", 
                    m.senderEmail === 'admin' 
                      ? "bg-white text-black rounded-tl-xl rounded-bl-xl rounded-tr-sm" 
                      : "bg-white/5 text-white/80 border border-white/10 rounded-tr-xl rounded-br-xl rounded-tl-sm"
                  )}>
                    <p className="leading-relaxed">{m.text}</p>
                    <p className="text-[8px] mt-2 opacity-50 font-bold uppercase">{m.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                if(reply.trim()) {
                  sendMessage(reply, selectedUser); 
                  setReply(""); 
                }
              }} 
              className="p-6 bg-[#121212] border-t border-white/5 flex gap-4"
            >
              <input 
                value={reply} 
                onChange={e => setReply(e.target.value)} 
                placeholder="Compose professional response..." 
                className="flex-1 bg-white/5 border border-white/10 p-4 text-sm text-white outline-none focus:border-[#D4AF7A] transition-all" 
              />
              <button className="bg-[#D4AF7A] text-black px-10 font-bold uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-lg active:scale-95">
                Send Reply
              </button>
            </form>
          </>
        ) : (
          <div className="m-auto text-center space-y-4 opacity-20">
            <MessageCircle size={64} className="mx-auto" />
            <p className="uppercase text-xs tracking-[0.5em]">Select Client Thread</p>
          </div>
        )}
      </div>
    </div>
  );
}