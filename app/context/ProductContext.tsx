"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/app/types/product'; // Ensure Product interface exists here
import { PRODUCTS } from '@/app/data/products';

interface ProductContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isMounted: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("salon_products_db");
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(PRODUCTS);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("salon_products_db", JSON.stringify(products));
    }
  }, [products, isMounted]);

  return (
    <ProductContext.Provider value={{ products, setProducts, isMounted }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within ProductProvider");
  return context;
};