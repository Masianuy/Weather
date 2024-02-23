import React from 'react';
import { connect } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { CONSTANTS } from '../../constants';
import { VALIDATION_SCHEMA } from '../../utils/validate';
import { getTripThunk } from '../../store/slices/weatherSlice';
import styles from './Form.module.scss';

const ModalForm = props => {
  const { visibaleWin, setVisible, getTrip } = props;
  const setWinVisible = () => {
    setVisible(!visibaleWin);
  };
  const { CITIES } = CONSTANTS;
  const initialValues = {
    address: CITIES[0],
    startDate: null,
    endDate: null,
  };
  const handleSubmit = (values, formikBag) => {
    values.startDate = format(values.startDate, 'yyyy-MM-dd');
    values.endDate = format(values.endDate, 'yyyy-MM-dd');
    getTrip(values);
    setVisible(!visibaleWin);
    formikBag.resetForm();
  };
  return (
    <div
      className={styles.wrap}
      style={{ visibility: visibaleWin ? 'visible' : 'hidden' }}
      onClick={setWinVisible}
    >
      <div className={styles.container} onClick={e => e.stopPropagation()}>
        <Formik
          initialValues={initialValues}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {formikProps => {
            return (
              <div>
                <div className={styles.top}>
                  <p className={styles.title}>Create trip</p>
                  <p className={styles.close} onClick={setWinVisible}>
                    x
                  </p>
                </div>
                <Form className={styles.form}>
                  <div className={styles.middle}>
                    <label>City</label>
                    <select
                      name='address'
                      placeholder='Please select a city'
                      onChange={formikProps.handleChange}
                    >
                      {CITIES.map(c => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <label>Start date</label>
                    <Field name='startDate' placeholderText='Select date'>
                      {({ field, meta, form: { setFieldValue } }) => {
                        return (
                          <DatePicker
                            {...field}
                            showIcon
                            locale={enGB}
                            minDate={new Date()}
                            maxDate={addDays(new Date(), 15)}
                            startDate={new Date()}
                            placeholderText='Select date'
                            selected={field.value || null}
                            onChange={value => setFieldValue(field.name, value)}
                          />
                        );
                      }}
                    </Field>
                    <label>End date</label>
                    <Field name='endDate' placeholderText='Select date'>
                      {({ field, meta, form: { setFieldValue, touched } }) => {
                        return (
                          <>
                            <DatePicker
                              {...field}
                              locale={enGB}
                              showIcon
                              minDate={new Date()}
                              maxDate={addDays(new Date(), 30)}
                              startDate={new Date()}
                              placeholderText='Select date'
                              selected={field.value || null}
                              onChange={value =>
                                setFieldValue(field.name, value)
                              }
                            />
                            {meta.error && meta.touched && (
                              <p className={styles.invalid}>{meta.error}</p>
                            )}
                          </>
                        );
                      }}
                    </Field>
                  </div>
                  <div className={styles.bottom}>
                    <button
                      className={styles['btn-cancel']}
                      type='cancel'
                      onClick={setWinVisible}
                    >
                      Cancel
                    </button>
                    <button
                      className={styles['btn-save']}
                      type='submit'
                      disabled={!(formikProps.isValid && formikProps.dirty)}
                    >
                      Save
                    </button>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  getTrip: trip => dispatch(getTripThunk(trip)),
});

export default connect(null, mapDispatchToProps)(ModalForm);
