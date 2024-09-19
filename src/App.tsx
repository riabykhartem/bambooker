import { LoginPage } from './pages/LoginPage.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DesksPage } from './pages/DesksPage.tsx';
import { SnackbarProvider } from 'notistack';
import DrawerLayout from './layouts/DrawerLayout.tsx';
import CenterLayout from './layouts/CenterLayout.tsx';


const queryClient = new QueryClient();

const browserRouter = createBrowserRouter([
  {
    path: '',
    Component: CenterLayout,
    children: [
      {
        path: '',
        Component: LoginPage
      }
    ],
  },
  {
    path: '',
    Component: DrawerLayout,
    children: [{
      path: '/:locationId/desks',
      Component: DesksPage
    }]
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
};

export default App;
