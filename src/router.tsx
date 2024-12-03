import { Navigate, createBrowserRouter } from 'react-router-dom';
import { useAuth } from './providers/AuthProvider';
import { MainLayout } from './components/Layout/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { Home } from './pages/Home';
import { CallbackPage } from './pages/CallbackPage';
import { Achievements } from './pages/Achievements';
import { Streaks } from './pages/Streaks';
import { History } from './pages/History';

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'achievements',
        element: <Achievements />
      },
      {
        path: 'streaks',
        element: <Streaks />
      },
      {
        path: 'history',
        element: <History />
      }
    ]
  },
  {
    path: '/callback',
    element: <CallbackPage />
  }
], {
  future: {
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true
  }
}); 