import { ThemeProvider as BaseThemeProvider } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

import palette from './palette';

const theme = { palette };

export const UIProvider = ({ children }: PropsWithChildren) => (
  <BaseThemeProvider theme={theme}>
    {children}
    <Toaster />
  </BaseThemeProvider>
);
