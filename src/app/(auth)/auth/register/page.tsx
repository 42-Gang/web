import { BrandFooter, BrandTitle, MenuSelector, MenuSelectorBack } from '~/components/ui';
import { routes } from '~/constants/routes';
import { OAuthLoginButton } from '../_components/oauth-login-button';

const Page = () => {
  return (
    <div className="column-between h-full">
      <BrandTitle />

      <MenuSelector>
        <OAuthLoginButton provider="GOOGLE" type="SIGNUP" />
        <MenuSelector.Link href={`/${routes.register}`}>SIGN UP WITH EMAIL</MenuSelector.Link>
        <MenuSelectorBack />
      </MenuSelector>

      <BrandFooter />
    </div>
  );
};

export default Page;
