import { HTTPError } from 'ky';
import type { HttpResponse } from './types';

export const extractErrorData = async <T = undefined>(
  error: unknown,
): Promise<HttpResponse<T> | undefined> => {
  if (error instanceof HTTPError) {
    try {
      return (await error.response.json()) as HttpResponse<T>;
    } catch {
      return undefined;
    }
  }

  return undefined;
};
