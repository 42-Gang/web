'use client';

import { useRouter } from 'next/navigation';
import { MenuSelector } from './menu-selector';

export const MenuSelectorBack = () => {
  const router = useRouter();

  return <MenuSelector.Button onClick={() => router.back()}>GO BACK</MenuSelector.Button>;
};
