import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const branding = style({
  marginTop: theme.size.brandingTopMargin,
});

export const form = style({
  ...theme.layout.columnCenterX,
  paddingBottom: rem(24),
  gap: rem(6),
});

export const row = style({
  display: 'grid',
  gridTemplateColumns: `${rem(190)} 1fr`,
  alignItems: 'center',
  maxWidth: rem(500),
  marginInline: 'auto',
  transform: `translateX(-${rem(20)})`,
});

export const label = style({
  color: theme.color.white,
  fontSize: rem(23),
  textAlign: 'right',
  whiteSpace: 'nowrap',
  letterSpacing: rem(2),
  transform: `translateY(-${rem(2)})`,
});

export const inputWrapper = style({
  position: 'relative',
  width: '100%',
});

export const input = style({
  width: '100%',
  paddingBlock: rem(6),
  paddingLeft: rem(10),
  paddingRight: rem(100),
  color: theme.color.white,
  fontSize: rem(20),
  background: 'transparent',
  border: 'none',

  ':focus': {
    outline: 'none',
  },
});

export const verifyButton = style({
  ...theme.layout.center,
  position: 'absolute',
  top: '50%',
  right: 0,
  transform: `translateY(-50%)`,
  width: rem(110),
  height: rem(40),
  color: theme.color.white,
  fontSize: rem(18),
  background: `url('/assets/images/base-button-normal.png') no-repeat center`,
  backgroundSize: 'contain',
  opacity: 1,
  transition: 'opacity 250ms ease',

  ':hover': {
    opacity: 0.7,
  },
});

export const buttonText = style({
  transform: `translateY(-${rem(2)})`,
});

export const submitButton = style({
  ...theme.layout.center,
  padding: `${rem(10)} ${rem(20)}`,
  marginTop: rem(20),
  color: theme.color.white,
  fontSize: rem(22),
  background: `url('/assets/images/base-button-normal.png') no-repeat center`,
  backgroundSize: 'contain',
  opacity: 1,
  transition: 'opacity 250ms ease',

  ':hover': {
    opacity: 0.7,
  },
});

export const backButton = style({
  position: 'absolute',
  top: rem(12),
  left: rem(12),
  width: rem(30),
  height: rem(30),
  background: `url('/assets/images/back-button.svg') center / contain no-repeat`,
});
