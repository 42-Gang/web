'use client';

import { MenuSelector, MenuSelectorBack } from '~/components/ui';
import { InputForm } from '../_components/input-form';

const Page = () => {
  return (
    <form className="column gap-4">
      <div className="column gap-1">
        <InputForm>
          <InputForm.Label className="min-w-[120px]">EMAIL :&nbsp;</InputForm.Label>
          <InputForm.Input type="email" />
        </InputForm>
        <InputForm>
          <InputForm.Label className="min-w-[120px]">PW :&nbsp;</InputForm.Label>
          <InputForm.Input type="password" />
        </InputForm>
      </div>

      <MenuSelector>
        <MenuSelector.Button type="submit">CONTINUE</MenuSelector.Button>
        <MenuSelectorBack />
      </MenuSelector>
    </form>
  );
};

export default Page;
