import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import styles from './Timer.module.scss';

function EventForm () {
  const initialValues = {
    title: '',
    dayOfEvent: '',
    timeOfEvent: '',
    timeOfAlert: 1,
  };
  const handleSubmit = (values, formikBag) => {
    console.log(values);
  };
  const VALIDATE_EVENTS_FORM = yup.object({
    title: yup.string().min(1).required('Title event is required'),
    dayOfEvent: yup
      .date()
      .min(new Date(), 'Start date is must be today or later')
      .required('dayOfEvent is required'),
    timeOfEvent: yup.date().min(1).required('timeOfEvent is required'),
    timeOfAlert: yup.number().min(1).required('timeOfAlert is required'),
  });
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={VALIDATE_EVENTS_FORM}
      >
        {formikProps => {
          return (
            <Form>
              <label className={styles['input-box']}>
                <p>Title:</p>
                <Field type='text' name='title' placeholder='title' />
              </label>
              <label className={styles['input-box']}>
                <p>Day Of Event:</p>
                <Field type='date' name='dayOfEvent' />
              </label>
              <label className={styles['input-box']}>
                <p>Time Of Event:</p>
                <Field type='date' name='timeOfEvent' />
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

export default EventForm;
