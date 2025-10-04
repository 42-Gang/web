import { BrandFooter, BrandTitle, MenuSelector } from '~/components/ui';
import { routes } from '~/constants/routes';

const Page = () => {
  return (
    <div className="column-between h-full">
      <BrandTitle showGuns />

      <MenuSelector>
        <MenuSelector.Link href={`/${routes.lobby}`}>START GAME</MenuSelector.Link>
        <MenuSelector.Link href={`/${routes.history}`}>HISTORY</MenuSelector.Link>
        <MenuSelector.Link href={`/${routes.friend}`}>FRIEND</MenuSelector.Link>
        <MenuSelector.Link href={`/${routes.profile}`}>PROFILE</MenuSelector.Link>
      </MenuSelector>

      <BrandFooter />
    </div>
  );
};

export default Page;
