// WeafRef
// tsconfig의 lib에 ESNEXT 추가

// SharedWorker TypeScript
// @types/sharedworker DevDependency로 설치

let connections: WeakRef<MessagePort>[] = [];

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

    if (socket) {
      socket.send(message);

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
    }
  };
};
