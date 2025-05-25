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
  overflow: 'visible',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
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

export const overlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '50%',
});

export const popupAbove = style([popupBase, { bottom: rem(100) }]);

export const popupLeft = style([popupBase, { right: rem(80) }]);

export const popupRight = style([popupBase, { left: rem(80) }]);
