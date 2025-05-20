import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { rem, theme } from '@/styles';

export const friendListWrapper = style({
  maxHeight: rem(369),
  overflowY: 'auto',
  marginTop: rem(10),
});

export const friendList = style({
  width: rem(200),
  height: '100%',
  color: theme.color.white,
  paddingTop: rem(50),
  overflowY: 'auto',
  overflowX: 'hidden',
});

export const list = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
});

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: rem(10),
  padding: `${rem(6)} ${rem(1)} ${rem(6)} ${rem(9)}`,
  borderBottom: `${rem(1.5)} solid ${theme.color.white}`,
  fontSize: rem(22),
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  ':hover': {
    backgroundColor: theme.color.grayHover,
  },
});

export const avatar = style({
  width: rem(42),
  height: rem(42),
  borderRadius: '50%',
  objectFit: 'cover',
});

export const divider = style({
  width: rem(200),
  height: rem(1),
  backgroundColor: theme.color.white,
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
