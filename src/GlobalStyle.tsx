import { css, Global } from '@emotion/react';

import { reset } from '@/styles';

const styles = css`
  ${reset}
  body {
    background-color: white;
  }
`;

export const GlobalStyle = () => <Global styles={styles} />;
