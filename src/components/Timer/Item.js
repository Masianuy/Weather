import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styles from './Timer.module.scss';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Item ({ el }) {
  const [currentTime, setCurrentTime] = useState(moment());
  const [progress, setProgress] = useState(0);
  const leftTime = moment.duration(moment(el.dayOfEvent).diff(currentTime));

  const timerCalculation = date => {
    const months = date.months() !== 0 ? `${date.months()} months` : '';
    const days = date.days() !== 0 ? `${date.days()} days` : '';
    const hours = date.hours() !== 0 ? `${date.hours()} hours` : '';
    const mins = date.minutes() !== 0 ? `${date.minutes()} minutes` : '';
    const secs = `${date.seconds()} seconds`;
    return `${months} ${days} ${hours} ${mins} ${secs}`;
  };
  const alermUser = pr =>
    toast(`🦄 Wow so ${pr}!`, {
      position: 'top-right',
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      progress: undefined,
      theme: 'dark',
      transition: Slide,
    });
  const timeFromAlertToEvent = moment(
    moment(el.dayOfEvent).subtract(el.timeOfAlert, 'hours')
  ).valueOf();

  useEffect(() => {
    const timeToEvent = moment(el.dayOfEvent).diff(
      timeFromAlertToEvent.valueOf()
    );
    if (moment(el.dayOfEvent).valueOf() < currentTime.valueOf()) {
      return setProgress(100);
    }
    const w = Math.floor(
      ((timeToEvent - leftTime.valueOf()) / timeToEvent) * 100
    );
    setProgress(w);
  }, [currentTime, leftTime]);

  useEffect(() => {
    const setTimer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(setTimer);
  }, []);

  useEffect(() => {
    if (currentTime.valueOf() >= timeFromAlertToEvent.valueOf()) {
      alermUser('time');
      console.log('1', timeFromAlertToEvent);
      // console.log('2', leftTime);
    }
    if (leftTime < 0) {
      alermUser('error');
    }
  }, []);

  return (
    <li>
      <span className={styles.timer} style={{ right: `${progress}%` }}></span>
      <p>{el.title}</p>
      <p>
        {leftTime.valueOf() > 0
          ? timerCalculation(leftTime)
          : 'The event has already passed!'}
      </p>
      <ToastContainer closeOnClick stacked transition={Slide} />
    </li>
  );
}

export default Item;
