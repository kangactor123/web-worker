export type DataType = "MESSAGE" | "DATA";
export type SocketData = {
  type: DataType;
  data: unknown;
};
