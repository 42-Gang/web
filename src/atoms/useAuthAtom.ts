import { atom, useAtom } from 'jotai';

import { LOCAL_STORAGE } from '@/api';

const storageMethod = {
  getItem: (key: string, initialValue: string | null) => {
    return window.localStorage.getItem(key) ?? initialValue;
  },
  setItem: (key: string, value: string | null) => {
    window.localStorage.setItem(key, value as string);
  },
  removeItem: (key: string) => {
    window.localStorage.removeItem(key);
  },
};

const accessTokenAtom = atom<string | null>(
  storageMethod.getItem(LOCAL_STORAGE.ACCESS_TOKEN, null),
);

export const useAuthAtom = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);

  const setToken = (accessToken: string) => {
    storageMethod.setItem(LOCAL_STORAGE.ACCESS_TOKEN, accessToken);
    setAccessToken(accessToken);
  };

  const removeToken = () => {
    storageMethod.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
    setAccessToken(null);
  };

  const isLogin = () => !!accessToken;

  return {
    token: accessToken,
    setToken,
    removeToken,
    isLogin,
  };
};
