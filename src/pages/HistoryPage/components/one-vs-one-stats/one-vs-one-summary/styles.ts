import styled from '@emotion/styled';

type rateBoxProps = {
  labelColor?: string;
  valueColor?: string;
};

export const summaryContainer = styled.div`
  display: flex;
  gap: 8rem;
  margin-top: 20px;

  font-family: 'Tiny5', sans-serif;
  font-size: 60px;
  text-align: center;
`;

export const rateBox = styled.div<rateBoxProps>`
  width: 170px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div:first-of-type {
    font-size: 60px;
    color: ${({ labelColor }) => labelColor || 'white'};
  }

  & > div:last-of-type {
    font-size: 64px;
    color: ${({ valueColor }) => valueColor || 'white'};
  }
`;
