'use client';

import { type ComponentProps, type FormEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { PlayIcon } from '~/components/icon';

interface Props extends ComponentProps<'form'> {
  onSend: (message: string) => void;
}

export const ChatInputForm = ({ className, onSend, ...props }: Props) => {
  const [message, setMessage] = useState<string>('');

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    onSend(message);
    setMessage('');
  };

  return (
    <form
      className={twMerge('row-center-y w-full p-3', className)}
      onSubmit={handleSend}
      {...props}
    >
      <div className="flex rounded-lg bg-neutral-50/50 px-3">
        <input
          className="flex-1 py-2 outline-none"
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button
          className="shrink-0 cursor-pointer text-neutral-950 active:translate-y-px"
          type="submit"
          aria-label="Send message"
        >
          <PlayIcon size={20} />
        </button>
      </div>
    </form>
  );
};
