import {
  IDB_FETCH_PROFILE_SUCCESS,
  IDB_FETCH_PROFILE_INIT,
  IDB_FETCH_PROFILE_FAILURE,
  CHANGE_LANGUAGE,
  CHANGE_MODE,
} from '../actions/ActionTypes';

function initialMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

const initialState = {
  status: 'idle',
  error: null,
  mode: localStorage.getItem('mode') || initialMode(),
  language: localStorage.getItem('language') || 'EN',
  profile: {},
};

const header = (state = initialState, { type, payload }) => {
  switch (type) {
    case IDB_FETCH_PROFILE_INIT:
      return { ...state, status: 'loading' };
    case IDB_FETCH_PROFILE_SUCCESS:
      return { ...state, status: 'succeeded', profile: payload[0] };
    case IDB_FETCH_PROFILE_FAILURE:
      return { ...state, status: 'failed', error: payload.message };
    case CHANGE_LANGUAGE:
      return { ...state, language: payload };
    case CHANGE_MODE:
      return { ...state, mode: payload };
    default:
      return state;
  }
};

export default header;
