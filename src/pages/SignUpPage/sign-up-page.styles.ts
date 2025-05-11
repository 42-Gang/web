import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 190px 1fr;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 3px;
  transform: translateX(-20px);
`;

export const Label = styled.label`
  text-align: right;
  font-size: 23px;
  color: white;
  letter-spacing: 2px;
  transform: translateY(-2px);
  white-space: nowrap;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-right: 70px;
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  padding: 6px 10px;
  padding-right: 100px;
  font-size: 20px;
  color: white;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

export const VerifyButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 110px;
  height: 40px;
  background: url('/assets/images/BaseButton.png') no-repeat center;
  background-size: contain;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.9;
  }
`;

export const ButtonText = styled.span`
  transform: translateY(-2px);
`;

export const SubmitButton = styled.button`
  margin-top: 20px;
  font-size: 22px;
  padding: 12px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  align-self: center;
  transform: translateY(-8px);

  &:hover {
    opacity: 0.8;
  }
`;
