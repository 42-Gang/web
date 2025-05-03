import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex } from '@/components/system';
import { Branding } from '@/components/ui';

export const SignUpPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const handleSelect = () => {
    navigate(-1);
  };

  return (
    <Flex direction="column" justifyContent="space-between" style={{ height: '100%' }}>
      <Branding css={css({ marginTop: '74px' })} />

      {/* TODO: Implement UI */}
      <Flex direction="column" justifyContent="center">
        <Flex justifyContent="center" style={{ color: 'white' }}>
          <p>EMAIL: </p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Flex>
        <Flex justifyContent="center" style={{ color: 'white' }}>
          <p>VERIFY CODE: </p>
          <input value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
        </Flex>
        <Flex justifyContent="center" style={{ color: 'white' }}>
          <p>PASSWORD: </p>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        </Flex>
        <Flex justifyContent="center" style={{ color: 'white' }}>
          <p>RE-PASSWORD: </p>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
        </Flex>
        <Flex justifyContent="center" style={{ color: 'white' }}>
          <p>NICKNAME: </p>
          <input value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </Flex>
        <button type="button" onClick={handleSelect}>
          REGISTER
        </button>
      </Flex>
    </Flex>
  );
};
