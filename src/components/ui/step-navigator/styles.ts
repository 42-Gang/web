import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const move = keyframes`
  from {
    transform: translateX(-4px);
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
  font-family: 'Tiny5', sans-serif;
  font-size: 32px;
  color: white;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Item = styled.li`
  margin: 6px 0;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 4px 8px;

  color: inherit;
  font: inherit;
  cursor: pointer;
  border: none;
  background: none;
  gap: 8px;
`;

export const Indicator = styled.span<{ active: boolean }>`
  display: inline-block;
  width: 1em;
  font-size: 20px;
  opacity: ${(p) => (p.active ? 1 : 0)};
  animation: ${(p) => (p.active ? move : 'none')} 200ms ease-in-out;
  transition: opacity 200ms ease-in-out;
`;

export const Text = styled.span`
  transition: font-weight 200ms ease-in-out;
  font-weight: inherit;
`;
