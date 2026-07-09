"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Scissors,
  ShoppingBag,
  Users,
  MessageSquare,
  Menu,
  X,
  LogOut,
  ExternalLink,
  CreditCard,
  ClipboardList,
  Images,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@/app/context/ChatContext";

const adminLinks = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Ritual Manager", icon: Scissors, href: "/admin/services" },
  { name: "Gallery Upload", icon: Images, href: "/admin/gallery" },
  { name: "Boutique Inventory", icon: ShoppingBag, href: "/admin/products" },
  { name: "Schedule Manager", icon: Users, href: "/admin/appointments" },
  {
    name: "Payment Requests",
    icon: CreditCard,
    href: "/admin/payments",
  },
  {
    name: "Order Tracking",
    icon: ClipboardList,
    href: "/admin/orders",
  },
  { name: "Live Support", icon: MessageSquare, href: "/admin/support" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { unreadThreads } = useChat();

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-white md:flex-row">
      {/* Mobile admin header */}
      <div className="sticky top-0 z-[100] flex items-center justify-between border-b border-white/5 bg-[#121212] p-4 md:hidden">
        <h1 className="text-center text-sm font-bold uppercase tracking-widest text-[#D4AF7A]">
          Admin Panel
        </h1>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-white"
          aria-label="Open admin menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Admin sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || true) && (
          <motion.aside
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            className={cn(
              "fixed left-0 top-0 z-[150] flex h-screen w-64 flex-col border-r border-white/5 bg-[#121212] transition-transform md:sticky md:flex",
              !isSidebarOpen && "hidden md:flex"
            )}
          >
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute right-6 top-6 text-white/40 md:hidden"
              aria-label="Close admin menu"
            >
              <X size={20} />
            </button>

            <div className="border-b border-white/5 p-8">
              <h1 className="text-xl font-bold uppercase tracking-[0.2em] text-[#D4AF7A]">
                L&apos;Élite{" "}
                <span className="font-light text-white">Admin</span>
              </h1>
            </div>

            <nav className="custom-scrollbar mt-4 flex-1 space-y-1 overflow-y-auto p-4">
              {adminLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={cn(
                      "group flex items-center justify-between px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition-all",
                      isActive
                        ? "bg-[#D4AF7A] font-bold text-[#121212] shadow-[0_0_20px_rgba(212,175,122,0.2)]"
                        : "text-white/40 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <link.icon
                        size={16}
                        strokeWidth={isActive ? 2.5 : 1.5}
                      />
                      {link.name}
                    </div>

                    {link.name === "Live Support" && unreadThreads > 0 && (
                      <span className="flex h-4 w-4 animate-pulse items-center justify-center rounded-full bg-red-600 text-[8px] font-black text-white">
                        {unreadThreads}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="space-y-4 border-t border-white/5 bg-black/20 p-6">
              <Link
                href="/"
                className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-white/30 transition-colors hover:text-[#D4AF7A]"
              >
                <ExternalLink size={14} />
                Back to Live Site
              </Link>

              <button className="flex w-full items-center gap-3 text-[9px] uppercase tracking-widest text-red-400/50 hover:text-red-400">
                <LogOut size={14} />
                System Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main admin content */}
      <main className="flex-1 overflow-x-hidden p-6 md:p-12">
        {children}
      </main>
    </div>
  );
}