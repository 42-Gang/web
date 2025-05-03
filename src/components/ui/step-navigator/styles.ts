import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeSlide = keyframes`
  from {
    transform: translateX(-6px);
    opacity: 0.3;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-family: 'Tiny5', sans-serif;
  font-size: 32px;
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
`;

export const Item = styled.li`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Button = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 10px 8px;
  font: inherit;
  color: inherit;
  line-height: 1.2;
  cursor: pointer;
  border: none;
  background: none;
`;

export const IndicatorWrapper = styled.span`
  position: absolute;
  left: -28px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  pointer-events: none;
`;

export const Indicator = styled.span<{ active: boolean }>`
  display: inline-block;
  font-size: 24px;
  opacity: ${(p) => (p.active ? 1 : 0)};
  animation: ${(p) => (p.active ? fadeSlide : 'none')} 250ms ease;
  transition: opacity 250ms ease;
  will-change: transform, opacity;
`;

export const Text = styled.span`
  font-weight: inherit;
  text-align: center;
  transition: font-weight 250ms ease;
`;
