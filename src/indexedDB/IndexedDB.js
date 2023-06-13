import dataJSON from "./data.json";

export const DATABASE_NAME = "budget-planner";
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
      const accounts = idb.createObjectStore("accounts", {
        keyPath: "description",
      });
      const transactions = idb.createObjectStore("transactions", {
        keyPath: "id",
      });
      const categories = idb.createObjectStore("categories", {
        keyPath: "description",
      });

      loadJSON().then((data) => {
        idbInitFromJson(accounts, data.accounts.accounts);
        idbInitFromJson(transactions, data.transactions.transactions);
        idbInitFromJson(categories, data.categories.categories);
      });
    };

    openRequest.onerror = () => reject("idbOpen Error");
  });
}

//в будущем здесь будет асинхронный запрос json файла с сервера
async function loadJSON() {
  const data = dataJSON;
  return data;
}

function idbInitFromJson(objectStore, data) {
  for (let key in data) {
    objectStore.put(data[key]);
  }
}

export const idbAddItem = (newItem, nameObjectStore) => {
  return new Promise((resolve, reject) => {
    idbOpen().then((idb) => {
      const objectStore = idb
        .transaction(nameObjectStore, "readwrite")
        .objectStore(nameObjectStore);
      const addRequest = objectStore.put(newItem);
      addRequest.onsuccess = () => {
        resolve(addRequest.result);
      };
      addRequest.onerror = () => reject("idbAddItem Error");
    });
  });
};

export const idbEditItem = (prevItemId, newItem, nameObjectStore) => {
  return new Promise((resolve, reject) => {
    const deleteRequest = idbDeleteItem(prevItemId, nameObjectStore);
    deleteRequest
      .then(() => {
        idbAddItem(newItem, nameObjectStore);
      })
      .catch(() => reject("idbEditItem"));
  });
};

export const idbDeleteItem = (id, nameObjectStore) => {
  return new Promise((resolve, reject) => {
    idbOpen().then((idb) => {
      const objectStore = idb
        .transaction(nameObjectStore, "readwrite")
        .objectStore(nameObjectStore);
      const deleteRequest = objectStore.delete(id);
      deleteRequest.onsuccess = () => {
        resolve(deleteRequest.result);
      };
      deleteRequest.onerror = () => reject("idbDeleteItem Error");
    });
  });
};
