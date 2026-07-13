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
    // 1. Pull the raw data saved by the Admin
    const savedDataRaw = localStorage.getItem("salon_services_db");
    const savedCategories: ServiceCategory[] = savedDataRaw ? JSON.parse(savedDataRaw) : [];

    // 2. THE DEEP MERGE LOGIC
    // We look at the static file (SERVICES_DATA) and "patch" it with Admin changes
    const mergedData = SERVICES_DATA.map(staticCat => {
      // Find if this specific category exists in Admin storage
      const dynamicCat = savedCategories.find(c => c.id === staticCat.id);

      // If Admin never touched this category, use the one from the file
      if (!dynamicCat) return staticCat;

      // If the category exists in both, merge their sub-services individually
      const mergedSubServices = staticCat.subServices.map(staticSub => {
        const dynamicSub = dynamicCat.subServices.find(s => s.id === staticSub.id);
        
        // If Admin updated this specific sub-service, merge the dynamic data over the static
        // This ensures if you add an image in the file, it shows up UNLESS the admin explicitly changed it
        return dynamicSub ? { ...staticSub, ...dynamicSub } : staticSub;
      });

      // Merge category details (Admin overrides static)
      return {
        ...staticCat,
        ...dynamicCat,
        subServices: mergedSubServices
      };
    });

    // 3. Handle entirely "New" categories created by Admin that don't exist in services.ts
    const onlyInAdmin = savedCategories.filter(
      adminCat => !SERVICES_DATA.some(staticCat => staticCat.id === adminCat.id)
    );

    setCategories([...mergedData, ...onlyInAdmin]);
    setIsMounted(true);
  }, []);

  // 4. Persistence: Save changes to storage whenever they happen
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