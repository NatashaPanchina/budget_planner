import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { pages } from '../../../utils/constants/pages';

import { ReactComponent as DashboardIcon } from '../../../assets/icons/navigation/dashboard.svg';
import { ReactComponent as TransactionsIcon } from '../../../assets/icons/navigation/transactions.svg';
import { ReactComponent as CashIcon } from '../../../assets/icons/navigation/cash.svg';
import { ReactComponent as NewTransactionIcon } from '../../../assets/icons/navigation/newTransaction.svg';
import { ReactComponent as CategoriesIcon } from '../../../assets/icons/navigation/categories.svg';
import { ReactComponent as AnalysisIcon } from '../../../assets/icons/navigation/analysis.svg';
import { ReactComponent as SettingsIcon } from '../../../assets/icons/navigation/settings.svg';

import {
  NavigationContainer,
  Nav,
  LinkContainer,
  Svg,
  NewTransactionSvg,
  Link,
  LinkTitle,
  CashLinkContainer,
  SettingsLinkContainer,
  SettingsLink,
  NewTransactionLinkContainer,
  NewTransactionButton,
  MobileNavigationContainer,
} from './Navigation.styled';
import MobNavigation from './MobNavigation';
import { CustomTooltip } from '../../../theme/global';

export default function Navigation() {
  const { t } = useTranslation();
  const mobRef = useRef(null);
  return (
    <NavigationContainer>
      <Nav>
        <CustomTooltip
          title={t('NAVIGATION.DASHBOARD')}
          arrow
          placement="right"
        >
          <LinkContainer>
            <Link to={pages.dashboard}>
              <Svg as={DashboardIcon} />
              <LinkTitle>{t('NAVIGATION.DASHBOARD')}</LinkTitle>
            </Link>
          </LinkContainer>
        </CustomTooltip>
        <CustomTooltip
          title={t('NAVIGATION.TRANSACTIONS')}
          arrow
          placement="right"
        >
          <LinkContainer>
            <Link to={pages.transactions.main}>
              <Svg as={TransactionsIcon} />
              <LinkTitle>{t('NAVIGATION.TRANSACTIONS')}</LinkTitle>
            </Link>
          </LinkContainer>
        </CustomTooltip>
        <CustomTooltip title={t('NAVIGATION.CASH')} arrow placement="right">
          <CashLinkContainer>
            <Link to={pages.cash.main}>
              <Svg as={CashIcon} />
              <LinkTitle>{t('NAVIGATION.CASH')}</LinkTitle>
            </Link>
          </CashLinkContainer>
        </CustomTooltip>
        <CustomTooltip
          title={t('NAVIGATION.NEW_TRANSACTION')}
          arrow
          placement="right"
        >
          <NewTransactionLinkContainer>
            <Link to={pages.newTransaction.main}>
              <NewTransactionSvg as={NewTransactionIcon} />
              <LinkTitle>{t('NAVIGATION.NEW_TRANSACTION')}</LinkTitle>
            </Link>
          </NewTransactionLinkContainer>
        </CustomTooltip>
        <NewTransactionButton
          onClick={() => mobRef.current.classList.toggle('none')}
        >
          <NewTransactionSvg as={NewTransactionIcon} />
        </NewTransactionButton>
        <MobileNavigationContainer
          ref={mobRef}
          className="none"
          onClick={() => mobRef.current.classList.toggle('none')}
        >
          <MobNavigation />
        </MobileNavigationContainer>
        <CustomTooltip
          title={t('NAVIGATION.CATEGORIES')}
          arrow
          placement="right"
        >
          <LinkContainer>
            <Link to={pages.categories.main}>
              <Svg as={CategoriesIcon} />
              <LinkTitle>{t('NAVIGATION.CATEGORIES')}</LinkTitle>
            </Link>
          </LinkContainer>
        </CustomTooltip>
        <CustomTooltip title={t('NAVIGATION.ANALYSIS')} arrow placement="right">
          <LinkContainer>
            <Link to={pages.analysis.main}>
              <Svg as={AnalysisIcon} />
              <LinkTitle>{t('NAVIGATION.ANALYSIS')}</LinkTitle>
            </Link>
          </LinkContainer>
        </CustomTooltip>
        <CustomTooltip title={t('NAVIGATION.SETTINGS')} arrow placement="right">
          <SettingsLinkContainer>
            <SettingsLink to="/">
              <Svg as={SettingsIcon} />
              <LinkTitle>{t('NAVIGATION.SETTINGS')}</LinkTitle>
            </SettingsLink>
          </SettingsLinkContainer>
        </CustomTooltip>
      </Nav>
    </NavigationContainer>
  );
}
