import styled, { createGlobalStyle } from "styled-components";

export const SixtyfourFont = createGlobalStyle`
  @font-face {
    font-family: "Sixtyfour";
    src: url("/fonts/Sixtyfour.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`;

export const StyledVsText = styled.div`
  font-family: "Sixtyfour", sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: white;
`;
