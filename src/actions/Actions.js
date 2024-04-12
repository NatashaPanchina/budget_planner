import {
  ADD_NEW_TRANSACTION,
  ADD_NEW_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  ADD_NEW_ACCOUNT,
  RESTORE_ACCOUNT,
  DELETE_ACCOUNT,
  EDIT_ACCOUNT,
  IDB_FETCH_ACCOUNTS_INIT,
  IDB_FETCH_ACCOUNTS_SUCCESS,
  IDB_FETCH_ACCOUNTS_FAILURE,
  IDB_FETCH_CATEGORIES_INIT,
  IDB_FETCH_CATEGORIES_SUCCESS,
  IDB_FETCH_CATEGORIES_FAILURE,
  EDIT_TRANSACTION,
  DELETE_TRANSACTION,
  ARCHIVE_CATEGORY,
  RESTORE_CATEGORY,
  ARCHIVE_ACCOUNT,
  IDB_FETCH_PROFILE_INIT,
  IDB_FETCH_PROFILE_SUCCESS,
  IDB_FETCH_PROFILE_FAILURE,
  CHANGE_LANGUAGE,
  IDB_FETCH_TRANSACTIONS_INIT,
  IDB_FETCH_TRANSACTIONS_SUCCESS,
  CHANGE_MODE,
  UPDATE_TRANSACTIONS_FILTERS,
  UPDATE_ACCOUNTS_FILTERS,
  UPDATE_CATEGORIES_FILTERS,
  RESET_TRANSACTIONS,
  RESET_CATEGORIES,
  RESET_ACCOUNTS,
  UPDATE_PROFILE,
  UPDATE_DISPLAY_NAME,
  UPDATE_MAIN_CURRENCY,
  IDB_FETCH_TRANSACTIONS_FAILURE,
} from './ActionTypes';
import { idbOpen } from '../indexedDB/IndexedDB';

export const resetTransactions = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_TRANSACTIONS,
      payload: [],
    });
  };
};

export const resetCategories = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_CATEGORIES,
      payload: [],
    });
  };
};

export const resetAccounts = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_ACCOUNTS,
      payload: [],
    });
  };
};

export const changeLanguage = (language) => {
  return {
    type: CHANGE_LANGUAGE,
    payload: language,
  };
};

export const changeMode = (mode) => {
  return {
    type: CHANGE_MODE,
    payload: mode,
  };
};

export const updateHeaderProfile = (user) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PROFILE,
      payload: user,
    });
  };
};

export const updateDisplayName = (name) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_DISPLAY_NAME,
      payload: name,
    });
  };
};

export const updateMainCurrency = (currency) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_MAIN_CURRENCY,
      payload: currency,
    });
  };
};

export const updateTransactionsFilters = (filters) => {
  return {
    type: UPDATE_TRANSACTIONS_FILTERS,
    payload: filters,
  };
};

export const addNewTransaction = (transaction) => {
  return {
    type: ADD_NEW_TRANSACTION,
    payload: transaction,
  };
};

export const editTransaction = (id, newTransaction) => {
  return {
    type: EDIT_TRANSACTION,
    payload: { id, newTransaction },
  };
};

export const deleteTransaction = (id) => {
  return {
    type: DELETE_TRANSACTION,
    payload: id,
  };
};

export const updateCategoriesFilters = (filters) => {
  return {
    type: UPDATE_CATEGORIES_FILTERS,
    payload: filters,
  };
};

export const addNewCategory = (category) => {
  return {
    type: ADD_NEW_CATEGORY,
    payload: category,
  };
};

export const editCategory = (id, newCategory) => {
  return {
    type: EDIT_CATEGORY,
    payload: { id, newCategory },
  };
};

export const archiveCategory = (id) => {
  return {
    type: ARCHIVE_CATEGORY,
    payload: id,
  };
};

export const restoreCategory = (id) => {
  return {
    type: RESTORE_CATEGORY,
    payload: id,
  };
};

export const deleteCategory = (id) => {
  return {
    type: DELETE_CATEGORY,
    payload: id,
  };
};

export const updateAccountsFilters = (filters) => {
  return {
    type: UPDATE_ACCOUNTS_FILTERS,
    payload: filters,
  };
};

export const addNewAccount = (account) => {
  return {
    type: ADD_NEW_ACCOUNT,
    payload: account,
  };
};

export const editAccount = (id, newAccount) => {
  return {
    type: EDIT_ACCOUNT,
    payload: { id, newAccount },
  };
};

export const archiveAccount = (id) => {
  return {
    type: ARCHIVE_ACCOUNT,
    payload: id,
  };
};

export const restoreAccount = (id) => {
  return {
    type: RESTORE_ACCOUNT,
    payload: id,
  };
};

export const deleteAccount = (id) => {
  return {
    type: DELETE_ACCOUNT,
    payload: id,
  };
};

export const fetchProfileData = () => {
  return fetchData('profile', {
    init: IDB_FETCH_PROFILE_INIT,
    success: IDB_FETCH_PROFILE_SUCCESS,
    failure: IDB_FETCH_PROFILE_FAILURE,
  });
};

export const fetchAccountsData = () => {
  return fetchData('accounts', {
    init: IDB_FETCH_ACCOUNTS_INIT,
    success: IDB_FETCH_ACCOUNTS_SUCCESS,
    failure: IDB_FETCH_ACCOUNTS_FAILURE,
  });
};

export const fetchCategoriesData = () => {
  return fetchData('categories', {
    init: IDB_FETCH_CATEGORIES_INIT,
    success: IDB_FETCH_CATEGORIES_SUCCESS,
    failure: IDB_FETCH_CATEGORIES_FAILURE,
  });
};

export const fetchTransactionsData = () => {
  return fetchData('transactions', {
    init: IDB_FETCH_TRANSACTIONS_INIT,
    success: IDB_FETCH_TRANSACTIONS_SUCCESS,
    failure: IDB_FETCH_TRANSACTIONS_FAILURE,
  });
};

export function fetchData(nameObjectStore, { init, success, failure }) {
  return (dispatch) => {
    dispatch({
      type: init,
    });
    idbOpen().then(
      (idb) => {
        const objectStore = idb
          .transaction(nameObjectStore, 'readonly')
          .objectStore(nameObjectStore);
        const resultData = [];
        objectStore.openCursor().onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            resultData.push(cursor.value);
            cursor.continue();
          } else {
            //все данные из index DB получены
            dispatch({
              type: success,
              payload: resultData,
            });
            idb.close();
          }
        };
      },
      (error) => dispatch({ type: failure, payload: error }),
    );
  };
}
