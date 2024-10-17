import { useState } from "react";
import WorkerExample from "./components/WorkerExample";

// import WebSocket from "./components/WebSocketExample";

import SharedWorkerExample from "./components/SharedWorkerExample";

function App() {
  const [show, setShow] = useState(true);
  const toggle = () => {
    setShow((prev) => !prev);
  };
  return (
    <div>
      {/* <button onClick={toggle}>toggle</button>
      {show && <WorkerExample />} */}
      {/* <WebSocket /> */}
      <SharedWorkerExample />
    </div>
  );
}

export default App;
