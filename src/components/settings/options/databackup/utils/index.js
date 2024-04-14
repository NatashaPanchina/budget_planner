import { getAllData } from '../../../../../indexedDB/IndexedDB';
import { setDataToFB } from '../../../../../utils/firestore';

export const backUpData = async (uid, date) => {
  try {
    if (!uid) return;
    const profile = await getAllData('profile');
    const transactions = await getAllData('transactions');
    const categories = await getAllData('categories');
    const accounts = await getAllData('accounts');
    const rates = await getAllData('rates');
    setDataToFB(
      uid,
      {
        ...profile[0],
        backupDate: date,
      },
      transactions,
      accounts,
      categories,
      rates,
    );
  } catch (error) {
    console.log(error);
  }
};
