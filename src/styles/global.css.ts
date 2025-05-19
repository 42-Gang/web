import './reset.css';
import { globalFontFace, globalStyle } from '@vanilla-extract/css';

import { theme } from './theme.css';

globalFontFace('StWinterPixel', {
  src: `local('ST Winter Pixel 24 Regular'), url('/assets/fonts/StWinterPixel24Regular-w1e72.woff') format('woff')`,
  fontStyle: 'normal',
  fontWeight: 'normal',
});

globalFontFace('DungGeunMo', {
  src: `url('/assets/fonts/DungGeunMo.woff2') format('truetype')`,
  fontStyle: 'normal',
  fontWeight: 'normal',
});

globalStyle('html', {
  backgroundColor: theme.color.white,
});

globalStyle('body', {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: theme.size.appWidth,
  height: theme.size.appHeight,
  margin: '0',
  padding: '0',
  overflow: 'hidden',
  fontFamily: theme.fontFamily.sans,
  backgroundColor: theme.color.black,
});

globalStyle('#root', {
  ...theme.layout.columnCenterY,
  width: '100%',
  height: '100%',
});

globalStyle('*::-webkit-scrollbar', {
  width: '10px',
});

globalStyle('*::-webkit-scrollbar-thumb', {
  backgroundColor: '#bbb',
  borderRadius: '5px',
});

globalStyle('*::-webkit-scrollbar-track', {
  backgroundColor: 'transparent',
});

globalStyle('.pixel-toast', {
  fontFamily: 'DungGeunMo',
  color: 'black !important',
  fontSize: '17px !important',
  backgroundColor: 'white !important',
  border: '2px solid black !important',
  borderRadius: '4px !important',
  boxShadow: '0 4px 0 black !important',
});
