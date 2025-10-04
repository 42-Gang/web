import { Mutex } from 'async-mutex';
import ky from 'ky';
import type { HttpResponse } from '~/api';
import { env } from '~/constants/variables';

const API_URL = typeof window === 'undefined' ? 'https://pingpong.n-e.kr/api' : '/api';
const IS_BROWSER = typeof window !== 'undefined';

export const tokenRefreshMutex = new Mutex();

export const getAccessToken = (): string | null => {
  if (!IS_BROWSER) return null;
  return window.localStorage.getItem(env.access_token);
};

export const refreshToken = async () => {
  const client = ky.create({
    prefixUrl: API_URL,
    headers: { 'Content-Type': 'application/json' },
    retry: 0,
    timeout: 30000,
    credentials: 'include',
  });

  const response = await client
    .post<HttpResponse<{ accessToken: string }>>('v1/auth/refresh-token')
    .json();

  if (response.status === 'SUCCESS' && response.data?.accessToken) {
    window.localStorage.setItem(env.access_token, response.data.accessToken);
  } else {
    throw new Error('토큰 갱신 실패: 유효하지 않은 응답');
  }
};
