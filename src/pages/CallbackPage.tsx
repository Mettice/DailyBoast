import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const CallbackPage = () => {
  const { handleLoginCallback } = useKindeAuth();
  const navigate = useNavigate();

  useEffect(() => {
    handleLoginCallback()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Auth callback error:', error);
        navigate('/');
      });
  }, [handleLoginCallback, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-600" />
    </div>
  );
}; 