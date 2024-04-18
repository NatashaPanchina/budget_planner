import React, { useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
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
  signUpAnonym,
  signUpWithGooglePopup,
  signUpWithPassword,
} from './utils';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpCorrect, setIsSignUpCorrect] = useState({
    status: '',
    correct: true,
  });
  const signUpHelperText = `SIGN_UP.INVALID.${isSignUpCorrect.status.toUpperCase()}`;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  const auth = getAuth();

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
        <SignInWithAcc
          onClick={() =>
            signUpWithGooglePopup(
              googleProvider,
              dispatch,
              navigate,
              setIsSignUpCorrect,
            )
          }
        >
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
        <ErrorHelperText $isShowError={!isSignUpCorrect.correct}>
          {t(signUpHelperText)}
        </ErrorHelperText>
        <MainButton
          onClick={() =>
            signUpWithPassword(
              email,
              password,
              dispatch,
              navigate,
              setIsSignUpCorrect,
            )
          }
        >
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
