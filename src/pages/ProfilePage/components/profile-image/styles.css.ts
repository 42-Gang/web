import { globalStyle, style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const container = style({
  position: 'relative',
  width: rem(200),
  height: rem(200),
});

export const avatar = style({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  overflow: 'hidden',
});

globalStyle(`${avatar} img`, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const changeButton = style({
  ...theme.layout.center,
  position: 'absolute',
  bottom: rem(10),
  right: rem(10),
  width: rem(48),
  height: rem(48),
  background: 'white',
  borderRadius: '50%',
  cursor: 'pointer',
});

globalStyle(`${changeButton} img`, {
  width: '60%',
  height: '60%',
  objectFit: 'contain',
});
