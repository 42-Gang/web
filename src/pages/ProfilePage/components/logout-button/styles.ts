import styled from '@emotion/styled';

export const Button = styled.button`
  width: 420px;
  height: 53px;
  font-size: 27px;
  background: transparent;
  border: 2px solid white;
  color: red;
  border-radius: 25px;
  cursor: pointer;
  letter-spacing: 30px;
  padding-left: 32px;
  margin-top: 45px;

  transition:
    background 0.3s ease,
    color 0.3s ease;

  &:hover {
    background: white;
    color: red;
  }
`;
