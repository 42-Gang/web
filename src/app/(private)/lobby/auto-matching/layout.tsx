import type { PropsWithChildren } from 'react';
import { AutoLeaveHandler } from './auto-leave-handler';

const AutoMatchingLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <AutoLeaveHandler />
      {children}
    </>
  );
};

export default AutoMatchingLayout;
