let nameList = [
  "테슬라",
  "알파벳",
  "삼성전자",
  "LG화학",
  "엔비디아",
  "네이버",
  "카카오",
  "토스",
];

const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected. Connected Clients: ", wss.clients.size);

  const intervalHandler = () => {
    const randomIndex = Math.floor(Math.random() * 7);
    const alarm = {
      id: Date.now(),
      name: nameList[randomIndex],
      price: Math.floor(Math.random() * 100000),
      updatedAt: new Date().toDateString(),
    };
    console.log("ws send", JSON.stringify({ type: "DATA", data: alarm }));

    ws.send(
      JSON.stringify({
        type: "DATA",
        data: alarm,
      })
    );
  };
  const intervalId = setInterval(intervalHandler, 8000);

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    let serverMessage = "";

    if (message === "PING") {
      serverMessage = JSON.stringify({
        type: "MESSAGE",
        data: "PONG",
      });
    } else {
      serverMessage = JSON.stringify({
        type: "MESSAGE",
        data: `Server: Received your message - ${message}`,
      });
    }

    ws.send(serverMessage);
  });

  // 연결이 닫혔을 때
  ws.on("close", () => {
    console.log("Client disconnected");
    clearInterval(intervalId);
  });
});

console.log("WebSocket server running on ws://localhost:8080");
