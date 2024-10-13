import useWebWorker from "../hooks/useWebWorker";

const workerPath = "../workers/worker-example.ts";

const WorkerExample = () => {
  const { message, loading, sendMessage } = useWebWorker<number>({
    url: workerPath,
  });

  return (
    <div>
      <h1>랜덤 숫자 생성</h1>
      <button onClick={() => sendMessage(2)}>생성하기</button>
      {loading ? <p>로딩중..</p> : <p>생성한 숫자: {message}</p>}
    </div>
  );
};

export default WorkerExample;
