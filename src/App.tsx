// import WebSocket from "./components/WebSocketExample";
// import WorkerExample from "./components/WorkerExample";
import SharedWorkerExample from "./components/SharedWorkerExample";

import "./app.css";

function App() {
  return (
    <div className="container">
      <SharedWorkerExample />
      {/* <WorkerExample /> */}
      {/* <WebSocket /> */}
    </div>
  );
}

export default App;
