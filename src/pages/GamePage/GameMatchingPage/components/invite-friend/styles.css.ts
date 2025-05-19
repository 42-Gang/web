import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const fixedDialogContent = style({
  width: rem(495),
  height: rem(385),
  padding: rem(24),
  borderRadius: rem(12),
  display: 'flex',
  flexDirection: 'column',
});

export const title = style({
  marginBottom: rem(20),
  color: theme.color.white,
  fontFamily: theme.fontFamily.branding,
  fontSize: rem(25),
  lineHeight: 1.2,
});

export const input = style({
  width: rem(350),
  height: rem(36),
  fontSize: rem(16),
  borderRadius: rem(12),
  marginBottom: rem(24),
  padding: `0 ${rem(12)}`,
  boxSizing: 'border-box',
  textAlign: 'center',
  margin: `0 auto ${rem(24)}`,
});

export const userList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: rem(10),
  maxHeight: rem(200),
  overflowY: 'auto',
  scrollbarGutter: 'stable',
  paddingRight: rem(4),
});

export const userCard = style({
  width: rem(340),
  height: rem(60),
  margin: '0 auto',
  border: `${rem(3)} solid ${theme.color.white}`,
  borderRadius: rem(10),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `0 ${rem(20)}`,
  boxSizing: 'border-box',
  transition: 'background-color 0.2s ease-in-out',
  flexShrink: 0,

  selectors: {
    '&:hover': {
      backgroundColor: theme.color.friendHover,
    },
  },
});

export const leftInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: rem(12),
});

export const avatar = style({
  width: rem(49),
  height: rem(49),
  marginTop: rem(4),
  marginLeft: rem(10),
  marginRight: rem(30),
});

export const nickname = style({
  color: theme.color.white,
  fontSize: rem(20),
});

export const inviteRequestButton = style({
  width: rem(36),
  height: rem(36),
  marginRight: rem(20),
  background: "url('/assets/images/request-friend.svg') center/contain no-repeat",
});

export const requestedButton = style([
  inviteRequestButton,
  {
    background: "url('/assets/images/request-success.svg') center/contain no-repeat",
    cursor: 'default',
    opacity: 1,
  },
]);
