import { css, Global } from '@emotion/react';

import { palette, reset } from '@/styles';

const fonts = [
  {
    '@font-face': {
      fontFamily: 'StWinterPixel',
      fontStyle: 'normal',
      fontWeight: 'normal',
      src: `local('ST Winter Pixel 24 Regular'), url('/assets/fonts/StWinterPixel24Regular-w1e72.woff') format('woff')`,
    },
  },
];

const styles = css`
  ${reset}
  body {
    background-color: white;
  }

  #root {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 800px;
    height: 600px;
    margin: 0;
    padding: 0;

    overflow: hidden;
    background-color: ${palette.black};
  }
`;

export const GlobalStyle = () => (
  <>
    <Global styles={fonts} />
    <Global styles={styles} />
  </>
);
