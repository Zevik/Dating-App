import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../lib/api';

type User = {
  id: number;
  email: string;
  display_name: string;
  is_admin: boolean;
  verified_email: boolean;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
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
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // On mount or token change, update axios headers and try to restore user
    const restoreUserSession = async () => {
      if (token) {
        try {
          // Set authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Try to get user info from localStorage if available
          const userDataString = localStorage.getItem('userData');
          if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUser(userData);
          }
        } catch (error) {
          console.error('Error restoring auth state:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
          delete axios.defaults.headers.common['Authorization'];
        }
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }
      
      setIsLoading(false);
    };

    restoreUserSession();
  }, [token]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/auth/login', { email, password });

      const { token: jwtToken, user } = response.data;
      if (!jwtToken) throw new Error('No token received from server');

      // Store token in localStorage
      localStorage.setItem('token', jwtToken);
      setToken(jwtToken);
      
      // Store user data for later retrieval
      localStorage.setItem('userData', JSON.stringify(user));
      setUser(user);
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
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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