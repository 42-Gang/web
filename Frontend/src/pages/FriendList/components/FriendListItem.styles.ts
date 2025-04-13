import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 10px;
  cursor: pointer;
  background-color: transparent;
  border-radius: 8px;

  &:hover {
    background-color: #5a4a4a;
  }
`;

export const Avatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Name = styled.span`
  font-family: "Sixtyfour", sans-serif;
  font-weight: bold;
  margin-left: 10px;
  color: white;
  flex: 1;
  font-size: 13px;
`;

export const StatusDot = styled.div<{ isOnline: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ isOnline }) => (isOnline ? "limegreen" : "red")};
  margin-left: auto;
`;
