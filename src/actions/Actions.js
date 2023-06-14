import {
  ADD_NEW_TRANSACTION,
  ADD_NEW_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  ADD_NEW_ACCOUNT,
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
  UPDATE_ACCOUNT_BALANCE,
  ARCHIVE_CATEGORY,
  ARCHIVE_ACCOUNT,
} from "./ActionTypes";
import { idbOpen } from "../indexedDB/IndexedDB";

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

export const editCategory = (description, newCategory) => (dispatch) => {
  dispatch({
    type: EDIT_CATEGORY,
    payload: { description, newCategory },
  });
};

export const archiveCategory = (description) => (dispatch) => {
  dispatch({
    type: ARCHIVE_CATEGORY,
    payload: description,
  });
};

export const deleteCategory = (description) => (dispatch) => {
  dispatch({
    type: DELETE_CATEGORY,
    payload: description,
  });
};

export const addNewAccount = (account) => (dispatch) => {
  dispatch({
    type: ADD_NEW_ACCOUNT,
    payload: account,
  });
};

export const editAccount = (description, newAccount) => (dispatch) => {
  dispatch({
    type: EDIT_ACCOUNT,
    payload: { description, newAccount },
  });
};

export const archiveAccount = (description) => (dispatch) => {
  dispatch({
    type: ARCHIVE_ACCOUNT,
    payload: description,
  });
};

export const deleteAccount = (description) => (dispatch) => {
  dispatch({
    type: DELETE_ACCOUNT,
    payload: description,
  });
};

export const updateAccountBalance = (description, balance) => (dispatch) => {
  dispatch({
    type: UPDATE_ACCOUNT_BALANCE,
    payload: { description, balance },
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

//позже изменю экшены на экшены для транзакций
export const fetchTransactionsData = () => {
  return fetchData("transactions", {});
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
