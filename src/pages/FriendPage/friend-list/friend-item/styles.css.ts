import { style } from '@vanilla-extract/css';

import { rem } from '@/styles';

export const friendItem = style({
  display: 'flex',
  alignItems: 'center',
  padding: `${rem(12)} ${rem(16)}`,
  borderTop: '1px solid white',
  borderBottom: '1px solid white',
});

export const messageIcon = style({
  width: rem(39),
  height: rem(39),
  background: "url('/assets/images/message.svg') center/contain no-repeat",
});

export const userWrapper = style({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
});

export const nicknameContainer = style({
  position: 'relative',
  width: rem(140),
  marginRight: rem(500),
});

export const nickname = style({
  color: 'white',
  fontSize: rem(20),
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const avatar = style({
  width: rem(65),
  height: rem(67),
  marginRight: rem(30),
});

export const status = style({});
