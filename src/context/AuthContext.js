import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signin':
      return { errorMessage: '', token: action.payload };
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => { 
  dispatch({ type: 'clear_error_message' });
};

const signup = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signup', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({
      type: 'signin',
      payload: response.data.token
    });
    navigate('TrackList');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up'
    });
  }
};

const tryLocalSignIn = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('TrackList');
  } else {
    navigate('loginFlow');
  }
};

const signin = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signin', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({
      type: 'signin',
      payload: response.data.token
    });
    navigate('TrackList');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up'
    });
  }
};

const signout = dispatch => {
  return () => {
    
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    clearErrorMessage,
    signin,
    signout,
    signup,
    tryLocalSignIn
  },
  {
    token: null,
    errorMessage: ''
  }
);