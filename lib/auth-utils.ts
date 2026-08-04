"use client";

// 1. THE MASTER ADMIN SEED
// This user is "burned" into the code. They will always be able to log in,
// even if you click "Clear Site Data" in your browser.
const MASTER_ADMIN = {
  fullName: "L'Élite System Administrator",
  email: "admin@thesalon.com",
  password: "admin123", // You can change this to your desired password
  role: "admin",
  phone: "0900000000",
  address: "Main Sanctuary, Addis Ababa",
  loyaltyPoints: 9999
};

const USERS_KEY = "salon_users_db";
const SESSION_KEY = "active_salon_user";

export const getStoredUsers = () => {
  if (typeof window === "undefined") return [];
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const registerUser = (userData: any) => {
  // 2. SECURITY GUARD: Prevent anyone from trying to register the admin email
  if (userData.email === MASTER_ADMIN.email) {
    return { success: false, message: "This identifier is reserved for system administration." };
  }

  const users = getStoredUsers();
  if (users.find((u: any) => u.email === userData.email)) {
    return { success: false, message: "Email already exists in our sanctuary records." };
  }

  const newUser = { 
    ...userData, 
    role: 'user', // Only the seeded admin can be admin in this prototype
    createdAt: new Date().toISOString() 
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true };
};

export const loginUser = (email: string, pass: string) => {
  // 3. CHECK MASTER ADMIN FIRST (The "Secret Door")
  if (email === MASTER_ADMIN.email && pass === MASTER_ADMIN.password) {
    const sessionData = { ...MASTER_ADMIN };
    // Remove password from the session object for security
    delete (sessionData as any).password;

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    document.cookie = "isLoggedIn=true; path=/; max-age=86400; SameSite=Lax";
    document.cookie = "role=admin; path=/; max-age=86400; SameSite=Lax";

    return { success: true, user: sessionData };
  }

  // 4. IF NOT MASTER ADMIN, CHECK THE LOCALSTORAGE "DATABASE"
  const users = getStoredUsers();
  const user = users.find((u: any) => u.email === email && u.password === pass);

  if (user) {
    const sessionData = { ...user };
    delete (sessionData as any).password;

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    document.cookie = "isLoggedIn=true; path=/; max-age=86400; SameSite=Lax";
    document.cookie = `role=${user.role}; path=/; max-age=86400; SameSite=Lax`;
    
    return { success: true, user: sessionData };
  }

  return { success: false, message: "Invalid credentials. Please verify your entry." };
};

export const logoutUser = () => {
  // Remove the saved user session
  localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem("salon_cart");
  // Delete authentication cookies
  document.cookie = "isLoggedIn=; path=/; max-age=0; SameSite=Lax";

  document.cookie = "role=; path=/; max-age=0; SameSite=Lax";
   window.location.href = "/";
};

export const getActiveUser = () => {
  if (typeof window === "undefined") return null;
  const session = localStorage.getItem(SESSION_KEY);
  
  if (!session || session === "null" || session === "undefined") return null;

  try {
    const user = JSON.parse(session);
    if (!user || !user.email) return null; 
    return user;
  } catch (e) {
    return null;
  }
};