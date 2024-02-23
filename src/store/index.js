import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';

const store = configureStore({
  reducer: {
    weatherList: weatherReducer,
  },
});

export default store;
