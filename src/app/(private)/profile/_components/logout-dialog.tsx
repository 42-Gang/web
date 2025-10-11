import type { PropsWithChildren } from 'react';
import { useLogout } from '~/api';
import { extractErrorData, removeAccessToken } from '~/api/base';
import { Dialog } from '~/components/system';
import { routes } from '~/constants/routes';

export const LogoutDialog = ({ children }: PropsWithChildren) => {
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    if (isPending) return;

    logout(undefined, {
      onSuccess: async () => {
        removeAccessToken();
        window.location.replace(`/${routes.auth}`);
      },
      onError: async error => {
        console.error('Failed to logout:', error);
        const errorData = await extractErrorData(error);
        toast.error(errorData?.message || '로그아웃에 실패했습니다.');
      },
    });
  };
  return (
    <Dialog>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content className="w-[428px]">
        <Dialog.Title>정말 로그아웃하시겠습니까?</Dialog.Title>
        <Dialog.Description className="mt-2 text-center">
          다시 로그인하면 서비스를 이용할 수 있습니다.
        </Dialog.Description>

        <div className="center-y mx-auto mt-8 gap-3">
          <button
            className="w-fit cursor-pointer border border-neutral-50/50 bg-neutral-50/50 px-3 py-0.5 active:translate-y-px"
            type="button"
            onClick={handleLogout}
          >
            확인
          </button>
          <Dialog.Close asChild>
            <button
              className="w-fit cursor-pointer border border-neutral-50/50 bg-neutral-50/50 px-3 py-0.5 active:translate-y-px"
              type="button"
            >
              취소
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
