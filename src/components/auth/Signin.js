import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import {
  Container,
  ErrorHelperText,
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
import { useNavigate } from 'react-router-dom';
import { pages } from '../../utils/constants/pages';
import { useDispatch } from 'react-redux';
import { fetchProfileData } from '../../actions/Actions';
import { useTranslation } from 'react-i18next';
import {
  signInWithGooglePopup,
  signInWithPassword,
  signUpAnonym,
} from './utils';
import { auth } from '../../configs/firebaseConfigs';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignInCorrect, setIsSignInCorrect] = useState({
    status: '',
    correct: true,
  });
  const signInHelperText = `SIGN_IN.INVALID.${isSignInCorrect.status.toUpperCase()}`;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });

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
        <SignInWithAcc
          onClick={() =>
            signInWithGooglePopup(
              googleProvider,
              navigate,
              dispatch,
              setIsSignInCorrect,
            )
          }
        >
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
        <ErrorHelperText $isShowError={!isSignInCorrect.correct}>
          {t(signInHelperText)}
        </ErrorHelperText>
        <MainButton
          onClick={() => {
            signInWithPassword(
              email,
              password,
              navigate,
              dispatch,
              setIsSignInCorrect,
            );
          }}
        >
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
