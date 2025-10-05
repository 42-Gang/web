import type { Socket } from 'socket.io-client';
import { getAccessToken, refreshTokenWithMutex, tokenRefreshMutex } from '~/api/base/token';
import type { ClientToServerEvents, ServerToClientEvents } from './socket-events';

type SocketInstance = Socket<ServerToClientEvents, ClientToServerEvents>;

export interface SocketOptions {
  path: string;
  namespace?: string;
  withAuth?: boolean;
  autoReconnect?: boolean;
  query?: Record<string, string>;
}

export const isAuthError = (errorOrReason: unknown): boolean => {
  if (!errorOrReason) return false;

  let message = '';
  if (typeof errorOrReason === 'string') {
    message = errorOrReason;
  } else if (errorOrReason instanceof Error) {
    message = errorOrReason.message;
  } else if (typeof errorOrReason === 'object' && 'message' in errorOrReason) {
    message = String((errorOrReason as { message: unknown }).message);
  }

  const lowerMessage = message.toLowerCase();

  return (
    lowerMessage.includes('auth') ||
    lowerMessage.includes('token') ||
    lowerMessage.includes('unauthorized') ||
    lowerMessage.includes('401') ||
    lowerMessage.includes('jwt') ||
    lowerMessage.includes('forbidden') ||
    message.includes('권한') ||
    message.includes('인증') ||
    message.includes('유효하지 않은')
  );
};

export const handleTokenRefreshAndReconnect = async (
  socket: SocketInstance,
  options: SocketOptions,
  onSocketRecreate: (newToken: string) => Promise<void>,
): Promise<void> => {
  if (options.autoReconnect === false) {
    return;
  }

  try {
    if (tokenRefreshMutex.isLocked()) {
      console.log('[socket-error-handler] Token refresh in progress, waiting...');
      await tokenRefreshMutex.waitForUnlock();

      const newToken = getAccessToken();
      if (newToken) {
        console.log('[socket-error-handler] Using refreshed token, recreating socket');
        await onSocketRecreate(newToken);
      }
      return;
    }

    const result = await refreshTokenWithMutex({
      onFailure: error => {
        console.error('[socket-error-handler] Token refresh failed:', error);
        socket.disconnect();
      },
    });

    if (result.success && result.token) {
      console.log('[socket-error-handler] Token refreshed, recreating socket');
      await onSocketRecreate(result.token);
    } else {
      console.error('[socket-error-handler] No token available after refresh');
      socket.disconnect();
    }
  } catch (refreshError) {
    console.error('[socket-error-handler] Token refresh exception:', refreshError);
  }
};

export const setupAuthErrorHandlers = (
  socket: SocketInstance,
  options: SocketOptions,
  onSocketRecreate: (newToken: string) => Promise<void>,
) => {
  socket.on('connect_error', async (error: unknown) => {
    console.error('[socket-error-handler] Connection error:', error);

    if (isAuthError(error)) {
      await handleTokenRefreshAndReconnect(socket, options, onSocketRecreate);
    }
  });

  socket.on('disconnect', async (reason: unknown) => {
    console.log('[socket-error-handler] Disconnected:', reason);

    if (isAuthError(reason)) {
      await handleTokenRefreshAndReconnect(socket, options, onSocketRecreate);
    }
  });

  socket.on('connect', () => {
    console.log('[socket-error-handler] Connected successfully');
  });
};
