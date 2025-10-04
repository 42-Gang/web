import { MenuSelector, MenuSelectorBack } from '~/components/ui';
import { routes } from '~/constants/routes';
import { OAuthLoginButton } from '../../_components/oauth-login-button';

const Page = () => {
  return (
    <MenuSelector>
      <OAuthLoginButton provider="GOOGLE" type="SIGNIN" />
      <MenuSelector.Link href={`/${routes.login_email}`}>SIGN IN WITH EMAIL</MenuSelector.Link>
      <MenuSelectorBack />
    </MenuSelector>
  );
};

export default Page;
