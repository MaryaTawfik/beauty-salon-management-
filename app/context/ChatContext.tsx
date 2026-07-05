"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getActiveUser } from '@/lib/auth-utils';

export interface ChatMessage {
  id: string;
  senderEmail: string;
  receiverEmail: string;
  text: string;
  timestamp: string;
  isAdminRead: boolean;
  isUserRead: boolean; 
}

interface ChatContextType {
  allMessages: ChatMessage[];
  sendMessage: (text: string, receiverEmail: string) => void;
  markAsUserRead: (userEmail: string) => void; 
  markAsAdminRead: (userEmail: string) => void; 
  clearChat: (userEmail: string) => void; // FIX: Added clearChat here
  userUnreadCount: number; 
  unreadThreads: number;   
  isMounted: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [allMessages, setAllMessages] = useState<ChatMessage[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [sessionUser, setSessionUser] = useState<any>(null);

  const syncChat = () => {
    const saved = localStorage.getItem("salon_global_inbox");
    if (saved) setAllMessages(JSON.parse(saved));
    setSessionUser(getActiveUser());
  };

  useEffect(() => {
    syncChat();
    setIsMounted(true);
    window.addEventListener('storage', syncChat);
    window.addEventListener('chat-updated', syncChat);
    return () => {
      window.removeEventListener('storage', syncChat);
      window.removeEventListener('chat-updated', syncChat);
    };
  }, []);

  const userUnreadCount = useMemo(() => {
    if (!sessionUser) return 0;
    return allMessages.filter(m => m.receiverEmail === sessionUser.email && !m.isUserRead).length;
  }, [allMessages, sessionUser]);

  const unreadThreads = useMemo(() => {
    return Array.from(new Set(
      allMessages.filter(m => m.senderEmail !== 'admin' && !m.isAdminRead).map(m => m.senderEmail)
    )).length;
  }, [allMessages]);

  const sendMessage = (text: string, receiverEmail: string) => {
    const sender = getActiveUser();
    if (!sender) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isAdmin = sender.email === 'admin@thesalon.com';

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderEmail: isAdmin ? 'admin' : sender.email,
      receiverEmail,
      text,
      timestamp,
      isAdminRead: isAdmin, 
      isUserRead: !isAdmin, 
    };

    const saved = localStorage.getItem("salon_global_inbox");
    let inbox = saved ? JSON.parse(saved) : [];
    inbox.push(newMessage);

    if (!isAdmin && receiverEmail === 'admin') {
      inbox.push({
        id: (Date.now() + 1).toString(),
        senderEmail: 'admin',
        receiverEmail: sender.email,
        text: "Thank you for contacting us! We have received your message successfully.",
        timestamp: "System",
        isAdminRead: true, 
        isUserRead: false,
      });
    }

    localStorage.setItem("salon_global_inbox", JSON.stringify(inbox));
    window.dispatchEvent(new Event('chat-updated'));
  };

  // FIX: Logic to wipe chat for a specific user
  const clearChat = (userEmail: string) => {
    const saved = localStorage.getItem("salon_global_inbox");
    if (!saved) return;
    const inbox: ChatMessage[] = JSON.parse(saved);
    const updated = inbox.filter(m => m.senderEmail !== userEmail && m.receiverEmail !== userEmail);
    localStorage.setItem("salon_global_inbox", JSON.stringify(updated));
    window.dispatchEvent(new Event('chat-updated'));
  };

  const markAsUserRead = (email: string) => {
    const saved = localStorage.getItem("salon_global_inbox");
    if (!saved) return;
    const inbox: ChatMessage[] = JSON.parse(saved);
    const updated = inbox.map(m => m.receiverEmail === email ? { ...m, isUserRead: true } : m);
    localStorage.setItem("salon_global_inbox", JSON.stringify(updated));
    window.dispatchEvent(new Event('chat-updated'));
  };

  const markAsAdminRead = (email: string) => {
    const saved = localStorage.getItem("salon_global_inbox");
    if (!saved) return;
    const inbox: ChatMessage[] = JSON.parse(saved);
    const updated = inbox.map(m => m.senderEmail === email ? { ...m, isAdminRead: true } : m);
    localStorage.setItem("salon_global_inbox", JSON.stringify(updated));
    window.dispatchEvent(new Event('chat-updated'));
  };

  return (
    <ChatContext.Provider value={{ allMessages, sendMessage, markAsUserRead, markAsAdminRead, clearChat, userUnreadCount, unreadThreads, isMounted }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
};