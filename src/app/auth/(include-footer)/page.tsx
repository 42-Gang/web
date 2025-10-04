import { MenuSelector } from '~/components/ui';
import { routes } from '~/constants/routes';

const Page = () => {
  return (
    <MenuSelector>
      <MenuSelector.Link href={`/${routes.login}`}>SIGN IN</MenuSelector.Link>
      <MenuSelector.Link href={`/${routes.register}`}>SIGN UP</MenuSelector.Link>
    </MenuSelector>
  );
};

export default Page;
