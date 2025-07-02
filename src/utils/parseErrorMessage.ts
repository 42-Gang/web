import { HTTPError } from 'ky';

export const SERVER_PARSE_ERROR = 'Failed to parse server response.';
export const UNKNOWN_ERROR = 'An unknown error occurred.';

export const parseErrorMessage = async (
  error: unknown,
  fallbackMessage: string,
): Promise<string> => {
  if (error instanceof HTTPError) {
    try {
      const res = await error.response.json();
      return (
        (typeof res.message === 'string' && res.message.replace(/^body\//, '')) || fallbackMessage
      );
    } catch {
      return SERVER_PARSE_ERROR;
    }
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return UNKNOWN_ERROR;
  }
};
