import { Suspense } from '@suspensive/react';
import { CloseButton } from '~/components/ui';
import { ClientComponents } from './client-components';

const Page = () => {
  return (
    <>
      <CloseButton />

      <Suspense clientOnly>
        <ClientComponents />
      </Suspense>
    </>
  );
};

export default Page;
