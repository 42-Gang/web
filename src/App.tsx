import '@/styles/global.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
import { useChatSocket, useStatusSocket, useFriendSocket } from '@/api/socket';
import { useGameInviteSocket } from '@/api/socket/useGameInviteSocket';
import { useAuthAtom } from '@/atoms/useAuthAtom';
import { PATH } from '@/constants/routes';
import {
  EmailSignInPage,
  EmailSignUpPage,
  HomePage,
  LandingPage,
  SignInPage,
  SignUpPage,
  HistoryPage,
  ProfilePage,
  FriendPage,
  ChatRoomPage,
  GameSelectPage,
  TournamentPage,
  GameAutoMatchingPage,
  GoogleCallbackPage,
  CustomMatchingPage,
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
        { path: PATH.SIGNUP_EMAIL, element: <EmailSignUpPage /> },
        { path: PATH.SIGNUP, element: <SignUpPage /> },
        { path: PATH.SIGNIN_GOOGLE_CALLBACK, element: <GoogleCallbackPage /> },
        { path: '*', element: <Navigate to={PATH.LANDING} replace /> },
      ],
    },
  ];

  const PrivateRoute = () => {
    const { isLogin } = useAuthAtom();

    useChatSocket();
    useStatusSocket();
    useFriendSocket();
    useGameInviteSocket();

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
        { path: PATH.FRIEND_CHATROOM, element: <ChatRoomPage /> },
        { path: PATH.GAME_SELECT, element: <GameSelectPage /> },
        { path: PATH.TOURNAMENT, element: <TournamentPage /> },
        { path: PATH.GAME_AUTO_MATCHING, element: <GameAutoMatchingPage /> },
        { path: PATH.GAME_CUSTOM_MATCHING, element: <CustomMatchingPage /> },
      ],
    },
  ];

  const routes: RouteObject[] = [
    {
      element: (
        <QueryClientProvider>
          <Outlet />
          <Toaster
            position="top-right"
            toastOptions={{
              classNames: {
                toast: 'pixel-toast',
              },
            }}
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      ),
      children: [...publicRoutes, ...privateRoutes],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
