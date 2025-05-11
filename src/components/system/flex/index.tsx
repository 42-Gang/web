import { RecipeVariants } from '@vanilla-extract/recipes';
import { clsx } from 'clsx';
import { ComponentProps } from 'react';

import * as styles from './styles.css';

type FlexProps = RecipeVariants<typeof styles.flex> & ComponentProps<'div'>;

export const Flex = ({
  direction,
  justifyContent,
  alignItems,
  wrap,
  className,
  children,
  ...rest
}: FlexProps) => {
  return (
    <div
      className={clsx(className, styles.flex({ direction, justifyContent, alignItems, wrap }))}
      {...rest}
    >
      {children}
    </div>
  );
};
