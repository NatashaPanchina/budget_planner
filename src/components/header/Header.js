import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';

import { pages } from '../../utils/constants/pages';
import {
  fetchProfileData,
  changeLanguage,
  changeMode,
} from '../../actions/Actions';

import { ReactComponent as LogoCatIcon } from '../../assets/icons/navigation/logoCat.svg';
import { ReactComponent as LogoTitleIcon } from '../../assets/icons/navigation/logoTitle.svg';
import { ReactComponent as CurrencyDollarIcon } from '../../assets/icons/shared/currencyDollar.svg';
import { ReactComponent as LightModeIcon } from '../../assets/icons/shared/lightMode.svg';
import { ReactComponent as DarkModeIcon } from '../../assets/icons/shared/darkMode.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icons/shared/logOut.svg';
import { ReactComponent as AvatarIcon } from '../../assets/icons/shared/avatar.svg';

import {
  FlexContainer,
  HeaderContainer,
  LogoContainer,
  Logo,
  LogoTitle,
  Title,
  ThemeContainer,
  Container,
  LanguagesMenuItem,
  Svg,
  SvgMode,
  Profile,
  LogOut,
  Username,
  LanguagesMenu,
} from './Header.styled';
import { languages } from '../../utils/constants/languages';
import { mode } from '../../utils/constants/mode';
import GlobalSearch from './globalSearch/GlobalSearch';

function renderLanguagesMenu(languages) {
  return languages.map((language, index) => (
    <LanguagesMenuItem key={index} value={language}>
      {language}
    </LanguagesMenuItem>
  ));
}

//lookup map
function renderHeaderTitles(t) {
  return {
    '/search': t('HEADER.SEARCH'),
    '/dashboard': t('HEADER.DASHBOARD'),
    '/transactions': t('HEADER.TRANSACTIONS'),
    '/accounts': t('HEADER.ACCOUNTS'),
    '/newTransaction': t('HEADER.NEW_TRANSACTION'),
    '/categories': t('HEADER.CATEGORIES'),
    '/analysis': t('HEADER.CASH_FLOW'),
  };
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
  const [headerTitle, setHeaderTitle] = useState('');
  const [id, setId] = useState('');
  const [username, setUsername] = useState('User');
  const [language, setLanguage] = useState(header.language);
  const [currency, setCurrency] = useState(names.USD);
  const [headerMode, setHeaderMode] = useState(header.mode);
  const { t } = useTranslation();
  const location = useLocation();
  const titles = renderHeaderTitles(t);
  const path = location.pathname.match(/\/(\w)*/)[0];

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  useEffect(() => {
    if (header.status === 'succeeded') {
      if (!header.profile) return;
      setId(header.profile.id);
      setUsername(header.profile.username);
      setCurrency(header.profile.currency);
    }
  }, [header.status, header.profile]);

  useEffect(() => {
    setHeaderTitle(titles[path]);
  }, [path, titles]);

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
          <Grid item sm={4} md={3} lg={3}>
            <Title>{headerTitle}</Title>
          </Grid>
          <Grid item sm={2} md={3} lg={3}>
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
                {currency === names.USD ? (
                  <Svg as={CurrencyDollarIcon} />
                ) : (
                  <Svg as={CurrencyDollarIcon} />
                )}
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
          <Grid item xs={6} sm={2} md={2} lg={2}>
            <FlexContainer>
              <Profile>
                <Svg as={AvatarIcon} />
                <Username>{username}</Username>
              </Profile>
              <LogOut>
                <Svg as={LogoutIcon} />
              </LogOut>
            </FlexContainer>
          </Grid>
        </Grid>
      </HeaderContainer>
    </>
  );
}
