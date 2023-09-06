import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

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
import { ReactComponent as MobileFilterIcon } from '../../assets/icons/shared/mobileFilter.svg';
import { ReactComponent as AddIcon } from '../../assets/icons/shared/plus.svg';

import {
  Header,
  HeaderTitle,
  CommonFilter,
  Filter,
  FilterSvg,
  AddButtonSvg,
  AddButton,
  AddSvg,
} from '../../theme/global.js';
import { useParams } from 'react-router-dom';
import { pages } from '../../utils/constants/pages.js';
import { createFilterAccount, createFiltertype } from './utils/index.js';

export default function Transactions() {
  const transactions = useSelector((state) => state.transactions);
  const accounts = useSelector((state) => state.accounts);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [accountsData, setAccountsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const { t } = useTranslation();
  const { filterAccount, filterType } = useParams();
  const transactionsType = createFiltertype(filterType);
  const transactionsAccount = createFilterAccount(accountsData, filterAccount);

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
    <>
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
        <Filter>
          <AddButton
            to={`${pages.newTransaction[transactionsType]}/${transactionsAccount}`}
          >
            <AddButtonSvg as={AddIcon} />
            {t('TRANSACTIONS.NEW_TRANSACTION')}
          </AddButton>
        </Filter>
        <CommonFilter>
          <FilterSvg as={CalendarIcon} />
          <FilterSvg as={MobileFilterIcon} />
          <AddSvg
            to={`${pages.newTransaction[transactionsType]}/${transactionsAccount}`}
          >
            <FilterSvg as={AddIcon} />
          </AddSvg>
        </CommonFilter>
      </Header>
      <Grid item xs={12} sm={12} md={3} lg={3}>
        <AccountsSlider
          transactions={transactionsData}
          accounts={accountsData}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={9}>
        <div>
          <TransactionsList
            transactions={transactionsData}
            accounts={accountsData}
            categories={categoriesData}
            deleteTransaction={deleteTransaction}
            editAccount={editAccount}
          />
        </div>
      </Grid>
    </>
  );
}
