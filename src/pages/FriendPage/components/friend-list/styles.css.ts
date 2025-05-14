import { style } from '@vanilla-extract/css';

import { rem } from '@/styles';

export const friendListWrapper = style({
  maxHeight: rem(369),
  overflowY: 'auto',
  scrollbarGutter: 'stable',
});
