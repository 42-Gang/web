import type { PropsWithChildren } from 'react';
import { GlobalSocket } from './global-socket';

const PrivateLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <GlobalSocket />
    </>
  );
};

export default PrivateLayout;
