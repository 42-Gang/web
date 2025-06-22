import ky from 'ky';

import { LOCAL_STORAGE } from './constants';
import { HttpResponse } from './types';

interface Response {
  accessToken: string;
}

const postRefreshToken = async (): Promise<HttpResponse<Response>> => {
  return await ky
    .post(`/api/v1/auth/refresh-token`, {
      credentials: 'include',
    })
    .json();
};

export const refreshAccessToken = async (): Promise<string | undefined> => {
  const { data } = await postRefreshToken();
  const newAccessToken = data?.accessToken ?? undefined;

  if (newAccessToken) {
    window.localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, newAccessToken);
  }

  return newAccessToken;
};
