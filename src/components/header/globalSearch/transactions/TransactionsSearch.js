import React, { useEffect, useState } from 'react';

import { ReactComponent as BackIcon } from '../../../../assets/icons/shared/back.svg';
import { ReactComponent as FilterIcon } from '../../../../assets/icons/shared/filter.svg';
import { ReactComponent as CalendarIcon } from '../../../../assets/icons/shared/calendar.svg';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/shared/search.svg';
import { ReactComponent as CancelSearchIcon } from '../../../../assets/icons/shared/cancelSearch.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
  BackLink,
  BackLinkSvg,
  CancelSearchSvg,
  FilterButton,
  FilterButtonsContainer,
  FilterSvg,
  FilterTitle,
  Header,
  HeaderTitle,
  MobileFilterButton,
  SearchField,
  SortButtonsContainer,
} from '../../../../theme/global';
import { Grid, InputAdornment } from '@mui/material';
import {
  fetchAccountsData,
  fetchCategoriesData,
  fetchTransactionsData,
} from '../../../../actions/Actions';
import { useGlobalTransactionsSearch } from '../../../../hooks/useSearch';
import TransactionsPage from '../page/transactions/TransactionsPage';
import Loading from '../../../loading/Loading';
import { names } from '../../../../utils/constants/currencies';

export default function TransactionsSearch() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const header = useSelector((state) => state.header);
  const mainCurrency = header.profile ? header.profile.currency : names.USD;
  const transactions = useSelector((state) => state.transactions);
  const accounts = useSelector((state) => state.accounts);
  const categories = useSelector((state) => state.categories);
  const [transactionsData, setTransactionsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [accountsData, setAccountsData] = useState([]);
  const queryData = useParams().query;
  const [query, setQuery] = useState(queryData);
  const searchTransactions = useGlobalTransactionsSearch(
    query,
    transactionsData,
  );

  useEffect(() => {
    dispatch(fetchTransactionsData());
    dispatch(fetchCategoriesData());
    dispatch(fetchAccountsData());
  }, []);

  useEffect(() => {
    if (transactions.status === 'succeeded') {
      setTransactionsData(transactions.transactions);
    }
  }, [transactions.status, transactions.transactions]);

  useEffect(() => {
    if (categories.status === 'succeeded') {
      setCategoriesData(categories.categories);
    }
  }, [categories.status, categories.categories]);

  useEffect(() => {
    if (accounts.status === 'succeeded') {
      setAccountsData(accounts.accounts);
    }
  }, [accounts.status, accounts.accounts]);

  return (
    <>
      <Header>
        <BackLink to={`/search/${queryData}`}>
          <BackLinkSvg as={BackIcon} />
        </BackLink>
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
          </SortButtonsContainer>
          <MobileFilterButton>
            <FilterSvg as={FilterIcon} />
          </MobileFilterButton>
        </FilterButtonsContainer>
      </Header>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <SearchField
          placeholder={t('TRANSACTIONS.SEARCH')}
          value={query}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: query ? (
              <InputAdornment position="end" onClick={() => setQuery('')}>
                <CancelSearchSvg as={CancelSearchIcon} />
              </InputAdornment>
            ) : null,
          }}
          onChange={(event) => setQuery(event.target.value)}
          autoComplete="off"
        />
        {header.status === 'loading' ||
        transactions.status === 'loading' ||
        categories.status === 'loading' ||
        accounts.status === 'loading' ? (
          <Loading />
        ) : (
          <TransactionsPage
            transactions={searchTransactions}
            categories={categoriesData}
            accounts={accountsData}
            mainCurrency={mainCurrency}
            query={query}
          />
        )}
      </Grid>
    </>
  );
}
