import React from 'react';
import { connect } from 'react-redux';
import clock from './clock.png';
import EventForm from './EventForm';
import Item from './Item';
import styles from './Timer.module.scss';

function Timer ({ events }) {
  return (
    <section className={styles.container}>
      <div className={styles['title-block']}>
        <h1>Live upcomming checks</h1>
        <p>
          Remaining time <img src={clock} alt='Remaining time' />
        </p>
      </div>
      <ul className={styles.events}>
        {events ? events.map(el => <Item key={el.title} el={el} />) : 'Nothing to render'}
      </ul>
      <EventForm />
    </section>
  );
}
const mapStateToProps = ({ eventsList }) => eventsList;

export default connect(mapStateToProps)(Timer);
