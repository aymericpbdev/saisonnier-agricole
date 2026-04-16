// src/contexts/AuthContext.tsx
import { createContext, useContext,  useState, useEffect } from 'react';
import type { ReactNode } from 'react';
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'agriculteur' | 'admin' | 'client';
}

interface AuthContextType {
  currentUser: User | null;
  role: User['role'] | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock en dur (conforme au ticket)
const mockCurrentUser: User = {
  id: 'user-001',
  name: 'Jean Dupont',
  email: 'jean.dupont@example.com',
  role: 'agriculteur',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulation de chargement
  useEffect(() => {
    setTimeout(() => {
      setCurrentUser(mockCurrentUser);
      setIsLoading(false);
    }, 600);
  }, []);

  const role = currentUser?.role ?? null;

  // Fonction login
  const login = async (email: string, password: string) => {
    console.warn(`🔧 Tentative de login avec ${email} / ${password} - Fonctionnalité pas encore connectée`);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, role, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth() doit être utilisé à l’intérieur d’un AuthProvider');
  }
  return context;
};