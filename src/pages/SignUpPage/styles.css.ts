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
  left: 220,
  transform: `translateY(-50%)`,
  width: rem(110),
  height: rem(40),
  color: theme.color.white,
  fontSize: rem(18),
  background: `url('/assets/images/base-button-normal.png') no-repeat center`,
  backgroundSize: 'contain',
  transition: 'opacity 250ms ease',

  zIndex: theme.zIndex.default,

  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      inset: 0,
      opacity: 0,
      pointerEvents: 'none',
      transition: 'opacity 250ms ease',
      background: "url('/assets/images/base-button-hover.png') center/contain no-repeat",
      zIndex: theme.zIndex.behind,
    },
    '&:hover::after': { opacity: 1 },
    '&[data-selected="true"]::after': { opacity: 1 },
  },
});

export const buttonText = style({
  transform: `translateY(-${rem(2)})`,
});

export const submitButton = style({
  ...theme.layout.center,
  position: 'relative',
  padding: `${rem(10)} ${rem(20)}`,
  marginTop: rem(20),
  color: theme.color.white,
  fontSize: rem(22),
  background: `url('/assets/images/base-button-normal.png') no-repeat center`,
  backgroundSize: 'contain',
  backgroundColor: 'transparent',
  zIndex: theme.zIndex.default,

  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      inset: 0,
      opacity: 0,
      pointerEvents: 'none',
      transition: 'opacity 250ms ease',
      background: "url('/assets/images/base-button-hover.png') center/contain no-repeat",
      zIndex: theme.zIndex.behind,
    },
    '&:hover::after': { opacity: 1 },
    '&[data-selected="true"]::after': { opacity: 1 },
  },
});

export const check = style({
  background: `url('/assets/images/check-circle.svg') no-repeat center`,
  position: 'absolute',
  backgroundColor: theme.color.black,
  top: '50%',
  right: rem(60),
  width: rem(20),
  height: rem(20),
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  borderRadius: '50%',

  selectors: {
    '&[data-show="true"]': {
      opacity: 1,
    },
  },
});

export const toggleButton = style({
  position: 'absolute',
  top: '50%',
  right: rem(60),
  transform: 'translateY(-50%)',
  width: rem(20),
  height: rem(20),
  border: 'none',
  padding: 0,
  cursor: 'pointer',

  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain',

  backgroundImage: `url('/assets/images/show-password-false.png')`,

  selectors: {
    '&[data-show="true"]': {
      backgroundImage: `url('/assets/images/show-password-true.png')`,
    },
  },
});
