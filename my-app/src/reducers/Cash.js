import {
  ADD_NEW_ACCOUNT,
  DELETE_ACCOUNT,
  EDIT_ACCOUNT,
  RECEIVE_IDB_ACCOUNTS,
  REQUEST_IDB,
  ARCHIVE_ACCOUNT,
  UPDATE_ACCOUNT_BALANCE,
} from "../actions/ActionTypes";

const initialState = {
  fetching: false,
  accounts: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
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
    case REQUEST_IDB:
      return Object.assign({}, state, { fetching: true });
    case RECEIVE_IDB_ACCOUNTS:
      return { fetching: false, accounts: payload };
    default:
      return state;
  }
};
