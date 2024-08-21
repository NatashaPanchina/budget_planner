import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

import defaultAvatar from '../../../assets/imgs/avatar-girl-1.png';
import { ReactComponent as LogoutIcon } from '../../../assets/icons/shared/logOut.svg';
import { ReactComponent as ProfileIcon } from '../../../assets/icons/navigation/mobProfile.svg';
import { ReactComponent as SettingsIcon } from '../../../assets/icons/navigation/mobSettings.svg';
import { ReactComponent as CurrencyIcon } from '../../../assets/icons/navigation/mobCurrency.svg';
import { ReactComponent as TransactionsIcon } from '../../../assets/icons/navigation/mobTransactions.svg';
import { ReactComponent as BudgetIcon } from '../../../assets/icons/navigation/mobBudget.svg';
import { ReactComponent as AccountsIcon } from '../../../assets/icons/navigation/mobAccounts.svg';
import { ReactComponent as CategoriesIcon } from '../../../assets/icons/navigation/mobCategories.svg';
import { ReactComponent as CashFlowIcon } from '../../../assets/icons/navigation/mobCashFlow.svg';
import { ReactComponent as DemoIcon } from '../../../assets/icons/navigation/mobDemo.svg';
import { ReactComponent as HelpIcon } from '../../../assets/icons/navigation/mobHelp.svg';
import { ReactComponent as AboutIcon } from '../../../assets/icons/navigation/mobAbout.svg';
import { ReactComponent as GithubIcon } from '../../../assets/icons/shared/github.svg';
import { ReactComponent as BackIcon } from '../../../assets/icons/shared/back.svg';
import { pages } from '../../../utils/constants/pages';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material';
import { logOut } from '../../auth/utils';
import { useDispatch } from 'react-redux';

const FlexContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const Container = styled('div')((props) => ({
  backgroundColor: props.theme.colors.background.body,
  width: `calc(100% - ${props.theme.spacing(2 * 2)})`,
  padding: props.theme.spacing(2),
}));

const Title = styled(FlexContainer)(() => ({
  height: 56,
  width: '100%',
  justifyContent: 'center',
  fontWeight: 500,
  fontSize: '1.3rem',
}));

const ProfileContainer = styled(FlexContainer)(() => ({
  height: 100,
  width: '100%',
}));

const Profile = styled(FlexContainer)((props) => ({
  display: 'flex',
  paddingRight: props.theme.spacing(4),
}));

const LogOut = styled(FlexContainer)(() => ({
  cursor: 'pointer',
  marginLeft: 'auto',
}));

const LogOutSvg = styled('svg')(() => ({
  height: 35,
  width: 35,
}));

const GithubSvg = styled('svg')(() => ({
  height: 30,
  width: 30,
}));

const ProfilePicture = styled('img')((props) => ({
  height: 60,
  width: 60,
  marginRight: props.theme.spacing(3),
}));

const Svg = styled('svg')(() => ({
  height: 45,
  width: 45,
}));

const BackSvg = styled('svg')(() => ({
  height: 45,
  width: 45,
  position: 'absolute',
  left: 0,
}));

const ItemsContainer = styled(FlexContainer)(() => ({
  justifyContent: 'space-between',
  flexWrap: 'wrap',
}));

const ItemLink = styled(Link)((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  marginBottom: props.theme.spacing(5),
  backgroundColor: props.theme.colors.background.primary,
  borderRadius: props.theme.borderRadius,
  boxShadow: `0px 4px 10px ${props.theme.colors.boxShadow}`,
  width: '47%',
  height: 120,
  color: props.theme.colors.text.primary,
}));

const Contacts = styled(FlexContainer)(() => ({
  justifyContent: 'center',
  height: 100,
  width: '100%',
}));

const Email = styled('div')((props) => ({
  fontSize: '0.9rem',
  color: props.theme.colors.text.darker,
}));

