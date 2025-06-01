import { globalStyle, style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const wrapper = style({
  width: '100%',
  height: '100%',
  color: theme.color.white,
  paddingTop: rem(60),
  overflowY: 'auto',
  overflowX: 'hidden',
});

export const list = style({
  ...theme.layout.column,
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

export const item = style({
  ...theme.layout.centerY,
  paddingBlock: rem(6),
  paddingInline: rem(10),
  fontSize: rem(22),
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  borderBottom: `${rem(1)} solid ${theme.color.white}`,
  overflow: 'hidden',
  gap: rem(10),

  ':hover': { backgroundColor: theme.color.grayHover },
});

globalStyle(`${item}:first-child`, {
  borderTop: `${rem(1)} solid ${theme.color.white}`,
});

export const current = style({
  backgroundColor: theme.color.grayHover,
});

export const avatar = style({
  width: rem(42),
  height: rem(42),
  borderRadius: '50%',
  objectFit: 'cover',
});
