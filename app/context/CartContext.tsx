"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product, CartItem } from '@/app/types/product'; 
import { getActiveUser } from '@/lib/auth-utils'; 

// 1. THIS IS THE LINE YOU WERE LIKELY MISSING
// This creates the "TV" (The Context object)
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  isMounted: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const getStorageKey = () => {
    const user = getActiveUser();
    return (user && user.email) ? `cart_session_${user.email}` : null;
  };

  useEffect(() => {
    const user = getActiveUser();
    
    // Cleanup old ghost keys
    localStorage.removeItem("salon_cart"); 
    localStorage.removeItem("cart");

    const key = getStorageKey();
    if (key) {
      const saved = localStorage.getItem(key);
      if (saved) {
        try { setCart(JSON.parse(saved)); } catch (e) { setCart([]); }
      }
    } else {
      setCart([]);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const key = getStorageKey();
    if (isMounted && key) {
      localStorage.setItem(key, JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addToCart = (product: Product) => {
    const user = getActiveUser();

    if (!user || !user.email) {
      router.push('/sign-in');
      return; 
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    const key = getStorageKey();
    if (key) localStorage.removeItem(key);
    setCart([]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 2. MAKE SURE THIS MATCHES THE VARIABLE NAME CREATED AT THE TOP
  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, 
      clearCart, totalPrice, totalItems, isMounted 
    }}>
      {children}
    </CartContext.Provider>
  );
}

// 3. THIS HOOK DEPENDS ON THE CONTEXT CREATED AT THE TOP
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};