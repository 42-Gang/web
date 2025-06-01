import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const wrapper = style({
  display: 'flex',
  width: '100%',
  height: '100%',
});

export const sidebar = style({
  ...theme.layout.column,
  width: '25%',
});

export const chatSection = style({
  ...theme.layout.column,
  width: '75%',
  height: '100%',
  padding: 0,
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
