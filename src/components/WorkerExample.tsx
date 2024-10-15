import useWebWorker from "../hooks/useWebWorker";

const workerPath = "../workers/worker-example.ts";

type Sample = {
  type: string;
};

const WorkerExample = () => {
  const { message, loading, sendMessage } = useWebWorker<Sample>({
    url: workerPath,
  });

  const handleClick = () => {
    sendMessage(JSON.stringify({ type: "Web Worker" }));
  };

  return (
    <div>
      <h1>웹 워커 샘플</h1>
      <button onClick={handleClick}>생성하기</button>
      {loading ? <p>로딩중..</p> : <p>생성한 타입: {message?.type}</p>}
    </div>
  );
};

export default WorkerExample;
