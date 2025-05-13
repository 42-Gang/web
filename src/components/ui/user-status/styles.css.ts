import { style, styleVariants } from '@vanilla-extract/css';

import { rem } from '@/styles';

export const statusDotBase = style({
  position: 'absolute',
  top: '50%',
  right: rem(-18),
  transform: 'translateY(-50%)',
  width: rem(10),
  height: rem(10),
  borderRadius: '50%',
});

export const statusDot = styleVariants({
  online: [statusDotBase, { backgroundColor: 'limegreen' }],
  offline: [statusDotBase, { backgroundColor: 'gray' }],
  game: [statusDotBase, { backgroundColor: 'red' }],
  away: [statusDotBase, { backgroundColor: 'yellow' }],
});
