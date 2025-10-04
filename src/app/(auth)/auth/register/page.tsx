import { MenuSelector, MenuSelectorBack } from '~/components/ui';
import { routes } from '~/constants/routes';
import { OAuthLoginButton } from '../_components/oauth-login-button';

const Page = () => {
  return (
    <MenuSelector>
      <OAuthLoginButton provider="GOOGLE" type="SIGNUP" />
      <MenuSelector.Link href={`/${routes.register_email}`}>SIGN UP WITH EMAIL</MenuSelector.Link>
      <MenuSelectorBack />
    </MenuSelector>
  );
};

export default Page;
