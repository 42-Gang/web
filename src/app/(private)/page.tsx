import { BrandFooter, BrandTitle } from '~/components/ui';

const Page = () => {
  return (
    <div className="column-between h-full">
      <BrandTitle showGuns />
      <BrandFooter />
    </div>
  );
};

export default Page;
