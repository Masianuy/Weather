import axios from 'axios';
import { addDays, format } from 'date-fns';

const KEY_API = 'GNVMMTQASGU287MP9VE2E3H56';

const WEATHER_URL = 'https://weather.visualcrossing.com';

const axiosW = axios.create({
  baseURL: WEATHER_URL,
});

const KYIV = 'Kyiv';
const DAY_NOW = format(new Date(), 'yyyy-MM-dd');
const ADD_7_DAYS = format(new Date(addDays(new Date(), 15)), 'yyyy-MM-dd');

export const getDefaultCity = () =>
  axiosW.get(
    `/VisualCrossingWebServices/rest/services/timeline/${KYIV}/${DAY_NOW}/${ADD_7_DAYS}?unitGroup=metric&key=${KEY_API}&contentType=json`
  );
export const tripWeather = v =>
  axiosW.get(
    `/VisualCrossingWebServices/rest/services/timeline/${v.address}/${v.startDate}/${v.endDate}?unitGroup=metric&key=${KEY_API}&contentType=json`
  );
export const todayWeather = (v) => 
  axiosW.get(
    `/VisualCrossingWebServices/rest/services/timeline/${v ? v : KYIV}/today?unitGroup=metric&include=days&key=${KEY_API}&contentType=json`
  );
