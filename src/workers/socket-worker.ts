const socket: WebSocket = new WebSocket("ws://localhost:8080");

self.onmessage = (event: MessageEvent<string>) => {
  const { data: message } = event;

  if (socket) {
    socket.send(message);

    socket.onmessage = (event: MessageEvent<string>) => {
      const { data: serverMessage } = event;
      console.log("worker from socket: ", serverMessage);
      postMessage(serverMessage);
    };
  }
};
