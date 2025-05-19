import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import * as styles from './styles.css';

type DividerProps = ComponentProps<'hr'>;

export const Divider = ({ className, ...props }: DividerProps) => {
  return <hr className={clsx(styles.divider, className)} {...props} />;
};
