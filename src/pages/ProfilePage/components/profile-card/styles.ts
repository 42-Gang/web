import styled from '@emotion/styled';

export const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 50px 40px;
  gap: 40px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 36px;
  height: 36px;
  background: url('/assets/images/Go_back_page.svg') no-repeat center;
  background-size: contain;
  border: none;
  cursor: pointer;
`;

export const Title = styled.h2`
  color: white;
  font-size: 60px;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 0 40px;
`;

export const Info = styled.div`
  flex: 1;
  color: white;
  font-size: 26px;
  line-height: 2.1;

  padding-left: 360px;

  p {
    margin: 3px 0;
  }

  strong {
    color: #ecf411;
  }
`;

export const NicknameWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

export const EditButton = styled.button`
  background: url('/assets/images/editProfileIcon.svg') no-repeat center;
  background-size: contain;
  width: 24px;
  height: 24px;
  border: none;
  cursor: pointer;
`;
