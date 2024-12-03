import { createContext, useContext, useEffect } from 'react';
import { KindeProvider, useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { router } from '../router';

interface AuthContextType {
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  user: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <KindeProvider
      clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
      domain={`https://${import.meta.env.VITE_KINDE_DOMAIN.replace('https://', '')}`}
      redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URI}
      logoutUri={import.meta.env.VITE_KINDE_LOGOUT_REDIRECT_URI}
    >
      <AuthContextProvider>{children}</AuthContextProvider>
    </KindeProvider>
  );
};

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const { login, logout, isAuthenticated, user } = useKindeAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      router.navigate('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};