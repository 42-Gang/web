import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const content = style({
  ...theme.layout.column,
  width: rem(700),
  height: rem(430),
  padding: rem(28),
});

export const title = style({
  color: theme.color.white,
  fontFamily: theme.fontFamily.branding,
  lineHeight: 1,
});

export const input = style({
  alignSelf: 'center',
  width: rem(520),
  height: rem(46),
  marginTop: rem(28),
  marginBottom: rem(32),
  color: theme.color.black,
  fontSize: rem(18),
  textAlign: 'center',
  outline: 'none',
  borderRadius: rem(15),
  backgroundColor: theme.color.white,
});

export const list = style({
  ...theme.layout.column,
  flex: 1,
  gap: rem(8),
});

export const item = style({
  ...theme.layout.rowBetween,
  padding: rem(16),
  border: `${rem(3)} solid ${theme.color.white}`,
  borderRadius: rem(15),
  gap: rem(16),
});

export const metadata = style({
  ...theme.layout.centerY,
  gap: rem(16),
});

export const avatar = style({
  width: rem(48),
  height: rem(48),
  borderRadius: '50%',
});

export const nickname = style({
  color: theme.color.white,
  fontSize: rem(20),
});

export const button = style({
  width: rem(32),
  height: rem(32),
});
