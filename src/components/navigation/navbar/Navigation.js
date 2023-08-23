import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { pages } from '../../../utils/constants/pages';

import { ReactComponent as DashboardIcon } from '../../../assets/icons/navigation/mobDashboard.svg';
import { ReactComponent as TransactionsIcon } from '../../../assets/icons/navigation/transactions.svg';
import { ReactComponent as CashIcon } from '../../../assets/icons/navigation/cash.svg';
import { ReactComponent as NewTransactionIcon } from '../../../assets/icons/navigation/newTransaction.svg';
import { ReactComponent as MobNewTransactionIcon } from '../../../assets/icons/navigation/mobNewTransaction.svg';
import { ReactComponent as CategoriesIcon } from '../../../assets/icons/navigation/categories.svg';
import { ReactComponent as BudgetIcon } from '../../../assets/icons/navigation/budget.svg';
import { ReactComponent as AnalysisIcon } from '../../../assets/icons/navigation/analysis.svg';
import { ReactComponent as SettingsIcon } from '../../../assets/icons/navigation/settings.svg';
import { ReactComponent as MenuIcon } from '../../../assets/icons/navigation/menu.svg';
import { ReactComponent as AvatarIcon } from '../../../assets/icons/shared/avatar.svg';
import {
  NavigationContainer,
  Nav,
  LinkContainer,
  Svg,
  NewTransactionSvg,
  Link,
  LinkTitle,
  SettingsLinkContainer,
  SettingsLink,
  NewTransactionLinkContainer,
  NewTransactionButton,
  MobileNavigationContainer,
  Profile,
  ProfileSvg,
  HiddenLinkContainer,
  MobMenu,
} from './Navigation.styled';
import MobNavigation from './MobNavigation';
import { CustomTooltip } from '../../../theme/global';
import { animated, useTransition } from '@react-spring/web';
import Menu from '../menu/Menu';
import { useSelector } from 'react-redux';

const animatedMenu = (style, username, setToggleMenu) => {
  return (
    <animated.div
      style={{
        position: 'fixed',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
        width: `100%`,
        zIndex: 200,
        ...style,
      }}
    >
      <Menu username={username} setToggleMenu={setToggleMenu} />
    </animated.div>
  );
};

export default function Navigation() {
  const { t } = useTranslation();
  const header = useSelector((state) => state.header);
  const [toggleMenu, setToggleMenu] = useState(false);
  const transitions = useTransition(toggleMenu, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: {
      opacity: 0,
      transform: 'translate3d(100%,0,0)',
      config: { duration: 100 },
    },
  });
  const mobRef = useRef(null);
  return (
    <>
      <NavigationContainer>
        <Nav>
          <Profile>
            <ProfileSvg as={AvatarIcon} />
          </Profile>
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
            <HiddenLinkContainer>
              <Link to={pages.cash.main}>
                <Svg as={CashIcon} />
                <LinkTitle>{t('NAVIGATION.CASH')}</LinkTitle>
              </Link>
            </HiddenLinkContainer>
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
            <NewTransactionSvg as={MobNewTransactionIcon} />
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
            <HiddenLinkContainer>
              <Link to={pages.categories.main}>
                <Svg as={CategoriesIcon} />
                <LinkTitle>{t('NAVIGATION.CATEGORIES')}</LinkTitle>
              </Link>
            </HiddenLinkContainer>
          </CustomTooltip>
          <CustomTooltip title={t('NAVIGATION.BUDGET')} arrow placement="right">
            <HiddenLinkContainer>
              <Link to="/">
                <Svg as={BudgetIcon} />
                <LinkTitle>{t('NAVIGATION.BUDGET')}</LinkTitle>
              </Link>
            </HiddenLinkContainer>
          </CustomTooltip>
          <CustomTooltip
            title={t('NAVIGATION.ANALYSIS')}
            arrow
            placement="right"
          >
            <LinkContainer>
              <Link to={pages.analysis.main}>
                <Svg as={AnalysisIcon} />
                <LinkTitle>{t('NAVIGATION.ANALYSIS')}</LinkTitle>
              </Link>
            </LinkContainer>
          </CustomTooltip>
          <CustomTooltip
            title={t('NAVIGATION.SETTINGS')}
            arrow
            placement="right"
          >
            <SettingsLinkContainer>
              <SettingsLink to="/">
                <Svg as={SettingsIcon} />
                <LinkTitle>{t('NAVIGATION.SETTINGS')}</LinkTitle>
              </SettingsLink>
            </SettingsLinkContainer>
          </CustomTooltip>
          <MobMenu
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
          >
            <Svg as={MenuIcon} />
          </MobMenu>
        </Nav>
      </NavigationContainer>
      {transitions((style, toggleMenu) => {
        if (toggleMenu)
          return animatedMenu(style, header.profile.username, setToggleMenu);
      })}
    </>
  );
}
