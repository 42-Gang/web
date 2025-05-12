import { keyframes, style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const fadeOut = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

const scaleUpAndFade = keyframes({
  from: {
    opacity: 0,
    transform: 'translate(-50%, -50%) scale(0.95)',
  },
  to: {
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1)',
  },
});

const scaleDownAndFade = keyframes({
  from: {
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1)',
  },
  to: {
    opacity: 0,
    transform: 'translate(-50%, -50%) scale(0.95)',
  },
});

export const trigger = style({});

export const overlay = style({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: theme.zIndex.modal,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  inset: 0,

  selectors: {
    '&[data-state="open"]': {
      animation: `${fadeIn} 100ms ease-out`,
    },
    '&[data-state="closed"]': {
      animation: `${fadeOut} 100ms ease-out`,
    },
  },
});

export const content = style({
  position: 'fixed',
  left: '50%',
  top: '50%',
  display: 'grid',
  width: '100%',
  maxWidth: rem(728),
  padding: rem(28),
  borderRadius: rem(20),
  backgroundColor: theme.color.black,
  boxShadow: `0 ${rem(16)} ${rem(70)} rgba(0, 0, 0, 0.2)`,
  transform: 'translate(-50%, -50%)',
  zIndex: theme.zIndex.modalContent,

  selectors: {
    '&[data-state="open"]': {
      animation: `${scaleUpAndFade} 100ms ease-out`,
    },
    '&[data-state="closed"]': {
      animation: `${scaleDownAndFade} 100ms ease-out`,
    },
  },
});

export const close = style({
  ...theme.layout.center,
  position: 'absolute',
  top: rem(12),
  right: rem(12),
  width: rem(32),
  height: rem(32),
  borderRadius: '50%',
  backgroundColor: 'transparent',
  opacity: 1,
  transition: 'opacity 250ms',

  ':hover': { opacity: 0.7 },
});

export const title = style({
  fontSize: rem(28),
  textAlign: 'center',
});
