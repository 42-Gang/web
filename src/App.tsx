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
  LandingPage,
  HomePage,
  SignInPage as AuthSignInPage,
  EmailSignInPage as AuthEmailSignInPage,
  SignUpPage as AuthSignUpPage,
  EmailSignUpPage as AuthEmailSignUpPage,
  OAuthCallbackPage as AuthOAuthCallbackPage,
  HistoryPage,
  ProfilePage,
  FriendPage,
  ChatRoomPage as FriendChatRoomPage,
  GamePage,
  GameLobbyPage,
  GameAutoMatchingPage as GameLobbyAutoMatchingPage,
  CustomMatchingPage as GameLobbyCustomMatchingPage,
  TournamentPage as GameLobbyTournamentPage,
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
        { path: PATH.AUTH_SIGNIN, element: <AuthSignInPage /> },
        { path: PATH.AUTH_SIGNIN_EMAIL, element: <AuthEmailSignInPage /> },
        { path: PATH.AUTH_SIGNUP, element: <AuthSignUpPage /> },
        { path: PATH.AUTH_SIGNUP_EMAIL, element: <AuthEmailSignUpPage /> },
        { path: PATH.AUTH_OAUTH_CALLBACK, element: <AuthOAuthCallbackPage /> },
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
        { path: PATH.FRIEND_CHATROOM, element: <FriendChatRoomPage /> },

        { path: PATH.GAME, element: <GamePage /> },

        { path: PATH.GAME_LOBBY, element: <GameLobbyPage /> },
        { path: PATH.GAME_LOBBY_AUTO_MATCHING, element: <GameLobbyAutoMatchingPage /> },
        { path: PATH.GAME_LOBBY_CUSTOM_MATCHING, element: <GameLobbyCustomMatchingPage /> },
        { path: PATH.GAME_LOBBY_TOURNAMENT, element: <GameLobbyTournamentPage /> },
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
