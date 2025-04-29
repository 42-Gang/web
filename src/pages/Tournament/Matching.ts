import styled, { createGlobalStyle, css } from "styled-components";
import { LINE_HEIGHT, LINE_COLOR } from "./LineConstants.ts";
import { ToastContainer } from "react-toastify";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const ProfileOverlay = styled.div`
  position: absolute;
  top: 150px;
  left: 20px;
  z-index: 10;
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

export const LineWrapper = styled.div`
  position: relative;
`;

export const VerticalLine = styled.div<{
  top?: string;
  left: string;
  color?: string;
  height?: string;
}>`
  position: absolute;
  top: ${({ top }) => top ?? "108px"};
  left: ${({ left }) => left};
  width: 2px;
  height: ${({ height }) => height ?? LINE_HEIGHT.FULL};
  background-color: ${({ color }) => color ?? LINE_COLOR.DEFAULT};
  z-index: 5;
`;

export const HorizontalLine = styled.div<{
  top?: string;
  left: string;
  color?: string;
}>`
  position: absolute;
  top: ${({ top }) => top ?? "156px"};
  left: ${({ left }) => left};
  width: 85px;
  height: 2px;
  background-color: ${({ color }) => color ?? LINE_COLOR.DEFAULT};
  z-index: 5;
`;

export const UserProfile = styled.div<{ isReady: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 4px solid transparent;
    object-fit: cover;
    transition: border-color 0.3s ease;

    ${({ isReady }) =>
      isReady &&
      css`
        border-color: #00ff00;
      `}
  }
`;

export const UserImage = styled.img``;

export const UserName = styled.span`
  margin-top: 8px;
  font-size: 12px;
  color: white;
  font-family: "Sixtyfour", sans-serif;
`;

export const VsTextWrapper = styled.div`
  position: absolute;
  top: 143px;
  left: 212px;
  z-index: 10;
`;

export const ExitButtonWrapper = styled.button`
  position: absolute;
  bottom: 40px;
  left: 210px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const ExitImage = styled.img`
  width: 200px;
  height: auto;
  object-fit: contain;
`;
