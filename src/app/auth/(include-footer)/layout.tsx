import type { PropsWithChildren } from 'react';
import { BrandFooter } from '~/components/ui';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <BrandFooter />
    </>
  );
};

export default RootLayout;
