import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMailVerification, useRegister } from '@/api';
import { Branding } from '@/components/ui';
import { spacing } from '@/styles';

import * as styles from './sign-up-page.styles';

export const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [mailVerificationCode, setMailVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const { mutateAsync: mailVerifyMutation } = useMailVerification();
  const { mutateAsync: registerMutation } = useRegister();

  const navigate = useNavigate();

  const handleMailVerify = () => {
    if (!email) return alert('Please enter your email');

    mailVerifyMutation({ email })
      .then(() => alert('Verification code sent to your email'))
      .catch(() => alert('Failed to send verification code'));
  };

  const handleSelect = () => {
    if (!email || !mailVerificationCode || !password || !confirmPassword || !nickname)
      return alert('Please fill in all fields');

    if (password !== confirmPassword) return alert('Passwords do not match');

    registerMutation({ email, password, nickname, mailVerificationCode })
      .then(() => {
        alert('Registration successful');
        navigate('/signin');
      })
      .catch(() => alert('Registration failed'));
  };

  return (
    <styles.Wrapper>
      <Branding css={{ marginTop: spacing.brandingTopMargin }} />

      <styles.Form>
        <styles.Row>
          <styles.Label htmlFor="email">EMAIL:</styles.Label>
          <styles.InputWrapper>
            <styles.Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <styles.VerifyButton type="button" onClick={handleMailVerify}>
              <styles.ButtonText>VERIFY</styles.ButtonText>
            </styles.VerifyButton>
          </styles.InputWrapper>
        </styles.Row>

        <styles.Row>
          <styles.Label htmlFor="verificationCode">VERIFY CODE:</styles.Label>
          <styles.Input
            id="verificationCode"
            value={mailVerificationCode}
            onChange={(e) => setMailVerificationCode(e.target.value)}
          />
        </styles.Row>

        <styles.Row>
          <styles.Label htmlFor="password">PASSWORD:</styles.Label>
          <styles.Input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </styles.Row>

        <styles.Row>
          <styles.Label htmlFor="confirmPassword">RE-PASSWORD:</styles.Label>
          <styles.Input
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
        </styles.Row>

        <styles.Row>
          <styles.Label htmlFor="nickname">NICKNAME:</styles.Label>
          <styles.Input
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </styles.Row>

        <styles.SubmitButton type="button" onClick={handleSelect}>
          REGISTER
        </styles.SubmitButton>
      </styles.Form>
    </styles.Wrapper>
  );
};
