import { style } from '@vanilla-extract/css';

import { rem } from '@/styles';

export const friendItem = style({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
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

export const nickname = style({
  color: 'white',
  fontSize: '20px',
  marginRight: '10px',
});

export const avatar = style({
  width: '65px',
  height: '67px',
  marginRight: '30px',
});

export const status = style({});
