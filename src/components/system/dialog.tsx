import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { ComponentPropsWithoutRef, ComponentRef, CSSProperties } from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { TimesIcon } from '~/components/icon';

const DialogRoot = DialogPrimitive.Root;

const DialogOverlay = forwardRef<
  ComponentRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      className={twMerge(
        'fixed inset-0 z-[1000] bg-white/20',
        '[data-state="open"]:animate-fade-in',
        '[data-state="closed"]:animate-fade-out',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, style: _style, ...props }, ref) => {
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
    '--pixel-step': '4px',
  } as CSSProperties;

  return (
    <DialogPrimitive.Portal>
      <DialogOverlay>
        <DialogPrimitive.Content
          ref={ref}
          className={twMerge(
            'pixel-rounded fixed top-1/2 left-1/2 grid w-full max-w-[728px] bg-black p-7 text-white',
            'shadow-[0_16px_70px_rgba(0,0,0,0.2)]',
            '-translate-x-1/2 -translate-y-1/2 z-[1010]',
            '[data-state=open]:animate-scale-up-and-fade',
            '[data-state=closed]:animate-scale-down-and-fade',
            className,
          )}
          style={style}
          {...props}
        />
      </DialogOverlay>
    </DialogPrimitive.Portal>
  );
});

DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Title
      className={twMerge('text-center text-2xl', className)}
      ref={ref}
      {...props}
    />
  );
});

DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogClose = forwardRef<
  ComponentRef<typeof DialogPrimitive.Close>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, children, ...props }, ref) => {
  return (
    <DialogPrimitive.Close ref={ref} {...props}>
      {children ? (
        children
      ) : (
        <span
          className={twMerge(
            'center absolute top-4 right-4 cursor-pointer opacity-100 hover:opacity-70 active:translate-y-px',
            className,
          )}
        >
          <TimesIcon size={20} />
        </span>
      )}
    </DialogPrimitive.Close>
  );
});

DialogClose.displayName = DialogPrimitive.Close.displayName;

export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogPrimitive.Trigger,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogPrimitive.Description,
  Close: DialogClose,
});
