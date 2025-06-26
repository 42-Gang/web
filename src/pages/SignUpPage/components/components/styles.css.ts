import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const tooltipWrapper = style({
  position: 'absolute',
  top: rem(370),
  left: rem(540),
});

export const tooltipIcon = style({
  width: rem(20),
  height: rem(20),
  fontSize: rem(14),
  fontWeight: 'bold',
  backgroundColor: theme.color.white,
  borderRadius: '50%',
  color: theme.color.black,
  cursor: 'pointer',
});

export const tooltipBox = style({
  position: 'absolute',
  top: rem(-40),
  left: rem(28),
  width: rem(260),
  backgroundColor: theme.color.white,
  padding: rem(12),
  borderRadius: rem(6),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  fontSize: rem(14),
  color: theme.color.black,
  display: 'none',

  selectors: {
    [`${tooltipWrapper}:hover &`]: {
      display: 'block',
    },
  },
});

export const tooltipTitle = style({
  fontWeight: 'bold',
  marginBottom: rem(6),
});

export const tooltipList = style({
  paddingLeft: rem(16),
  listStyle: 'disc',
});
