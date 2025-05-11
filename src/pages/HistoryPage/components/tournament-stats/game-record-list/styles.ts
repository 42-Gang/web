import styled from '@emotion/styled';

export const ScrollContainer = styled.div`
  max-height: 282px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;

export const RecordItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #d9d9d9;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 25px;
  width: 500px;
`;

export const RoundLabel = styled.div`
  font-weight: bold;
  margin-right: 16px;
`;

export const PlayerList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const PlayerName = styled.div`
  color: black;
`;

export const ResultText = styled.div<{ result: 'WIN' | 'LOSE' }>`
  font-weight: bold;
  color: ${({ result }) => (result === 'WIN' ? '#2272ff' : '#c83a3a')};
  white-space: nowrap;
`;
