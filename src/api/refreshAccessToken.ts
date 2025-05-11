import ky from 'ky';

import { LOCAL_STORAGE } from './constants';
import { HttpResponse } from './types';

interface Response {
  accessToken: string;
}

const postRefreshToken = async () => {
  const response = await ky.post(`api/auth/refresh-token`, {
    credentials: 'include',
  });
  return await response.json<HttpResponse<Response>>();
};

export async function refreshAccessToken() {
  const { data } = (await postRefreshToken()) ?? {};
  const newAccessToken = data?.accessToken ?? undefined;

  if (newAccessToken) {
    window.localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, newAccessToken);
  }

  return newAccessToken;
}
