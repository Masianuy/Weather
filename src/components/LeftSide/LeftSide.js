import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Field, Form, Formik } from 'formik';
import { VALIDATION_SEARCH } from '../../utils/validate';
import styles from './LeftSide.module.scss';
import CityItem from './CityItem';
import ModalForm from '../ModalForm/ModalForm';
import {
  chooseCity,
  getCityThunk,
  getTodayWeatherThunk,
} from '../../store/slices/weatherSlice';

const LeftSide = ({
  cities,
  error,
  isFetching,
  currentCity,
  getCity,
  loadDefaultCity,
  getTodayWeather,
}) => {
  const [choosenCity, setCity] = useState({});
  const [showModalForm, setModalForm] = useState(false);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    loadDefaultCity();
    setCity(currentCity);
    getCity(choosenCity);
  }, []);

  const handleSearch = (values, formikBag) => {
    setSearch(values);
    formikBag.resetForm();
  };

  useEffect(() => {
    getCity(choosenCity);
    getTodayWeather(choosenCity.address);
  }, [choosenCity]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Weather <span>Forecast</span>
      </h1>
      <Formik
        initialValues={{ search: '' }}
        onSubmit={handleSearch}
        validationSchema={VALIDATION_SEARCH}
      >
        <Form>
          <Field
            className={styles.search}
            name='search'
            type='text'
            placeholder='Search your trip'
            // onChange={e => setSearch(e.target.values)}
          />
        </Form>
      </Formik>
      <div className={styles.list}>
        {error && <p>Ooops ...</p>}
        {isFetching && <p>Loading ...</p>}
        {cities.length > 0 &&
          cities.map(c => (
            <CityItem key={c.latitude} city={c} onChoose={v => setCity(v)} />
          ))}
        <div
          className={styles['open-modal']}
          onClick={() => {
            return setModalForm(!showModalForm);
          }}
        >
          <p>+</p>
          <button>Add trip</button>
        </div>
      </div>
      <ModalForm
        visibaleWin={showModalForm}
        setVisible={showModalForm => setModalForm(showModalForm)}
      />
      <div>
        <h2>Week</h2>
        <div className={styles.week}>
          {currentCity &&
            currentCity?.days?.map(d => (
              <div key={d.datetime}>
                <p>{format(d.datetime, 'EEEE')}</p>
                <p>
                  <img src={`./images/weather/${d.icon}.png`} alt={d.icon} />
                </p>
                <p>
                  {Math.round(d.tempmin)}&deg;/{Math.round(d.tempmax)}&deg;
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ weatherList }) => weatherList;
const mapDispatchToProps = dispatch => ({
  getCity: city => dispatch(chooseCity(city)),
  loadDefaultCity: () => dispatch(getCityThunk()),
  getTodayWeather: v => dispatch(getTodayWeatherThunk(v)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftSide);
