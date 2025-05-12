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
