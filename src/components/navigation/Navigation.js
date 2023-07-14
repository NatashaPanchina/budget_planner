import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { pages } from '../../utils/constants/pages';

import { ReactComponent as LogoIcon } from '../../assets/icons/navigation/logo.svg';
import { ReactComponent as TransactionsIcon } from '../../assets/icons/navigation/transactions.svg';
import { ReactComponent as CashIcon } from '../../assets/icons/navigation/cash.svg';
import { ReactComponent as NewTransactionIcon } from '../../assets/icons/navigation/newTransaction.svg';
import { ReactComponent as CategoriesIcon } from '../../assets/icons/navigation/categories.svg';
import { ReactComponent as AnalysisIcon } from '../../assets/icons/navigation/analysis.svg';
import { ReactComponent as MoreIcon } from '../../assets/icons/navigation/more.svg';

import { styled } from 'styled-components';

const NavigationContainer = styled.div((props) => ({
  width: '17%',
  height: '100vh',
  position: 'fixed',
  top: 0,
  zIndex: 10,
  borderRight: `1px solid ${props.theme.colors.border.ordinary}`,
  backgroundColor: props.theme.colors.background.primary,
}));

const LogoContainer = styled.div((props) => ({
  display: 'flex',
  alignItems: 'center',
  height: 56,
  background: `linear-gradient(109.86deg, ${props.theme.colors.main.purple} -2.35%, ${props.theme.colors.main.violet} 81.35%)`,
}));

const Logo = styled.svg(() => ({
  height: 45,
}));

const Nav = styled.nav((props) => ({
  width: '90%',
  marginTop: props.theme.spacing(10),
  marginLeft: 'auto',
  marginRight: 'auto',
  fontSize: '0.9375rem',
  '& div:nth-child(3) a:hover svg path': {
    fill: props.theme.colors.white,
  },
  '& div:nth-child(3) a.active svg path': {
    fill: props.theme.colors.white,
  },
}));

const LinkContainer = styled.div(() => ({
  height: 50,
}));

const Svg = styled.svg((props) => ({
  width: 23,
  height: 23,
  marginRight: props.theme.spacing(3),
  marginLeft: props.theme.spacing(3),
  fill: 'inherit',
  '& path': {
    fill: 'inherit',
  },
}));

const NewTransactionSvg = styled.svg((props) => ({
  width: 33,
  marginLeft: props.theme.spacing(2),
  marginRight: props.theme.spacing(2),
  filter: 'drop-shadow(0px 2px 4px rgba(109, 115, 255, 0.5))',
  '& path': {
    fill: props.theme.colors.white,
  },
  '&:hover g path': {
    fill: props.theme.colors.white,
  },
}));

const Link = styled(NavLink)((props) => ({
  display: 'flex',
  color: props.theme.colors.text.darker,
  fill: props.theme.colors.text.darker,
  height: 45,
  width: 'inherit',
  alignItems: 'center',
  '&:hover': {
    color: props.theme.colors.main.violet,
    fill: props.theme.colors.main.violet,
    backgroundColor: props.theme.colors.background.navigation,
    borderRadius: props.theme.borderRadius,
  },
  '&.active': {
    color: props.theme.colors.main.violet,
    fill: props.theme.colors.main.violet,
    backgroundColor: props.theme.colors.background.navigation,
    borderRadius: props.theme.borderRadius,
  },
}));

const MoreContainer = styled.div((props) => ({
  display: 'flex',
  color: props.theme.colors.text.darker,
  alignItems: 'center',
}));

export default function Navigation() {
  const { t } = useTranslation();
  return (
    <NavigationContainer>
      <NavLink to={pages.home}>
        <LogoContainer>
          <Logo as={LogoIcon} />
        </LogoContainer>
      </NavLink>
      <Nav>
        <LinkContainer>
          <Link to={pages.transactions.main}>
            <Svg as={TransactionsIcon} />
            {t('NAVIGATION.TRANSACTIONS')}
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link to={pages.cash.main}>
            <Svg as={CashIcon} />
            {t('NAVIGATION.CASH')}
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link to={pages.newTransaction.main}>
            <NewTransactionSvg as={NewTransactionIcon} />
            {t('NAVIGATION.NEW_TRANSACTION')}
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link to={pages.categories.main}>
            <Svg as={CategoriesIcon} />
            {t('NAVIGATION.CATEGORIES')}
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link to={pages.analysis.main}>
            <Svg as={AnalysisIcon} />
            {t('NAVIGATION.ANALYSIS')}
          </Link>
        </LinkContainer>
        <MoreContainer>
          <Svg as={MoreIcon} />
          {t('NAVIGATION.MORE')}
        </MoreContainer>
      </Nav>
    </NavigationContainer>
  );
}
