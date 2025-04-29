import styled from "styled-components";

export const OverlayWrapper = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
`;

export const DimmedOverlay = styled.div<{ size?: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ size }) => (size ? `${size}px` : "70px")};
  height: ${({ size }) => (size ? `${size}px` : "70px")};
  background-color: rgba(255, 255, 255, 0.81);
  border-radius: 50%;
  z-index: 2;
`;

export const GameIconOverlay = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-52%, -86%);
  width: 30px;
  height: 30px;
  z-index: 3;
`;
