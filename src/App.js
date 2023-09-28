import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './locales';
import { darkTheme, lightTheme } from './theme';
import Root from './components/root/Root';
import Transactions from './components/transactions/Transactions';
import InfoTransaction from './components/transactions/infoTransaction/InfoTransaction';
import Accounts from './components/accounts/Accounts';
import NewTransaction from './components/newTransaction/NewTransaction';
import Categories from './components/categories/Categories';
import CategoriesTrash from './components/categories/trash/CategoriesTrash';
import AddCategory from './components/categories/addCategory/AddCategory';
import AddAccount from './components/accounts/addAccount/AddAccount';
import InfoAccount from './components/accounts/infoAccount/InfoAccount';
import InfoCategory from './components/categories/infoCategory/InfoCategory';
import CashFlow from './components/cashFlow/CashFlow';
import AccountsTrash from './components/accounts/trash/AccountsTrash';
import Dashboard from './components/dashboard/Dashboard';
import { mode } from './utils/constants/mode';
import { ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { inputGlobalStyles } from './theme/global';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Navigate replace to="dashboard" />,
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
        path: 'transactions/infoTransaction/:transactionId',
        element: <InfoTransaction />,
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
        path: 'accounts/addAccount/:accountType',
        element: <AddAccount />,
      },
      {
        path: 'accounts/infoAccount/:accountId',
        element: <InfoAccount />,
      },
      {
        path: 'newTransaction',
        element: <Navigate replace to="expense/all" />,
      },
      {
        path: 'newTransaction/:transactionType/:transactionAccount',
        element: <NewTransaction />,
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
        path: 'categories/addCategory/:categoryType',
        element: <AddCategory />,
      },
      {
        path: 'categories/infoCategory/:categoryId',
        element: <InfoCategory />,
      },
      {
        path: 'analysis',
        element: <CashFlow />,
      },
    ],
  },
]);

function App() {
  const { i18n } = useTranslation();
  const header = useSelector((state) => state.header);
  const { language } = header;

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <ThemeProvider
      theme={
        header.mode === mode.light
          ? createTheme(lightTheme)
          : createTheme(darkTheme)
      }
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {inputGlobalStyles}
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
