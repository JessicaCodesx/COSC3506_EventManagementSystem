import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthService, UserService } from "../services/apiService";
import {
  MockAuthService as MockAuth,
  MockUserService as MockUser,
} from "../services/mockApiService";

const Auth =
  import.meta.env.VITE_USE_MOCK_API === "true" ? MockAuth : AuthService;
const User =
  import.meta.env.VITE_USE_MOCK_API === "true" ? MockUser : UserService;

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  role: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAuthenticated(false);
          setUser(null);
          setRole(null);
          setLoading(false);
          return;
        }

        await Auth.verifyToken();

        const userData = await User.getCurrentUser(
          localStorage.getItem("userEmail")
        );
        setUser(userData);
        setRole(userData.role);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Authentication error:", err);
        setIsAuthenticated(false);
        setUser(null);
        setRole(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await Auth.login(email, password);

      localStorage.setItem("userEmail", email);
      localStorage.setItem("token", response.token);
      localStorage.setItem("userRole", response.role);

      const userData = await User.getCurrentUser(email);

      setUser(userData);
      setRole(response.role);
      setIsAuthenticated(true);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred during login"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    setError(null);
    try {
      await Auth.register(userData);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred during registration"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    user,
    role,
    loading,
    error,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
