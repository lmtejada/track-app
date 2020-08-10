import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const createTrack = dispatch => async (name, locations) => {
  await trackerApi.post('/tracks', { name, locations });
};
const fetchTracks = dispatch => () => {};

export const { Provider, Context } = createDataContext(
  trackReducer,
  {
    createTrack,
    fetchTracks
  },
  []
);