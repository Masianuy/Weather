import { createSlice } from '@reduxjs/toolkit';

const EVENTS_NAME = 'events';

const eventsSlice = createSlice({
  name: EVENTS_NAME,
  initialState: {
    events: [
      {
        title: 'Event 1',
        dayOfEvent: '2024-07-14T12:03:00',
        timeOfAlert: '13',
      },
      {
        title: 'Event 2',
        dayOfEvent: '2024-07-15T21:39:00',
        timeOfAlert: '25',
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
