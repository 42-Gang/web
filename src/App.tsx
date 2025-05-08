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
import { ThemeProvider, GlobalStyle } from '@/components/ui';
import { PATH } from '@/constants/routes';
import {
  EmailSignInPage,
  FriendPage,
  HomePage,
  LandingPage,
  SignInPage,
  SignUpPage,
  HistoryPage,
} from '@/pages';

const App = () => {
  const PublicRoute = () => {
    const { isLogin } = useAuthAtom();

    if (isLogin()) {
      return <Navigate to={PATH.HOME} replace />;
    }

    return (
      <>
        <ScrollRestoration />
        <Outlet />
      </>
    );
  };

  const publicRoutes = [
    {
      element: <PublicRoute />,
      children: [
        { path: PATH.LANDING, element: <LandingPage /> },
        { path: PATH.SIGNIN, element: <SignInPage /> },
        { path: PATH.SIGNIN_EMAIL, element: <EmailSignInPage /> },
        { path: PATH.SIGNUP, element: <SignUpPage /> },
        { path: '*', element: <Navigate to={PATH.LANDING} replace /> },
      ],
    },
  ];

  const PrivateRoute = () => {
    const { isLogin } = useAuthAtom();

    if (!isLogin()) {
      return <Navigate to={PATH.LANDING} replace />;
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
      children: [
        { path: PATH.HOME, element: <HomePage /> },
        { path: PATH.HISTORY, element: <HistoryPage /> },
        { path: PATH.FRIEND, element: <FriendPage /> },
      ],
    },
  ];

  const routes: RouteObject[] = [
    {
      element: (
        <QueryClientProvider>
          <GlobalStyle />
          <ThemeProvider>
            <Outlet />
          </ThemeProvider>
        </QueryClientProvider>
      ),
      children: [...publicRoutes, ...privateRoutes],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
