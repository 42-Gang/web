export type ServerToClientEvents = {
  [key: string]: (data: unknown) => void;
};

export type ClientToServerEvents = {
  [key: string]: (data: unknown) => void;
};
