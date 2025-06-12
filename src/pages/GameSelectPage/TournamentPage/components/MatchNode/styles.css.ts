import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const treeWrapper = style({
  ...theme.layout.columnCenter,
  gap: rem(20),
});

export const leafWrapper = style({
  ...theme.layout.columnCenter,
  gap: rem(50),
  marginTop: rem(-35),
});

export const branchWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  width: rem(500),
  gap: rem(55),
});

export const roundWrapper = style({
  ...theme.layout.columnCenter,
  gap: rem(16),
  marginTop: rem(40),
});

export const matchBox = style({
  display: 'flex',
  alignItems: 'center',
  gap: rem(12),
  backgroundColor: theme.color.black,
  padding: rem(8),
  border: `2px solid ${theme.color.white}`,
  borderRadius: rem(12),
});

export const vs = style({
  position: 'absolute',
  top: rem(30),
  left: '50%',
  transform: 'translateX(-50%)',
  color: theme.color.white,
  fontWeight: 'bold',
  fontSize: rem(26),
});

export const matchBoxNoBorder = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: rem(6),
  width: rem(250),
  gap: rem(60),
});

export const centerColumn = style({
  ...theme.layout.columnCenter,
});

export const questionImage = style({
  width: rem(180),
  height: rem(180),
  objectFit: 'contain',
  transform: 'translateY(-10%)',
});

const baseArrow = {
  position: 'absolute',
  top: '40%',
  transform: 'translateY(-50%)',
  width: rem(110),
  height: rem(60),
  objectFit: 'contain',
} as const;

export const arrowLeft = style({
  ...baseArrow,
  left: rem(-80),
  transform: 'translateY(-50%) scaleX(-1)',
});

export const arrowRight = style({
  ...baseArrow,
  right: rem(-80),
});

export const semiMatchWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: rem(32),
  marginBottom: rem(-12),
});

export const playerColumn = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: rem(40),
});

export const centerDecoration = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
