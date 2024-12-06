import React from 'react';
import { Header } from './Layout/Header';
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { AuthProvider } from '../providers/AuthProvider';
import { useMemo } from 'react';

export const Root: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const kindeConfig = useMemo(() => ({
    clientId: import.meta.env.VITE_KINDE_CLIENT_ID,
    domain: import.meta.env.VITE_KINDE_DOMAIN,
    redirectUri: import.meta.env.VITE_KINDE_REDIRECT_URI,
    logoutUri: import.meta.env.VITE_KINDE_LOGOUT_URI
  }), []);

  return (
    <div>
      <Header />
      <main>
        <KindeProvider {...kindeConfig}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </KindeProvider>
      </main>
    </div>
  );
}; 