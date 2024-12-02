import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { Home } from './pages/Home';
import { CallbackPage } from './pages/CallbackPage';
import { Achievements } from './pages/Achievements';
import { Streaks } from './pages/Streaks';
import { History } from './pages/History';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/dashboard',
    element: <MainLayout />,
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