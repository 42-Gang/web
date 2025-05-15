import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const wrapper = style({
  display: 'flex',
  width: rem(800),
  height: rem(600),
  margin: '0 auto',
  backgroundColor: '#111',
  border: `${rem(2)} solid ${theme.color.white}`,
  overflow: 'hidden',
});

export const chatSection = style({
  display: 'flex',
  flexDirection: 'column',
  width: rem(600),
  height: rem(600),
  padding: 0,
  justifyContent: 'flex-end',
});

export const sidebar = style({
  width: rem(200),
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
});

export const header = style({
  height: rem(50),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: rem(8),
});

export const friendListWrapper = style({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: 0,
});

export const exitButton = style({
  background: `url('/assets/images/back-button.svg') no-repeat center`,
  backgroundSize: 'contain',
  width: rem(30),
  height: rem(30),
  border: 'none',
});

export const divider = style({
  width: rem(200),
  height: rem(1),
  backgroundColor: theme.color.white,
  marginBottom: 0,
  marginTop: 0,
});
