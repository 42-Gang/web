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
  border-radius: 12px;
  padding: 30px 24px;
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const Text = styled.p`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  height: 40px;
  font-size: 24px;
  font-weight: bold;
  color: red;
  border: 3px solid red;
  background: white;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: red;
    color: white;
  }
`;

export const CancelButton = styled.button`
  width: 100%;
  height: 40px;
  font-size: 24px;
  font-weight: bold;
  color: black;
  border: 3px solid black;
  background: white;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;
