export const parseSuccessMessage = (message: string, fallback: string): string => {
  return message.replace(/^body\//, '') || fallback;
};
