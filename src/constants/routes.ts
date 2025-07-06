export const PATH = {
  LANDING: '/',
  HOME: '/home',

  SIGNIN: '/signin',
  SIGNIN_EMAIL: '/signin/email',
  SIGNUP: '/signup',
  SIGNUP_EMAIL: '/signup/email',
  OAUTH_GOOGLE_CALLBACK: '/oauth/callback',

  HISTORY: '/history',

  GAME: '/game',
  GAME_LOBBY: '/game-lobby',
  GAME_LOBBY_AUTO_MATCHING: '/game-lobby/auto-matching',
  GAME_LOBBY_CUSTOM_MATCHING: '/game-lobby/custom-matching',
  GAME_LOBBY_TOURNAMENT: '/game-lobby/tournament',

  FRIEND: '/friend',
  FRIEND_CHATROOM: '/friend/chatroom',
  PROFILE: '/profile',
} as const;
