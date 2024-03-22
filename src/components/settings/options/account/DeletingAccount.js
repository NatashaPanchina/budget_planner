import {
  GoogleAuthProvider,
  deleteUser,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  MainButton,
  OrdinaryText,
  ProviderSvg,
  SignInContainer,
  SignInWithAcc,
  TextInputField,
} from '../../../auth/Auth.styled';
import { clearIdb } from '../../../../indexedDB/IndexedDB';
import { pages } from '../../../../utils/constants/pages';
import {
  resetAccounts,
  resetCategories,
  resetTransactions,
  updateHeaderProfile,
} from '../../../../actions/Actions';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ReactComponent as GoogleIcon } from '../../../../assets/icons/shared/google.svg';
import { styled } from '@mui/material';

const DeletingInfo = styled('div')((props) => ({
  width: `calc(100% - ${props.theme.spacing(2 * 2)})`,
  padding: `${props.theme.spacing(5)} ${props.theme.spacing(2)}`,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: props.theme.spacing(3),
  '@media (min-width: 600px)': {
    marginTop: props.theme.spacing(5),
    padding: props.theme.spacing(5),
    width: `calc(80% - ${props.theme.spacing(5 * 2)})`,
  },
  '@media (min-width: 768px)': {
    width: `calc(50% - ${props.theme.spacing(5 * 2)})`,
    maxWidth: 450,
    maxHeight: 470,
  },
}));

export default function DeletingAccount() {
  const { t } = useTranslation();
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  const signInWithGooglePopup = async () => {
    const response = await signInWithPopup(auth, googleProvider);
    if (response !== null) {
      dispatch(updateHeaderProfile(null));
    }
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const deleteAccount = async () => {
    try {
      await signInWithGooglePopup();
      await deleteUser(auth.currentUser);
      dispatch(resetTransactions());
      dispatch(resetAccounts());
      dispatch(resetCategories());
      dispatch(updateHeaderProfile(null));
      await clearIdb(['profile', 'transactions', 'categories', 'accounts']);
      navigate(pages.signin);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteAccounByPassword = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await deleteUser(auth.currentUser);
      dispatch(resetTransactions());
      dispatch(resetAccounts());
      dispatch(resetCategories());
      dispatch(updateHeaderProfile(null));
      await clearIdb(['profile', 'transactions', 'categories', 'accounts']);
      navigate(pages.signin);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <DeletingInfo>{t('DELETE_ACCOUNT.DELETING_INFO')}</DeletingInfo>
      <SignInContainer>
        <SignInWithAcc onClick={() => deleteAccount()}>
          {t('DELETE_ACCOUNT.SIGN_IN_WITH_GOOGLE')}{' '}
          <ProviderSvg as={GoogleIcon} />
        </SignInWithAcc>
        <OrdinaryText>{t('SIGN_IN.OR')}</OrdinaryText>
        <TextInputField
          margin="normal"
          required
          label={t('SIGN_IN.EMAIL_ADDRESS')}
          autoComplete="off"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextInputField
          type="password"
          margin="normal"
          required
          label={t('SIGN_IN.PASSWORD')}
          autoComplete="off"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <MainButton onClick={() => deleteAccounByPassword()}>
          {t('SIGN_IN.SIGN_IN_WITH_EMAIL')}
        </MainButton>
      </SignInContainer>
    </Container>
  );
}
