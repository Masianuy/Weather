import React from 'react';
import { format } from 'date-fns';
import styles from './LeftSide.module.scss';

const CityItem = (props) => {
  const { address, days } = props.city;
  return (
    <div className={styles.item} onClick={() => {return props.onChoose(props.city)}}>
      <div className={styles.image}>
        <img
          src={`./images/cities/${address ? address : 'city'}.jpg`}
          alt={address}
        />
      </div>
      <div>
        <p className={styles.city}>{address}</p>
        <p className={styles.period}>
          <span>{days && format(new Date(days[0]?.datetime), 'dd.MM.yyyy')}</span> - <span>{days && format(new Date(days[days.length - 1].datetime), 'dd.MM.yyyy')}</span>
        </p>
      </div>
    </div>
  );
};

export default CityItem;
