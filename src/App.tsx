import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { router } from './router';
import { Root } from './components/Root';

function App() {
  return (
    <AuthProvider>
      <Root>
        <RouterProvider router={router} />
      </Root>
    </AuthProvider>
  );
}

export default App;