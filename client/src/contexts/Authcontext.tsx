/*
 * AuthContext - Version 1 (mock en dur)
 *
 * Utilisateur actuellement mocké : Jean Dupont (agriculteur)
 *
 * Pour tester un autre rôle, change simplement la ligne "role" dans mockCurrentUser :
 *   - 'agriculteur'
 *   - 'admin'
 *   - 'client'
 *
 * Une fois le vrai backend + MSW prêt, on remplacera le mock par un vrai appel API.
 */

import { createContext, useContext,  useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/user';
import { Role } from '../types/user';

interface AuthContextType {
  currentUser: User | null;
  role: User['role'] | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const mockCurrentUser: User = {
  id: 'user-001',
  firstName: 'Jean Dupont',
  lastName: 'Dupont',
  email: 'jean.dupont@example.com',
  role: Role.Farmer,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setCurrentUser(mockCurrentUser);
      setIsLoading(false);
    }, 600);
  }, []);

  const role = currentUser?.role ?? null;
  
  const login = async (email: string, password: string) => {
    if (email === 'test@example.com' && password === 'password123') {
      setCurrentUser(mockCurrentUser);
    } else {
      throw new Error('Identifiants incorrects');
   }
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