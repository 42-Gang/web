import { style } from '@vanilla-extract/css';

import { rem } from '@/styles';

export const alarm = style({
  width: rem(32),
  height: rem(32),
  background: "url('/assets/images/alarm.svg') center/contain no-repeat",
  cursor: 'pointer',
  marginLeft: rem(739),
});
