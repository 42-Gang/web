import '@emotion/react';

import { palette, layout, zIndex } from '@/styles';

declare module '@emotion/react' {
  export interface Theme {
    palette: typeof palette;
    layout: typeof layout;
    zIndex: typeof zIndex;
  }
}
