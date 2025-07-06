export const PATH = {
  LANDING: '/',
  HOME: '/home',

  AUTH_SIGNIN: '/auth/signin',
  AUTH_SIGNIN_EMAIL: '/auth/signin-email',
  AUTH_SIGNUP: '/auth/signup',
  AUTH_SIGNUP_EMAIL: '/auth/signup-email',
  AUTH_OAUTH_CALLBACK: '/auth/oauth-callback',

  HISTORY: '/history',
  PROFILE: '/profile',

  GAME: '/game',
  GAME_LOBBY: '/game-lobby',
  GAME_LOBBY_AUTO_MATCHING: '/game-lobby/auto-matching',
  GAME_LOBBY_CUSTOM_MATCHING: '/game-lobby/custom-matching',
  GAME_LOBBY_TOURNAMENT: '/game-lobby/tournament',

  FRIEND: '/friend',
  FRIEND_CHATROOM: '/friend/chatroom',
} as const;
