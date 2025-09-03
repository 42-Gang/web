import { style } from '@vanilla-extract/css';

export const container = style({
  margin: 0,
  padding: 0,
  overflow: 'hidden',
  background: '#333',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  position: 'relative',
});

export const overlayBase = style({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  pointerEvents: 'none',
  color: 'white',
  textShadow: '0 0 8px rgba(0,0,0,0.8)',
  zIndex: 10,
});

export const status = style({
  top: '15%',
  fontFamily: 'Roboto, sans-serif',
  fontSize: 22,
  backgroundColor: 'rgba(0,0,0,0.5)',
  padding: '10px 25px',
  borderRadius: 30,
  opacity: 0,
  transition: 'opacity 0.5s ease-out',
  whiteSpace: 'nowrap',
});

export const statusVisible = style({
  opacity: 1,
});

export const countdown = style({
  top: '50%',
  transform: 'translate(-50%, -50%)',
  fontFamily: 'Anton, sans-serif',
  fontSize: 150,
  WebkitTextStroke: '3px white',
  color: 'transparent',
  opacity: 0,
  transition: 'opacity 0.2s',
});

export const countdownVisible = style({
  opacity: 1,
});

export const scoreOverlay = style({
  position: 'absolute',
  top: 20,
  left: 20,
  right: 20,
  pointerEvents: 'none',
  zIndex: 10,
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
});

export const scoreBoxBase = style({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.3)',
  padding: '10px 20px',
  borderRadius: 8,
});

export const scoreBoxLeft = style({
  left: 0,
});

export const scoreBoxRight = style({
  right: 0,
});

export const scoreLabel = style({
  fontSize: 16,
  color: '#ccc',
});

export const scoreValue = style({
  fontSize: 48,
  lineHeight: 1,
  marginTop: 5,
});

export const scoreValuePlayer1 = style({
  color: '#ff6b6b',
});

export const scoreValuePlayer2 = style({
  color: '#6b6bff',
});

export const canvas = style({
  width: 800,
  height: 600,
  display: 'block',
});

export const winnerOverlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.7)',
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  zIndex: 1000,
});

export const winnerOverlayVisible = style({
  display: 'flex',
});

export const winnerText = style({
  fontSize: 72,
  fontWeight: 'bold',
  color: '#ffd700',
  textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ffc400, 0 0 20px #ffc400',
  margin: 0,
});

export const winnerSubText = style({
  fontSize: 24,
  color: '#fff',
  marginTop: 20,
  letterSpacing: 1,
});
