import { style, keyframes, globalStyle } from '@vanilla-extract/css';

import { rem, theme } from '@/styles';

const bounce = keyframes({
  '0%, 100%': { transform: 'translateY(0)' },
  '50%': { transform: 'translateY(-8px)' },
});

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
  outline: 'none',
});

globalStyle(`${input}::placeholder`, {
  fontSize: rem(11),
  color: theme.color.chatText,
});

export const sendButton = style({
  width: rem(20),
  height: rem(20),
  background: `url('/assets/images/send-icon.svg') center / contain no-repeat`,
  flexShrink: 0,
});

export const chatMessage = style({
  marginBottom: rem(6),
  lineHeight: 1.4,
});

export const chatNickname = style({
  fontSize: rem(16),
  marginRight: rem(4),
});

export const chatEmptyWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export const chatEmptyImage = style({
  width: rem(110),
  height: rem(110),
  animation: `${bounce} 2.1s ease-in-out infinite`,
});

export const chatEmpty = style({
  color: theme.color.chatText,
});

export const chatEmptyShadow = style({
  width: rem(60),
  height: rem(12),
  background: 'rgba(0, 0, 0, 0.15)',
  borderRadius: '50%',
  filter: 'blur(2px)',
  transform: 'translateY(-20px)',
});
