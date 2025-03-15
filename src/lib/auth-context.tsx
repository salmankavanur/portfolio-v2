// Create an authentication context for the admin panel
import React, { createContext, useState, useContext, useEffect } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: string | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

// In a real application, this would connect to a secure authentication service
// For this demo, we use a simple hardcoded credential check
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkAuth = () => {
      const storedUser = localStorage.getItem("admin_user");
      if (storedUser) {
        setIsAuthenticated(true);
        setUser(storedUser);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    // In a real app, this would call an API endpoint
    // For demo purposes, we'll use a simple check
    const isValid =
      username === "admin" &&
      password === "salman123";  // In production, use secure auth methods

    if (isValid) {
      localStorage.setItem("admin_user", username);
      setIsAuthenticated(true);
      setUser(username);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem("admin_user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
