import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Root } from './components/Root';

function App() {
  return (
    <Root>
      <RouterProvider router={router} />
    </Root>
  );
}

export default App;