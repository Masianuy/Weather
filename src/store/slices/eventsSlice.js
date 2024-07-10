import { createSlice } from '@reduxjs/toolkit';

const EVENTS_NAME = 'events';

const eventsSlice = createSlice({
  name: EVENTS_NAME,
  initialState: {
    events: [
      {
        title: 'Event 1',
        dayOfEvent: '2024-09-01',
        timeOfEvent: '12:00',
        timeOfAlert: '9',
      },
    ],
    isFetching: false,
    error: null,
  },
  reducers: {
    addEvent: (state, { payload }) => {
      state.events.push(payload);
    },
  },
});

const { reducer, actions } = eventsSlice;
export const { addEvent } = actions;
export default reducer;
