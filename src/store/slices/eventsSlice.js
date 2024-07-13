import { createSlice } from '@reduxjs/toolkit';

const EVENTS_NAME = 'events';

const eventsSlice = createSlice({
  name: EVENTS_NAME,
  initialState: {
    events: [
      {
        title: 'Event 1',
        dayOfEvent: '2024-07-14T12:00:00',
        timeOfAlert: '14',
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
