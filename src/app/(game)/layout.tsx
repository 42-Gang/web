import '~/styles/globals.css';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'PingPong Gang',
  description: 'PingPong Gang',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return children;
};

export default RootLayout;
