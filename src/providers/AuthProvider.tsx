import { createContext, useContext, useEffect } from 'react';
import { KindeProvider, useKindeAuth } from "@kinde-oss/kinde-auth-react";

interface AuthContextType {
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <KindeProvider
      clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
      domain={`https://${import.meta.env.VITE_KINDE_DOMAIN.replace('https://', '')}`}
      redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URI}
      logoutUri={import.meta.env.VITE_KINDE_LOGOUT_REDIRECT_URI}
      onRedirectCallback={(user: any) => {
        console.log('Auth successful:', user);
        window.location.href = '/dashboard';
      }}
    >
      <AuthContextProvider>{children}</AuthContextProvider>
    </KindeProvider>
  );
};

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const { login, logout, isAuthenticated } = useKindeAuth();
  
  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
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