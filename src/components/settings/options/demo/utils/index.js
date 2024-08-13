import { idbOpen } from '../../../../../indexedDB/IndexedDB';
import { data, ids } from './data';

const getPromises = (idb, mainCurrency) => {
  const promises = [];
  const names = ['accounts', 'categories', 'transactions'];
  if (!mainCurrency) return [];

  for (let key = 0; key < names.length; key++) {
    const objectStore = idb
      .transaction(names[key], 'readwrite')
      .objectStore(names[key]);

    data[mainCurrency][names[key]].forEach((item) => {
      promises.push(
        new Promise((resolve, reject) => {
          const putRequest = objectStore.put(item);
          putRequest.onsuccess = () => resolve(item);
          putRequest.onerror = () => reject('idbLoadDemo Error');
        }),
      );
    });
  }
  return promises;
};

export const idbLoad = (mainCurrency) => {
  return new Promise((resolve, reject) => {
    idbOpen().then((idb) => {
      const promises = getPromises(idb, mainCurrency);
      Promise.all(promises).then(resolve, () => reject('idbLoadDemo Error'));
    });
  });
};

const idbDelete = (transactionsIds) => {
  return new Promise((resolve, reject) => {
    idbOpen().then((idb) => {
      const promises = [];
      const names = ['accounts', 'categories', 'transactions'];

      for (let key = 0; key < names.length; key++) {
        const objectStore = idb
          .transaction(names[key], 'readwrite')
          .objectStore(names[key]);

        ids[names[key]].forEach((id) => {
          promises.push(
            new Promise((resolve, reject) => {
              const putRequest = objectStore.delete(id);
              putRequest.onsuccess = () => resolve(id);
              putRequest.onerror = () => reject('idbDeleteDemo Error');
            }),
          );
        });
      }
      transactionsIds.forEach((id) => {
        promises.push(
          new Promise((resolve, reject) => {
            const objectStore = idb
              .transaction('transactions', 'readwrite')
              .objectStore('transactions');
            const putRequest = objectStore.delete(id);
            putRequest.onsuccess = () => resolve(id);
            putRequest.onerror = () => reject('idbDeleteDemo Error');
          }),
        );
      });
      Promise.all(promises).then(resolve, () => reject('idbDeleteDemo Error'));
    });
  });
};

export const loadDemo = async (setStatus, mainCurrency) => {
  setStatus('loading');
  try {
    await idbLoad(mainCurrency);
    setStatus('success');
  } catch (er) {
    setStatus('failure');
  }
};

export const deleteDemo = async (
  setDeletingStatus,
  transactions,
  mainCurrency,
) => {
  setDeletingStatus('loading');
  try {
    const transactionsIds = transactions
      .filter((transaction) => {
        return (
          data[mainCurrency].accounts.find(
            (account) => account.id === transaction.account,
          ) ||
          data[mainCurrency].categories.find(
            (category) => category.id === transaction.category,
          )
        );
      })
      .map((transaction) => transaction.id);
    console.log(transactionsIds);
    await idbDelete(transactionsIds);
    setDeletingStatus('success');
  } catch (er) {
    setDeletingStatus('failure');
  }
};
