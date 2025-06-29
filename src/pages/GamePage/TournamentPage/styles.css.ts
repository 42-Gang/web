import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const container = style({
  ...theme.layout.columnCenter,
  width: '100%',
  height: '100%',
  padding: rem(20),
  gap: rem(20),
});

export const header = style({
  color: theme.color.white,
  textAlign: 'center',
});

export const title = style({
  fontSize: rem(50),
  fontWeight: 700,
});

export const round = style({
  fontSize: rem(36),
  fontWeight: 700,
});

export const buttonWrapper = style({
  ...theme.layout.center,
  marginBottom: rem(16),
});

export const readyButton = style({
  width: rem(120),
  height: rem(50),
  background: `url('/assets/images/ready-button.png') center / contain no-repeat`,
  marginTop: rem(-12),
});
