import { Navigate, createBrowserRouter } from 'react-router-dom';
import Root from '../components/root/Root';
import React from 'react';
import GlobalSearchPage from '../components/header/globalSearch/page/GlobalSearchPage';
import TransactionsSearch from '../components/header/globalSearch/transactions/TransactionsSearch';
import CategoriesSearch from '../components/header/globalSearch/categories/CategoriesSearch';
import AccountsSearch from '../components/header/globalSearch/accounts/AccountsSearch';
import Dashboard from '../components/dashboard/Dashboard';
import Transactions from '../components/transactions/Transactions';
import Accounts from '../components/accounts/Accounts';
import AccountsTrash from '../components/accounts/trash/AccountsTrash';
import Categories from '../components/categories/Categories';
import CategoriesTrash from '../components/categories/trash/CategoriesTrash';
import CashFlow from '../components/cashFlow/CashFlow';
import Settings from '../components/settings/Settings';
import Account from '../components/settings/options/account/Account';
import Devices from '../components/settings/options/devices/Devices';
import Security from '../components/settings/options/security/Security';
import Appearance from '../components/settings/options/appearance/Appearance';
import Language from '../components/settings/options/language/Language';
import MainCurrency from '../components/settings/options/mainCurrency/MainCurrency';
import Notifications from '../components/settings/options/notifications/Notifications';
import DataBackup from '../components/settings/options/databackup/DataBackup';
import StorageUsage from '../components/settings/options/storageusage/StorageUsage';
import Signup from '../components/auth/Signup';
import SelectCurrency from '../components/auth/currency/SelectCurrency';
import EnterName from '../components/auth/entername/EnterName';
import Signin from '../components/auth/Signin';
import PrivateRoute from './PrivateRoute';
import DeletingAccount from '../components/settings/options/account/DeletingAccount';
import Demo from '../components/settings/options/demo/Demo';
import LoadDemo from '../components/auth/demo/LoadDemo';
import Goals from '../components/goals/Goals';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute Component={Root} />,
    children: [
      {
        path: '/',
        element: <Navigate replace to="transactions/all/all" />,
      },
      {
        path: '/search/:query',
        element: <GlobalSearchPage />,
      },
      {
        path: '/search/transactions/:query',
        element: <TransactionsSearch />,
      },
      {
        path: '/search/categories/:query',
        element: <CategoriesSearch />,
      },
      {
        path: '/search/accounts/:query',
        element: <AccountsSearch />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'transactions',
        element: <Navigate replace to="all/all" />,
      },
      {
        path: 'transactions/:filterType/:filterAccount',
        element: <Transactions />,
      },
      {
        path: 'accounts',
        element: <Navigate replace to="all" />,
      },
      {
        path: 'accounts/:filterCash',
        element: <Accounts />,
      },
      {
        path: 'accounts/trash',
        element: <Navigate replace to="all" />,
      },
      {
        path: 'accounts/trash/:filterCash',
        element: <AccountsTrash />,
      },
      {
        path: 'categories',
        element: <Navigate replace to="all" />,
      },
      {
        path: 'categories/:filterType',
        element: <Categories />,
      },
      {
        path: 'categories/trash',
        element: <Navigate replace to="all" />,
      },
      {
        path: 'categories/trash/:filterType',
        element: <CategoriesTrash />,
      },
      {
        path: '/goals',
        element: <Goals />,
      },
      {
        path: 'analysis',
        element: <CashFlow />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'settings/account',
        element: <Account />,
      },
      {
        path: 'settings/devices',
        element: <Devices />,
      },
      {
        path: 'settings/dataBackup',
        element: <DataBackup />,
      },
      {
        path: 'settings/security',
        element: <Security />,
      },
      {
        path: 'settings/appearance',
        element: <Appearance />,
      },
      {
        path: 'settings/language',
        element: <Language />,
      },
      {
        path: 'settings/mainCurrency',
        element: <MainCurrency />,
      },
      {
        path: 'settings/notifications',
        element: <Notifications />,
      },
      {
        path: 'settings/storageUsage',
        element: <StorageUsage />,
      },
      {
        path: 'settings/demo',
        element: <Demo />,
      },
    ],
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/selectMainCurrency',
    element: <SelectCurrency />,
  },
  {
    path: '/enterName',
    element: <EnterName />,
  },
  {
    path: '/loadingDemo',
    element: <LoadDemo />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/accountDeleting',
    element: <DeletingAccount />,
  },
  {
    path: '*',
    element: <Navigate replace to="transactions/all/all" />,
  },
]);
