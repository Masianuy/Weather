import React from 'react';
import clock from './clock.png';
import EventForm from './EventForm';
import styles from './Timer.module.scss';
import { connect } from 'react-redux';
import moment from 'moment';

function Timer ({ events }) {
  const today = new Date();
  // const timeToEvent = moment(today).diff(moment(dayOfEvent));
  // console.log(timeToEvent);
  //moment(today).diff(moment(el.dayOfEvent)).humanize()

  return (
    <section className={styles.container}>
      <div className={styles['title-block']}>
        <h1>Live upcomming checks</h1>
        <p>
          Remaining time <img src={clock} alt='Remaining time' />
        </p>
      </div>
      <ul className={styles.events}>
        {events
          ? events.map(el => (
              <li key={el.title}>
                <p>{el.title}</p>
                <p>{moment(moment(today).diff(moment(el.dayOfEvent))).get('hour')}</p>
              </li>
            ))
          : 'Nothing to render'}
      </ul>
      <EventForm />
    </section>
  );
}
const mapStateToProps = ({ eventsList }) => eventsList;

export default connect(mapStateToProps)(Timer);
