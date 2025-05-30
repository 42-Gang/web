import { Mutex } from 'async-mutex';
import ky, { type Options, type ResponsePromise } from 'ky';

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
        const token = window.localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401 && !request.url.includes('logout')) {
          return tokenRefreshMutex.runExclusive(async () => {
            const currentToken = window.localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
            const originalToken = request.headers.get('Authorization')?.replace('Bearer ', '');

            if (currentToken && currentToken !== originalToken) {
              const retryHeaders = new Headers(request.headers);
              retryHeaders.set('Authorization', `Bearer ${currentToken}`);

              return instance(request.url, {
                ...options,
                headers: retryHeaders,
                prefixUrl: undefined,
              });
            }

            const newToken = await refreshAccessToken();
            if (!newToken) {
              window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
              return response;
            }

            const retryHeaders = new Headers(options?.headers || {});
            retryHeaders.set('Authorization', `Bearer ${newToken}`);

            return instance(request.url, {
              ...options,
              headers: retryHeaders,
              prefixUrl: undefined,
            });
          });
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
