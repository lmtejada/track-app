import createDataContext from './createDataContext';

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'add_current_location':
      return { ...state, currentLocation: action.payload };
    case 'add_location':
      return { ...state, locations: [...state.locations, action.payload] };
    case 'change_name':
      return { ...state, name: action.payload };
    case 'reset':
      return { ...state, name: '', locations: [] };
    case 'start_recording':
      return { ...state, recording: true };
    case 'stop_recording':
      return { ...state, recording: false };
    default:
      return state;
  }
};

const addLocation = dispatch => (location, recording) => {
  dispatch({ type: 'add_current_location', payload: location });

  if (recording) {
    dispatch({ type: 'add_location', payload: location });
  }
};

const changeName = dispatch => (name) => {
  dispatch({ type: 'change_name', payload: name });
};

const reset = dispatch => () => {
  dispatch({ type: 'reset' });
};

const startRecording = dispatch => () => {
  dispatch({ type: 'start_recording' });
};

const stopRecording = dispatch => () => {
  dispatch({ type: 'stop_recording' });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  {
    addLocation,
    changeName,
    reset,
    startRecording,
    stopRecording
  },
  {
    currentLocation: null,
    locations: [],
    name: '',
    recording: false
  }
);