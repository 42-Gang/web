import { ServerToClientEvents } from './socketEvents';

type EventCallback<T> = (data: T) => void;

type EventMap = {
  [K: string]: (data: unknown) => void;
};

class PubSub<TEvents extends EventMap> {
  private listeners: Partial<{
    [K in keyof TEvents]: EventCallback<Parameters<TEvents[K]>[0]>[];
  }> = {};

  subscribe<K extends keyof TEvents>(event: K, callback: EventCallback<Parameters<TEvents[K]>[0]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  unsubscribe<K extends keyof TEvents>(
    event: K,
    callback: EventCallback<Parameters<TEvents[K]>[0]>,
  ) {
    this.listeners[event] = this.listeners[event]?.filter((cb) => cb !== callback);
  }

  publish<K extends keyof TEvents>(event: K, data: Parameters<TEvents[K]>[0]) {
    this.listeners[event]?.forEach((cb) => cb(data));
  }
}

export const socketPubSub = new PubSub<ServerToClientEvents>();
