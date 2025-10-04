'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { useLogin } from '~/api';
import { MenuSelector, MenuSelectorBack } from '~/components/ui';
import { env } from '~/constants/variables';
import { InputForm } from '../../_components/input-form';

const Page = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const { mutateAsync } = useLogin();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await mutateAsync({ email, password });
      localStorage.setItem(env.access_token, data.accessToken);

      router.replace('/');
    } catch (error) {
      console.error('[auth/login-email]', error);
    }
  };

  return (
    <form className="column gap-4" onSubmit={handleLogin}>
      <div className="column gap-1">
        <InputForm>
          <InputForm.Label className="min-w-[120px]">EMAIL :&nbsp;</InputForm.Label>
          <InputForm.Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </InputForm>
        <InputForm>
          <InputForm.Label className="min-w-[120px]">PW :&nbsp;</InputForm.Label>
          <InputForm.Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </InputForm>
      </div>

      <MenuSelector>
        <MenuSelector.Button type="submit">CONTINUE</MenuSelector.Button>
        <MenuSelectorBack />
      </MenuSelector>
    </form>
  );
};

export default Page;
