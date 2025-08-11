import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = {
      id: '1',
      firstName: 'Mitchell',
      lastName: 'Admin',
      email: email,
      phone: '9999999999'
    };
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const signup = async (userData: Omit<User, 'id'> & { password: string }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser: User = {
      id: Date.now().toString(),
      ...userData
    };
    setUser(newUser);
  };

  const verifyOTP = async (otp: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      signup,
      verifyOTP,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};