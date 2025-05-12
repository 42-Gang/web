import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import * as styles from './styles.css';

export const Branding = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={clsx(className, styles.branding)} {...props}>
      PING PONG
      <br />
      Gang
    </div>
  );
};
