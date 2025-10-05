import type { Socket } from 'socket.io-client';
import { getAccessToken, refreshTokenWithMutex } from '~/api/base/token';
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
    message.includes('토큰')
  );
};

export const handleTokenRefreshAndReconnect = async (
  socket: SocketInstance,
  options: SocketOptions,
): Promise<void> => {
  if (options.autoReconnect === false) {
    console.log('[socket-error-handler] autoReconnect disabled, skipping token refresh');
    return;
  }

  console.log('[socket-error-handler] Attempting token refresh');

  try {
    const result = await refreshTokenWithMutex({
      onFailure: error => {
        console.error('[socket-error-handler] Token refresh failed:', error);
        socket.disconnect();
      },
    });

    if (result.success && result.token) {
      if (socket.io.opts.query) {
        (socket.io.opts.query as Record<string, string>).token = result.token;
      }
      console.log('[socket-error-handler] Reconnecting with new token');
      socket.connect();
    } else {
      console.error('[socket-error-handler] No token available after refresh');
      socket.disconnect();
    }
  } catch (refreshError) {
    console.error('[socket-error-handler] Token refresh exception:', refreshError);
  }
};

export const setupAuthErrorHandlers = (socket: SocketInstance, options: SocketOptions) => {
  socket.on('connect_error', async (error: unknown) => {
    console.error('[socket-error-handler] Connection error:', error);

    if (isAuthError(error)) {
      await handleTokenRefreshAndReconnect(socket, options);
    }
  });

  socket.on('disconnect', async (reason: unknown) => {
    console.log('[socket-error-handler] Disconnected:', reason);

    if (isAuthError(reason)) {
      await handleTokenRefreshAndReconnect(socket, options);
    }
  });

  socket.io.on('reconnect_attempt', () => {
    console.log('[socket-error-handler] Reconnect attempt');
    const newToken = getAccessToken();
    if (newToken && socket.io.opts.query) {
      (socket.io.opts.query as Record<string, string>).token = newToken;
    }
  });

  socket.on('connect', () => {
    console.log('[socket-error-handler] Connected successfully');
  });
};
