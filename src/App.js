import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './locales';

import { darkTheme, lightTheme } from './theme';
import { GlobalStyles } from './theme/global';
import Root from './components/root/Root';
import Transactions from './components/transactions/Transactions';
import InfoTransaction from './components/transactions/infoTransaction/InfoTransaction';
import Cash from './components/cash/Cash';
import NewTransaction from './components/newTransaction/NewTransaction';
import Categories from './components/categories/Categories';
import CategoriesTrash from './components/categories/trash/CategoriesTrash';
import AddCategory from './components/categories/addCategory/AddCategory';
import AddAccount from './components/cash/addAccount/AddAccount';
import InfoAccount from './components/cash/infoAccount/InfoAccount';
import InfoCategory from './components/categories/infoCategory/InfoCategory';
import Analysis from './components/analysis/Analysis';
import AccountsTrash from './components/cash/trash/AccountsTrash';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Navigate replace to="analysis" />,
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
        path: 'cash',
        element: <Navigate replace to="all" />,
      },
      {
        path: 'cash/:filterCash',
        element: <Cash />,
      },
      {
        path: 'cash/trash',
        element: <Navigate replace to="all" />,
      },
      {
        path: 'cash/trash/:filterType',
        element: <AccountsTrash />,
      },
      {
        path: 'cash/addAccount/:accountType',
        element: <AddAccount />,
      },
      {
        path: 'cash/infoAccount/:accountId',
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
        element: <Analysis />,
      },
    ],
  },
]);

function initialMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function App() {
  const header = useSelector((state) => state.header);
  const [mode, setMode] = useState(initialMode());

  useEffect(() => {
    if (header.status === 'succeeded') {
      if (!header.profile) return;
      setMode(header.profile.mode);
    }
  }, [header.profile, header.status]);

  return (
    <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
