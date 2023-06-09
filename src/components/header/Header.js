import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { idbAddItem } from '../../indexedDB/IndexedDB';
import {
  fetchProfileData,
  changeLanguage,
  changeMode,
} from '../../actions/Actions';
import { hideElement, useOutsideClick } from '../../hooks/useOutsideClick';

import { ReactComponent as CurrencyDollarIcon } from '../../assets/icons/shared/currencyDollar.svg';
import { ReactComponent as LightModeIcon } from '../../assets/icons/shared/lightMode.svg';
import { ReactComponent as DarkModeIcon } from '../../assets/icons/shared/darkMode.svg';
import searchIcon from '../../assets/icons/shared/globalSearch.svg';
import { ReactComponent as LogoutIcon } from '../../assets/icons/shared/logOut.svg';

import { styled } from 'styled-components';

const HeaderContainer = styled.div((props) => ({
  width: '83%',
  height: 56,
  marginLeft: '17%',
  display: 'flex',
  position: 'fixed',
  zIndex: 10,
  top: 0,
  alignItems: 'center',
  backgroundColor: props.theme.colors.background.primary,
  borderBottom: `1px solid ${props.theme.colors.border.ordinary}`,
}));

const Title = styled.div(() => ({
  fontWeight: 400,
  fontSize: '1.25rem',
  paddingLeft: '5%',
  width: '30%',
}));

const GlobalSearch = styled.div((props) => ({
  height: 30,
  paddingLeft: props.theme.spacing(1),
  width: '25%',
  backgroundColor: props.theme.colors.background.body,
  borderRadius: props.theme.borderRadius,
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.875rem',
}));

const GlobalSearchInput = styled.input((props) => ({
  backgroundColor: props.theme.colors.background.body,
  color: props.theme.colors.text.primary,
  width: 'calc(100% - 20px)',
}));

const GlobalSearchImg = styled.img((props) => ({
  paddingLeft: props.theme.spacing(1),
  paddingRight: props.theme.spacing(1),
  marginLeft: 'auto',
  height: 20,
}));

const Container = styled.div((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '5.5%',
  cursor: 'pointer',
  color: props.theme.colors.text.darker,
}));

const CurrentLng = styled.div((props) => ({
  '&:hover': {
    color: props.theme.colors.text.primary,
  },
}));

const LanguagesMenu = styled.div((props) => ({
  position: 'absolute',
  top: 56,
  zIndex: 10,
  backgroundColor: props.theme.colors.background.primary,
  padding: props.theme.spacing(2),
  border: `1px solid ${props.theme.colors.border.ordinary}`,
  cursor: 'pointer',
}));

const LanguagesMenuItem = styled.div((props) => ({
  padding: props.theme.spacing(2),
  '&:hover': {
    color: props.theme.colors.text.primary,
  },
}));

const Svg = styled.svg(() => ({
  height: 30,
  width: 30,
}));

const SvgMode = styled(Svg)((props) => ({
  '&:hover circle': {
    fill: props.theme.colors.background.navigation,
  },
}));

const Profile = styled.div(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '20%',
}));

const LogOut = styled(Container)(() => ({
  width: '8%',
}));

//lookup map
function renderHeaderTitles(t) {
  return {
    '/transactions': t('HEADER.TRANSACTIONS'),
    '/cash': t('HEADER.CASH'),
    '/newTransaction': t('HEADER.NEW_TRANSACTION'),
    '/categories': t('HEADER.CATEGORIES'),
    '/analysis': t('HEADER.ANALYSIS'),
  };
}

function initialMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export default function Header() {
  const { status, profile } = useSelector((state) => state.header);
  const dispatch = useDispatch();

  const [headerTitle, setHeaderTitle] = useState('');
  const [id, setId] = useState('');
  const [username, setUsername] = useState('User');
  const [language, setLanguage] = useState('EN');
  const [currency, setCurrency] = useState('$');
  const [mode, setMode] = useState(initialMode());

  const { t, i18n } = useTranslation();
  const location = useLocation();
  const languageRef = useOutsideClick(hideElement);

  const titles = renderHeaderTitles(t);
  const path = location.pathname.match(/\/(\w)*/)[0];

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      if (!profile) return;
      setId(profile.id);
      setUsername(profile.username);
      setLanguage(profile.language);
      setCurrency(profile.currency);
      setMode(profile.mode);
    }
  }, [status, profile]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  useEffect(() => {
    setHeaderTitle(titles[path]);
  }, [path, titles]);

  return (
    <HeaderContainer>
      <Title>{headerTitle}</Title>
      <GlobalSearch>
        <GlobalSearchInput
          type="text"
          placeholder={t('HEADER.SEARCH_EVERYTHING')}
        ></GlobalSearchInput>
        <GlobalSearchImg src={searchIcon} alt="search" />
      </GlobalSearch>
      <Container
        onClick={(event) => {
          languageRef.current.classList.toggle('none');
          event.stopPropagation();
        }}
      >
        <CurrentLng>{language}</CurrentLng>
        <LanguagesMenu ref={languageRef} className="none">
          <LanguagesMenuItem
            onClick={() => {
              idbAddItem(
                { id, username, currency, language: 'EN', mode },
                'profile',
              );
              dispatch(changeLanguage('EN'));
            }}
          >
            EN
          </LanguagesMenuItem>
          <LanguagesMenuItem
            onClick={() => {
              idbAddItem(
                { id, username, currency, language: 'RU', mode },
                'profile',
              );
              dispatch(changeLanguage('RU'));
            }}
          >
            RU
          </LanguagesMenuItem>
        </LanguagesMenu>
      </Container>
      <Container>
        <Svg as={CurrencyDollarIcon} />
      </Container>
      <Container
        onClick={() => {
          setMode(mode === 'light' ? 'dark' : 'light');
          idbAddItem(
            {
              id,
              username,
              currency,
              language,
              mode: mode === 'light' ? 'dark' : 'light',
            },
            'profile',
          );
          dispatch(changeMode(mode === 'light' ? 'dark' : 'light'));
        }}
      >
        <SvgMode as={mode === 'light' ? LightModeIcon : DarkModeIcon} />
      </Container>
      <Profile>{username}</Profile>
      <LogOut>
        <Svg as={LogoutIcon} />
      </LogOut>
    </HeaderContainer>
  );
}
