import React, { useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
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

export default function Signup() {
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
        navigate(pages.enterName);
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error ocured: ', errorCode, errorMessage);
    }
  };

  const signUpWithPassword = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser);
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
        navigate(pages.enterName);
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error ocured: ', errorCode, errorMessage);
    }
  };

  useEffect(() => {
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
        <SignInTitle>{t('SIGN_UP.SIGN_UP')}</SignInTitle>
        <SignInWithAcc onClick={() => signInWithGooglePopup()}>
          {t('SIGN_UP.SIGN_UP_WITH_GOOGLE')}
          <ProviderSvg as={GoogleIcon} />
        </SignInWithAcc>
        <OrdinaryText>{t('SIGN_UP.OR')}</OrdinaryText>
        <TextInputField
          margin="normal"
          required
          label={t('SIGN_UP.EMAIL_ADDRESS')}
          autoComplete="off"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextInputField
          type="password"
          margin="normal"
          required
          label={t('SIGN_UP.PASSWORD')}
          autoComplete="off"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <MainButton onClick={() => signUpWithPassword()}>
          {t('SIGN_UP.SIGN_UP_WITH_EMAIL')}
        </MainButton>
        <SignInWithoutAcc
          onClick={() => signUpAnonym(auth, dispatch, navigate)}
        >
          {t('SIGN_UP.CONTINUE_WITHOUT_ACCOUNT')}
        </SignInWithoutAcc>
      </SignInContainer>
      <FooterMessage>
        {t('SIGN_UP.HAVE_AN_ACCOUNT')}{' '}
        <FooterMessageLink to={pages.signin}>
          {t('SIGN_UP.SIGN_IN')}
        </FooterMessageLink>
      </FooterMessage>
    </Container>
  );
}
