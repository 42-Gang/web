import { recipe } from '@vanilla-extract/recipes';

export const flex = recipe({
  base: {
    display: 'flex',
  },
  variants: {
    direction: {
      row: { flexDirection: 'row' },
      'row-reverse': { flexDirection: 'row-reverse' },
      column: { flexDirection: 'column' },
      'column-reverse': { flexDirection: 'column-reverse' },
    },
    justifyContent: {
      'flex-start': { justifyContent: 'flex-start' },
      'flex-end': { justifyContent: 'flex-end' },
      center: { justifyContent: 'center' },
      'space-between': { justifyContent: 'space-between' },
      'space-around': { justifyContent: 'space-around' },
      'space-evenly': { justifyContent: 'space-evenly' },
    },
    alignItems: {
      'flex-start': { alignItems: 'flex-start' },
      'flex-end': { alignItems: 'flex-end' },
      center: { alignItems: 'center' },
      stretch: { alignItems: 'stretch' },
      baseline: { alignItems: 'baseline' },
    },
    wrap: {
      nowrap: { flexWrap: 'nowrap' },
      wrap: { flexWrap: 'wrap' },
      'wrap-reverse': { flexWrap: 'wrap-reverse' },
    },
  },
  defaultVariants: {
    direction: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    wrap: 'nowrap',
  },
});
