import '~/styles/globals.css';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { QueryClientProvider } from '~/app/QueryClientProvider';
import { DungGeunMo } from './_fonts';

export const metadata: Metadata = {
  title: 'PingPong Gang',
  description: 'PingPong Gang',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko">
      <body className={twMerge('antialiased', DungGeunMo.className)}>
        <QueryClientProvider>
          {children}
          <Toaster position="top-right" toastOptions={{ classNames: { toast: 'pixel-toast' } }} />
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
