import { useState } from "react";
import WorkerExample from "./components/WorkerExample";

function App() {
  const [show, setShow] = useState(true);
  const toggle = () => {
    setShow((prev) => !prev);
  };
  return (
    <div>
      <button onClick={toggle}>toggle</button>
      {show && <WorkerExample />}
    </div>
  );
}

export default App;
