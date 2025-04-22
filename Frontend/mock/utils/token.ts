const ACCESS_TOKEN_KEY = "accessToken";

export const getAccessToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  // socket 연결 시 작동 테스트
  console.log("🔑 getAccessToken 호출됨! 현재 토큰:", token);
  return token;
};

export const setAccessToken = (token: string) =>
  localStorage.setItem(ACCESS_TOKEN_KEY, token);

export const removeAccessToken = () =>
  localStorage.removeItem(ACCESS_TOKEN_KEY);
