import React, { useEffect, useState } from 'react';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  Container,
  FlexContainer,
  FooterMessage,
  FooterMessageLink,
  Logo,
  LogoContainer,
  LogoTitle,
  MainButton,
  OrdinaryText,
  ProviderSvg,
  SignInContainer,
  SignInTitle,
  SignInWithAcc,
  SignInWithoutAcc,
  TextInputField,
} from './Auth.styled';
import { ReactComponent as LogoCatIcon } from '../../assets/icons/navigation/logoCat.svg';
import { ReactComponent as LogoTitleIcon } from '../../assets/icons/navigation/logoTitle.svg';
import { ReactComponent as GoogleIcon } from '../../assets/icons/shared/google.svg';
import { idbAddItem } from '../../indexedDB/IndexedDB';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../utils/constants/pages';
import { useDispatch } from 'react-redux';
import { fetchProfileData, updateHeaderProfile } from '../../actions/Actions';
import { useTranslation } from 'react-i18next';
import { signUpAnonym } from './utils';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  const auth = getAuth();
  const signInWithGooglePopup = async () => {
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
          currency: 'USD',
        };
        dispatch(updateHeaderProfile(data));
        await idbAddItem(data, 'profile');
        navigate(pages.transactions.main);
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error ocured: ', errorCode, errorMessage);
    }
  };

  const signInWithPassword = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
          currency: 'USD',
        };
        dispatch(updateHeaderProfile(data));
        await idbAddItem(data, 'profile');
        navigate(pages.transactions.main);
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error ocured: ', errorCode, errorMessage);
    }
  };

  useEffect(() => {
    //to init indexeddb
    dispatch(fetchProfileData());
  }, []);

  return (
    <Container>
      <LogoContainer>
        <FlexContainer>
          <Logo as={LogoCatIcon} />
          <LogoTitle as={LogoTitleIcon} />
        </FlexContainer>
      </LogoContainer>
      <SignInContainer>
        <SignInTitle>{t('SIGN_IN.SIGN_IN')}</SignInTitle>
        <SignInWithAcc onClick={() => signInWithGooglePopup()}>
          {t('SIGN_IN.SIGN_IN_WITH_GOOGLE')} <ProviderSvg as={GoogleIcon} />
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
        <MainButton onClick={() => signInWithPassword()}>
          {t('SIGN_IN.SIGN_IN_WITH_EMAIL')}
        </MainButton>
        <SignInWithoutAcc
          onClick={() => signUpAnonym(auth, dispatch, navigate)}
        >
          {t('SIGN_UP.CONTINUE_WITHOUT_ACCOUNT')}
        </SignInWithoutAcc>
      </SignInContainer>
      <FooterMessage>
        {t('SIGN_IN.HAVE_AN_ACCOUNT')}{' '}
        <FooterMessageLink to={pages.signup}>
          {t('SIGN_IN.SIGN_UP')}
        </FooterMessageLink>
      </FooterMessage>
    </Container>
  );
}
