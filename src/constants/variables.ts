export const env = {
  api_base: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  access_token: process.env.NEXT_PUBLIC_ACCESS_COOKIE_NAME || '',
  refresh_token: process.env.NEXT_PUBLIC_REFRESH_COOKIE_NAME || '',
};
