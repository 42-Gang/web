import { ThemeProvider as BaseThemeProvider } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

import { palette } from '@/styles';

const theme = { palette };

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <BaseThemeProvider theme={theme}>
    {children}
    <Toaster />
  </BaseThemeProvider>
);

export { GlobalStyle } from './GlobalStyle';
