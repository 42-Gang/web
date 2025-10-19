import { type PropsWithChildren, Suspense } from 'react';
import { AutoLeaveHandler } from './auto-leave-handler';

const AutoMatchingLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Suspense>
        <AutoLeaveHandler />
      </Suspense>
      {children}
    </>
  );
};

export default AutoMatchingLayout;
