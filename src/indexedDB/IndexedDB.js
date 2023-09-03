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

      const transactions = idb.createObjectStore('transactions', {
        keyPath: 'id',
      });
      transactions.createIndex('type', 'transactionType');
      transactions.createIndex('account', 'account');
      transactions.createIndex('amount', 'amount.amount');
      transactions.createIndex('category', 'category');
      transactions.createIndex('date', 'date');
      transactions.createIndex('notes', 'notes');
      transactions.createIndex('tags', 'tags');

      const categories = idb.createObjectStore('categories', {
        keyPath: 'id',
      });

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
    const indexRequest = index.getAll(query);
    indexRequest.onsuccess = () => {
      if (indexRequest.result) {
        indexRequest.result.forEach((item) => {
          if (!dataResult.find((elem) => elem.id === item.id)) {
            dataResult.push(item);
          }
        });
      }
      return resolve(dataResult);
    };
    indexRequest.onerror = () => reject('idbSearch Error');
  });
};

const searchTransactionsData = (transactions, query) => {
  return new Promise((resolve) => {
    const dataResult = [];
    getData(transactions.index('type'), query, dataResult)
      .then((result) => getData(transactions.index('category'), query, result))
      .then((result) => getData(transactions.index('account'), query, result))
      .then((result) => getData(transactions.index('amount'), query, result))
      .then((result) => getData(transactions.index('date'), query, result))
      .then((result) => getData(transactions.index('tags'), query, result))
      .then((result) => getData(transactions.index('notes'), query, result))
      .then((result) => resolve(result));
  });
};

export const idbSearchItems = (query, nameObjectStore) => {
  return new Promise((resolve) => {
    idbOpen().then((idb) => {
      const transactions = idb
        .transaction(nameObjectStore, 'readonly')
        .objectStore(nameObjectStore);

      switch (nameObjectStore) {
        case 'transactions':
          searchTransactionsData(transactions, query).then((result) =>
            resolve(result),
          );
          break;
        default:
          resolve([]);
      }
    });
  });
};
