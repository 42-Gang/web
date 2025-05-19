import { style } from '@vanilla-extract/css';

import { rem } from '@/styles';

export const chatWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const chatInputWrapper = style({
  display: 'flex',
  alignItems: 'center',
  paddingTop: rem(4),
});

export const chatHeader = style({
  fontSize: rem(24),
  fontWeight: 'bold',
  marginBottom: rem(4),
});

export const chatDivider = style({
  display: 'block',
  width: `calc(100% + ${rem(32)})`,
  marginInline: rem(-16),
  borderTop: `${rem(3)} dashed rgba(0, 0, 0, 0.6)`,
  marginBottom: rem(8),
});

export const chatBox = style({
  flex: 1,
  overflowY: 'auto',
  fontSize: rem(14),
});

export const input = style({
  flex: 1,
  border: 'none',
  padding: rem(4),
  fontSize: rem(14),
  backgroundColor: 'transparent',
});

export const sendButton = style({
  width: rem(20),
  height: rem(20),
  background: `url('/assets/images/send-icon.svg') center / contain no-repeat`,
  flexShrink: 0,
});
