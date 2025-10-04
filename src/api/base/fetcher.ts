import { Mutex } from 'async-mutex';
import ky, { type BeforeRetryState, HTTPError, type Options, type ResponsePromise } from 'ky';
import type { HttpResponse } from '~/api';
import { env } from '~/constants/variables';

const API_URL = typeof window === 'undefined' ? 'https://pingpong.n-e.kr/api' : '/api';
const IS_BROWSER = typeof window !== 'undefined';

const tokenRefreshMutex = new Mutex();

const defaultOption: Options = {
  retry: {
    limit: 2,
    methods: ['get', 'post', 'put', 'patch', 'delete'],
    statusCodes: [401],
  },
  timeout: 30000,
  credentials: 'include',
};

const handleTokenRefresh = async ({ error, request }: BeforeRetryState) => {
  if (!IS_BROWSER) return ky.stop;
  if (!(error instanceof HTTPError) || error.response.status !== 401) return ky.stop;
  if (request.url.includes('logout')) return ky.stop;

  try {
    if (tokenRefreshMutex.isLocked()) {
      await tokenRefreshMutex.waitForUnlock();
      return;
    }

    await tokenRefreshMutex.runExclusive(async () => await refreshToken());

    return;
  } catch (refreshError) {
    console.warn('[fetcher.ts] Token refresh failed:', refreshError);
    handleAuthFailure('토큰 갱신 실패');
    return ky.stop;
  }
};

const handleAuthFailure = (reason: string) => {
  console.warn(`[fetcher.ts] Auth failure: ${reason}`);

  if (IS_BROWSER) {
    alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
    window.location.href = '/auth';
  }
};

export const instance = ky.create({
  prefixUrl: API_URL,
  headers: { 'Content-Type': 'application/json' },
  hooks: {
    beforeRequest: [
      request => {
        const accessToken = window.localStorage.getItem(env.access_token);
        if (accessToken) request.headers.set('Authorization', `Bearer ${accessToken}`);
      },
    ],
    beforeRetry: [handleTokenRefresh],
  },
  ...defaultOption,
});

export async function resultify<T>(response: ResponsePromise) {
  const res = await response;

  if (res.status === 204) {
    return undefined as unknown as T;
  }

  const ct = res.headers.get('content-type') ?? '';
  if (ct.includes('application/json') || ct.includes('+json')) {
    return res.json<T>();
  }
  return (await res.text()) as unknown as T;
}

export const fetcher = {
  get: <T>(pathname: string, options?: Options) => resultify<T>(instance.get(pathname, options)),
  post: <T>(pathname: string, options?: Options) => resultify<T>(instance.post(pathname, options)),
  put: <T>(pathname: string, options?: Options) => resultify<T>(instance.put(pathname, options)),
  patch: <T>(pathname: string, options?: Options) =>
    resultify<T>(instance.patch(pathname, options)),
  delete: <T>(pathname: string, options?: Options) =>
    resultify<T>(instance.delete(pathname, options)),
};

const refreshToken = async () => {
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
