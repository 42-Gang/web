import { style } from '@vanilla-extract/css';

import { rem } from '@/styles';

export const branding = style({
  marginTop: rem(60),
});

export const license = style({
  marginBottom: rem(36),
});

export const label = style({
  display: 'inline-block',
  letterSpacing: rem(1),
  width: rem(100),
  textAlign: 'right',
});

export const inputRow = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: rem(12),
  color: 'white',
  fontSize: rem(24),
  textTransform: 'uppercase',
});

export const input = style({
  background: 'none',
  border: 'none',
  color: 'white',
  outline: 'none',
  width: rem(200),
  padding: `${rem(4)} ${rem(8)}`,
});
