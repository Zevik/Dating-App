import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../lib/api';

interface User {
  userId: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        // In a real app, we would decode the JWT to get user info
        // For now, we'll try to get user info from localStorage if available
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUser({
            userId: userData.userId || userData.user_id || 1,
            email: userData.email || 'admin@example.com',
          });
        } else {
          // Fallback if no userData in localStorage
          setUser({
            userId: 1,
            email: 'admin@example.com',
          });
        }
      } catch (error) {
        console.error('Error restoring auth state:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(email, password);
      
      // Ensure token exists in the response
      if (!response.token) {
        throw new Error('No token received from server');
      }
      
      // Store token in localStorage
      localStorage.setItem('token', response.token);
      
      // Store user data for later retrieval
      const userData = {
        userId: response.user?.id || response.userId || 1,
        email: response.user?.email || email
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Update state
      setUser({
        userId: userData.userId,
        email: userData.email,
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 