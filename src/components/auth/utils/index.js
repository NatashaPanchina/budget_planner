import {
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import {
  updateHeaderProfile,
  resetTransactions,
  resetAccounts,
  resetCategories,
} from '../../../actions/Actions';
import { clearIdb, idbAddItem, updateIDB } from '../../../indexedDB/IndexedDB';
import { pages } from '../../../utils/constants/pages';
import { names } from '../../../utils/constants/currencies';
import { auth } from '../../../configs/firebaseConfigs';
import { getDataFromFB } from '../../../utils/firestore';

export const logOut = async (dispatch, navigate) => {
  try {
    dispatch(resetTransactions());
    dispatch(resetCategories());
    dispatch(resetAccounts());
    dispatch(updateHeaderProfile(null));
    clearIdb(['profile', 'transactions', 'categories', 'accounts']);
    navigate(pages.signin);
  } catch (error) {
    console.log(error.message);
  }
};

export const signUpAnonym = async (auth, dispatch, navigate) => {
  try {
    await signInAnonymously(auth);
    if (auth.currentUser !== null) {
      const data = {
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
      idbAddItem(data, 'profile');
      dispatch(updateHeaderProfile(data));
      navigate(pages.enterName);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const signInWithPassword = async (
  email,
  password,
  navigate,
  dispatch,
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    if (auth.currentUser !== null) {
      const result = await getDataFromFB(auth.currentUser.uid);

      //updating indexeddb from firestore
      updateIDB({
        ...result,
        profileData: {
          ...result.profileData,
          lastLoginAt: auth.currentUser.metadata.lastLoginAt,
        },
      }).then(() => {
        dispatch(
          updateHeaderProfile({
            ...result.profileData,
            lastLoginAt: auth.currentUser.metadata.lastLoginAt,
          }),
        );
        navigate(pages.transactions.main);
      });
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('Error ocured: ', errorCode, errorMessage);
  }
};

export const signInWithGooglePopup = async (
  googleProvider,
  navigate,
  dispatch,
) => {
  try {
    const response = await signInWithPopup(auth, googleProvider);
    if (response !== null) {
      const result = await getDataFromFB(auth.currentUser.uid);

      updateIDB({
        ...result,
        profileData: {
          ...result.profileData,
          lastLoginAt: auth.currentUser.metadata.lastLoginAt,
        },
      }).then(() => {
        dispatch(
          updateHeaderProfile({
            ...result.profileData,
            lastLoginAt: auth.currentUser.metadata.lastLoginAt,
          }),
        );
        navigate(pages.transactions.main);
      });
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('Error ocured: ', errorCode, errorMessage);
  }
};
