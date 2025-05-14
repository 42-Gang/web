import { useMutation } from '@tanstack/react-query';

import { instance, resultify } from '@/api/fetcher';

const deleteAvatar = () =>
  resultify<void>(
    instance.delete('users/avatar', {
      headers: undefined,
    }),
  );

export const useDeleteAvatar = () => useMutation({ mutationFn: deleteAvatar });
