import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const Title = style({
  marginTop: rem(42),
  marginBottom: rem(20),
  color: theme.color.white,
  fontFamily: theme.fontFamily.branding,
  fontSize: rem(30),
  textAlign: 'center',
  lineHeight: 1.2,
});

export const FriendContainer = style({
  display: 'flex',
  marginLeft: rem(120),
  gap: rem(12),
});

export const inputWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
});

export const input = style({
  width: rem(430),
  height: rem(46),
  fontSize: rem(18),
  borderRadius: rem(15),
  textAlign: 'center',
});

export const addFriend = style({
  width: rem(56),
  height: rem(46),
  marginTop: rem(8),
  background: "url('/assets/images/add-friend.svg') center/contain no-repeat",
  cursor: 'pointer',
  transition: 'opacity 0.2s ease-in-out',

  opacity: 0.6,

  selectors: {
    '&:hover': {
      opacity: 1,
    },
  },
});

export const alarm = style({
  alignSelf: 'flex-end',
  width: rem(32),
  height: rem(32),
  background: "url('/assets/images/alarm.svg') center/contain no-repeat",
  opacity: 0.6,
  transition: 'opacity 200ms ease-in-out',

  ':hover': { opacity: 1 },
});

export const separatorLine = style({
  width: '100%',
  height: rem(1),
  marginTop: rem(12),
  border: 'none',
  backgroundColor: theme.color.white,
});
