import styled from "styled-components";

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 100px);
  grid-template-rows: repeat(2, auto);
  gap: 121px 270px;
  position: absolute;
  top: 8px;
  left: 2px;
`;
