const socket: WebSocket = new WebSocket("ws://localhost:8080");

self.onmessage = (event: MessageEvent<string>) => {
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

socket.onmessage = (event: MessageEvent<string>) => {
  const { data: serverMessage } = event;
  console.log("worker from socket: ", serverMessage);

  postMessage(serverMessage);
};

socket.onopen = () => {
  socket.send("PING");
};

socket.onerror = () => {
  postMessage(JSON.stringify({ type: "MESSAGE", data: "소켓 에러입니다." }));
};
