import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { CallbackPage } from './pages/CallbackPage';
import { ErrorBoundary } from './components/ErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary><p>Something went wrong</p></ErrorBoundary>
  },
  {
    path: '/callback',
    element: <CallbackPage />,
    errorElement: <ErrorBoundary><p>Something went wrong</p></ErrorBoundary>
  }
]); 