import { updateHeaderProfile } from '../../../../../actions/Actions';
import { getAllData, idbAddItem } from '../../../../../indexedDB/IndexedDB';
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

export const backUp = async (
  setStatus,
  setBackUpDate,
  dispatch,
  header,
  backUpDate,
  uid,
) => {
  setStatus('loading');
  try {
    setBackUpDate(Date.now());
    await backUpData(uid, backUpDate);
    dispatch(
      updateHeaderProfile({
        ...header.profile,
        backUpDate,
      }),
    );
    await idbAddItem({ ...header.profile, backUpDate }, 'profile');
    setStatus('success');
  } catch (error) {
    setStatus('failed');
  }
};
