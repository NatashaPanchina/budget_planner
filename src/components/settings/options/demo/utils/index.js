import { idbOpen } from '../../../../../indexedDB/IndexedDB';
import { data, ids } from './data';

const getPromises = (idb) => {
  const promises = [];
  const names = ['accounts', 'categories', 'transactions'];

  for (let key = 0; key < names.length; key++) {
    const objectStore = idb
      .transaction(names[key], 'readwrite')
      .objectStore(names[key]);

    data[names[key]].forEach((item) => {
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

const idbLoad = () => {
  return new Promise((resolve, reject) => {
    idbOpen().then((idb) => {
      const promises = getPromises(idb);
      Promise.all(promises).then(resolve, () => reject('idbLoadDemo Error'));
    });
  });
};

const idbDelete = () => {
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
      Promise.all(promises).then(resolve, () => reject('idbDeleteDemo Error'));
    });
  });
};

export const loadDemo = async (setStatus) => {
  setStatus('loading');
  try {
    await idbLoad();
    setStatus('success');
  } catch (er) {
    setStatus('failure');
  }
};

export const deleteDemo = async (setDeletingStatus) => {
  setDeletingStatus('loading');
  try {
    await idbDelete();
    setDeletingStatus('success');
  } catch (er) {
    setDeletingStatus('failure');
  }
};
