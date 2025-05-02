import '@emotion/react';

import { palette } from '@/components/ui/UIProvidier/palette';

declare module '@emotion/react' {
  export interface Theme {
    palette: typeof palette;
  }
}
