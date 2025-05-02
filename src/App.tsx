import { domAnimation, LazyMotion } from 'motion/react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom';

import { QueryClientProvider } from '@/api';
import { useAuthAtom } from '@/atoms/useAuthAtom';
import { UIProvider } from '@/components/ui';
import { PATH } from '@/constants/routes';
import { HomePage, LoginPage } from '@/pages';

const App = () => {
  const publicRoutes = [
    {
      element: (
        <>
          <ScrollRestoration />
          <Outlet />
        </>
      ),
      children: [
        { path: PATH.INDEX, element: <HomePage /> },
        { path: PATH.LOGIN, element: <LoginPage /> },
        { path: '*', element: <Navigate to={PATH.INDEX} replace /> },
      ],
    },
  ];

  const PrivateRoute = () => {
    const { isLogin } = useAuthAtom();

    if (!isLogin()) {
      return <Navigate to={PATH.LOGIN} replace />;
    }

    return (
      <>
        <ScrollRestoration />
        <Outlet />
      </>
    );
  };

  const privateRoutes = [
    {
      element: <PrivateRoute />,
      children: [{ path: PATH.HOME, element: <HomePage /> }],
    },
  ];

  const routes: RouteObject[] = [
    {
      element: (
        <QueryClientProvider>
          <UIProvider>
            <LazyMotion features={domAnimation}>
              <Outlet />
            </LazyMotion>
          </UIProvider>
        </QueryClientProvider>
      ),
      children: [...publicRoutes, ...privateRoutes],
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
