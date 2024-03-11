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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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
        path: 'analysis',
        element: <CashFlow />,
      },
      {
        path: 'settings',
        element: <Settings />,
        children: [
          {
            path: 'account',
            element: <Account />,
          },
          {
            path: 'devices',
            element: <Devices />,
          },
          {
            path: 'security',
            element: <Security />,
          },
          {
            path: 'appearance',
            element: <Appearance />,
          },
          {
            path: 'language',
            element: <Language />,
          },
          {
            path: 'mainCurrency',
            element: <MainCurrency />,
          },
          {
            path: 'notifications',
            element: <Notifications />,
          },
          {
            path: 'dataBackup',
            element: <DataBackup />,
          },
          {
            path: 'storageUsage',
            element: <StorageUsage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate replace to="transactions/all/all" />,
  },
]);
