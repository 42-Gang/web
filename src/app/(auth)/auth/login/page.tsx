import { BrandFooter, BrandTitle, MenuSelector } from '~/components/ui';
import { routes } from '~/constants/routes';

const Page = () => {
  return (
    <div className="column-between h-full">
      <BrandTitle />

      <MenuSelector>
        <MenuSelector.Link href={`/${routes.login}`}>SIGN IN WITH GOOGLE</MenuSelector.Link>
        <MenuSelector.Link href={`/${routes.register}`}>SIGN IN WITH EMAIL</MenuSelector.Link>
        <MenuSelector.Button>GO BACK</MenuSelector.Button>
      </MenuSelector>

      <BrandFooter />
    </div>
  );
};

export default Page;
