import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const content = style({
  width: rem(386),
  backgroundColor: theme.color.white,
});

export const message = style({
  fontSize: rem(20),
  fontWeight: 700,
  textAlign: 'center',
});

export const group = style({
  ...theme.layout.column,
  marginTop: rem(28),
  gap: rem(16),
});

export const button = style({
  height: rem(40),
  width: '100%',
  fontSize: rem(24),
  fontWeight: 700,
  textAlign: 'center',
  border: `${rem(3)} solid ${theme.color.black}`,
  borderRadius: rem(10),
  backgroundColor: theme.color.white,

  ':hover': {
    backgroundColor: '#EEEEEE',
  },
});

export const logout = style([
  button,
  {
    color: 'red',
    borderColor: 'red',
    ':hover': { color: theme.color.white, backgroundColor: 'red' },
  },
]);
