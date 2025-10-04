'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { toast } from 'sonner';
import { useMailVerification, useRegister } from '~/api';
import { extractErrorData } from '~/api/base';
import { CloseButton, CTAButton } from '~/components/ui';
import { routes } from '~/constants/routes';
import { InputForm } from '../_components/input-form';

const Page = () => {
  const [email, setEmail] = useState<string>('');
  const [mailVerificationCode, setMailVerificationCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const router = useRouter();

  const { mutateAsync: register } = useRegister();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register({ email, password, nickname, mailVerificationCode });
      router.replace(`/${routes.auth}`);
    } catch (error) {
      console.error('[auth/register-email] register', error);
      const data = await extractErrorData(error);
      toast.error(data?.message || 'Error occurred during registration.');
    }
  };

  const { mutateAsync: varification } = useMailVerification();

  const handleVarify = async () => {
    try {
      const { message } = await varification({ email });
      toast.success(message);
    } catch (error) {
      console.error('[auth/register-email] varification', error);
      const data = await extractErrorData(error);
      toast.error(data?.message || 'Error occurred during email verification.');
    }
  };

  return (
    <>
      <CloseButton />
      <form className="column mb-10 gap-4" onSubmit={handleLogin}>
        <div className="column gap-1">
          <InputForm>
            <InputForm.Label className="min-w-[200px]">EMAIL :&nbsp;</InputForm.Label>
            <InputForm.Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="off"
            />
            <CTAButton className="w-fit" type="button" size="sm" onClick={handleVarify}>
              VARIFY
            </CTAButton>
          </InputForm>
          <InputForm>
            <InputForm.Label className="min-w-[200px]">VERIFY CODE :&nbsp;</InputForm.Label>
            <InputForm.Input
              type="text"
              value={mailVerificationCode}
              onChange={e => setMailVerificationCode(e.target.value)}
              autoComplete="off"
            />
          </InputForm>
          <InputForm>
            <InputForm.Label className="min-w-[200px]">PASSWORD :&nbsp;</InputForm.Label>
            <InputForm.Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="off"
            />
          </InputForm>
          <InputForm>
            <InputForm.Label className="min-w-[200px]">PASSWORD :&nbsp;</InputForm.Label>
            <InputForm.Input
              type="password"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              autoComplete="off"
            />
          </InputForm>
          <InputForm>
            <InputForm.Label className="min-w-[200px]">NICKNAME :&nbsp;</InputForm.Label>
            <InputForm.Input
              type="text"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              autoComplete="off"
            />
          </InputForm>
        </div>

        <CTAButton className="w-fit self-center" type="submit">
          REGISTER
        </CTAButton>
      </form>
    </>
  );
};

export default Page;
