import styled from '@emotion/styled';

export const Button = styled.button`
  position: relative;
  width: 180px;
  height: 40px;

  background: url('/assets/images/History_button_off.png') center/contain no-repeat;
  background-color: transparent;

  color: white;
  font-family: 'Tiny5', sans-serif;
  font-size: 20px;

  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  // 버튼 배경
  z-index: 0;

  // 텍스트
  span {
    position: relative;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0; // 버튼 배경
    background: url('/assets/images/History_button_on.png') center/contain no-repeat;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover::after,
  &[data-selected='true']::after {
    opacity: 1;
  }
`;
