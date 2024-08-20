import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { pages } from '../../../utils/constants/pages';

import { ReactComponent as TransactionsIcon } from '../../../assets/icons/navigation/transactions.svg';
import { ReactComponent as AccountsIcon } from '../../../assets/icons/navigation/accounts.svg';
import { ReactComponent as NewTransactionIcon } from '../../../assets/icons/navigation/newTransaction.svg';
import { ReactComponent as MobNewTransactionIcon } from '../../../assets/icons/navigation/mobNewTransaction.svg';
import { ReactComponent as CategoriesIcon } from '../../../assets/icons/navigation/categories.svg';
import { ReactComponent as BudgetIcon } from '../../../assets/icons/navigation/budget.svg';
import { ReactComponent as CashFlowIcon } from '../../../assets/icons/navigation/cashFlow.svg';
import { ReactComponent as SettingsIcon } from '../../../assets/icons/navigation/settings.svg';
import { ReactComponent as MenuIcon } from '../../../assets/icons/navigation/menu.svg';
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
  HiddenLinkContainer,
  MobMenu,
  NewTransactionlink,
} from './Navigation.styled';
import MobNavigation from './MobNavigation';
import { CustomTooltip, InfoDialog } from '../../../theme/global';
import { animated, useTransition } from '@react-spring/web';
import Menu from '../menu/Menu';
import { useSelector } from 'react-redux';
import NewTransaction from '../../newTransaction/NewTransaction';

const animatedMenu = (style, username, email, avatar, setToggleMenu) => {
  return (
    <animated.div
      style={{
        position: 'fixed',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
        width: `100%`,
        zIndex: 500,
        ...style,
      }}
    >
      <Menu
        username={username}
        email={email}
        avatar={avatar}
        setToggleMenu={setToggleMenu}
      />
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
  const [transactionType, setTransactionType] = useState('expense');
  const [openDialog, setOpenDialog] = useState(false);
  const mobRef = useRef(null);

  return (
    <>
      <NavigationContainer>
        <Nav>
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
          <CustomTooltip
            title={t('NAVIGATION.ACCOUNTS')}
            arrow
            placement="right"
          >
            <LinkContainer>
              <Link to={pages.accounts.main}>
                <Svg as={AccountsIcon} />
                <LinkTitle>{t('NAVIGATION.ACCOUNTS')}</LinkTitle>
              </Link>
            </LinkContainer>
          </CustomTooltip>
          <CustomTooltip
            title={t('NAVIGATION.NEW_TRANSACTION')}
            arrow
            placement="right"
          >
            <NewTransactionLinkContainer onClick={() => setOpenDialog(true)}>
              <NewTransactionlink>
                <NewTransactionSvg as={NewTransactionIcon} />
                <LinkTitle>{t('NAVIGATION.NEW_TRANSACTION')}</LinkTitle>
              </NewTransactionlink>
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
            <MobNavigation
              setTransactionType={setTransactionType}
              setOpenDialog={setOpenDialog}
            />
          </MobileNavigationContainer>
          <InfoDialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <NewTransaction
              setOpenDialog={setOpenDialog}
              type={transactionType}
            />
          </InfoDialog>
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
          <CustomTooltip title={t('NAVIGATION.GOALS')} arrow placement="right">
            <HiddenLinkContainer>
              <Link to={pages.goals.main}>
                <Svg as={BudgetIcon} />
                <LinkTitle>{t('NAVIGATION.GOALS')}</LinkTitle>
              </Link>
            </HiddenLinkContainer>
          </CustomTooltip>
          <CustomTooltip
            title={t('NAVIGATION.CASH_FLOW')}
            arrow
            placement="right"
          >
            <LinkContainer>
              <Link to={pages.analysis.main}>
                <Svg as={CashFlowIcon} />
                <LinkTitle>{t('NAVIGATION.CASH_FLOW')}</LinkTitle>
              </Link>
            </LinkContainer>
          </CustomTooltip>
          <CustomTooltip
            title={t('NAVIGATION.SETTINGS')}
            arrow
            placement="right"
          >
            <SettingsLinkContainer>
              <SettingsLink to={pages.settings.main}>
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
        const displayName = header.profile
          ? header.profile.displayName
          : 'Anonymous';
        const email = header.profile.email ? header.profile.email : '';
        const avatar = header.profile.photoURL;
        if (toggleMenu)
          return animatedMenu(style, displayName, email, avatar, setToggleMenu);
      })}
    </>
  );
}
