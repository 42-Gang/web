import ky, { type BeforeRetryState, HTTPError, type Options, type ResponsePromise } from 'ky';
import { getAccessToken, refreshToken } from './token';

const API_URL = typeof window === 'undefined' ? 'https://pingpong.n-e.kr/api' : '/api';
const IS_BROWSER = typeof window !== 'undefined';

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

  const oldToken = request.headers.get('Authorization')?.replace('Bearer ', '');
  const currentToken = getAccessToken();

  if (oldToken !== currentToken && currentToken) {
    console.log('[fetcher] Token already refreshed by another request, retrying');
    return;
  }

  try {
    await refreshToken({
      onFailure: (error: unknown) => {
        if (error instanceof HTTPError && error.response.status === 400) {
          handleAuthFailure({ reason: '토큰 갱신 실패', showAlert: false });
        } else {
          handleAuthFailure({ reason: '토큰 갱신 실패', showAlert: true });
        }
      },
    });
    return;
  } catch (refreshError) {
    console.warn('[fetcher] Token refresh failed, stopping retry:', refreshError);
    return ky.stop;
  }
};

const handleAuthFailure = ({
  reason,
  showAlert = true,
}: {
  reason: string;
  showAlert?: boolean;
}) => {
  console.warn(`[fetcher] Auth failure: ${reason}`);

  if (IS_BROWSER) {
    if (showAlert) {
      alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
      window.location.replace('/auth');
    } else {
      window.location.replace('/auth');
    }
  }
};

export const instance = ky.create({
  prefixUrl: API_URL,
  headers: { 'Content-Type': 'application/json' },
  hooks: {
    beforeRequest: [
      request => {
        const accessToken = getAccessToken();
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
