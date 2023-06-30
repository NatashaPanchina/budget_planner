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
} from "./ActionTypes";
import { idbOpen } from "../indexedDB/IndexedDB";

export const changeLanguage = (language) => (dispatch) => {
  dispatch({
    type: CHANGE_LANGUAGE,
    payload: language,
  });
};

export const addNewTransaction = (transaction) => (dispatch) => {
  dispatch({
    type: ADD_NEW_TRANSACTION,
    payload: transaction,
  });
};

export const editTransaction = (id, newTransaction) => (dispatch) => {
  dispatch({
    type: EDIT_TRANSACTION,
    payload: { id, newTransaction },
  });
};

export const deleteTransaction = (id) => (dispatch) => {
  dispatch({
    type: DELETE_TRANSACTION,
    payload: id,
  });
};

export const addNewCategory = (category) => (dispatch) => {
  dispatch({
    type: ADD_NEW_CATEGORY,
    payload: category,
  });
};

export const editCategory = (id, newCategory) => (dispatch) => {
  dispatch({
    type: EDIT_CATEGORY,
    payload: { id, newCategory },
  });
};

export const archiveCategory = (id) => (dispatch) => {
  dispatch({
    type: ARCHIVE_CATEGORY,
    payload: id,
  });
};

export const restoreCategory = (id) => (dispatch) => {
  dispatch({
    type: RESTORE_CATEGORY,
    payload: id,
  });
};

export const deleteCategory = (id) => (dispatch) => {
  dispatch({
    type: DELETE_CATEGORY,
    payload: id,
  });
};

export const addNewAccount = (account) => (dispatch) => {
  dispatch({
    type: ADD_NEW_ACCOUNT,
    payload: account,
  });
};

export const editAccount = (id, newAccount) => (dispatch) => {
  dispatch({
    type: EDIT_ACCOUNT,
    payload: { id, newAccount },
  });
};

export const archiveAccount = (id) => (dispatch) => {
  dispatch({
    type: ARCHIVE_ACCOUNT,
    payload: id,
  });
};

export const restoreAccount = (id) => (dispatch) => {
  dispatch({
    type: RESTORE_ACCOUNT,
    payload: id,
  });
};

export const deleteAccount = (id) => (dispatch) => {
  dispatch({
    type: DELETE_ACCOUNT,
    payload: id,
  });
};

export const fetchProfileData = () => {
  return fetchData("profile", {
    init: IDB_FETCH_PROFILE_INIT,
    success: IDB_FETCH_PROFILE_SUCCESS,
    failure: IDB_FETCH_PROFILE_FAILURE,
  });
};

export const fetchAccountsData = () => {
  return fetchData("accounts", {
    init: IDB_FETCH_ACCOUNTS_INIT,
    success: IDB_FETCH_ACCOUNTS_SUCCESS,
    failure: IDB_FETCH_ACCOUNTS_FAILURE,
  });
};

export const fetchCategoriesData = () => {
  return fetchData("categories", {
    init: IDB_FETCH_CATEGORIES_INIT,
    success: IDB_FETCH_CATEGORIES_SUCCESS,
    failure: IDB_FETCH_CATEGORIES_FAILURE,
  });
};

export const fetchTransactionsData = () => {
  return fetchData("transactions", {
    init: IDB_FETCH_TRANSACTIONS_INIT,
    success: IDB_FETCH_TRANSACTIONS_SUCCESS,
    failure: IDB_FETCH_CATEGORIES_FAILURE,
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
          .transaction(nameObjectStore, "readonly")
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
      (error) => dispatch({ type: failure, payload: error })
    );
  };
}
