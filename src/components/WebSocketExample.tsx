import { useEffect, useRef } from "react";

const WebSocketExample = () => {
  const ws = useRef<WebSocket | null>(null);

  const handleClickButton = () => {
    if (ws.current) {
      ws.current.send(`send num ${Math.floor(Math.random() * 100)}`);
    }
  };

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    if (ws.current) {
      ws.current.onopen = () => {
        console.log("socket open");
      };

      ws.current.onmessage = (event: MessageEvent<string>) => {
        console.log(event.data);
      };

      ws.current.onclose = () => {
        console.log("ws disconnect");
      };
    }

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);
  return (
    <div>
      <h1>Web Socket Test</h1>
      <button onClick={handleClickButton}>Send Message</button>
    </div>
  );
};

export default WebSocketExample;
