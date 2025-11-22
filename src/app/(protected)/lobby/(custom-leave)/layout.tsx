import { type PropsWithChildren, Suspense } from 'react';
import { CustomLeaveHandler } from './custom-leave-handler';

const CustomLobbyLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Suspense>
        <CustomLeaveHandler />
      </Suspense>
      {children}
    </>
  );
};

export default CustomLobbyLayout;
