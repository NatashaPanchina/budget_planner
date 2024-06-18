import dataJSON from './data.json';

export const DATABASE_NAME = 'budget-planner';
export const DB_VERSION = 1;

export const idbOpen = () => {
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
      accounts.createIndex('balance', 'formatBalance');
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

      idb.createObjectStore('rates', {
        keyPath: 'date',
      });

      if (process.env.NODE_ENV !== 'production') {
        loadJSON().then((data) => {
          idbInit(profile, data.profile, 'profile');
          idbInit(accounts, data.accounts.accounts);
          idbInit(transactions, data.transactions.transactions);
          idbInit(categories, data.categories.categories);
        });
      }
    };

    openRequest.onerror = () => reject('idbOpen Error');
  });
};

const loadJSON = async () => {
  const data = dataJSON;
  return data;
};

export const updateIDB = (data) => {
  return new Promise((resolve) => {
    idbOpen().then((idb) => {
      const promises = [];
      const names = [
        'profile',
        'accounts',
        'transactions',
        'categories',
        'rates',
      ];
      names.forEach((name) => {
        promises.push(
          new Promise((resolve, reject) => {
            const transaction = idb.transaction(name, 'readwrite');
            const objectStore = transaction.objectStore(name);
            idbInit(objectStore, data[`${name}Data`], name);
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject('updateIDB Error');
          }),
        );
      });
      Promise.all(promises).then(resolve);
    });
  });
};

const idbInit = (objectStore, data, nameObjectStore) => {
  if (nameObjectStore === 'profile') {
    //onerror reject сделать
    objectStore.put(data);
  } else {
    for (let key in data) {
      objectStore.put(data[key]);
    }
  }
};

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

export const idbGetItem = (id, nameObjectStore) => {
  return new Promise((resolve, reject) => {
    idbOpen().then((idb) => {
      const objectStore = idb
        .transaction(nameObjectStore, 'readwrite')
        .objectStore(nameObjectStore);
      const getRequest = objectStore.get(id);
      getRequest.onsuccess = () => {
        resolve(getRequest.result);
      };
      getRequest.onerror = () => reject('idbGetItem Error');
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

export const getAllData = (nameObjectStore) => {
  return new Promise((resolve, reject) => {
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
            resolve(resultData);
          }
        };
      },
      () => reject('IDBGetAllData Error'),
    );
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
      const dataResult = [];
      const indexes = ['type', 'amount', 'date', 'tags', 'notes'];
      const promises = [];
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

const searchAccountsData = (query) => {
  return new Promise((resolve) => {
    idbOpen().then((idb) => {
      const accounts = idb
        .transaction('accounts', 'readonly')
        .objectStore('accounts');
      const dataResult = [];
      const indexes = [
        'type',
        'description',
        'balance',
        'date',
        'tags',
        'notes',
      ];
      const promises = indexes.map((idx) =>
        getData(accounts.index(idx), query, dataResult),
      );
      Promise.all(promises).then(() => {
        resolve(dataResult);
      });
    });
  });
};

const searchCategoriesData = (query) => {
  return new Promise((resolve) => {
    idbOpen().then((idb) => {
      const categories = idb
        .transaction('categories', 'readonly')
        .objectStore('categories');
      const dataResult = [];
      const indexes = ['type', 'description', 'date', 'tags', 'notes'];
      const promises = indexes.map((idx) =>
        getData(categories.index(idx), query, dataResult),
      );
      Promise.all(promises).then(() => {
        resolve(dataResult);
      });
    });
  });
};

export const idbSearchItems = (query, nameObjectStore) => {
  switch (nameObjectStore) {
    case 'transactions':
      return searchTransactionsData(query);
    case 'accounts':
      return searchAccountsData(query);
    case 'categories':
      return searchCategoriesData(query);
    default:
      return new Promise((resolve) => resolve([]));
  }
};

export const clearIdb = (
  objectStores = ['transactions', 'accounts', 'categories'],
) => {
  return new Promise((resolve) => {
    idbOpen().then((idb) => {
      const promises = [];
      const names = objectStores;
      names.forEach((name) => {
        promises.push(
          new Promise((resolve, reject) => {
            const transaction = idb.transaction(name, 'readwrite');
            const clearRequest = transaction.objectStore(name).clear();
            clearRequest.onsuccess = () => resolve();
            clearRequest.onerror = () => reject('Idb Clear Error');
          }),
        );
      });
      Promise.all(promises).then(resolve);
    });
  });
};

export const idbUpdateItem = (id, newData, nameObjectStore) => {
  return new Promise((resolve, reject) => {
    idbOpen().then((idb) => {
      const objectStore = idb
        .transaction(nameObjectStore, 'readwrite')
        .objectStore(nameObjectStore);
      const cursorRequest = objectStore.openCursor();
      cursorRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          if (cursor.value.id === id) {
            const updateRequest = cursor.update({
              ...cursor.value,
              ...newData,
            });
            updateRequest.onsuccess = () => resolve();
            updateRequest.onerror = () => reject('idbUpdateItem Error');
          }
          cursor.continue();
        }
      };
      cursorRequest.onerror = () => reject('idbUpdateCursor Error');
    });
  });
};
