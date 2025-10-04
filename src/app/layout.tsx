import '~/styles/globals.css';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
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
      <body className={twMerge('center size-full antialiased', DungGeunMo.className)}>
        <QueryClientProvider>
          <div className="relative h-[600px] w-[800px] bg-black">{children}</div>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
