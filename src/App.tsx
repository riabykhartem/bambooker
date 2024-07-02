import { LoginPage } from './pages/LoginPage.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DesksPage } from './pages/DesksPage.tsx';

const queryClient = new QueryClient();

const browserRouter = createBrowserRouter([ // <Routes>
  { // <Route path="/" component="" />
    path: '',
    Component: LoginPage,
  },
  {
    path: '/desks',
    Component: DesksPage,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={browserRouter} />
    </QueryClientProvider>
  );
}

export default App
