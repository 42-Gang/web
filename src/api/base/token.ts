import ky from 'ky';
import type { HttpResponse } from '~/api';
import { env } from '~/constants/variables';

const API_URL = typeof window === 'undefined' ? 'https://pingpong.n-e.kr/api' : '/api';
const IS_BROWSER = typeof window !== 'undefined';

let refreshPromise: Promise<TokenRefreshResult> | null = null;

export const getAccessToken = (): string | null => {
  if (!IS_BROWSER) return null;
  return window.localStorage.getItem(env.access_token);
};

export const refreshTokenInternal = async () => {
  const client = ky.create({
    prefixUrl: API_URL,
    headers: { 'Content-Type': 'application/json' },
    retry: 0,
    timeout: 30000,
    credentials: 'include',
  });

  const response = await client
    .post<HttpResponse<{ accessToken: string }>>('v1/auth/refresh-token', { json: null })
    .json();

  if (response.status === 'SUCCESS' && response.data?.accessToken) {
    window.localStorage.setItem(env.access_token, response.data.accessToken);
  } else {
    throw new Error('토큰 갱신 실패: 유효하지 않은 응답');
  }
};

export interface TokenRefreshResult {
  success: boolean;
  token: string | null;
}

export const refreshToken = (options?: {
  onFailure?: (error: Error) => void;
}): Promise<TokenRefreshResult> => {
  if (!IS_BROWSER) {
    return Promise.resolve({ success: false, token: null });
  }

  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        console.log('[token] Refreshing token');
        await refreshTokenInternal();
        console.log('[token] Token refreshed successfully');
        const token = getAccessToken();
        if (!token) {
          throw new Error('Token is null after successful refresh');
        }
        return { success: true, token };
      } catch (error) {
        const err = error instanceof Error ? error : new Error('토큰 갱신 실패');
        throw err;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise.catch(err => {
    options?.onFailure?.(err);
    throw err;
  });
};
