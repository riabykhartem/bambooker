import { LoginPage } from './pages/LoginPage.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DesksPage } from './pages/DesksPage.tsx';
import { SnackbarProvider } from 'notistack';


const queryClient = new QueryClient();

const browserRouter = createBrowserRouter([
  {
    path: '',
    Component: LoginPage,
  },
  {
    path: '/:locationId/desks',
    Component: DesksPage,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <RouterProvider router={browserRouter} />
      </SnackbarProvider >

    </QueryClientProvider>
  );
}

export default App;
