import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { EditIcon } from '~/components/icon';

interface Props extends ComponentProps<'button'> {}

export const EditNicknameButton = ({ className, ...props }: Props) => {
  return (
    <button
      type="button"
      className={twMerge('cursor-pointer active:translate-y-px', className)}
      {...props}
    >
      <EditIcon className="text-yellow-300" size={24} />
    </button>
  );
};
