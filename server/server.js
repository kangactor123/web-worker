// server.js
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  // 클라이언트로부터 메시지 수신
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    // 받은 메시지를 다시 클라이언트로 전송
    ws.send(`Server: Received your message - ${message}`);
  });

  // 연결이 닫혔을 때
  ws.on("close", () => {
    // clearInterval(intervalId);
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:8080");
