import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api';

type Response = {
  url: string;
};

const postAvatar = (formData: FormData) =>
  fetcher.post<{ data: Response }>('users/avatar', {
    body: formData,
  });

export const useUploadAvatar = () => useMutation({ mutationFn: postAvatar });
