import React from 'react';
import ReactDOM from 'react-dom/client';
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AnalyticsProvider } from './components/analytics/AnalyticsProvider';
import App from './App';
import './index.css'
// import './App.css' // Comment this out temporarily

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <KindeProvider
      clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
      domain={import.meta.env.VITE_KINDE_DOMAIN}
      redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URI}
      logoutUri={import.meta.env.VITE_KINDE_LOGOUT_URI}
    >
      <AnalyticsProvider>
        <RouterProvider router={router} />
      </AnalyticsProvider>
    </KindeProvider>
  </React.StrictMode>
);