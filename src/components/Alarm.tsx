import dayjs from "dayjs";
import { Alarm as AlarmType } from "../types/alarm";

import styles from "./alarm.module.css";

type Props = AlarmType;

const Alarm: React.FC<Props> = ({ name, price, updatedAt }) => {
  return (
    <div className={styles.alarmContainer}>
      <h5 className={styles.alarmName}>{name}</h5>
      <div className={styles.alarmInfo}>
        <span>{price.toLocaleString()}원</span>
        <span className={styles.eclipse} />
        <span>{dayjs(updatedAt).format("YYYY년 MM월 DD일")}</span>
      </div>
    </div>
  );
};

export default Alarm;
