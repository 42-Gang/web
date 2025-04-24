import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch (err) {
    console.error("❌ 토큰 디코딩 실패:", err);
    return null;
  }
};
