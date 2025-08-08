import { style, keyframes } from '@vanilla-extract/css';

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const bounceIn = keyframes({
  '0%': { transform: 'scale(0.3)', opacity: 0 },
  '50%': { transform: 'scale(1.05)' },
  '70%': { transform: 'scale(0.9)' },
  '100%': { transform: 'scale(1)', opacity: 1 },
});

export const gameContainer = style({
  position: 'relative',
  width: '800px',
  height: '600px',
  overflow: 'hidden',
  background: '#000',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const gameCanvas = style({
  width: '100%',
  height: '100%',
  cursor: 'none',
  touchAction: 'none',
});

export const gameUI = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  zIndex: 10,
});

export const scoreBoard = style({
  position: 'absolute',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: '40px',
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#fff',
  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
});

export const playerScore = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '5px',
});

export const playerLabel = style({
  fontSize: '1rem',
  opacity: 0.8,
});

export const score = style({
  fontSize: '3rem',
  fontWeight: 'bold',
});

export const statusMessage = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'rgba(0, 0, 0, 0.8)',
  color: '#fff',
  padding: '20px 40px',
  borderRadius: '10px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  textAlign: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  zIndex: 20,
});

export const statusMessageVisible = style({
  opacity: 1,
});

export const countdown = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '6rem',
  fontWeight: 'bold',
  color: '#fff',
  textShadow: '4px 4px 8px rgba(0,0,0,0.8)',
  zIndex: 30,
  opacity: 0,
  scale: '0.5',
  transition: 'all 0.3s ease',
});

export const countdownAnimate = style({
  opacity: 1,
  scale: '1',
});

export const gameEndOverlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.9)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 100,
  animation: `${fadeIn} 0.5s ease`,
});

export const winnerText = style({
  fontSize: '4rem',
  fontWeight: 'bold',
  color: '#fff',
  textShadow: '4px 4px 8px rgba(0,0,0,0.8)',
  marginBottom: '20px',
  animation: `${bounceIn} 1s ease`,
});

export const subText = style({
  fontSize: '1.5rem',
  color: '#ccc',
  textAlign: 'center',
});
