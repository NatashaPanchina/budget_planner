import { signInAnonymously } from 'firebase/auth';
import {
  updateHeaderProfile,
  resetTransactions,
  resetAccounts,
  resetCategories,
} from '../../../actions/Actions';
import { clearIdb, idbAddItem } from '../../../indexedDB/IndexedDB';
import { pages } from '../../../utils/constants/pages';
import { names } from '../../../utils/constants/currencies';

export const logOut = async (dispatch, navigate) => {
  try {
    dispatch(resetTransactions());
    dispatch(resetCategories());
    dispatch(resetAccounts());
    dispatch(updateHeaderProfile(null));
    await clearIdb(['profile', 'transactions', 'categories', 'accounts']);
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
      };
      await idbAddItem(data, 'profile');
      dispatch(updateHeaderProfile(data));
      navigate(pages.enterName);
    }
  } catch (error) {
    console.log(error.message);
  }
};
