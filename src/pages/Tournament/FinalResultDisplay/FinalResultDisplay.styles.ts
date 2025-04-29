import styled from "styled-components";

export const Container = styled.div<{ gap: number }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ gap }) => `${gap}px`};
`;

export const WinnerWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const WinnerText = styled.p`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-family: "Sixtyfour";
  color: #ecf411;
  font-size: 16px;
`;

export const VsText = styled.p`
  font-family: "Sixtyfour";
  color: white;
  font-size: 18px;
`;
