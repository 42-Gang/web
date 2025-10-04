import type { PropsWithChildren } from 'react';
import { BrandFooter, BrandTitle } from '~/components/ui';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="column-between h-full">
      <BrandTitle />

      {children}

      <BrandFooter />
    </div>
  );
};

export default RootLayout;
