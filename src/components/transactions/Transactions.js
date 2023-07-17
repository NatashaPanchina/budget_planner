import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AccountsSlider from './slider/AccountsSlider.js';
import TransactionsList from './list/TransactionsList.js';
import {
  fetchTransactionsData,
  fetchAccountsData,
  fetchCategoriesData,
  deleteTransaction,
  editAccount,
} from '../../actions/Actions';

import { ReactComponent as FilterIcon } from '../../assets/icons/shared/filter.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/shared/calendar.svg';

import {
  Container,
  Header,
  HeaderTitle,
  MainInfoContainer,
} from './Transactions.styled.js';
import { Filter, FilterSvg } from '../../theme/global.js';

export default function Transactions() {
  const transactions = useSelector((state) => state.transactions);
  const accounts = useSelector((state) => state.accounts);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const [accountsData, setAccountsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchAccountsData());
    dispatch(fetchCategoriesData());
    dispatch(fetchTransactionsData());
  }, [dispatch]);

  useEffect(() => {
    if (accounts.status === 'succeeded') {
      setAccountsData(accounts.accounts);
    }
    if (categories.status === 'succeeded') {
      setCategoriesData(categories.categories);
    }
    if (transactions.status === 'succeeded') {
      setTransactionsData(transactions.transactions);
    }
  }, [
    accounts.status,
    categories.status,
    transactions.status,
    accounts.accounts,
    categories.categories,
    transactions.transactions,
  ]);

  return accounts.status === 'loading' ||
    categories.status === 'loading' ||
    transactions.status === 'loading' ? (
    <div>Loading</div>
  ) : (
    <Container>
      <AccountsSlider transactions={transactionsData} accounts={accountsData} />
      <MainInfoContainer>
        <Header>
          <HeaderTitle>{t('TRANSACTIONS.TRANSACTIONS_HEADER')}</HeaderTitle>
          <Filter>
            <FilterSvg as={FilterIcon} />
            {t('TRANSACTIONS.FILTER_KEY')}
          </Filter>
          <Filter>
            <FilterSvg as={CalendarIcon} />
            {t('TRANSACTIONS.FILTER_DATE')}
          </Filter>
        </Header>
        <TransactionsList
          transactions={transactionsData}
          accounts={accountsData}
          categories={categoriesData}
          deleteTransaction={deleteTransaction}
          editAccount={editAccount}
        />
      </MainInfoContainer>
    </Container>
  );
}
