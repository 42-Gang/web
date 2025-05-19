import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMailVerification, useRegister } from '@/api';
import { Flex } from '@/components/system';
import { Branding } from '@/components/ui';

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

  const handleBack = () => {
    navigate(-1);
  };

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
        navigate('/login', { replace: true });
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        alert('Registration failed');
      });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSelect();
  };

  return (
    <Flex direction="column" justifyContent="space-between" style={{ height: '100%' }}>
      <button className={styles.backButton} onClick={handleBack} />
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
