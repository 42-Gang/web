import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import * as styles from './styles.css';

export const GameLicense = ({ className, ...props }: ComponentProps<'p'>) => {
  return (
    <p className={clsx(className, styles.license)} {...props}>
      TH & C 1980 1993 NAMCO LTD.
      <br />
      NAMCO HOMETEK, INC.
      <br />
      LICENSED BY NINTENDO
    </p>
  );
};
