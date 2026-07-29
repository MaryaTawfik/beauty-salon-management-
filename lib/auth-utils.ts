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
const AUTH_EVENT = "salon-auth-changed";

const readCookie = (name: string) => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

const writeCookie = (name: string, value: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=86400; SameSite=Lax`;
};

const clearCookie = (name: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
};

const emitAuthChange = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_EVENT));
  }
};

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

export const registerUser = (userData: any) => {
  if (typeof window === "undefined") return { success: false };
  if (userData.email === MASTER_ADMIN.email) {
    return { success: false, message: "This identifier is reserved." };
  }
  const users = getStoredUsers();
  if (users.find((u: any) => u.email === userData.email)) {
    return { success: false, message: "Email already exists." };
  }
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
    delete (authUser as any).password;
    localStorage.setItem(SESSION_KEY, JSON.stringify(authUser));

    writeCookie("isLoggedIn", "true");
    writeCookie("role", authUser.role);
    writeCookie("salon_session_user", JSON.stringify(authUser));

    emitAuthChange();
    
    return { success: true, user: authUser };
  }
  return { success: false, message: "Invalid credentials." };
};

export const logoutUser = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
  clearCookie("isLoggedIn");
  clearCookie("role");
  clearCookie("salon_session_user");
  emitAuthChange();
  window.location.href = "/"; 
};

export const getActiveUser = () => {
  if (typeof window === "undefined") return null;

  const session = localStorage.getItem(SESSION_KEY);
  if (session && session !== "null" && session !== "undefined") {
    try {
      const user = JSON.parse(session);
      if (user && user.email) return user;
    } catch (e) {
      // fall through to cookie recovery
    }
  }

  const cookieSession = readCookie("salon_session_user");
  if (cookieSession) {
    try {
      const user = JSON.parse(cookieSession);
      if (user && user.email) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
        return user;
      }
    } catch (e) {
      return null;
    }
  }

  return null;
};