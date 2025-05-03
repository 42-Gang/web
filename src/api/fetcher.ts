import { Mutex } from 'async-mutex';
import ky, { HTTPError, type Options, type ResponsePromise } from 'ky';

import { LOCAL_STORAGE } from './constants';
import { refreshAccessToken } from './refreshAccessToken';

const tokenRefreshMutex = new Mutex();

const defaultOption: Options = {
  retry: 0,
  timeout: 5_000,
  credentials: 'include',
};

const baseURL: string = `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_API_VERSION}`;

export const instance = ky.create({
  prefixUrl: baseURL,
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
            if (e instanceof HTTPError && e.response.url.includes('/refresh-token')) {
              window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
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
