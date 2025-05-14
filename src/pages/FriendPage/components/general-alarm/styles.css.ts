import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const title = style({
  marginBottom: rem(50),
  color: theme.color.white,
  fontFamily: theme.fontFamily.branding,
  fontSize: rem(30),
  lineHeight: 1.2,
});

export const requestList = style({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: rem(240),
  overflowY: 'auto',
  scrollbarGutter: 'stable',
  gap: rem(5),
});

export const userCard = style({
  width: rem(630),
  height: rem(80),
  border: `${rem(3)} solid ${theme.color.white}`,
  borderRadius: rem(10),
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

export const approval = style({
  width: rem(40),
  height: rem(40),
  background: "url('/assets/images/approval.svg') center/contain no-repeat",
  cursor: 'pointer',
  opacity: 0.6,
  transition: 'opacity 0.2s ease-in-out',

  selectors: {
    '&:hover': {
      opacity: 1,
    },
  },
});

export const rejection = style({
  width: rem(40),
  height: rem(40),
  background: "url('/assets/images/rejection.svg') center/contain no-repeat",
  cursor: 'pointer',
  opacity: 0.6,
  transition: 'opacity 0.2s ease-in-out',

  selectors: {
    '&:hover': {
      opacity: 1,
    },
  },
});

export const button = style({
  marginLeft: 'auto',
  display: 'flex',
  gap: rem(8),
  marginRight: rem(16),
  alignItems: 'center',
});
