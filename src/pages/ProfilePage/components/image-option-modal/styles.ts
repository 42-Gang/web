import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(171, 170, 170, 0.83);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 10px;
  padding: 36px;
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 23px;
`;

export const ModalButton = styled.button`
  font-size: 24px;
  padding: 10px 0;
  border: 2px solid black;
  border-radius: 12px;
  cursor: pointer;
`;
