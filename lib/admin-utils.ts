import { SERVICES_DATA } from "@/app/data/services";
import { ServiceCategory } from "@/app/types/service";

const STORAGE_KEY = "salon_services_db";

export const getAdminServices = (): ServiceCategory[] => {
  if (typeof window === "undefined") return SERVICES_DATA;
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : SERVICES_DATA;
};

export const saveAdminServices = (data: ServiceCategory[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};