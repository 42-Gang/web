import { Mutex } from 'async-mutex';
import ky, { HTTPError, type Options, type ResponsePromise } from 'ky';

import { LOCAL_STORAGE } from './constants';
import { refreshAccessToken } from './refreshAccessToken';

const tokenRefreshMutex = new Mutex();

const defaultOptions: Options = {
  retry: 0,
  timeout: 5000,
  credentials: 'include',
};

export const instance = ky.create({
  prefixUrl: '/api',
  headers: { 'content-type': 'application/json' },
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = window.localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);

        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (!response.ok && response.status === 401 && !request.url.includes('logout')) {
          try {
            let accessToken: string | undefined;

            if (tokenRefreshMutex.isLocked()) {
              await tokenRefreshMutex.waitForUnlock();

              const newAccessToken = window.localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);

              if (newAccessToken) {
                accessToken = newAccessToken;
              }
            } else {
              await tokenRefreshMutex.acquire();
              accessToken = await refreshAccessToken();
            }

            request.headers.set('Authorization', `Bearer ${accessToken}`);
            return ky(request, options);
          } catch (e) {
            if (e instanceof HTTPError && e.response.url.includes('refresh-token')) {
              window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
              alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
              window.location.href = '/';
            }

            if (e instanceof Error) {
              console.warn(`[fetcher.ts] ${e.name} (${e.message})`);
            }
          } finally {
            tokenRefreshMutex.release();
          }
        }
        return response;
      },
    ],
  },
  ...defaultOptions,
});

export const resultify = async <T>(response: ResponsePromise) => {
  return await response.json<T>();
};

export const fetcher = {
  get: <T>(path: string, options?: Options) => resultify<T>(instance.get(path, options)),
  post: <T>(path: string, options?: Options) => resultify<T>(instance.post(path, options)),
  put: <T>(path: string, options?: Options) => resultify<T>(instance.put(path, options)),
  delete: <T>(path: string, options?: Options) => resultify<T>(instance.delete(path, options)),
  patch: <T>(path: string, options?: Options) => resultify<T>(instance.patch(path, options)),
};
