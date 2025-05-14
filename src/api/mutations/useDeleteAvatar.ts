import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api';

const deleteAvatar = () => fetcher.delete<void>('users/avatar');

export const useDeleteAvatar = () => useMutation({ mutationFn: deleteAvatar });
