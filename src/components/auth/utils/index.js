import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
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
  setIsSignInCorrect,
  setStatus,
) => {
  try {
    setStatus('loading');
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
        setStatus('success');
        navigate(pages.transactions.main);
      });
    }
  } catch (error) {
    const errorCode = error.code;
    const isCorrect = {
      status: '',
      correct: false,
    };
    setStatus(errorCode);
    switch (errorCode) {
      case 'auth/invalid-email':
        setIsSignInCorrect({
          ...isCorrect,
          status: 'email',
        });
        return;
      case 'auth/invalid-credential':
        setIsSignInCorrect({
          ...isCorrect,
          status: 'email_or_password',
        });
        return;
      case 'auth/user-disabled':
        setIsSignInCorrect({
          ...isCorrect,
          status: 'user_disabled',
        });
        return;
      case 'auth/user-not-found':
        setIsSignInCorrect({
          ...isCorrect,
          status: 'no_user',
        });
        return;
      case 'auth/wrong-password':
        setIsSignInCorrect({
          ...isCorrect,
          status: 'password',
        });
        return;
      default:
        setIsSignInCorrect({
          ...isCorrect,
          status: 'try_later',
        });
        return;
    }
  }
};

export const signInWithGooglePopup = async (
  googleProvider,
  navigate,
  dispatch,
  setIsSignInCorrect,
  setStatus,
) => {
  try {
    setStatus('loading');
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
        setStatus('success');
        navigate(pages.transactions.main);
      });
    }
  } catch (error) {
    const errorCode = error.code;
    const isCorrect = {
      status: '',
      correct: false,
    };
    setStatus(errorCode);
    switch (errorCode) {
      case 'auth/invalid-email':
        setIsSignInCorrect({
          ...isCorrect,
          status: 'email',
        });
        return;
      case 'auth/user-disabled':
        setIsSignInCorrect({
          ...isCorrect,
          status: 'user_disabled',
        });
        return;
      case 'auth/user-not-found':
        setIsSignInCorrect({
          ...isCorrect,
          status: 'no_user',
        });
        return;
      default:
        setIsSignInCorrect({
          ...isCorrect,
          status: 'failed_log_in',
        });
        return;
    }
  }
};

export const signUpWithPassword = async (
  email,
  password,
  dispatch,
  navigate,
  setIsSignUpCorrect,
  setStatus,
) => {
  try {
    setStatus('loading');
    await createUserWithEmailAndPassword(auth, email, password);
    sendEmailVerification(auth.currentUser);
    if (auth.currentUser !== null) {
      const data = {
        providerId: auth.currentUser.providerId,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        password,
        emailVerified: auth.currentUser.emailVerified,
        createdAt: auth.currentUser.metadata.createdAt,
        lastLoginAt: auth.currentUser.metadata.lastLoginAt,
        phoneNumber: auth.currentUser.phoneNumber,
        photoURL: auth.currentUser.photoURL,
        id: auth.currentUser.uid,
        currency: names.USD,
        backupDate: Date.now(),
      };
      dispatch(updateHeaderProfile(data));
      idbAddItem(data, 'profile');
      setStatus('success');
      navigate(pages.enterName);
    }
  } catch (error) {
    const errorCode = error.code;
    const isCorrect = {
      status: '',
      correct: false,
    };
    setStatus(errorCode);
    switch (errorCode) {
      case 'auth/invalid-email':
        setIsSignUpCorrect({
          ...isCorrect,
          status: 'email',
        });
        return;
      case 'auth/email-already-in-use':
        setIsSignUpCorrect({
          ...isCorrect,
          status: 'email_used',
        });
        return;
      case 'auth/invalid-credential':
        setIsSignUpCorrect({
          ...isCorrect,
          status: 'email_or_password',
        });
        return;
      case 'auth/weak-password':
        setIsSignUpCorrect({
          ...isCorrect,
          status: 'weak_password',
        });
        return;
      default:
        setIsSignUpCorrect({
          ...isCorrect,
          status: 'try_later',
        });
        return;
    }
  }
};

export const signUpWithGooglePopup = async (
  googleProvider,
  dispatch,
  navigate,
  setIsSignUpCorrect,
  setStatus,
) => {
  setStatus('loading');
  try {
    const response = await signInWithPopup(auth, googleProvider);
    if (response !== null) {
      const data = {
        providerId: response.providerId,
        displayName: response.user.displayName,
        email: response.user.email,
        emailVerified: response.user.emailVerified,
        createdAt: response.user.metadata.createdAt,
        lastLoginAt: response.user.metadata.lastLoginAt,
        phoneNumber: response.user.phoneNumber,
        photoURL: response.user.photoURL,
        id: response.user.uid,
        currency: names.USD,
        backupDate: Date.now(),
      };
      dispatch(updateHeaderProfile(data));
      idbAddItem(data, 'profile');
      setStatus('success');
      navigate(pages.enterName);
    }
  } catch (error) {
    const errorCode = error.code;
    const isCorrect = {
      status: '',
      correct: false,
    };
    setStatus(errorCode);
    switch (errorCode) {
      case 'auth/invalid-email':
        setIsSignUpCorrect({
          ...isCorrect,
          status: 'email',
        });
        return;
      case 'auth/email-already-in-use':
        setIsSignUpCorrect({
          ...isCorrect,
          status: 'email_used',
        });
        return;
      case 'auth/user-disabled':
        setIsSignUpCorrect({
          ...isCorrect,
          status: 'user_disabled',
        });
        return;
      case 'auth/user-not-found':
        setIsSignUpCorrect({
          ...isCorrect,
          status: 'no_user',
        });
        return;
      default:
        setIsSignUpCorrect({
          ...isCorrect,
          status: 'failed_log_in',
        });
        return;
    }
  }
};
