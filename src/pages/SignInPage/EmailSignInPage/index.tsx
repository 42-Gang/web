import { HTTPError } from 'ky';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useLogin } from '@/api';
import { useAuthAtom } from '@/atoms/useAuthAtom';
import { Flex } from '@/components/system';
import { Branding, DefaultStepNavigator, GameLicense } from '@/components/ui';

import * as styles from './styles.css';

const CONTINUE_ACTION_INDEX = 0;

export const EmailSignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setToken } = useAuthAtom();
  const { mutateAsync } = useLogin();

  const handleSelect = async (index: number) => {
    switch (index) {
      case 0: {
        try {
          const { data } = await mutateAsync({ email, password });

          if (!data) throw new Error('로그인에 실패했습니다.');

          setToken(data.accessToken);
        } catch (error) {
          console.error('로그인 실패:', error);

          if (error instanceof HTTPError) {
            const res = await error.response.json();
            const message = res?.message?.replace(/^body\//, '') || 'Failed to sign in';
            toast.error(message);
          }
        }
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
      <Branding className={styles.branding} />

      <Flex direction="column" justifyContent="center">
        <div className={styles.inputRow}>
          <label htmlFor="email" className={styles.label}>
            EMAIL :
          </label>
          <input
            id="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') await handleSelect(CONTINUE_ACTION_INDEX);
            }}
          />
        </div>

        <div className={styles.inputRow}>
          <label htmlFor="password" className={styles.label}>
            PW :
          </label>
          <input
            id="password"
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') await handleSelect(CONTINUE_ACTION_INDEX);
            }}
          />
        </div>

        <DefaultStepNavigator
          style={{ marginTop: '12px', outline: 'none' }}
          items={['CONTINUE', 'GO BACK']}
          onSelect={handleSelect}
        />
      </Flex>

      <GameLicense className={styles.license} />
    </Flex>
  );
};
