import { getActiveUser } from "./auth-utils";

// 1. Get the key specific to the logged-in user
const getUserFavKey = () => {
  const user = getActiveUser();
  return user ? `favs_${user.email}` : null;
};

export const getFavorites = (): string[] => {
  if (typeof window === "undefined") return [];
  const key = getUserFavKey();
  if (!key) return []; // No user, no favorites
  
  const favs = localStorage.getItem(key);
  return favs ? JSON.parse(favs) : [];
};

export const toggleFavoriteId = (id: string) => {
  const key = getUserFavKey();
  if (!key) return []; // Should be blocked by UI logic, but safety first

  const favs = getFavorites();
  const isIncluded = favs.includes(id);
  const newFavs = isIncluded 
    ? favs.filter(favId => favId !== id) 
    : [...favs, id];
    
  localStorage.setItem(key, JSON.stringify(newFavs));
  return newFavs;
};