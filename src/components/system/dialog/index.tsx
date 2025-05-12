import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react';

import * as styles from './styles.css';

const Dialog = DialogPrimitive.Root;

const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = forwardRef<
  ComponentRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay className={clsx(className, styles.overlay)} ref={ref} {...props} />
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogContent = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Content className={clsx(className, styles.content)} ref={ref} {...props} />
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
  return <DialogPrimitive.Title className={clsx(className, styles.title)} ref={ref} {...props} />;
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = DialogPrimitive.Description;

const DialogClose = forwardRef<
  ComponentRef<typeof DialogPrimitive.Close>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, children, ...props }, ref) => {
  return (
    <DialogPrimitive.Close ref={ref} {...props}>
      {children ? children : <span className={clsx(className, styles.close)}>❌</span>}
    </DialogPrimitive.Close>
  );
});
DialogClose.displayName = DialogPrimitive.Close.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
