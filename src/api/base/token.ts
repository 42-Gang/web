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

export const refreshTokenWithMutex = async (options?: {
  onFailure?: (error: Error) => void;
}): Promise<TokenRefreshResult> => {
  if (!IS_BROWSER) {
    return { success: false, token: null };
  }

  try {
    if (tokenRefreshMutex.isLocked()) {
      console.log('[token] Token refresh already in progress, waiting');
      await tokenRefreshMutex.waitForUnlock();
      const token = getAccessToken();
      return { success: !!token, token };
    }

    await tokenRefreshMutex.runExclusive(async () => {
      console.log('[token] Refreshing token');
      await refreshToken();
      console.log('[token] Token refreshed successfully');
    });

    const token = getAccessToken();
    return { success: true, token };
  } catch (error) {
    console.error('[token] Token refresh failed:', error);
    const err = error instanceof Error ? error : new Error('토큰 갱신 실패');

    options?.onFailure?.(err);

    throw err;
  }
};
