import React from 'react';
import ReactDOM from 'react-dom/client';
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { RouterProvider } from 'react-router-dom';
import { AnalyticsProvider } from './components/analytics/AnalyticsProvider';
import { AuthProvider } from './providers/AuthProvider';
import { router } from './router';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <KindeProvider
      clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
      domain={import.meta.env.VITE_KINDE_DOMAIN}
      redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URI}
      logoutUri={import.meta.env.VITE_KINDE_LOGOUT_URI}
    >
      <AuthProvider>
        <AnalyticsProvider>
          <RouterProvider router={router} />
        </AnalyticsProvider>
      </AuthProvider>
    </KindeProvider>
  </React.StrictMode>
);