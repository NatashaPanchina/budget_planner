import {
  IDB_FETCH_PROFILE_SUCCESS,
  IDB_FETCH_PROFILE_INIT,
  IDB_FETCH_PROFILE_FAILURE,
  CHANGE_LANGUAGE,
  CHANGE_MODE,
} from '../actions/ActionTypes';

const initialState = {
  status: 'idle',
  error: null,
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
      return { ...state, profile: { ...state.profile, language: payload } };
    case CHANGE_MODE:
      return { ...state, profile: { ...state.profile, mode: payload } };
    default:
      return state;
  }
};

export default header;
