import styled from '@emotion/styled';

export const ImageContainer = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  margin-top: 30px;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  background-color: black;
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CameraIcon = styled.button`
  position: absolute;
  bottom: 13px;
  right: 20px;
  transform: translate(50%, 50%);
  width: 40px;
  height: 40px;
  font-size: 22px;

  background: white;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #eee;
  }
`;
