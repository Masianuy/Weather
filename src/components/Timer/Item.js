import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styles from './Timer.module.scss';

function Item ({ el }) {
  const [currentTime, setCurrentTime] = useState(moment());
  const [leftTimes, setLeftTimes] = useState();
  const leftTime = moment.duration(moment(el.dayOfEvent).diff(currentTime));
  const timeFromAlertToEvent = moment(
    moment(el.dayOfEvent).subtract(el.timeOfAlert, 'hours')
  ).valueOf();
  const timeToEvent = moment(
    moment(el.dayOfEvent).diff(currentTime.valueOf())
  ).valueOf();
  const timeEvent = moment(el.dayOfEvent).valueOf();
  const w = Math.floor((leftTimes * 100) / moment(el.dayOfEvent).valueOf());
  // console.log(timeToEvent)
  // console.log('timeFromAlertToEvent>>>', timeFromAlertToEvent)
  // console.log(w)

  const timerCalculation = date => {
    const months = date.months() !== 0 ? `${date.months()} months` : '';
    const days = date.days() !== 0 ? `${date.days()} days` : '';
    const hours = date.hours() !== 0 ? `${date.hours()} hours` : '';
    const mins = date.minutes() !== 0 ? `${date.minutes()} minutes` : '';
    const secs = date.seconds() ? `${date.seconds()} seconds` : '';
    return `${months} ${days} ${hours} ${mins} ${secs}`;
  };

  useEffect(() => {
    const setTimer = setInterval(() => {
      setLeftTimes(moment.duration(moment(el.dayOfEvent).diff(currentTime)))
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(setTimer);
  }, []);

  return (
    <li>
      <span className={styles.timer} style={{ left: `100%` }}></span>
      <p>{el.title}</p>
      <p>{timerCalculation(leftTime)}</p>
    </li>
  );
}

export default Item;
