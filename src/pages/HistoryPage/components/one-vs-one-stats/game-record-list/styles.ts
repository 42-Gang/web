import styled from '@emotion/styled';

export const RecordListContainer = styled.div`
  max-height: 280px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 16px;
`;

export const RecordItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 452px;
  height: 40px;

  background-color: #d9d9d9;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 25px;
`;

export const PlayerText = styled.span`
  color: black;
`;

export const ResultText = styled.span<{ result: 'WIN' | 'LOSE' }>`
  font-weight: bold;
  color: ${({ result }) => (result === 'WIN' ? '#2272ff' : '#c83a3a')};
`;
