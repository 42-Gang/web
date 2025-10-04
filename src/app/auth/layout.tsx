import type { PropsWithChildren } from 'react';
import { BrandTitle } from '~/components/ui';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="column-between h-full">
      <BrandTitle />

      {children}
    </div>
  );
};

export default RootLayout;
