import React, { useEffect, useState } from 'react';
import {
  fetchAccountsData,
  fetchCategoriesData,
  fetchTransactionsData,
} from '../../../../actions/Actions';
import {
  useGlobalAccountsSearch,
  useGlobalCategoriesSearch,
  useGlobalTransactionsSearch,
} from '../../../../hooks/useSearch';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
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

import { ReactComponent as SearchIcon } from '../../../../assets/icons/shared/search.svg';
import { ReactComponent as CancelSearchIcon } from '../../../../assets/icons/shared/cancelSearch.svg';
import { ReactComponent as FilterIcon } from '../../../../assets/icons/shared/filter.svg';
import { ReactComponent as SortIcon } from '../../../../assets/icons/shared/sort.svg';
import { ReactComponent as CalendarIcon } from '../../../../assets/icons/shared/calendar.svg';
import { CashWrapper, ShowAll } from './GlobalSearchPage.styled';
import { ResultsCount, ResultsTitle } from '../GlobalSearch.styled';
import TransactionsPage from './transactions/TransactionsPage';
import CategoriesPage from './categories/CategoriesPage';
import AccountsPage from './accounts/AccountsPage';
import { sliceData } from '../utils';
import { filterQuery } from '../../../../utils/format/search';
import Loading from '../../../loading/Loading';
import { names } from '../../../../utils/constants/currencies';

function GlobalSearchPage() {
  const { t } = useTranslation();
  const transactions = useSelector((state) => state.transactions);
  const accounts = useSelector((state) => state.accounts);
  const categories = useSelector((state) => state.categories);
  const header = useSelector((state) => state.header);
  const mainCurrency = header.profile ? header.profile.currency : names.USD;
  const dispatch = useDispatch();
  const [transactionsData, setTransactionsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [accountsData, setAccountsData] = useState([]);
  const queryData = useParams().query;
  const [query, setQuery] = useState(queryData);
  const searchTransactions = useGlobalTransactionsSearch(
    query,
    transactionsData,
  );
  const searchCategories = useGlobalCategoriesSearch(query, categoriesData);
  const searchAccounts = useGlobalAccountsSearch(query, accountsData);

  useEffect(() => {
    setQuery(queryData);
  }, [queryData]);

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
        <HeaderTitle>{t('SEARCH.TITLE')}</HeaderTitle>
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
        </FilterButtonsContainer>
      </Header>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <SearchField
          placeholder={t('SEARCH.SEARCH_EVERYTHING')}
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
      </Grid>
      {header.status === 'loading' ||
      transactions.status === 'loading' ||
      categories.status === 'loading' ||
      accounts.status === 'loading' ? (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Loading />
        </Grid>
      ) : (
        <>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <ResultsTitle>
              {t('SEARCH.TRANSACTIONS')}{' '}
              <ResultsCount>{searchTransactions.length}</ResultsCount>{' '}
            </ResultsTitle>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            {filterQuery(query) ? (
              <ShowAll to={`/search/transactions/${query}`}>
                {t('SEARCH.SHOW_ALL')}
              </ShowAll>
            ) : (
              <div></div>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TransactionsPage
              transactions={sliceData(searchTransactions)}
              categories={categoriesData}
              accounts={accountsData}
              mainCurrency={mainCurrency}
              query={query}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <ResultsTitle>
              {t('SEARCH.CATEGORIES')}{' '}
              <ResultsCount>{searchCategories.length}</ResultsCount>
            </ResultsTitle>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            {filterQuery(query) ? (
              <ShowAll to={`/search/categories/${query}`}>
                {t('SEARCH.SHOW_ALL')}
              </ShowAll>
            ) : (
              <div></div>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CategoriesPage
              categories={sliceData(searchCategories)}
              query={query}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <ResultsTitle>
              {t('SEARCH.ACCOUNTS')}{' '}
              <ResultsCount>{searchAccounts.length}</ResultsCount>
            </ResultsTitle>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            {filterQuery(query) ? (
              <ShowAll to={`/search/accounts/${query}`}>
                {t('SEARCH.SHOW_ALL')}
              </ShowAll>
            ) : (
              <div></div>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CashWrapper>
              <AccountsPage
                accounts={sliceData(searchAccounts)}
                categories={categoriesData}
                query={query}
              />
            </CashWrapper>
          </Grid>
        </>
      )}
    </>
  );
}

export default GlobalSearchPage;
