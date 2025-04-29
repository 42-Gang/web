import styled from "styled-components";

export const WaitingWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const WaitingOverlay = styled.div`
  position: absolute;
  top: 180px;
  left: 20px;
  z-index: 10;
  width: 60%;
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
  pointer-events: none;
`;

export const WaitingLeftMatchup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const WaitingRightMatchup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
