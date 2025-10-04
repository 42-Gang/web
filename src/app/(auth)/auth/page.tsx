import { BrandFooter, BrandTitle, MenuSelector } from '~/components/ui';
import { routes } from '~/constants/routes';

const Page = () => {
  return (
    <div className="column-between h-full">
      <BrandTitle />

      <MenuSelector>
        <MenuSelector.Link href={`/${routes.login}`}>SIGN IN</MenuSelector.Link>
        <MenuSelector.Link href={`/${routes.register}`}>SIGN UP</MenuSelector.Link>
      </MenuSelector>

      <BrandFooter />
    </div>
  );
};

export default Page;
