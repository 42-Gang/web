// HTTP API 요청 : authFetch.ts 로 관리
// 소켓 연결 : token.ts 로 localStorage에 저장된 accessToken을 직접 읽어서 연결
// token.ts => WebSocket 연결용

const ACCESS_TOKEN_KEY = "accessToken";

export const getAccessToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  console.log("🔑 getAccessToken 호출됨! 현재 토큰:", token);
  return token;
};

export const setAccessToken = (token: string) =>
  localStorage.setItem(ACCESS_TOKEN_KEY, token);

export const removeAccessToken = () =>
  localStorage.removeItem(ACCESS_TOKEN_KEY);
