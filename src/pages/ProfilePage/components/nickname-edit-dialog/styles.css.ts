import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const content = style({
  ...theme.layout.columnCenterY,
  width: rem(386),
  backgroundColor: theme.color.white,
});

export const title = style({
  color: theme.color.black,
  fontSize: rem(27),
  fontWeight: 700,
  textAlign: 'center',
  lineHeight: 1,
});

export const input = style({
  padding: `${rem(10)} ${rem(12)}`,
  marginTop: rem(28),
  height: rem(40),
  color: theme.color.black,
  fontSize: rem(20),
  fontWeight: 700,
  textAlign: 'center',
  border: `${rem(3)} solid ${theme.color.black}`,
  borderRadius: rem(10),
  outline: 'none',
  backgroundColor: theme.color.white,
});

export const button = style({
  alignSelf: 'center',
  height: rem(40),
  width: '60%',
  marginTop: rem(28),
  fontSize: rem(24),
  fontWeight: 700,
  textAlign: 'center',
  lineHeight: 1,
  opacity: 1,
  borderRadius: rem(10),
  backgroundColor: theme.color.black,

  ':hover': {
    opacity: 0.7,
  },
});
