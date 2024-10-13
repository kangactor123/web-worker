import { useEffect, useState } from "react";

const sharedWorker = new SharedWorker(
  new URL("../workers/shared-worker.js", import.meta.url)
);

const SharedWorkerExample = () => {
  const [sharedWorkerResult, setSharedWorkerResult] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (sharedWorker) {
      sharedWorker.port.postMessage("Hello from Component!"); // Shared Worker에 메시지 전송

      sharedWorker.port.onmessage = (event: MessageEvent<string>) => {
        setSharedWorkerResult(event.data); // Shared Worker의 응답 데이터를 저장
      };

      // 포트 연결을 유지하기 위해 시작
      sharedWorker.port.start();
    }

    // 컴포넌트 언마운트 시 포트 연결 해제
    // return () => {
    //   sharedWorker.port.close();
    // };
  }, []);

  //   useEffect(() => {
  //     return () => sharedWorker.port.close();
  //   }, []);
  return (
    <div>
      <h1>Shared Worker Example</h1>
      {sharedWorkerResult !== null ? (
        <p>Shared Worker Result: {sharedWorkerResult}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SharedWorkerExample;
