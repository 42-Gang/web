import { globalStyle, style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const container = style({
  ...theme.layout.columnCenter,
  flex: 1,
  lineHeight: 1,
});

globalStyle(`${container} > :first-of-type`, {
  fontSize: rem(60),
  color: theme.color.white,
});

globalStyle(`${container} > :last-of-type`, {
  fontSize: rem(64),
  color: 'yellow',
});
