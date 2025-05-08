import styled from '@emotion/styled';

export const Button = styled.button`
  width: 32px;
  height: 32px;

  margin-top: 5px;
  margin-left: 5px;

  background: url('/assets/images/Go_back_page.svg');

  border: none;
  cursor: pointer;

  opacity: 0.6;

  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;
