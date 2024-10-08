import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import styles from './RightSide.module.scss';

const RightSide = ({ todayCurrentCityWeather, currentCity }) => {
  const { address, currentConditions, days } = todayCurrentCityWeather;
  const [countTime, setCountTime] = useState(0);
  const countDownDate = new Date(currentCity?.days[0]?.datetime).getTime();
  const now = new Date().getTime();
  const refresh = () => {
    const distance = countDownDate - now;
    setCountTime(distance);
    const days = Math.floor(Math.abs(distance / (1000 * 60 * 60 * 24)));
    const hours = Math.floor(
      Math.abs((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const minutes = Math.floor(
      Math.abs((distance % (1000 * 60 * 60)) / (1000 * 60))
    );
    const seconds = Math.floor(Math.abs((distance % (1000 * 60)) / 1000));
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  useEffect(() => {
      const countDownTimer = setInterval(() => setCountTime(refresh()), 1000);
      return () => clearInterval(countDownTimer);
  }, []); // [countTime]

  return (
    <>
      <div className={styles.avatar}>
        <img src='./images/avatar.png' alt='avatar' />
      </div>
      <div className={styles['wrap-today']}>
        <p className={styles.day}>
          {days ? format(new Date(days[0]?.datetime), 'eeee') : '- -'}
        </p>
        <p className={styles.temp}>
          <img
            src={`./images/weather/${
              days[0] ? days[0]?.icon : 'clear-day'
            }.png`}
            alt={currentConditions?.icon}
          />
          {days[0] ? Math.round(days[0]?.temp) : '- -'}
          <sup>&deg;c</sup>
        </p>
        <p className={styles.city}>{address}</p>
        <div className={styles.countdown}>
          <div>
            <p>{countTime?.days}</p>
            <p>days</p>
          </div>
          <div>
            <p>{countTime?.hours}</p>
            <p>hours</p>
          </div>
          <div>
            <p>{countTime?.minutes}</p>
            <p>minutes</p>
          </div>
          <div>
            <p>{countTime?.seconds}</p>
            <p>seconds</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default RightSide;
