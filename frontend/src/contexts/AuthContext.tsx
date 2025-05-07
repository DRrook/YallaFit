import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService from '../api/services/authService';
import { type UserRole } from '../components/layout/Header'; // Import UserRole
import LoadingScreen from '../components/ui/loading-screen';

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole; // Use UserRole type
  profile_image?: string;
  bio?: string;
  fitness_level?: string;
  fitness_goals?: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, email: string, password: string, passwordConfirmation: string, role?: UserRole) => Promise<any>;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch fresh user data from the server
  const refreshUserData = async () => {
    try {
      const response = await authService.user();
      if (response.status && response.data.user) {
        setUser(response.data.user as User);
        // Update localStorage with fresh data
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('auth_token');

    const initializeAuth = async () => {
      setIsLoading(true);

      if (storedUser && token) {
        // Set user from localStorage initially for fast loading
        setUser(JSON.parse(storedUser) as User);

        // Then fetch fresh data from the server
        await refreshUserData();
      }

      setIsLoading(false);
    };

    initializeAuth();

    // Listen for auth-update events
    const handleAuthUpdate = (event: CustomEvent) => {
      if (event.detail) {
        setUser(event.detail as User);
      }
    };

    window.addEventListener('auth-update', handleAuthUpdate as EventListener);

    // Listen for storage events to sync user state across tabs
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('user');
      if (updatedUser) {
        setUser(JSON.parse(updatedUser) as User);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('auth-update', handleAuthUpdate as EventListener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // First login with credentials
      const response = await authService.login({ email, password });

      // Set user from login response
      setUser(response.data.user as User);

      // Then fetch fresh user data to ensure we have the latest profile image
      await refreshUserData();

      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, password_confirmation: string, role?: UserRole) => {
    setIsLoading(true);
    try {
      const response = await authService.register({ name, email, password, password_confirmation, role });
      setUser(response.data.user as User);

      // Fetch fresh user data after registration
      await refreshUserData();

      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUserData
  };

  // Show loading screen when authentication state is changing
  if (isLoading) {
    return <LoadingScreen />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
