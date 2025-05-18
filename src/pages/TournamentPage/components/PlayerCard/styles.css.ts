import { style } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

export const name = style({
  color: theme.color.white,
  fontSize: rem(20),
  textAlign: 'center',
});

export const baseCard = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const card = style([
  baseCard,
  {
    gap: rem(4),
    width: rem(70),
  },
]);

export const cardLarge = style([
  baseCard,
  {
    gap: rem(2),
    width: rem(90),
  },
]);

export const avatarWrapper = style({
  width: '100%',
  aspectRatio: '1 / 1',
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const avatarBorder = style({
  border: `${rem(4)} solid #12FF7D`,
});

export const avatar = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '50%',
});

export const empty = style({
  width: rem(70),
  height: rem(70),
});

export const emptyLarge = style({
  width: rem(90),
  height: rem(90),
});

export const popupBase = style({
  position: 'absolute',
  color: theme.color.white,
  fontSize: rem(12),
  border: `2px solid ${theme.color.white}`,
  padding: rem(8),
  borderRadius: rem(4),
  whiteSpace: 'nowrap',
  zIndex: 10,
  textAlign: 'center',
});

export const popupBelow = style([popupBase, { top: rem(80) }]);

export const popupBelowLarge = style([popupBase, { top: rem(130) }]);

export const popupAbove = style([popupBase, { bottom: rem(20) }]);
