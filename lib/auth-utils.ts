"use client";

/**
 * 1. THE MASTER ADMIN SEED
 * This user is "burned" into the code for development.
 * In this prototype, only this email will receive the 'admin' role.
 */
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

/**
 * Helper to fetch all registered users from browser storage
 */
export const getStoredUsers = () => {
  if (typeof window === "undefined") return [];
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

/**
 * Registration Logic
 * Prevents duplicate emails and protects the admin identifier
 */
export const registerUser = (userData: any) => {
  if (typeof window === "undefined") return { success: false };

  // SECURITY GUARD: Prevent registering as the master admin
  if (userData.email === MASTER_ADMIN.email) {
    return { success: false, message: "This identifier is reserved for system administration." };
  }

  const users = getStoredUsers();
  if (users.find((u: any) => u.email === userData.email)) {
    return { success: false, message: "Email already exists in our sanctuary records." };
  }

  const newUser = { 
    ...userData, 
    role: 'user', 
    createdAt: new Date().toISOString() 
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true };
};

/**
 * Login Logic
 * Sets both LocalStorage (for UI) and Cookies (for Middleware)
 */
export const loginUser = (email: string, pass: string) => {
  if (typeof window === "undefined") return { success: false };

  let authenticatedUser = null;

  // Check Master Admin first
  if (email === MASTER_ADMIN.email && pass === MASTER_ADMIN.password) {
    authenticatedUser = { ...MASTER_ADMIN };
  } else {
    // Check LocalStorage "Database"
    const users = getStoredUsers();
    const found = users.find((u: any) => u.email === email && u.password === pass);
    if (found) authenticatedUser = { ...found };
  }

  if (authenticatedUser) {
    // Safety: Never store password in session
    delete (authenticatedUser as any).password;

    // Save Session to Storage
    localStorage.setItem(SESSION_KEY, JSON.stringify(authenticatedUser));

    /**
     * Set Cookies for Middleware Protection
     * max-age=86400 (1 day in seconds)
     */
    document.cookie = `isLoggedIn=true; path=/; max-age=86400; SameSite=Lax`;
    document.cookie = `role=${authenticatedUser.role}; path=/; max-age=86400; SameSite=Lax`;
    
    return { success: true, user: authenticatedUser };
  }

  return { success: false, message: "Invalid credentials. Please verify your entry." };
};

/**
 * Logout Logic
 * Completely clears storage and cookies, then forces a hard reload
 * to wipe all React Context states (like the Cart).
 */
export const logoutUser = () => {
  if (typeof window === "undefined") return;

  // 1. Wipe Browser Storage
  localStorage.removeItem(SESSION_KEY);

  // 2. Clear Cookies by setting expiration to the past
  document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

  // 3. HARD REFRESH
  // This is vital to reset all Providers/Contexts (Cart, Chat, etc.)
  window.location.href = "/"; 
};

/**
 * Helper to get the current session safely
 */
export const getActiveUser = () => {
  if (typeof window === "undefined") return null;
  const session = localStorage.getItem(SESSION_KEY);
  
  if (!session || session === "null" || session === "undefined") return null;

  try {
    const user = JSON.parse(session);
    // Strict check: User must have an email to be considered valid
    if (!user || !user.email) return null; 
    return user;
  } catch (e) {
    return null;
  }
};