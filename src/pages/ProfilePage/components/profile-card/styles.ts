import styled from '@emotion/styled';

export const CardWrapper = styled.div`
  width: 560px;
  padding: 40px 50px 40px;
  background-color: #000;
  border: 2px solid #fff;
  font-family: 'DungGeunMo', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  box-sizing: border-box;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 30px;
  background: transparent;
  color: white;
  border: none;
  cursor: pointer;
`;

export const Title = styled.h2`
  color: white;
  font-size: 42px;
  margin-bottom: 20px;
  font-family: 'DungGeunMo', sans-serif;
`;

export const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 0 40px;
`;

export const Info = styled.div`
  width: 100%;
  padding-left: 60px;
  color: white;
  text-align: left;
  font-family: 'DungGeunMo', sans-serif;
  font-size: 26px;
  line-height: 1.8;

  p {
    margin: 5px 0;
  }

  strong {
    color: #ecf411;
  }
`;

export const NicknameWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 6px;
`;

export const EditButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-left: 10px;
  padding: 0;
`;
