import * as DialogPrimitive from '@radix-ui/react-dialog';
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const DialogRoot = DialogPrimitive.Root;

const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = forwardRef<
  ComponentRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      className={twMerge(
        'fixed inset-0 z-[1000] bg-white/20',
        '[data-state=open]:animate-fade-in',
        '[data-state=closed]:animate-fade-out',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogContent = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Content
      className={twMerge(
        'fixed top-1/2 left-1/2 grid w-full max-w-[728px] p-[28px]',
        'rounded-[20px] bg-black text-white',
        'shadow-[0_16px_70px_rgba(0,0,0,0.2)]',
        '-translate-x-1/2 -translate-y-1/2 z-[1010]',
        '[data-state=open]:animate-scale-up-and-fade',
        '[data-state=closed]:animate-scale-down-and-fade',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Title
      className={twMerge('text-center text-[28px]', className)}
      ref={ref}
      {...props}
    />
  );
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = DialogPrimitive.Description;

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
            'absolute top-3 right-3 grid place-items-center',
            'size-8 rounded-full bg-transparent opacity-100 transition-opacity hover:opacity-70',
            className,
          )}
        >
          ❌
        </span>
      )}
    </DialogPrimitive.Close>
  );
});
DialogClose.displayName = DialogPrimitive.Close.displayName;

export const Dialog = Object.assign(DialogRoot, {
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
});
