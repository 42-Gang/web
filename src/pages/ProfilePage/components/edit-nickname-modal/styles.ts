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
  padding: 36px;
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const ModalHeader = styled.div`
  width: 100%;
  font-size: 27px;
  font-weight: bold;
  text-align: center;
  position: relative;
  margin-bottom: 15px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -40%);
  background: transparent;
  border: none;
  font-size: 20px;
  color: red;
  cursor: pointer;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 3px solid black;
  border-radius: 12px;
  padding: 0 12px;
  font-size: 18px;
  text-align: center;
  margin-bottom: 15px;

  &::placeholder {
    color: gray;
    font-size: 14px;
  }

  &:focus {
    outline: none;
  }
`;

export const ConfirmButton = styled.button`
  width: 140px;
  height: 40px;
  background-color: #827e7c;
  color: white;
  font-size: 17px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #5e5959;
  }
`;
