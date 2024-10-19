import { useCallback, useEffect, useMemo, useState } from "react";
import useWebWorker from "../hooks/useWebWorker";

import AlarmComponent from "./Alarm";

import { Alarm } from "../types/alarm";
import { SocketData } from "../types/socket-data";

import { isEmpty } from "../utils/util";

import styles from "./worker.module.css";
import { MessageType } from "../constants/constant";

const socketWorkerPath = "../workers/socket-worker.ts";

const WorkerExample = () => {
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);
  const { message, loading, sendMessage } = useWebWorker<SocketData>({
    url: socketWorkerPath,
  });

  const serverMessage: string | null = useMemo(() => {
    let serverMsg = null;

    if (message?.type === MessageType.MESSAGE) {
      serverMsg = (message?.data as string) ?? null;
    }

    return serverMsg;
  }, [message]);

  const handleClick = useCallback(() => {
    sendMessage(`알림 요청: ${Date.now()}`);
  }, [sendMessage]);

  useEffect(() => {
    if (message?.type === MessageType.DATA) {
      const alarm = message.data as Alarm;
      setAlarmList((prev) => [...prev, alarm]);
    }
  }, [message]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>DedicatedWorker</h1>
      <div className={styles.serverMessageWrapper}>
        <h3>서버메세지</h3>
        <p>{serverMessage ?? "서버에서 보낸 메세지가 존재하지 않습니다."}</p>
        <button onClick={handleClick}>알람 보내기</button>
      </div>
      <div className={styles.alarmWrapper}>
        {loading ? (
          <p>로딩중..</p>
        ) : isEmpty(alarmList) ? (
          <p>알람이 존재하지 않습니다.</p>
        ) : (
          alarmList.map((alarm) => <AlarmComponent key={alarm.id} {...alarm} />)
        )}
      </div>
    </div>
  );
};

export default WorkerExample;
