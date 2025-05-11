type SocketEventData = {
  message: { text: string };
  notification: { title: string; body: string };
};

export type ServerToClientEvents = {
  [K in keyof SocketEventData]: (data: SocketEventData[K]) => void;
} & {
  [key: string]: (data: unknown) => void;
};

export interface ClientToServerEvents {
  sendMessage: (data: { text: string }) => void;
}
