import { type PropsWithChildren, Suspense } from 'react';
import { AutoLeaveHandler } from './auto-leave-handler';

const AutoLobbyLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Suspense>
        <AutoLeaveHandler />
      </Suspense>
      {children}
    </>
  );
};

export default AutoLobbyLayout;
