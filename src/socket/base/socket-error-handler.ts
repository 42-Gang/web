import type { Socket } from 'socket.io-client';
import { refreshTokenWithMutex, tokenRefreshMutex } from '~/api/base/token';
import type { ClientToServerEvents, ServerToClientEvents } from './socket-events';

type SocketInstance = Socket<ServerToClientEvents, ClientToServerEvents>;

export interface SocketOptions {
  path: string;
  namespace?: string;
  withAuth?: boolean;
  autoReconnect?: boolean;
  query?: Record<string, string>;
}

const isAuthError = (err: unknown): boolean => {
  if (!err) return false;

  let msg = '';
  if (typeof err === 'string') {
    msg = err;
  } else if (err instanceof Error) {
    msg = err.message;
  } else if (typeof err === 'object' && 'message' in err) {
    msg = String((err as { message: unknown }).message);
  }

  const lower = msg.toLowerCase();

  return (
    lower.includes('auth') ||
    lower.includes('token') ||
    lower.includes('unauthorized') ||
    lower.includes('401') ||
    lower.includes('jwt') ||
    lower.includes('forbidden') ||
    msg.includes('권한') ||
    msg.includes('인증') ||
    msg.includes('유효하지 않은')
  );
};

let isRefreshing = false;
const pending: Array<(token: string) => Promise<void>> = [];

const refreshAndReconnect = async (
  socket: SocketInstance,
  options: SocketOptions,
  onRecreate: (token: string) => Promise<void>,
): Promise<void> => {
  if (options.autoReconnect === false) return;

  if (isRefreshing || tokenRefreshMutex.isLocked()) {
    console.log('[socket-error-handler] Waiting for token refresh...');
    pending.push(onRecreate);
    return;
  }

  isRefreshing = true;

  try {
    const result = await refreshTokenWithMutex({
      onFailure: err => {
        console.error('[socket-error-handler] Token refresh failed:', err);
        socket.disconnect();
      },
    });

    if (result.success && result.token) {
      console.log('[socket-error-handler] Token refreshed, recreating');

      await onRecreate(result.token);

      for (const recreate of pending) {
        await recreate(result.token);
      }

      pending.length = 0;
    } else {
      console.error('[socket-error-handler] Token refresh failed, disconnecting');
      socket.disconnect();
    }
  } catch (err) {
    console.error('[socket-error-handler] Refresh exception:', err);
    socket.disconnect();
  } finally {
    isRefreshing = false;
  }
};

export const setupErrorHandlers = (
  socket: SocketInstance,
  options: SocketOptions,
  onRecreate: (token: string) => Promise<void>,
) => {
  socket.on('connect_error', async err => {
    console.error('[socket-error-handler] Connection error:', err);
    if (isAuthError(err)) {
      await refreshAndReconnect(socket, options, onRecreate);
    }
  });

  socket.on('disconnect', async reason => {
    console.log('[socket-error-handler] Disconnected:', reason);
    if (isAuthError(reason)) {
      await refreshAndReconnect(socket, options, onRecreate);
    }
  });

  socket.on('connect', () => {
    console.log('[socket-error-handler] Connected');
  });
};
