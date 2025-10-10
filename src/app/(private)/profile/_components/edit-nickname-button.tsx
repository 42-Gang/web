import type { ComponentProps } from 'react';
import { EditIcon } from '~/components/icon';
import { twMerge } from 'tailwind-merge';

type Props = Pick<ComponentProps<'button'>, 'onClick' | 'className' | 'disabled' | 'aria-label'>;

export const EditNicknameButton = ({ onClick, className, disabled, ...rest }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={twMerge('cursor-pointer active:translate-y-px', 'className')}
      {...rest}
    >
      <EditIcon className="size-6 text-yellow-300" />
    </button>
  );
};
