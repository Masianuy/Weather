import * as yup from 'yup';
import { CONSTANTS } from '../constants';

const { CITIES } = CONSTANTS;

export const VALIDATION_SCHEMA = yup.object({
  address: yup.string().oneOf(CITIES).required('City is required'),
  startDate: yup
    .date()
    .min(new Date(), 'Start date is must be today or later')
    .required('Start date is required'),
  endDate: yup
    .date()
    .min(yup.ref('startDate'), 'End date must be after start date')
    .required('End date is required'),
});

export const VALIDATION_SEARCH = yup.object({
  search: yup
    .string()
    .matches(/^[a-zA-Z]*$/, 'Only letters')
    .min(1)
    .required('City is required'),
});
