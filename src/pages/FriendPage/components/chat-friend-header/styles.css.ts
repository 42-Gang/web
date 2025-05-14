import { style } from '@vanilla-extract/css';

import { rem } from '@/styles';
import { theme } from '@/styles/theme.css';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: rem(12),
});

export const profile = style({
  display: 'flex',
  alignItems: 'center',
  gap: rem(10),
  paddingLeft: rem(12),
});

export const avatar = style({
  width: rem(70),
  height: rem(70),
  borderRadius: '50%',
  objectFit: 'cover',
  flexShrink: 0,
});

export const nickname = style({
  color: theme.color.white,
  fontSize: rem(28),
  textTransform: 'uppercase',
  letterSpacing: rem(2),
});

export const blockButton = style({
  background: `url('/assets/images/base-button.png') no-repeat center`,
  backgroundSize: 'contain',
  width: rem(100),
  height: rem(40),
  color: theme.color.white,
  fontWeight: 'bold',
  fontSize: rem(16),
  cursor: 'pointer',
  transition: 'opacity 0.2s ease',
  marginTop: rem(30),
  textShadow: '0 0 0.25rem rgba(0, 0, 0, 0.6)',
});
