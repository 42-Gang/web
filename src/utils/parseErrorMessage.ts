import { HTTPError } from 'ky';

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
      return 'Failed to parse server response.';
    }
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return 'An unknown error occurred.';
  }
};
