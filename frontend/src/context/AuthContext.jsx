import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    const saved = localStorage.getItem("isAdmin");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
  }, [isAdmin]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  const loginAdmin = (adminData) => {
    setUser(adminData);
    setIsAdmin(true);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, loginAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
