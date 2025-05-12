import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const title = style({
  marginTop: rem(32),
  marginBottom: rem(20),
  color: theme.color.white,
  fontFamily: theme.fontFamily.branding,
  fontSize: rem(30),
  textAlign: 'center',
  lineHeight: 1.2,
});

export const inputContainer = style({
  ...theme.layout.centerY,
  position: 'relative',
  width: rem(500),
  height: rem(42),
  marginTop: rem(32),
});

export const input = style({
  flex: 1,
  height: '100%',
  color: theme.color.black,
  borderRadius: rem(10),
  backgroundColor: theme.color.white,
});
