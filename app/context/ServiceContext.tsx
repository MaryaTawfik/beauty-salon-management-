"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceCategory } from '@/app/types/service';
import { SERVICES_DATA } from '@/app/data/services';

interface ServiceContextType {
  categories: ServiceCategory[];
  setCategories: React.Dispatch<React.SetStateAction<ServiceCategory[]>>;
  isMounted: boolean;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("salon_services_db");
    if (saved) {
      setCategories(JSON.parse(saved));
    } else {
      setCategories(SERVICES_DATA);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("salon_services_db", JSON.stringify(categories));
    }
  }, [categories, isMounted]);

  return (
    <ServiceContext.Provider value={{ categories, setCategories, isMounted }}>
      {children}
    </ServiceContext.Provider>
  );
}

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) throw new Error("useServices must be used within ServiceProvider");
  return context;
};