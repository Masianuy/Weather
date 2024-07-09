import React from 'react';
import clock from './clock.png';
import EventForm from './EventForm';
import styles from './Timer.module.scss';

function Timer () {
  const state = [
    {
      title: 'Event 1',
      dayOfEvent: '2024-09-01',
      timeOfEvent: '12:00',
      timeOfAlert: '9',
    }
  ]
  return (
    <section className={styles.container}>
      <div className={styles['title-block']}>
        <h1>Live upcomming checks</h1>
        <p>
          Remaining time <img src={clock} alt='Remaining time' />
        </p>
      </div>
      <ul className={styles.events}>
        {state.map(el => <li><p>{el.title}</p><p>{el.timeOfAlert}</p></li>)}
      </ul>
      <EventForm />
    </section>
  );
}

export default Timer;
