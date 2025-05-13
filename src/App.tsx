import '@/styles/global.css';

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom';
import { Toaster } from 'sonner';

import { QueryClientProvider } from '@/api';
import { useAuthAtom } from '@/atoms/useAuthAtom';
import { PATH } from '@/constants/routes';
import {
  EmailSignInPage,
  HomePage,
  LandingPage,
  SignInPage,
  SignUpPage,
  HistoryPage,
  ProfilePage,
  FriendPage,
  FriendChatRoomPage,
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
        { path: PATH.PROFILE, element: <ProfilePage /> },
        { path: PATH.FRIEND, element: <FriendPage /> },
        { path: PATH.FRIEND_CHATROOM, element: <FriendChatRoomPage /> },
      ],
    },
  ];

  const routes: RouteObject[] = [
    {
      element: (
        <QueryClientProvider>
          <Outlet />
          <Toaster position="top-right" />
        </QueryClientProvider>
      ),
      children: [...publicRoutes, ...privateRoutes],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
