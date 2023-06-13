import {
  ADD_NEW_TRANSACTION,
  ADD_NEW_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  ADD_NEW_ACCOUNT,
  DELETE_ACCOUNT,
  EDIT_ACCOUNT,
  REQUEST_IDB,
  RECEIVE_IDB_ACCOUNTS,
  RECEIVE_IDB_CATEGORIES,
  RECEIVE_IDB_TRANSACTIONS,
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
  return fetchData("accounts", RECEIVE_IDB_ACCOUNTS);
};

export const fetchTransactionsData = () => {
  return fetchData("transactions", RECEIVE_IDB_TRANSACTIONS);
};

export const fetchCategoriesData = () => {
  return fetchData("categories", RECEIVE_IDB_CATEGORIES);
};

//запрашиваем данные из indexedDB для инициализации redux store
//здесь асинхронные экшены. для каждого подхранилища
//свой экшн
export function fetchData(nameObjectStore, actionType) {
  return (dispatch) => {
    dispatch({
      type: REQUEST_IDB,
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
              type: actionType,
              payload: resultData,
            });
            idb.close();
          }
        };
      },
      (error) => console.log(error)
    );
  };
}
