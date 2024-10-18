import { useEffect, useMemo, useState } from "react";
import { Alarm } from "../types/alarm";
import { SocketData } from "../types/socket-data";
import useSharedWorker from "../hooks/useSharedWorker";

import styles from "./shared-worker.module.css";
import AlarmComponent from "./Alarm";

const sharedWorkerPath = "../workers/shared-worker.ts";

const SharedWorkerExample = () => {
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);
  const { message, loading, sendMessage } = useSharedWorker<SocketData>({
    url: sharedWorkerPath,
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
    sendMessage(`알림 요청: ${Date.now()}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shared Worker with Web Socket</h1>
      <div className={styles.serverMessageWrapper}>
        <h3>서버메세지</h3>
        <p>{serverMessage ?? "서버에서 보낸 메세지가 존재하지 않습니다."}</p>
        <button onClick={handleClick}>알람 보내기</button>
      </div>
      <div className={styles.alarmWrapper}>
        {loading ? (
          <p>로딩중..</p>
        ) : alarmList.length === 0 ? (
          <p>알람이 존재하지 않습니다.</p>
        ) : (
          alarmList.map((alarm) => <AlarmComponent key={alarm.id} {...alarm} />)
        )}
      </div>
    </div>
  );
};

export default SharedWorkerExample;
