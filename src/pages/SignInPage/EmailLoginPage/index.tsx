import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLogin } from '@/api';
import { useAuthAtom } from '@/atoms/useAuthAtom';
import { Flex } from '@/components/system';
import { Branding, DefaultStepNavigator, GameLicense } from '@/components/ui';

export const EmailSignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setToken } = useAuthAtom();

  const { mutateAsync } = useLogin();

  const handleSelect = async (index: number) => {
    switch (index) {
      case 0: {
        const { data } = await mutateAsync({ email, password });
        if (!data) throw new Error('로그인에 실패했습니다.');
        setToken(data.accessToken);
        break;
      }
      case 1:
        navigate(-1);
        break;
      default:
        break;
    }
  };

  return (
    <Flex direction="column" justifyContent="space-between" style={{ height: '100%' }}>
      <Branding css={css({ marginTop: '74px' })} />

      {/* TODO: Implement UI */}
      <Flex direction="column" justifyContent="center">
        <Flex justifyContent="center" style={{ color: 'white' }}>
          <p>EMAIL : </p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Flex>
        <Flex justifyContent="center" style={{ color: 'white' }}>
          <p>PW : </p>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        </Flex>

        <DefaultStepNavigator
          style={{ marginTop: '12px' }}
          items={['CONTINUE', 'GO BACK']}
          onSelect={handleSelect}
        />
      </Flex>
      <GameLicense />
    </Flex>
  );
};
