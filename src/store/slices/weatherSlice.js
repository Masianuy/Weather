import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http as API } from './../../api';

const WEATHER_NAME = 'weather';

export const getCityThunk = createAsyncThunk(
  `${WEATHER_NAME}/cityDefault`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await API.getDefaultCity();
      return data;
    } catch (error) {
      return rejectWithValue({ errors: error.response.data });
    }
  }
);
export const getTripThunk = createAsyncThunk(
  `${WEATHER_NAME}/city`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await API.tripWeather(payload);
      return data;
    } catch (error) {
      return rejectWithValue({ errors: error.response.data });
    }
  }
);
export const getTodayWeatherThunk = createAsyncThunk(
  `${WEATHER_NAME}/getTodayWeather`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await API.todayWeather(payload);
      return data;
    } catch (error) {
      return rejectWithValue({ errors: error.response.data });
    }
  }
);

const weatherSlice = createSlice({
  name: WEATHER_NAME,
  initialState: {
    currentCity: {},
    cities: [],
    todayCurrentCityWeather: {},
    isFetching: false,
    error: null,
  },
  reducers: {
    chooseCity: (state, { payload }) => {
      state.currentCity = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getCityThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getCityThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.currentCity = payload;
      state.cities.push(payload);
      state.error = null;
    });
    builder.addCase(getCityThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
    builder.addCase(getTripThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getTripThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.cities.push(payload);
      state.error = null;
    });
    builder.addCase(getTripThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
    builder.addCase(getTodayWeatherThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getTodayWeatherThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.todayCurrentCityWeather = payload;
      state.error = null;
    });
    builder.addCase(getTodayWeatherThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer, actions } = weatherSlice;

export const { chooseCity } = actions;

export default reducer;
