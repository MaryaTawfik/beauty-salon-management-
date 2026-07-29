"use client";

const MASTER_ADMIN = {
  fullName: "L'Élite System Administrator",
  email: "admin@thesalon.com",
  password: "admin123", 
  role: "admin",
  phone: "0900000000",
  address: "Main Sanctuary, Addis Ababa",
  loyaltyPoints: 9999
};

const USERS_KEY = "salon_users_db";
const SESSION_KEY = "active_salon_user";
const AUTH_EVENT = "salon-auth-changed"; // Secret event for the browser to hear

// Helper to notify other components when auth changes
const emitAuthChange = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_EVENT));
  }
};

// THE MISSING FUNCTION:
export const subscribeToAuthChanges = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(AUTH_EVENT, callback);
  return () => window.removeEventListener(AUTH_EVENT, callback);
};

export const getStoredUsers = () => {
  if (typeof window === "undefined") return [];
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const writeAuthCookie = (name: string, value: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value}; path=/; max-age=86400; SameSite=Lax;`;
};

export const registerUser = (userData: any) => {
  if (typeof window === "undefined") return { success: false };
  if (userData.email === MASTER_ADMIN.email) return { success: false, message: "Reserved." };
  const users = getStoredUsers();
  if (users.find((u: any) => u.email === userData.email)) return { success: false, message: "Exists." };
  const newUser = { ...userData, role: 'user', createdAt: new Date().toISOString() };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true };
};

export const loginUser = (email: string, pass: string) => {
  if (typeof window === "undefined") return { success: false };

  let authUser = null;
  if (email === MASTER_ADMIN.email && pass === MASTER_ADMIN.password) {
    authUser = { ...MASTER_ADMIN };
  } else {
    const users = getStoredUsers();
    const found = users.find((u: any) => u.email === email && u.password === pass);
    if (found) authUser = { ...found };
  }

  if (authUser) {
    const sessionData = { ...authUser };
    delete (sessionData as any).password;
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    writeAuthCookie("isLoggedIn", "true");
    writeAuthCookie("role", authUser.role);
    
    emitAuthChange(); // Notify components
    return { success: true, user: sessionData };
  }
  return { success: false, message: "Invalid credentials." };
};

export const logoutUser = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
  document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  emitAuthChange(); // Notify components
  window.location.href = "/"; 
};

export const getActiveUser = () => {
  if (typeof window === "undefined") return null;
  const session = localStorage.getItem(SESSION_KEY);
  if (!session || session === "null" || session === "undefined") return null;
  try {
    const user = JSON.parse(session);
    return (user && user.email) ? user : null;
  } catch (e) { return null; }
};