import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Root } from './components/Root';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Root>
          <RouterProvider router={router} />
        </Root>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;