import React from 'react';
import clock from './clock.png';
import EventForm from './EventForm';
import styles from './Timer.module.scss';
import { connect } from 'react-redux';

function Timer ({events}) {
  console.log(events);
  
  return (
    <section className={styles.container}>
      <div className={styles['title-block']}>
        <h1>Live upcomming checks</h1>
        <p>
          Remaining time <img src={clock} alt='Remaining time' />
        </p>
      </div>
      <ul className={styles.events}>
        {events ? events.map(el => <li key={el.title}><p>{el.title}</p><p>{el.timeOfAlert}</p></li>) : 'Nothing to render'}
      </ul>
      <EventForm />
    </section>
  );
}
const mapStateToProps = ({ eventsList }) => eventsList;

export default connect(mapStateToProps)(Timer);
