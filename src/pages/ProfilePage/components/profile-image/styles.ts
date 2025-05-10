import styled from '@emotion/styled';

export const ImageContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 100px;
  width: 200px;
  height: 200px;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CameraIcon = styled.button`
  position: absolute;
  bottom: 0;
  right: 10px;
  width: 53px;
  height: 53px;
  padding: 0;
  background: white;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 60%;
    height: 60%;
    object-fit: contain;
  }
`;

