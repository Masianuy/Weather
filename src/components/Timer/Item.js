import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styles from './Timer.module.scss';

function Item ({ el }) {
  const [currentTime, setCurrentTime] = useState(moment());
  const [progress, setProgress] = useState(0);
  console.log(progress)
  const leftTime = moment.duration(moment(el.dayOfEvent).diff(currentTime));

  const timerCalculation = date => {
    const months = date.months() !== 0 ? `${date.months()} months` : '';
    const days = date.days() !== 0 ? `${date.days()} days` : '';
    const hours = date.hours() !== 0 ? `${date.hours()} hours` : '';
    const mins = date.minutes() !== 0 ? `${date.minutes()} minutes` : '';
    const secs = `${date.seconds()} seconds`;
    return `${months} ${days} ${hours} ${mins} ${secs}`;
  };
  useEffect(() => {
    const timeFromAlertToEvent = moment(
      moment(el.dayOfEvent).subtract(el.timeOfAlert, 'hours')
    ).valueOf();
    const timeToEvent = moment(el.dayOfEvent).diff(
      timeFromAlertToEvent.valueOf()
    );
    if (timeFromAlertToEvent < currentTime.valueOf()) {
      const w = Math.floor(
        ((timeToEvent - leftTime.valueOf()) / timeToEvent) * 100
      );
      setProgress(w);
    }
  }, [currentTime, leftTime]);

  useEffect(() => {
    const setTimer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(setTimer);
  }, []);

  return (
    <li>
      <span className={styles.timer} style={{ right: `${progress}%` }}></span>
      <p>{el.title}</p>
      <p>{timerCalculation(leftTime)}</p>
    </li>
  );
}

export default Item;
