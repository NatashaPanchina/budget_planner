import dataJSON from './data.json';

export const DATABASE_NAME = 'budget-planner';
export const DB_VERSION = 1;

export function idbOpen() {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open(DATABASE_NAME, DB_VERSION);

    //возвращает объект базы данных idb
    openRequest.onsuccess = () => {
      resolve(openRequest.result);
    };

    //инициализация бд из JSON
    openRequest.onupgradeneeded = () => {
      const idb = openRequest.result;
      const profile = idb.createObjectStore('profile', {
        keyPath: 'id',
      });
      const accounts = idb.createObjectStore('accounts', {
        keyPath: 'id',
      });
      accounts.createIndex('type', 'type');
      accounts.createIndex('description', 'description');
      accounts.createIndex('date', 'date');
      accounts.createIndex('notes', 'notes');
      accounts.createIndex('tags', 'tags');

      const transactions = idb.createObjectStore('transactions', {
        keyPath: 'id',
      });
      transactions.createIndex('type', 'transactionType');
      transactions.createIndex('account', 'account');
      transactions.createIndex('amount', 'formatAmount');
      transactions.createIndex('category', 'category');
      transactions.createIndex('date', 'date');
      transactions.createIndex('notes', 'notes');
      transactions.createIndex('tags', 'tags');

      const categories = idb.createObjectStore('categories', {
        keyPath: 'id',
      });
      categories.createIndex('type', 'type');
      categories.createIndex('description', 'description');
      categories.createIndex('date', 'date');
      categories.createIndex('notes', 'notes');
      categories.createIndex('tags', 'tags');

      if (process.env.NODE_ENV !== 'production') {
        loadJSON().then((data) => {
          idbInitFromJson(profile, data.profile, 'profile');
          idbInitFromJson(accounts, data.accounts.accounts);
          idbInitFromJson(transactions, data.transactions.transactions);
          idbInitFromJson(categories, data.categories.categories);
        });
      }
    };

    openRequest.onerror = () => reject('idbOpen Error');
  });
}

//в будущем здесь будет асинхронный запрос json файла с сервера
async function loadJSON() {
  const data = dataJSON;
  return data;
}

function idbInitFromJson(objectStore, data, nameObjectStore) {
  if (nameObjectStore === 'profile') {
    objectStore.put(data);
  } else {
    for (let key in data) {
      objectStore.put(data[key]);
    }
  }
}

export const idbAddItem = (newItem, nameObjectStore) => {
  return new Promise((resolve, reject) => {
    idbOpen().then((idb) => {
      const objectStore = idb
        .transaction(nameObjectStore, 'readwrite')
        .objectStore(nameObjectStore);
      const addRequest = objectStore.put(newItem);
      addRequest.onsuccess = () => {
        resolve(addRequest.result);
      };
      addRequest.onerror = () => reject('idbAddItem Error');
    });
  });
};

export const idbDeleteItem = (id, nameObjectStore) => {
  return new Promise((resolve, reject) => {
    idbOpen().then((idb) => {
      const objectStore = idb
        .transaction(nameObjectStore, 'readwrite')
        .objectStore(nameObjectStore);
      const deleteRequest = objectStore.delete(id);
      deleteRequest.onsuccess = () => {
        resolve(deleteRequest.result);
      };
      deleteRequest.onerror = () => reject('idbDeleteItem Error');
    });
  });
};

const getData = (index, query, dataResult) => {
  return new Promise((resolve, reject) => {
    //search by date only if the query has /
    if (index.name === 'date' && !query.includes('/')) {
      resolve();
    } else {
      const indexRequest = index.getAll(
        IDBKeyRange.bound(query, query + '\uffff'),
      );
      indexRequest.onsuccess = () => {
        if (indexRequest.result) {
          indexRequest.result.forEach((item) => {
            if (!dataResult.find((elem) => elem.id === item.id)) {
              dataResult.push(item);
            }
          });
        }
        resolve();
      };
      indexRequest.onerror = () => reject('idbSearch Error');
    }
  });
};

const getCategories = (categories, query) => {
  return new Promise((resolve) => {
    const getRequest = categories
      .index('description')
      .getAll(IDBKeyRange.bound(query, query + '\uffff', false, false));
    getRequest.onsuccess = () => resolve(getRequest.result);
  });
};

const getAccounts = (accounts, query) => {
  return new Promise((resolve) => {
    const getRequest = accounts
      .index('description')
      .getAll(IDBKeyRange.bound(query, query + '\uffff', false, false));
    getRequest.onsuccess = () => resolve(getRequest.result);
  });
};

const getPromises = (query, promises, dataResult) => {
  return new Promise((resolve) => {
    idbOpen().then((idb) => {
      const categories = idb
        .transaction('categories', 'readonly')
        .objectStore('categories');

      getCategories(categories, query).then((result) => {
        const transactions = idb
          .transaction('transactions', 'readonly')
          .objectStore('transactions');
        result.forEach((category) =>
          promises.push(
            getData(transactions.index('category'), category.id, dataResult),
          ),
        );
        const accounts = idb
          .transaction('accounts', 'readonly')
          .objectStore('accounts');
        getAccounts(accounts, query).then((result) => {
          const transactions = idb
            .transaction('transactions', 'readonly')
            .objectStore('transactions');
          result.forEach((account) =>
            promises.push(
              getData(transactions.index('account'), account.id, dataResult),
            ),
          );
          resolve();
        });
      });
    });
  });
};

const searchTransactionsData = (query) => {
  return new Promise((resolve) => {
    idbOpen().then((idb) => {
      let dataResult = [];
      const indexes = ['type', 'amount', 'date', 'tags', 'notes'];
      let promises = [];
      getPromises(query, promises, dataResult).then(() => {
        const transactions = idb
          .transaction('transactions', 'readonly')
          .objectStore('transactions');
        indexes.forEach((idx) =>
          promises.push(getData(transactions.index(idx), query, dataResult)),
        );
        Promise.all(promises).then(() => {
          resolve(dataResult);
        });
      });
    });
  });
};

export const idbSearchItems = (query, nameObjectStore) => {
  switch (nameObjectStore) {
    case 'transactions':
      return searchTransactionsData(query);
    default:
      return new Promise((resolve) => resolve([]));
  }
};
