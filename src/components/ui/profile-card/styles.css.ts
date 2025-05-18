import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { rem, theme } from '@/styles';

export const profile = style({
  ...theme.layout.centerY,
  gap: rem(16),
});

export const avatar = style({
  width: rem(48),
  height: rem(48),
  borderRadius: '50%',
});

export const metadata = style({
  ...theme.layout.column,
  color: theme.color.white,
});

export const nickname = style({
  fontSize: rem(20),
  fontWeight: 600,
  lineHeight: 1.2,
});

export const status = style({
  ...theme.layout.centerY,
  fontSize: rem(14),
  fontWeight: 500,
  lineHeight: 1.2,
  gap: rem(6),
});

export const statusIcon = recipe({
  base: {
    width: rem(8),
    height: rem(8),
    borderRadius: '50%',
  },
  variants: {
    status: {
      ONLINE: { backgroundColor: '#00FF55' },
      OFFLINE: { backgroundColor: '#ABABAB' },
      GAME: { backgroundColor: '#FF0000' },
      LOBBY: { backgroundColor: '#00FF55' },
      AWAY: { backgroundColor: '#FFFB00' },
    },
  },
  defaultVariants: { status: 'OFFLINE' },
});
