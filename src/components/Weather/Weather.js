import React from 'react';
import { connect } from 'react-redux';
import LeftSide from '../LeftSide/LeftSide';
import RightSide from '../RightSide/RightSide';
import styles from './Weather.module.scss';

const Weather = ({ todayCurrentCityWeather, currentCity }) => {
  return (
    <section className={styles.container}>
      <LeftSide />
      <div
        className={styles.wrap}
        style={{ backgroundImage: `url("./images/sky.png")` }}
      >
        {Object.keys(todayCurrentCityWeather).length &&
          Object.keys(currentCity).length && (
            <RightSide
              todayCurrentCityWeather={todayCurrentCityWeather}
              currentCity={currentCity}
            />
          )}
      </div>
    </section>
  );
};

const mapStateToProps = ({ weatherList }) => weatherList;

export default connect(mapStateToProps)(Weather);
