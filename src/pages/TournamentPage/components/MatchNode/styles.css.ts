import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

const baseFlexColumnCenter = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
} as const;

const baseFlexRowCenter = {
  display: 'flex',
  alignItems: 'center',
} as const;

export const treeWrapper = style({
  ...baseFlexColumnCenter,
  gap: rem(20),
});

export const leafWrapper = style({
  ...baseFlexColumnCenter,
  gap: rem(50),
  marginTop: rem(-50),
});

export const branchWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  width: rem(500),
  gap: rem(55),
});

export const roundWrapper = style({
  ...baseFlexColumnCenter,
  gap: rem(16),
  marginTop: rem(40),
});

export const matchBox = style({
  ...baseFlexRowCenter,
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
  ...baseFlexRowCenter,
  justifyContent: 'center',
  position: 'relative',
  padding: rem(6),
  marginTop: rem(70),
  width: rem(250),
  gap: rem(60),
});

export const centerColumn = style({
  ...baseFlexColumnCenter,
});
