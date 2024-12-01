import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { AuthProvider } from '../providers/AuthProvider';
import { useMemo } from 'react';

export const Root = ({ children }: { children: React.ReactNode }) => {
  const kindeConfig = useMemo(() => ({
    clientId: import.meta.env.VITE_KINDE_CLIENT_ID,
    domain: import.meta.env.VITE_KINDE_DOMAIN,
    redirectUri: import.meta.env.VITE_KINDE_REDIRECT_URI,
    logoutUri: import.meta.env.VITE_KINDE_LOGOUT_URI
  }), []);

  return (
    <KindeProvider {...kindeConfig}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </KindeProvider>
  );
}; 