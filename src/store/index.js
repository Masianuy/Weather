import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';
import eventsReducer from './slices/eventsSlice';

const store = configureStore({
  reducer: {
    weatherList: weatherReducer,
    eventsList: eventsReducer,
  },
});

export default store;
