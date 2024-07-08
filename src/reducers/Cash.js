import {
  IDB_FETCH_ACCOUNTS_INIT,
  IDB_FETCH_ACCOUNTS_SUCCESS,
  IDB_FETCH_ACCOUNTS_FAILURE,
  ADD_NEW_ACCOUNT,
  DELETE_ACCOUNT,
  EDIT_ACCOUNT,
  ARCHIVE_ACCOUNT,
  RESTORE_ACCOUNT,
  UPDATE_ACCOUNTS_FILTERS,
  RESET_ACCOUNTS,
} from '../actions/ActionTypes';
import { getCurrentMonth } from '../utils/format/date';

const initialState = {
  status: 'idle',
  error: null,
  filters: {
    date: getCurrentMonth(),
    sort: 'By date',
    type: 'All',
    currencies: null,
    balance: { from: null, to: null },
    notes: 'All',
  },
  accounts: [],
};

const accounts = (state = initialState, { type, payload }) => {
  switch (type) {
    case IDB_FETCH_ACCOUNTS_INIT:
      return {
        ...state,
        status: 'loading',
      };
    case IDB_FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        accounts: payload,
      };
    case IDB_FETCH_ACCOUNTS_FAILURE:
      return {
        ...state,
        status: 'failed',
        error: payload.message,
      };
    case UPDATE_ACCOUNTS_FILTERS:
      return {
        ...state,
        filters: payload,
      };
    case ADD_NEW_ACCOUNT:
      return {
        ...state,
        accounts: [payload, ...state.accounts],
      };
    case EDIT_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === payload.id ? payload.newAccount : account,
        ),
      };
    case ARCHIVE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === payload ? { ...account, archived: true } : account,
        ),
      };
    case RESTORE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === payload ? { ...account, archived: false } : account,
        ),
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter((account) => account.id !== payload),
      };
    case RESET_ACCOUNTS:
      return {
        ...state,
        accounts: payload,
      };
    default:
      return state;
  }
};

export default accounts;
