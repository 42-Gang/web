import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api';

const postAvatar = (formData: FormData) =>
  fetcher.post('users/avatar', {
    body: formData,
  });

export const useUploadAvatar = () => useMutation({ mutationFn: postAvatar });
