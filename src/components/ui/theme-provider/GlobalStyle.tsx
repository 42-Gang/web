import { css, Global } from '@emotion/react';

import { palette, reset, spacing } from '@/styles';

const fonts = [
  {
    '@font-face': {
      fontFamily: 'StWinterPixel',
      fontStyle: 'normal',
      fontWeight: 'normal',
      src: `local('ST Winter Pixel 24 Regular'), url('/assets/fonts/StWinterPixel24Regular-w1e72.woff') format('woff')`,
    },
  },
  {
    '@font-face': {
      fontFamily: 'DungGeunMo',
      fontStyle: 'normal',
      fontWeight: 'normal',
      src: `url('/assets/fonts/DungGeunMo.woff2') format('truetype')`,
    },
  },
];

const styles = css`
  ${reset}
  body,
  button,
  input,
  select,
  textarea {
    font-family: 'DungGeunMo', sans-serif;
    background-color: white;
    font-family: 'DungGeunMo', sans-serif;
  }

  #root {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: ${spacing.appWidth};
    height: ${spacing.appHeight};
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
