'use client';

import { useRouter } from 'next/navigation';
import { type FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { extractErrorData } from '~/api/base';
import { CloseButton, CTAButton } from '~/components/ui';
import { routes } from '~/constants/routes';
import { InputForm } from '../_components/input-form';
import { useMailVerification } from './useMailVerification';
import { type RegisterRequest, useRegister } from './useRegister';

interface RegisterForm extends RegisterRequest {
  passwordConfirm: string;
}

const Page = () => {
  const router = useRouter();

  const { register, handleSubmit, watch } = useForm<RegisterForm>({ mode: 'onChange' });
  const password = watch('password');

  const { mutateAsync: registerMutation } = useRegister();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerMutation(data);
      router.replace(`/${routes.auth}`);
    } catch (error) {
      console.error('[auth/register-email] Registration failed:', error);
      const errorData = await extractErrorData(error);
      toast.error(errorData?.message || 'Error occurred during registration.');
    }
  };

  const onError = (errors: FieldErrors<RegisterForm>) => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) toast.error(firstError.message);
  };

  const { mutateAsync: verification } = useMailVerification();

  const handleVerify = async () => {
    const emailValue = watch('email');
    if (!emailValue) {
      toast.error('이메일을 입력해주세요.');
      return;
    }

    try {
      const { message } = await verification({ email: emailValue });
      toast.success(message);
    } catch (error) {
      console.error('[auth/register-email] Email verification failed:', error);
      const errorData = await extractErrorData(error);
      toast.error(errorData?.message || 'Error occurred during email verification.');
    }
  };

  return (
    <>
      <CloseButton />
      <form className="column mb-10 gap-4" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="column gap-1">
          <InputForm>
            <InputForm.Label className="min-w-[200px]">EMAIL :&nbsp;</InputForm.Label>
            <InputForm.Input
              type="email"
              {...register('email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '올바른 이메일 형식이 아닙니다.',
                },
              })}
            />
            <CTAButton className="w-fit" type="button" size="sm" onClick={handleVerify}>
              VERIFY
            </CTAButton>
          </InputForm>

          <InputForm>
            <InputForm.Label className="min-w-[200px]">VERIFY CODE :&nbsp;</InputForm.Label>
            <InputForm.Input
              type="text"
              {...register('mailVerificationCode', { required: '인증 코드를 입력해주세요.' })}
            />
          </InputForm>

          <InputForm>
            <InputForm.Label className="min-w-[200px]">PASSWORD :&nbsp;</InputForm.Label>
            <InputForm.Input
              type="password"
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: { value: 8, message: '비밀번호는 8글자 이상이어야 합니다.' },
              })}
            />
          </InputForm>

          <InputForm>
            <InputForm.Label className="min-w-[200px]">RE-PASSWORD :&nbsp;</InputForm.Label>
            <InputForm.Input
              type="password"
              {...register('passwordConfirm', {
                required: '비밀번호 확인을 입력해주세요.',
                validate: value => value === password || '비밀번호가 일치하지 않습니다.',
              })}
            />
          </InputForm>

          <InputForm>
            <InputForm.Label className="min-w-[200px]">NICKNAME :&nbsp;</InputForm.Label>
            <InputForm.Input
              type="text"
              {...register('nickname', { required: '닉네임을 입력해주세요.' })}
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
