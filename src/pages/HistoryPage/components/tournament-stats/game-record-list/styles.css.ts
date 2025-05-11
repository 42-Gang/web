import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const scroll = style({
  ...theme.layout.column,
  maxHeight: rem(282),
  marginTop: rem(15),
  gap: rem(10),
  overflowY: 'auto',
});

export const record = style({
  ...theme.layout.rowBetween,
  alignItems: 'flex-start',
  width: rem(500),
  paddingBlock: rem(12),
  paddingInline: rem(16),
  fontSize: rem(25),
  borderRadius: rem(8),
  backgroundColor: '#D9D9D9',
});

export const label = style({
  marginRight: rem(16),
  fontWeight: 700,
});

export const playerList = style({
  ...theme.layout.columnCenter,
  gap: rem(4),
});

export const playerName = style({
  color: theme.color.black,
});

export const win = style({
  fontWeight: 700,
  color: theme.color.win,
});

export const lose = style({
  fontWeight: 700,
  color: theme.color.lose,
});
