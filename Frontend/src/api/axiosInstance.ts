// axios 요청 전에 처리되므로
// axios 인스턴스를 생성해서 interceptor 안에 구현

// api/axiosInstance.ts
import axios from "axios";
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
} from "../../mock/utils/token";

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // 쿠키 포함
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("🧩 요청:", config.url, config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
instance.interceptors.response.use(
  (res) => {
    console.log("🧩 응답:", res.config.url, res.status);
    return res;
  },
  async (err) => {
    const originalRequest = err.config;

    // 401 오류 발생 시 토큰 만료 처리
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/v1/auth/refresh-token`,
          {},
          // 쿠키에서 refreshToken 사용
          { withCredentials: true }
        );

        const newToken = res.data.data.accessToken;
        setAccessToken(newToken);

        // 기존 요청에 새 토큰 설정 후 재요청
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token 갱신 실패:", refreshError);
        removeAccessToken();
        // 로그인 페이지로 이동
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