function Menu({ username, email, avatar, setToggleMenu }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container>
      <Title>
        <BackSvg as={BackIcon} onClick={() => setToggleMenu(false)} />
        {t('MENU.MENU')}
      </Title>
      <ProfileContainer>
        <Profile>
          {avatar ? (
            <ProfilePicture alt="profile-picture" src={avatar} />
          ) : (
            <ProfilePicture alt="profile-picture" src={defaultAvatar} />
          )}
          <div>
            <div>{username}</div>
            <Email>{email}</Email>
          </div>
        </Profile>
        <LogOut
          onClick={() => {
            logOut(dispatch, navigate);
          }}
        >
          <LogOutSvg as={LogoutIcon} />
        </LogOut>
      </ProfileContainer>
      <ItemsContainer>
        <ItemLink to={pages.profile} onClick={() => setToggleMenu(false)}>
          <div>
            <div>
              <Svg as={ProfileIcon} />
            </div>
            <div>{t('MENU.PROFILE')}</div>
          </div>
        </ItemLink>
        <ItemLink to={pages.currency} onClick={() => setToggleMenu(false)}>
          <div>
            <div>
              <Svg as={CurrencyIcon} />
            </div>
            <div>{t('MENU.CURRENCY')}</div>
          </div>
        </ItemLink>
        <ItemLink
          to={pages.transactions.main}
          onClick={() => setToggleMenu(false)}
        >
          <div>
            <div>
              <Svg as={TransactionsIcon} />
            </div>
            <div>{t('MENU.TRANSACTIONS')}</div>
          </div>
        </ItemLink>
        <ItemLink to={pages.accounts.all} onClick={() => setToggleMenu(false)}>
          <div>
            <div>
              <Svg as={AccountsIcon} />
            </div>
            <div>{t('MENU.ACCOUNTS')}</div>
          </div>
        </ItemLink>
        <ItemLink
          to={pages.categories.all}
          onClick={() => setToggleMenu(false)}
        >
          <div>
            <div>
              <Svg as={CategoriesIcon} />
            </div>
            <div>{t('MENU.CATEGORIES')}</div>
          </div>
        </ItemLink>
        <ItemLink to={pages.goals.main} onClick={() => setToggleMenu(false)}>
          <div>
            <div>
              <Svg as={BudgetIcon} />
            </div>
            <div>{t('MENU.GOALS')}</div>
          </div>
        </ItemLink>
        <ItemLink to={pages.analysis.main} onClick={() => setToggleMenu(false)}>
          <div>
            <div>
              <Svg as={CashFlowIcon} />
            </div>
            <div>{t('MENU.REPORTS')}</div>
          </div>
        </ItemLink>
        <ItemLink to={pages.settings.main} onClick={() => setToggleMenu(false)}>
          <div>
            <div>
              <Svg as={SettingsIcon} />
            </div>
            <div>{t('MENU.SETTINGS')}</div>
          </div>
        </ItemLink>
        <ItemLink to={pages.settings.demo} onClick={() => setToggleMenu(false)}>
          <div>
            <div>
              <Svg as={DemoIcon} />
            </div>
            <div>{t('MENU.DEMO')}</div>
          </div>
        </ItemLink>
        <ItemLink to="/" onClick={() => setToggleMenu(false)}>
          <div>
            <div>
              <Svg as={HelpIcon} />
            </div>
            <div>{t('MENU.HELP')}</div>
          </div>
        </ItemLink>
        <ItemLink to="/" onClick={() => setToggleMenu(false)}>
          <div>
            <div>
              <Svg as={AboutIcon} />
            </div>
            <div>{t('MENU.ABOUT_APP')}</div>
          </div>
        </ItemLink>
      </ItemsContainer>
      <Contacts>
        <Link to="https://github.com/NatashaPanchina/budget_planner/tree/main">
          <GithubSvg as={GithubIcon} />
        </Link>
      </Contacts>
    </Container>
  );
}

Menu.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  avatar: PropTypes.string,
  setToggleMenu: PropTypes.func,
};

export default Menu;
