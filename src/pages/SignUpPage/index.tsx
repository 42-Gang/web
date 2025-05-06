import { css } from '@emotion/react';
import { useState } from 'react';

import { useMailVerification, useRegister } from '@/api';
import { Flex } from '@/components/system';
import { Branding } from '@/components/ui';
import { spacing } from '@/styles';

export const SignUpPage = () => {
  const [email, setEmail] = useState<string>('');
  const [mailVerificationCode, setMailVerificationCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const { mutateAsync: mailVerifyMutation } = useMailVerification();
  const { mutateAsync: registerMutation } = useRegister();

  const handleMailVerify = () => {
    if (!email) {
      alert('Please enter your email');
      return;
    }

    mailVerifyMutation({ email })
      .then(() => {
        alert('Verification code sent to your email');
      })
      .catch((error) => {
        console.error('Error sending verification code:', error);
        alert('Failed to send verification code');
      });
  };

  const handleSelect = () => {
    if (!email || !mailVerificationCode || !password || !confirmPassword || !nickname) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    registerMutation({ email, password, nickname, mailVerificationCode })
      .then(() => {
        alert('Registration successful');
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        alert('Registration failed');
      });
  };

  return (
    <Flex direction="column" justifyContent="space-between" style={{ height: '100%' }}>
      <Branding css={css({ marginTop: spacing.brandingTopMargin })} />

      {/* TODO: Implement UI */}
      <Flex direction="column" justifyContent="center">
        <Flex justifyContent="center" style={{ color: 'white' }}>
          <label htmlFor="email">EMAIL: </label>
          <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="button" onClick={handleMailVerify}>
            verify
          </button>
        </Flex>
        <Flex justifyContent="center" style={{ color: 'white' }}>
          <label htmlFor="verificationCode">VERIFY CODE: </label>
          <input
            id="verificationCode"
            value={mailVerificationCode}
            onChange={(e) => setMailVerificationCode(e.target.value)}
          />
        </Flex>
        <Flex justifyContent="center" style={{ color: 'white' }}>
          <label htmlFor="password">PASSWORD: </label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </Flex>
        <Flex justifyContent="center" style={{ color: 'white' }}>
          <label htmlFor="confirmPassword">RE-PASSWORD: </label>
          <input
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
        </Flex>
        <Flex justifyContent="center" style={{ color: 'white' }}>
          <label htmlFor="nickname">NICKNAME: </label>
          <input id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </Flex>
        <button type="button" onClick={handleSelect}>
          REGISTER
        </button>
      </Flex>
    </Flex>
  );
};
