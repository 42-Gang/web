import Link from 'next/link';
import { BrandFooter, BrandTitle } from '~/components/ui';
import { routes } from '~/constants/routes';

const Page = () => {
  return (
    <div className="column-between h-full">
      <BrandTitle />

      <div className="column">
        <Link className="text-white" href={`/${routes.login}`}>
          SIGN IN
        </Link>
        <Link className="text-white" href={`/${routes.register}`}>
          SIGN UP
        </Link>
      </div>

      <BrandFooter />
    </div>
  );
};

export default Page;
