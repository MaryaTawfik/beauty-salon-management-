"use client";

const USERS_KEY = "salon_users_db";
const SESSION_KEY = "active_salon_user";

export const getStoredUsers = () => {
  if (typeof window === "undefined") return [];
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const registerUser = (userData: any) => {
  const users = getStoredUsers();
  if (users.find((u: any) => u.email === userData.email)) {
    return { success: false, message: "Email already exists." };
  }
  const newUser = { ...userData, role: userData.email === 'admin@thesalon.com' ? 'admin' : 'user' };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true };
};

export const loginUser = (email: string, pass: string) => {
  const users = getStoredUsers();
  const user = users.find((u: any) => u.email === email && u.password === pass);

  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    document.cookie = "isLoggedIn=true; path=/; max-age=86400";
    document.cookie = `role=${user.role}; path=/; max-age=86400`;
    return { success: true, user };
  }
  return { success: false, message: "Invalid credentials." };
};

export const logoutUser = () => {
  // 1. Remove the session from localStorage
  localStorage.removeItem("active_salon_user");

  // 2. Clear the Auth Cookies for middleware
  document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

  // 3. FORCE REFRESH: This is critical. It wipes the CartContext memory
  // and redirects the user to the home page as a guest.
  window.location.href = "/"; 
};
export const getActiveUser = () => {
  if (typeof window === "undefined") return null;
  const session = localStorage.getItem("active_salon_user");
  
  if (!session || session === "null" || session === "undefined") return null;

  try {
    const user = JSON.parse(session);
    // CRITICAL: If the object exists but has no email, it's a fake session.
    if (!user || !user.email) return null; 
    return user;
  } catch (e) {
    return null;
  }
};