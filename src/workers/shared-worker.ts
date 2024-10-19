const connections: WeakRef<MessagePort>[] = [];
const socket: WebSocket = new WebSocket("ws://localhost:8080");

self.onconnect = (event) => {
  const port = event.ports[0];
  const weakPort = new WeakRef<MessagePort>(port);

  connections.push(weakPort);

  if (!weakPort.deref()) {
    return;
  }

  port.onmessage = (event: MessageEvent<string>) => {
    const { data: message } = event;

    if (message === "CLOSE_SOCKET") {
      socket.close();
    }

    if (socket.readyState === socket.CONNECTING) {
      postMessage(
        JSON.stringify({ type: "MESSAGE", data: "Socket is connecting..." })
      );
      return;
    }

    if (socket) {
      socket.send(message);
    }
  };
};

socket.onmessage = (event: MessageEvent<string>) => {
  const { data: serverMessage } = event;
  console.log("worker from socket: ", serverMessage);

  connections.forEach((connection) => {
    const port = connection.deref();

    if (port) {
      port.postMessage(serverMessage);
    }
  });
};

socket.onopen = () => {
  socket.send("PING");
};

socket.onerror = () => {
  postMessage(JSON.stringify({ type: "MESSAGE", data: "소켓 에러입니다." }));
};
