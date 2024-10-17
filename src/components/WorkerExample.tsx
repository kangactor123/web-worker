import { useEffect, useMemo, useState } from "react";
import useWebWorker from "../hooks/useWebWorker";

// const workerPath = "../workers/worker-example.ts";
const socketWorkerPath = "../workers/socket-worker.ts";

type Alarm = {
  id: string;
  name: string;
  price: number;
  updatedAt: string;
};

type SocketData = {
  type: "MESSAGE" | "DATA";
  data: unknown;
};

const WorkerExample = () => {
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);
  const { message, loading, sendMessage } = useWebWorker<SocketData>({
    url: socketWorkerPath,
  });

  const serverMessage: string | null = useMemo(() => {
    let serverMsg = null;

    if (message?.type === "MESSAGE") {
      serverMsg = (message?.data as string) ?? null;
    }

    return serverMsg;
  }, [message]);

  useEffect(() => {
    if (message?.type === "DATA") {
      const alarm = message.data as Alarm;
      setAlarmList((prev) => [...prev, alarm]);
    }
  }, [message]);

  const handleClick = () => {
    sendMessage("알림 생성하기");
  };

  return (
    <div>
      <h1>웹 워커 샘플</h1>
      <h3>서버메세지</h3>
      <p>{serverMessage ?? "서버에서 보낸 메세지가 존재하지 않습니다."}</p>
      <button onClick={handleClick}>알람 보내기</button>
      {loading ? (
        <p>로딩중..</p>
      ) : alarmList.length === 0 ? (
        <p>알람이 존재하지 않습니다.</p>
      ) : (
        <ul>
          {alarmList.map((alarm) => (
            <li key={alarm.id}>
              <h5>{alarm.name}</h5>
              <div>{alarm.price}</div>
              <div>{alarm.updatedAt}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkerExample;
