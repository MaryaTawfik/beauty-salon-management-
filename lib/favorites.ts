export const getFavorites = (): string[] => {
  if (typeof window === "undefined") return [];
  const favs = localStorage.getItem("user_favorites");
  return favs ? JSON.parse(favs) : [];
};

export const toggleFavoriteId = (id: string) => {
  const favs = getFavorites();
  const newFavs = favs.includes(id) 
    ? favs.filter(favId => favId !== id) 
    : [...favs, id];
  localStorage.setItem("user_favorites", JSON.stringify(newFavs));
  return newFavs;
};