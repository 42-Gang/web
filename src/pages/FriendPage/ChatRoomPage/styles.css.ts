import { style } from '@vanilla-extract/css';

import { theme } from '@/styles';

export const wrapper = style({
  display: 'flex',
  width: '100%',
  height: '100%',
});

export const sidebar = style({
  ...theme.layout.column,
  width: '25%',
  height: '100%',
});

export const chat = style({
  ...theme.layout.column,
  width: '75%',
  height: '100%',
});
