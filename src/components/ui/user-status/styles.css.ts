import { style, styleVariants } from '@vanilla-extract/css';

export const statusDotBase = style({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  display: 'inline-block',
});

export const statusDot = styleVariants({
  online: [statusDotBase, { backgroundColor: 'limegreen' }],
  offline: [statusDotBase, { backgroundColor: 'gray' }],
  game: [statusDotBase, { backgroundColor: 'red' }],
  away: [statusDotBase, { backgroundColor: 'yellow' }],
});
