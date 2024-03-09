import {
  ADD_NEW_TRANSACTION,
  DELETE_TRANSACTION,
  EDIT_TRANSACTION,
  IDB_FETCH_TRANSACTIONS_FAILURE,
  IDB_FETCH_TRANSACTIONS_INIT,
  IDB_FETCH_TRANSACTIONS_SUCCESS,
  UPDATE_TRANSACTIONS_FILTERS,
} from '../actions/ActionTypes';

const initialState = {
  status: 'idle',
  error: null,
  filters: {
    sort: 'By date',
    type: 'All',
    accounts: null,
    categories: null,
    currencies: null,
    amount: { from: null, to: null },
    notes: 'All',
  },
  transactions: [],
};

const transactions = (state = initialState, { type, payload }) => {
  switch (type) {
    case IDB_FETCH_TRANSACTIONS_INIT:
      return {
        ...state,
        status: 'loading',
      };
    case IDB_FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        transactions: payload,
      };
    case IDB_FETCH_TRANSACTIONS_FAILURE:
      return {
        ...state,
        status: 'failed',
        error: payload.message,
      };
    case UPDATE_TRANSACTIONS_FILTERS:
      return {
        ...state,
        filters: payload,
      };
    case ADD_NEW_TRANSACTION:
      return { ...state, transactions: [...state.transactions, payload] };
    case EDIT_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction.id === payload.id ? payload.newTransaction : transaction,
        ),
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== payload,
        ),
      };
    default:
      return state;
  }
};

export default transactions;
