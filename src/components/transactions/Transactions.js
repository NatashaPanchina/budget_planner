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
} from '../../actions/Actions';

import { ReactComponent as FilterIcon } from '../../assets/icons/shared/filter.svg';
import { ReactComponent as SortIcon } from '../../assets/icons/shared/sort.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/shared/calendar.svg';
import { ReactComponent as AddIcon } from '../../assets/icons/shared/plus.svg';

import {
  Header,
  HeaderTitle,
  FilterSvg,
  AddButton,
  FilterButton,
  FilterTitle,
  FilterButtonsContainer,
  FilterTooltip,
  SortButtonsContainer,
  MobileFilterButton,
} from '../../theme/global.js';
import Loading from '../loading/Loading.js';

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
    <Loading />
  ) : (
    <>
      <Header>
        <HeaderTitle>{t('TRANSACTIONS.TRANSACTIONS_HEADER')}</HeaderTitle>
        <FilterButtonsContainer>
          <SortButtonsContainer>
            <FilterButton>
              <FilterSvg as={FilterIcon} />
              <FilterTitle>{t('TRANSACTIONS.FILTER_KEY')}</FilterTitle>
            </FilterButton>
            <FilterButton>
              <FilterSvg as={CalendarIcon} />
              <FilterTitle>{t('TRANSACTIONS.FILTER_DATE')}</FilterTitle>
            </FilterButton>
            <FilterButton>
              <FilterSvg as={SortIcon} />
              <FilterTitle>Filter</FilterTitle>
            </FilterButton>
          </SortButtonsContainer>
          <MobileFilterButton>
            <FilterSvg as={FilterIcon} />
          </MobileFilterButton>
          <FilterTooltip title={t('TRANSACTIONS.NEW_TRANSACTION')} arrow>
            <AddButton>
              <FilterSvg as={AddIcon} />
              <FilterTitle>{t('TRANSACTIONS.NEW_TRANSACTION')}</FilterTitle>
            </AddButton>
          </FilterTooltip>
        </FilterButtonsContainer>
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
          />
        </div>
      </Grid>
    </>
  );
}
