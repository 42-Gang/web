import '@emotion/react';

import { palette } from '@/styles';

declare module '@emotion/react' {
  export interface Theme {
    palette: typeof palette;
  }
}
