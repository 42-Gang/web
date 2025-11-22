import { type ComponentProps, type CSSProperties, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type CTAButtonSize = 'sm' | 'md' | 'lg';

interface CTAButtonProps extends ComponentProps<'button'> {
  size?: CTAButtonSize;
}

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(function CTAButton(
  {
    className,
    children,
    style: _style,
    disabled,
    size = 'md',
    'aria-selected': selected,
    ...props
  },
  ref,
) {
  const style = {
    ..._style,
    boxShadow: `
      0 0 0 2px #6E2F2D,
      0 4px 0 0 #00000080,
      inset 0 3px 0 0 #FFFFFF33,
      inset 0 -3px 0 0 #1E3445,
      inset 3px 0 0 0 #00000080,
      inset -3px 0 0 0 #1E3445
    `,
    '--pixel-step': `${getBorderStep(size)}px`,
  } as CSSProperties;

  return (
    <button
      ref={ref}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      className={twMerge(
        'pixel-rounded relative cursor-pointer bg-[#C25C5A] font-medium text-white',
        'hover:bg-[#E0706E] active:translate-y-[calc(var(--pixel-step)-1px)] active:shadow-none',
        selected && 'translate-y-[calc(var(--pixel-step)-1px)] bg-[#E0706E] shadow-none',
        getHeight(size),
        className,
      )}
      style={style}
      {...props}
    >
      <span className="leading-none">{children}</span>
    </button>
  );
});

const getBorderStep = (size: CTAButtonSize) => {
  switch (size) {
    case 'sm':
      return 2;
    case 'md':
      return 3;
    case 'lg':
      return 4;
  }
};

const getHeight = (size: CTAButtonSize) => {
  switch (size) {
    case 'sm':
      return 'h-8 px-4 text-[16px]';
    case 'md':
      return 'h-10 px-6 text-[20px]';
    case 'lg':
      return 'h-12 px-8 text-[24px]';
  }
};
