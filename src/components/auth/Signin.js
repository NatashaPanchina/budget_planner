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
  ProgressCotainer,
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
import { CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function Signin() {
  const [status, setStatus] = useState('idle');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignInCorrect, setIsSignInCorrect] = useState({
    status: '',
    correct: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const signInHelperText = `SIGN_IN.INVALID.${isSignInCorrect.status.toUpperCase()}`;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        {status === 'loading' ? (
          <ProgressCotainer>
            <CircularProgress />
          </ProgressCotainer>
        ) : (
          <>
            <SignInWithAcc
              onClick={() =>
                signInWithGooglePopup(
                  googleProvider,
                  navigate,
                  dispatch,
                  setIsSignInCorrect,
                  setStatus,
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
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              required
              label={t('SIGN_IN.PASSWORD')}
              autoComplete="off"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
                  setStatus,
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
          </>
        )}
      </SignInContainer>
      {status === 'loading' ? null : (
        <FooterMessage>
          {t('SIGN_IN.HAVE_AN_ACCOUNT')}{' '}
          <FooterMessageLink to={pages.signup}>
            {t('SIGN_IN.SIGN_UP')}
          </FooterMessageLink>
        </FooterMessage>
      )}
    </Container>
  );
}
