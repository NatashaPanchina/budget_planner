import { doc, runTransaction, writeBatch } from 'firebase/firestore';
import { auth, db } from '../../configs/firebaseConfigs';
import { names } from '../constants/currencies';

export const setDataToFB = async (
  uid,
  profile,
  transactions,
  accounts,
  categories,
  rates,
) => {
  const batch = writeBatch(db);

  try {
    const profileRef = doc(db, 'users', uid, 'data', 'profile');
    batch.set(profileRef, profile);

    const transactionsRef = doc(db, 'users', uid, 'data', 'transactions');
    batch.set(transactionsRef, { transactions });

    const accountsRef = doc(db, 'users', uid, 'data', 'accounts');
    batch.set(accountsRef, { accounts });

    const categoriesRef = doc(db, 'users', uid, 'data', 'categories');
    batch.set(categoriesRef, { categories });

    const ratesRef = doc(db, 'users', uid, 'data', 'rates');
    batch.set(ratesRef, { rates });

    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};

export const getDataFromFB = async (uid) => {
  let profileData = {
    isAnonymous: auth.currentUser.isAnonymous,
    providerId: auth.currentUser.providerId,
    displayName: auth.currentUser.displayName,
    email: auth.currentUser.email,
    emailVerified: auth.currentUser.emailVerified,
    createdAt: auth.currentUser.metadata.createdAt,
    lastLoginAt: auth.currentUser.metadata.lastLoginAt,
    phoneNumber: auth.currentUser.phoneNumber,
    photoURL: auth.currentUser.photoURL,
    id: auth.currentUser.uid,
    currency: names.USD,
    backupDate: Date.now(),
  };
  let transactionsData = [];
  let accountsData = [];
  let categoriesData = [];
  let ratesData = [];

  await runTransaction(db, async (transaction) => {
    const profileRef = doc(db, 'users', uid, 'data', 'profile');
    const transactionsRef = doc(db, 'users', uid, 'data', 'transactions');
    const accountsRef = doc(db, 'users', uid, 'data', 'accounts');
    const categoriesRef = doc(db, 'users', uid, 'data', 'categories');
    const ratesRef = doc(db, 'users', uid, 'data', 'rates');

    const profile = await transaction.get(profileRef);
    if (profile.exists()) {
      profileData = profile.data();
    }

    const transactions = await transaction.get(transactionsRef);
    if (transactions.exists()) {
      transactionsData = transactions.data().transactions;
    }

    const accounts = await transaction.get(accountsRef);
    if (accounts.exists()) {
      accountsData = accounts.data().accounts;
    }

    const categories = await transaction.get(categoriesRef);
    if (categories.exists()) {
      categoriesData = categories.data().categories;
    }

    const rates = await transaction.get(ratesRef);
    if (rates.exists()) {
      ratesData = rates.data().rates;
    }
  });

  return {
    profileData,
    transactionsData,
    accountsData,
    categoriesData,
    ratesData,
  };
};
