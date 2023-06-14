import {
  IDB_FETCH_ACCOUNTS_INIT,
  IDB_FETCH_ACCOUNTS_SUCCESS,
  IDB_FETCH_ACCOUNTS_FAILURE,
  ADD_NEW_ACCOUNT,
  DELETE_ACCOUNT,
  EDIT_ACCOUNT,
  ARCHIVE_ACCOUNT,
  UPDATE_ACCOUNT_BALANCE,
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
      return Object.assign({}, state, {
        accounts: [payload, ...state.accounts],
      });
    case EDIT_ACCOUNT:
      return Object.assign({}, state, {
        accounts: state.accounts.map((account) =>
          account.description === payload.description
            ? payload.newAccount
            : account
        ),
      });
    case UPDATE_ACCOUNT_BALANCE:
      return Object.assign({}, state, {
        accounts: state.accounts.map((account) =>
          account.description === payload.description
            ? Object.assign({}, account, { balance: payload.balance })
            : account
        ),
      });
    case ARCHIVE_ACCOUNT:
      return Object.assign({}, state, {
        accounts: state.accounts.map((account) =>
          account.description === payload
            ? Object.assign({}, account, { archived: true })
            : account
        ),
      });
    case DELETE_ACCOUNT:
      return Object.assign({}, state, {
        accounts: state.accounts.filter(
          (account) => account.description !== payload
        ),
      });
    default:
      return state;
  }
};

export default accounts;
