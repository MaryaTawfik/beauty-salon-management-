"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product, CartItem } from '@/app/types/product';
import { getActiveUser } from '@/lib/auth-utils';

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

  // 1. DYNAMIC KEY LOGIC: Unique key for every user
  const getStorageKey = () => {
    const user = getActiveUser();
    return user?.email ? `cart_session_${user.email}` : null;
  };

  // 2. INITIAL LOAD: Strictly isolated by user
  useEffect(() => {
    const key = getStorageKey();
    
    // Safety: Remove any old "generic" cart keys that might be lingering
    localStorage.removeItem('salon_cart'); 
    localStorage.removeItem('cart');

    if (key) {
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          setCart(JSON.parse(saved));
        } catch (e) {
          setCart([]);
        }
      }
    } else {
      // IF GUEST: Force the memory state to be empty
      setCart([]);
    }
    setIsMounted(true);
  }, []);

  // 3. PERSISTENCE: Save only to the user-specific key
  useEffect(() => {
    const key = getStorageKey();
    if (isMounted && key) {
      localStorage.setItem(key, JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addToCart = (product: Product) => {
    const user = getActiveUser();

    // Redirection Guard
    if (!user || !user.email) {
      router.push('/sign-in');
      return;
    }

    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    const key = getStorageKey();
    if (key) localStorage.removeItem(key);
    setCart([]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, 
      clearCart, totalPrice, totalItems, isMounted 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};