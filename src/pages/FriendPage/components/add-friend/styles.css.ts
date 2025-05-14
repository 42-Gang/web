import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const title = style({
  marginBottom: rem(20),
  color: theme.color.white,
  fontFamily: theme.fontFamily.branding,
  fontSize: rem(30),
  lineHeight: 1.2,
});

export const input = style({
  width: rem(430),
  height: rem(46),
  marginBottom: rem(25),
  fontSize: rem(18),
  borderRadius: rem(15),
  textAlign: 'center',
});

export const userList = style({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: rem(240),
  overflowY: 'auto',
  scrollbarGutter: 'stable',
  border: rem(3),
  gap: rem(5),
});

export const userCard = style({
  width: rem(630),
  height: rem(80),
  border: `${rem(3)} solid ${theme.color.white}`,
  borderRadius: rem(10),
  transition: 'background-color 0.2s ease-in-out',

  selectors: {
    '&:hover': {
      backgroundColor: theme.color.friendHover,
    },
  },
});

export const avatar = style({
  width: rem(65),
  height: rem(67),
  marginTop: rem(4),
  marginLeft: rem(10),
  marginRight: rem(30),
});

export const nickname = style({
  color: theme.color.white,
  fontSize: rem(20),
});

export const friendRequest = style({
  width: rem(40),
  height: rem(40),
  marginRight: rem(20),
  background: "url('/assets/images/request-friend.svg') center/contain no-repeat",
});

export const requestedButton = style([
  friendRequest,
  {
    background: "url('/assets/images/request-success.svg') center/contain no-repeat",
    cursor: 'default',
    opacity: 1,
  },
]);
