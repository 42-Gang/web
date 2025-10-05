import { type PropsWithChildren, Suspense } from 'react';
import { GlobalSocket } from './global-socket';

const PrivateLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <GlobalSocket />
      </Suspense>
    </>
  );
};

export default PrivateLayout;
