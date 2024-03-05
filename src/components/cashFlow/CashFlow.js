import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchAccountsData,
  fetchCategoriesData,
  fetchTransactionsData,
} from '../../actions/Actions';
import TransactionsAnalysis from './transactions/TransactionsAnalysis';
import Loading from '../loading/Loading';
import { names } from '../../utils/constants/currencies';

export default function CashFlow() {
  const header = useSelector((state) => state.header);
  const categories = useSelector((state) => state.categories);
  const accounts = useSelector((state) => state.accounts);
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  const [categoriesData, setCategoriesData] = useState([]);
  const [accountsData, setAccountsData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    dispatch(fetchCategoriesData());
    dispatch(fetchAccountsData());
    dispatch(fetchTransactionsData());
  }, [dispatch]);

  useEffect(() => {
    if (categories.status === 'succeeded')
      setCategoriesData(categories.categories);
    if (accounts.status === 'succeeded') setAccountsData(accounts.accounts);
    if (transactions.status === 'succeeded')
      setTransactionsData(transactions.transactions);
  }, [
    categories.status,
    accounts.status,
    transactions.status,
    categories.categories,
    accounts.accounts,
    transactions.transactions,
  ]);

  return header.status === 'loading' ||
    categories.status === 'loading' ||
    accounts.status === 'loading' ||
    transactions.status === 'loading' ? (
    <Loading />
  ) : (
    <TransactionsAnalysis
      transactions={transactionsData}
      categories={categoriesData}
      accounts={accountsData}
      mainCurrency={header.profile ? header.profile.currency : names.USD}
      language={header.language}
    />
  );
}
