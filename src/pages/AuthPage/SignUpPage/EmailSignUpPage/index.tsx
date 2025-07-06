import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useMailVerification, useRegister } from '@/api';
import { Flex } from '@/components/system';
import { BackButton } from '@/components/ui/back-button';
import { Branding } from '@/components/ui/branding';
import { parseErrorMessage } from '@/utils/parseErrorMessage';
import { parseSuccessMessage } from '@/utils/parseSuccessMessage';

import * as styles from './styles.css';
import { PasswordHint } from '../components/password-hint';

export const EmailSignUpPage = () => {
  const [email, setEmail] = useState('');
  const [mailVerificationCode, setMailVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const { mutateAsync: mailVerifyMutation } = useMailVerification();
  const { mutateAsync: registerMutation } = useRegister();

  const navigate = useNavigate();

  const handleMailVerify = () => {
    mailVerifyMutation({ email })
      .then((res) => {
        const message = parseSuccessMessage(res.message, 'Verification code sent to your email');

        toast.success(message);
      })
      .catch(async (error) => {
        const message = await parseErrorMessage(error, 'Failed to send verification code');

        toast.error(message);
      });
  };

  const handleSelect = () => {
    registerMutation({ email, password, nickname, mailVerificationCode })
      .then((res) => {
        const message = parseSuccessMessage(res.message, 'Registration successful');

        toast.success(message);
        navigate('/login', { replace: true });
      })
      .catch(async (error) => {
        console.error(error);
        const message = await parseErrorMessage(error, 'Registration failed');

        toast.error(message);
      });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSelect();
  };

  const isConfirmPasswordValid = confirmPassword.length > 0 && password === confirmPassword;

  return (
    <Flex direction="column" justifyContent="space-between" style={{ height: '100%' }}>
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
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                id="password"
                value={password}
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={styles.toggleButton}
                data-show={showPassword}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              />
            </div>
            <PasswordHint />
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
            <span
              className={styles.check}
              data-show={isConfirmPasswordValid ? 'true' : undefined}
              aria-label={isConfirmPasswordValid ? 'Passwords match' : 'Passwords do not match'}
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
    </Flex>
  );
};
