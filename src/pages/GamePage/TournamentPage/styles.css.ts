import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const container = style({
  width: theme.size.appWidth,
  height: theme.size.appHeight,
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden',
});

export const bracketSection = style({
  width: rem(600),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: rem(20),
  gap: rem(20),
  backgroundColor: theme.color.black,
});

export const chatSection = style({
  width: rem(200),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.color.orangeChat,
  padding: rem(16),
});

export const titleWrapper = style({
  textAlign: 'center',
  color: theme.color.white,
});

export const title = style({
  fontSize: rem(50),
  fontWeight: 'bold',
});

export const round = style({
  fontSize: rem(36),
  fontWeight: 'bold',
});

export const readyButtonWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: rem(16),
});

export const readyButton = style({
  width: rem(120),
  height: rem(50),
  background: `url('/assets/images/ready-button.png') center / contain no-repeat`,
});

export const backButton = style({
  position: 'absolute',
  top: rem(12),
  left: rem(12),
  width: rem(30),
  height: rem(30),
  background: `url('/assets/images/back-button.svg') center / contain no-repeat`,
});
