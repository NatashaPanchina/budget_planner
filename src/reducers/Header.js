import {
  IDB_FETCH_PROFILE_SUCCESS,
  IDB_FETCH_PROFILE_INIT,
  IDB_FETCH_PROFILE_FAILURE,
  CHANGE_LANGUAGE,
  CHANGE_MODE,
  UPDATE_PROFILE,
  UPDATE_DISPLAY_NAME,
  UPDATE_MAIN_CURRENCY,
} from '../actions/ActionTypes';

function initialMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function initialLanguage() {
  const userLocale =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;
  return userLocale.includes('ru') ? 'RU' : 'EN';
}

const initialState = {
  status: 'idle',
  error: null,
  mode: localStorage.getItem('mode') || initialMode(),
  language: localStorage.getItem('language') || initialLanguage(),
  profile: {
    displayName: 'Anonymous',
    currency: 'USD',
    photoURL: '',
    backupDate: Date.now(),
  },
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
    case UPDATE_PROFILE:
      return { ...state, profile: payload };
    case UPDATE_DISPLAY_NAME:
      return { ...state, profile: { ...state.profile, payload } };
    case UPDATE_MAIN_CURRENCY:
      return { ...state, profile: { ...state.profile, payload } };
    default:
      return state;
  }
};

export default header;
