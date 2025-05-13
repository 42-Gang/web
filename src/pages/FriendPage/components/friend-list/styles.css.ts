import { style } from '@vanilla-extract/css';

import { rem } from '@/styles';
import { theme } from '@/styles/theme.css';

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
  cursor: 'pointer',
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
