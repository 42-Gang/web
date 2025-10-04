import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { Tiny } from '~/app/_fonts';

interface InputFormRootProps extends ComponentProps<'div'> {}

const InputFormRoot = ({ className, ...props }: InputFormRootProps) => {
  return <div className={twMerge('center-y w-full', className)} {...props} />;
};

interface InputFormLabelProps extends ComponentProps<'p'> {}

const InputFormLabel = ({ className, ...props }: InputFormLabelProps) => {
  return (
    <p
      className={twMerge('text-end font-medium text-[24px] text-white', Tiny.className, className)}
      {...props}
    />
  );
};

interface InputFormInputProps extends ComponentProps<'input'> {}

const InputFormInput = ({ className, ...props }: InputFormInputProps) => {
  return <input className={twMerge('font-medium text-[24px] text-white', className)} {...props} />;
};

export const InputForm = Object.assign(InputFormRoot, {
  Label: InputFormLabel,
  Input: InputFormInput,
});
