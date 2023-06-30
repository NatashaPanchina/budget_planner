import {
  IDB_FETCH_ACCOUNTS_INIT,
  IDB_FETCH_ACCOUNTS_SUCCESS,
  IDB_FETCH_ACCOUNTS_FAILURE,
  ADD_NEW_ACCOUNT,
  DELETE_ACCOUNT,
  EDIT_ACCOUNT,
  ARCHIVE_ACCOUNT,
  RESTORE_ACCOUNT,
} from "../actions/ActionTypes";

const initialState = {
  status: "idle",
  error: null,
  accounts: [],
};

const accounts = (state = initialState, { type, payload }) => {
  switch (type) {
    case IDB_FETCH_ACCOUNTS_INIT:
      return {
        ...state,
        status: "loading",
      };
    case IDB_FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        status: "succeeded",
        accounts: payload,
      };
    case IDB_FETCH_ACCOUNTS_FAILURE:
      return {
        ...state,
        status: "failed",
        error: payload.message,
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
          account.id === payload.id ? payload.newAccount : account
        ),
      };
    case ARCHIVE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === payload ? { ...account, archived: true } : account
        ),
      };
    case RESTORE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === payload ? { ...account, archived: false } : account
        ),
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter((account) => account.id !== payload),
      };
    default:
      return state;
  }
};

export default accounts;
