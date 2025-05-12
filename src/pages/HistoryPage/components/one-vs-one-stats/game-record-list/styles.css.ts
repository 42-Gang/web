import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const list = style({
  ...theme.layout.column,
  maxHeight: rem(282),
  marginTop: rem(16),
  gap: rem(6),
  overflowY: 'auto',
});

export const item = style({
  ...theme.layout.rowBetween,
  width: rem(452),
  height: rem(40),
  paddingBlock: rem(8),
  paddingInline: rem(12),
  fontSize: rem(25),
  borderRadius: rem(6),
  backgroundColor: '#D9D9D9',
});

export const player = style({
  color: theme.color.black,
});

export const win = style({
  color: theme.color.win,
  fontWeight: 700,
});

export const lose = style({
  color: theme.color.lose,
  fontWeight: 700,
});
