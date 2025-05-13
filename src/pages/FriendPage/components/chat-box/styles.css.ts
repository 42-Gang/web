import { style } from '@vanilla-extract/css';

import { rem } from '@/styles';
import { theme } from '@/styles/theme.css';


export const chatBox = style({
  width: '100%',
  height: rem(500),
  backgroundColor: theme.color.orangeChat,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const messages = style({
  padding: rem(12),
  overflowY: 'auto',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: rem(8),
});

export const messageBase = style({
  fontSize: rem(19),
});

export const myMessage = style([messageBase, { color: 'white' }]);
export const otherMessage = style([messageBase, { color: '#6F59B1' }]);

export const inputWrapper = style({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 252, 252, 0.83)',
  borderRadius: rem(10),
  padding: `${rem(8)} ${rem(10)}`,
  margin: `${rem(6)} ${rem(12)} ${rem(12)}`,
  boxSizing: 'border-box',
  position: 'relative',

  '::before': {
    content: '""',
    position: 'absolute',
    top: rem(-10),
    left: 0,
    right: 0,
    height: rem(3),
    backgroundImage:
      'repeating-linear-gradient(to right, black 0, black 6px, transparent 6px, transparent 12px)',
  },
});

export const input = style({
  flex: 1,
  fontSize: rem(16),
  padding: rem(4),
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
});

export const sendButton = style({
  marginLeft: rem(8),
  background: 'transparent',
  border: 'none',
  width: rem(24),
  height: rem(24),
  backgroundImage: `url('/assets/images/send-icon.svg')`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  cursor: 'pointer',
});
