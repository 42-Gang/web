import { Mutex } from 'async-mutex';
import ky, { type Options, type ResponsePromise } from 'ky';

import { LOCAL_STORAGE } from './constants';
import { refreshAccessToken } from './refreshAccessToken';

const tokenRefreshMutex = new Mutex();

const defaultOption: Options = {
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
          return tokenRefreshMutex.runExclusive(async () => {
            const newAccessToken = await refreshAccessToken();

            if (!newAccessToken) {
              window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
              return response;
            }

            const newHeaders = new Headers(options?.headers || {});
            newHeaders.set('Authorization', `Bearer ${newAccessToken}`);

            const url = new URL(request.url);
            const relativeUrl = url.pathname + url.search;

            return instance(relativeUrl, {
              ...options,
              headers: newHeaders,
            });
          });
        }

        return response;
      },
    ],
  },
  ...defaultOption,
});

export async function resultify<T>(response: ResponsePromise) {
  return await response.json<T>();
}

export const fetcher = {
  get: <T>(pathname: string, options?: Options) => resultify<T>(instance.get(pathname, options)),
  post: <T>(pathname: string, options?: Options) => resultify<T>(instance.post(pathname, options)),
  put: <T>(pathname: string, options?: Options) => resultify<T>(instance.put(pathname, options)),
  delete: <T>(pathname: string, options?: Options) =>
    resultify<T>(instance.delete(pathname, options)),
  patch: <T>(pathname: string, options?: Options) =>
    resultify<T>(instance.patch(pathname, options)),
};
