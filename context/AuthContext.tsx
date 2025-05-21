import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { mockUsers } from '@/data/mockData';
import { User } from '@/types';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        setIsAuthenticated(false);
        setCurrentUser(null);
      } catch (error) {
        console.error('Failed to check authentication:', error);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = mockUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!user) {
        throw new Error('Invalid credentials');
      }

      setIsAuthenticated(true);
      setCurrentUser(user);
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const existingUser = mockUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        throw new Error('Email already in use');
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        avatar:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        bio: 'Novo membro da comunidade',
        followers: 0,
        following: 0,
      };

      setIsAuthenticated(true);
      setCurrentUser(newUser);
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const updateUser = (user: User) => {
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        signIn,
        signUp,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
