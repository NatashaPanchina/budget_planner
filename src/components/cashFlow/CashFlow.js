import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchAccountsData,
  fetchCategoriesData,
  fetchTransactionsData,
} from '../../actions/Actions';
import TransactionsAnalysis from './transactions/TransactionsAnalysis';

export default function Analysis() {
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

  return categories.status === 'loading' ||
    accounts.status === 'loading' ||
    transactions.status === 'loading' ? (
    <div>Loading</div>
  ) : (
    <TransactionsAnalysis
      transactions={transactionsData}
      categories={categoriesData}
      accounts={accountsData}
    />
  );
}
