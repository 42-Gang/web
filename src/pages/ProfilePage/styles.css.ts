import { globalStyle, style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const container = style({
  ...theme.layout.center,
});

export const card = style({
  ...theme.layout.columnCenterX,
  width: '100%',
  gap: rem(40),
});

export const title = style({
  color: theme.color.white,
  fontSize: rem(60),
  lineHeight: 1,
});

export const content = style({
  ...theme.layout.rowBetween,
  position: 'relative',
  width: '100%',
  paddingBlock: 0,
  paddingInline: rem(96),
});

export const profileImage = style({
  flex: 1,
});

export const metadata = style({
  flex: 1,
  color: theme.color.white,
  fontSize: rem(26),
  lineHeight: 2,
});

globalStyle(`${metadata} p`, {
  marginBlock: rem(3),
});

globalStyle(`${metadata} strong`, {
  color: theme.color.yellow,
});

export const nickname = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: rem(10),
});

export const editButton = style({
  width: rem(24),
  height: rem(24),
  background: `url('/assets/images/editProfileIcon.svg') no-repeat center`,
  backgroundSize: 'contain',
});
