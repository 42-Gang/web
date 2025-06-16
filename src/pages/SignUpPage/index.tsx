import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useMailVerification, useRegister } from '@/api';
import { Flex } from '@/components/system';
import { Branding } from '@/components/ui';
import { BackButton } from '@/components/ui/back-button';

import * as styles from './styles.css';

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
    mailVerifyMutation({ email })
      .then((res) => {
        toast.success(res.message || 'Verification code sent to your email');
      })
      .catch(async (error) => {
        console.error('Mail verification error:', error);
        const res = await error.response?.json();
        toast.error(res?.message || 'Failed to send verification code');
      });
  };

  const handleSelect = () => {
    registerMutation({ email, password, nickname, mailVerificationCode })
      .then((res) => {
        toast.success(res.message || 'Registration successful');
        navigate('/login', { replace: true });
      })
      .catch(async (error) => {
        console.error('Error during registration:', error);
        const res = await error.response?.json();
        const cleanedMessage = res?.message.replace(/^body\//, '');
        toast.error(cleanedMessage || 'Registration failed');
      });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSelect();
  };

  return (
    <Flex direction="column" justifyContent="space-between" style={{ height: '100%' }}>
      <BackButton />
      <Branding className={styles.branding} />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="email">
            EMAIL:
          </label>
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className={styles.verifyButton} type="button" onClick={handleMailVerify}>
              <span className={styles.buttonText}>VERIFY</span>
            </button>
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="verificationCode">
            VERIFY CODE:
          </label>
          <input
            className={styles.input}
            id="verificationCode"
            value={mailVerificationCode}
            onChange={(e) => setMailVerificationCode(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="password">
            PASSWORD:
          </label>
          <input
            className={styles.input}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="confirmPassword">
            RE-PASSWORD:
          </label>
          <input
            className={styles.input}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
        </div>

        <div className={styles.row}>
          <label className={styles.label} htmlFor="nickname">
            NICKNAME:
          </label>
          <input
            className={styles.input}
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <button className={styles.submitButton} type="submit">
          REGISTER
        </button>
      </form>
    </Flex>
  );
};
