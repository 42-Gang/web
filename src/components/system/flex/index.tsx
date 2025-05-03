/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ComponentProps } from 'react';

type FlexProps = {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  gap?: string;
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
} & ComponentProps<'div'>;

export const Flex = ({
  direction = 'row',
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  gap = '0',
  wrap = 'nowrap',
  children,
  ...rest
}: FlexProps) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: ${direction};
        justify-content: ${justifyContent};
        align-items: ${alignItems};
        gap: ${gap};
        flex-wrap: ${wrap};
      `}
      {...rest}
    >
      {children}
    </div>
  );
};
