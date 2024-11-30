import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useKindeAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}; 