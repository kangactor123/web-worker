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
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    ws.send(
      JSON.stringify({
        type: "MESSAGE",
        data: `Server: Received your message - ${message}`,
      })
    );
  });

  // 연결이 닫혔을 때
  ws.on("close", () => {
    console.log("Client disconnected");
  });

  setInterval(() => {
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
  }, 8000);
});

console.log("WebSocket server running on ws://localhost:8080");
