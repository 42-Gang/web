import { createGlobalTheme } from '@vanilla-extract/css';

import { rem } from './pxto';

const fontFamily = {
  branding: `Super Pixel, sans-serif`,
  license: `QuinqueFive, sans-serif`,
  sans: `DungGeunMo, sans-serif`,
};

const fontSize = {
  md: rem(16),
};

const layout = {
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerX: {
    display: 'flex',
    justifyContent: 'center',
  },
  centerY: {
    display: 'flex',
    alignItems: 'center',
  },
  rowBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  columnCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnCenterX: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  columnCenterY: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

const size = {
  appWidth: rem(800),
  appHeight: rem(600),
  brandingTopMargin: rem(74),
};

const color = {
  white: 'hsl(0, 0%, 100%)',
  black: 'hsl(0, 0%, 0%)',
  brand: 'hsl(0, 48%, 59%)',
  orangeChat: 'hsl(14, 97%, 71%)',
  grayHover: 'hsl(0, 0%, 20%)',

  win: '#2272FF',
  lose: '#C83A3A',
  yellow: '#ECF411',

  friendHover: '#1E90FF',
  autoCustomHover: 'hsla(0, 0%, 100%, 0.2)',

  playerCard: '#A03434',
  opponentCard: '#34A09B',
  waiting: '#D2F474',
  matched: '#E890C7',
  chatText: '#545858',
};

const zIndex = {
  behind: '-1',
  default: '0',
  hover: '1',
  overlay: '100',
  header: '150',
  modal: '200',
  modalContent: '250',
};

const animation = {
  spinnerSlow: '5s linear infinite',
  spinnerMedium: '3s linear infinite',
  spinnerFast: '1s linear infinite',
};

export const theme = createGlobalTheme(':root', {
  fontFamily,
  fontSize,
  layout,
  size,
  color,
  zIndex,
  animation,
});
