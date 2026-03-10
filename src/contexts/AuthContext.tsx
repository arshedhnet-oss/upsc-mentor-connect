import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "mentor" | "aspirant" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  photo?: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => void;
  signup: (data: Partial<User> & { role: UserRole }) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string, role: UserRole) => {
    setUser({
      id: "mock-user-1",
      name: role === "mentor" ? "Dr. Aarav Sharma" : "Shreya Agarwal",
      email,
      role,
    });
  };

const signup = (data: Partial<User> & { role: UserRole }) => {
    setUser({
      id: "mock-user-" + Date.now(),
      name: data.name || "New User",
      email: data.email || "user@example.com",
      role: data.role,
      photo: data.photo,
    });
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        login,
        signup,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
