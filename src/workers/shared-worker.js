let connections = [];

self.onconnect = (event) => {
  const port = event.ports[0];
  connections.push(port);

  port.onmessage = (msgEvent) => {
    const { data } = msgEvent;
    connections.forEach((connection) => {
      connection.postMessage(`SharedWorker received: ${data}`);
    });
  };
};
