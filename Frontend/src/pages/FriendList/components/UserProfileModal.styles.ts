import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalCard = styled.div`
  background-color: #111;
  padding: 24px;
  border-radius: 20px;
  width: 260px;
  text-align: center;
  color: white;
  font-family: "Sixtyfour", sans-serif;
  position: relative;
`;
export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;

  display: block;
  margin: 20px auto 10px;
`;

export const Username = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

export const StatRow = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 16px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
`;
