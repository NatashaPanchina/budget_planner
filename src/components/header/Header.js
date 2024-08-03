import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';

import { pages } from '../../utils/constants/pages';
import {
  fetchProfileData,
  changeLanguage,
  changeMode,
} from '../../actions/Actions';
import defaultAvatar from '../../assets/imgs/avatar-girl-1.png';
import { ReactComponent as LogoCatIcon } from '../../assets/icons/navigation/logoCat.svg';
import { ReactComponent as LogoTitleIcon } from '../../assets/icons/navigation/logoTitle.svg';
import { ReactComponent as LightModeIcon } from '../../assets/icons/shared/lightMode.svg';
import { ReactComponent as DarkModeIcon } from '../../assets/icons/shared/darkMode.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icons/shared/logOut.svg';

import {
  FlexContainer,
  HeaderContainer,
  LogoContainer,
  Logo,
  LogoTitle,
  ThemeContainer,
  Container,
  LanguagesMenuItem,
  Svg,
  SvgMode,
  Profile,
  LogOut,
  Username,
  LanguagesMenu,
  SvgCurrency,
  SignIn,
  ProfilePicture,
} from './Header.styled';
import { languages } from '../../utils/constants/languages';
import { mode } from '../../utils/constants/mode';
import GlobalSearch from './globalSearch/GlobalSearch';
import { icons, names } from '../../utils/constants/currencies';
import { logOut } from '../auth/utils';

function renderLanguagesMenu(languages) {
  return languages.map((language, index) => (
    <LanguagesMenuItem key={index} value={language}>
      {language}
    </LanguagesMenuItem>
  ));
}

export default function Header() {
  const gridStyles = {
    paddingRight: 1,
    '@media (min-width: 600px)': {
      paddingRight: 3,
    },
    '@media (min-width: 900px)': {
      paddingRight: 4,
    },
    '@media (min-width: 1200px)': {
      paddingRight: 6,
    },
  };
  const header = useSelector((state) => state.header);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [language, setLanguage] = useState(header.language);
  const [currency, setCurrency] = useState(names.USD);
  const [headerMode, setHeaderMode] = useState(header.mode);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  useEffect(() => {
    if (header.status === 'succeeded') {
      setHeaderMode(header.mode);
      if (!header.profile) return;
      setDisplayName(header.profile.displayName);
      setCurrency(header.profile.currency);
    }
  }, [header.status, header.profile, header.mode]);

  useEffect(() => {
    setLanguage(header.language);
  }, [header.language]);

  return (
    <>
      <HeaderContainer>
        <Grid
          container
          columnSpacing={{ xs: 0, sm: 2, md: 3, lg: 4 }}
          sx={gridStyles}
        >
          <Grid item xs={6} sm={1} md={1} lg={2}>
            <NavLink to={pages.home}>
              <LogoContainer>
                <Logo as={LogoCatIcon} />
                <LogoTitle as={LogoTitleIcon} />
              </LogoContainer>
            </NavLink>
          </Grid>
          <Grid item sm={6} md={5} lg={5}>
            <FlexContainer>
              <GlobalSearch />
            </FlexContainer>
          </Grid>
          <Grid item sm={3} md={3} lg={2}>
            <ThemeContainer>
              <Container>
                <LanguagesMenu
                  select
                  value={language}
                  onChange={(event) => {
                    const newLanguage = event.target.value;
                    setLanguage(newLanguage);
                    localStorage.setItem('language', newLanguage);
                    dispatch(changeLanguage(newLanguage));
                  }}
                >
                  {renderLanguagesMenu(languages)}
                </LanguagesMenu>
              </Container>
              <Container>
                <SvgCurrency as={icons[currency]} />
              </Container>
              <Container>
                <SvgMode
                  onClick={() => {
                    setHeaderMode(
                      headerMode === mode.light ? mode.dark : mode.light,
                    );
                    localStorage.setItem(
                      'mode',
                      headerMode === mode.light ? mode.dark : mode.light,
                    );
                    dispatch(
                      changeMode(
                        headerMode === mode.light ? mode.dark : mode.light,
                      ),
                    );
                  }}
                  as={headerMode === mode.light ? DarkModeIcon : LightModeIcon}
                />
              </Container>
            </ThemeContainer>
          </Grid>
          <Grid item xs={6} sm={2} md={3} lg={3}>
            <FlexContainer>
              {displayName ? (
                <>
                  <Profile>
                    {header.profile.photoURL ? (
                      <ProfilePicture
                        alt="profile-picture"
                        src={header.profile.photoURL}
                      />
                    ) : (
                      <ProfilePicture
                        alt="profile-picture"
                        src={defaultAvatar}
                      />
                    )}
                    <Username>{displayName}</Username>
                  </Profile>
                  <LogOut
                    onClick={() => {
                      logOut(dispatch, navigate);
                    }}
                  >
                    <Svg as={LogoutIcon} />
                  </LogOut>
                </>
              ) : (
                <SignIn to={pages.signin}>Sign in</SignIn>
              )}
            </FlexContainer>
          </Grid>
        </Grid>
      </HeaderContainer>
    </>
  );
}
