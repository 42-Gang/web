import { style } from '@vanilla-extract/css';

import { rem } from '@/styles';

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
  color: 'white',
  fontSize: rem(28),
  textTransform: 'uppercase',
  letterSpacing: rem(2),
});

export const blockButton = style({
  background: `url('/assets/images/base-button.png') no-repeat center`,
  backgroundSize: 'contain',
  width: '100px',
  height: '40px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'opacity 0.2s ease',
  marginTop: rem(30),
  textShadow: '0 0 4px rgba(0, 0, 0, 0.6)',
});
