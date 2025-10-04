import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../base';

const postLogout = () => fetcher.post<void>('v1/auth/logout', { json: {} });

export const useLogout = () => useMutation({ mutationFn: postLogout });
