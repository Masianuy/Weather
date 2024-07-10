import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { enGB } from 'date-fns/locale';
import styles from './Timer.module.scss';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import { addEvent } from '../../store/slices/eventsSlice';

function EventForm ({createEvent}) {
  const initialValues = {
    title: '',
    dayOfEvent: '',
    timeOfAlert: 1,
  };
  const handleSubmit = values => {
    createEvent(values);
    console.log(values);
  };
  const VALIDATE_EVENTS_FORM = yup.object({
    title: yup.string().min(1).required('Title event is required'),
    dayOfEvent: yup
      .date()
      .min(new Date(), 'Start date is must be today or later')
      .required('dayOfEvent is required'),
    timeOfAlert: yup.number().min(1).required('timeOfAlert is required'),
  });
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={VALIDATE_EVENTS_FORM}
      >
        {() => {
          return (
            <Form>
              <label className={styles['input-box']}>
                <p>Title:</p>
                <Field type='text' name='title' placeholder='title' />
              </label>
              <label className={styles['input-box']}>
                <p>Day Of Event:</p>
                <Field name='dayOfEvent'>
                  {({ field, form: { setFieldValue } }) => {
                    return (
                      <DatePicker
                        {...field}
                        showIcon
                        minDate={new Date()}
                        showTimeSelect
                        timeIntervals={15}
                        locale={enGB}
                        selected={field.value || null}
                        onChange={value => setFieldValue(field.name, value)}
                        placeholderText='Select date'
                        dateFormat='Pp'
                        timeFormat='p'
                        className={styles['date-input']}
                      />
                    );
                  }}
                </Field>
              </label>
              <label className={styles['input-box']}>
                <p>Time Of Alert:</p>
                <Field type='number' min='1' name='timeOfAlert' />
              </label>
              <button type='submit'>Send</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  createEvent: (e) => dispatch(addEvent(e))
});

export default connect(null, mapDispatchToProps)(EventForm);
