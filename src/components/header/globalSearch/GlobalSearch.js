import React, { useEffect, useState } from 'react';
import {
  useGlobalAccountsSearch,
  useGlobalCategoriesSearch,
  useGlobalTransactionsSearch,
} from '../../../hooks/useSearch';
import { InputAdornment } from '@mui/material';
import { CancelSearchSvg } from '../../../theme/global';
import { ReactComponent as CancelSearchIcon } from '../../../assets/icons/shared/cancelSearch.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/shared/globalSearch.svg';
import { useTranslation } from 'react-i18next';
import {
  fetchAccountsData,
  fetchCategoriesData,
  fetchTransactionsData,
} from '../../../actions/Actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  GlobalSearchField,
  GlobalSearchPopper,
  GlobalSearchSvg,
  ResultsCount,
  ResultsTitle,
  ShowResults,
} from './GlobalSearch.styled';
import TransactionsResults from './popper/TransactionsResults';
import CategoriesResults from './popper/CategoriesResults';
import AccountsResults from './popper/AccountsResults';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { filterQuery } from '../../../utils/format/search';
import { sliceData } from './utils';
import Loading from '../../loading/Loading';

export default function GlobalSearch() {
  const { t } = useTranslation();
  const transactions = useSelector((state) => state.transactions);
  const accounts = useSelector((state) => state.accounts);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [transactionsData, setTransactionsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [accountsData, setAccountsData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const popperRef = useOutsideClick(setAnchorEl);
  const [query, setQuery] = useState('');
  const searchTransactions = useGlobalTransactionsSearch(
    query,
    transactionsData,
  );
  const searchCategories = useGlobalCategoriesSearch(query, categoriesData);
  const searchAccounts = useGlobalAccountsSearch(query, accountsData);

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
      <GlobalSearchField
        placeholder={t('HEADER.SEARCH_EVERYTHING')}
        value={query}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <GlobalSearchSvg as={SearchIcon} />
            </InputAdornment>
          ),
          endAdornment: query ? (
            <InputAdornment position="end" onClick={() => setQuery('')}>
              <CancelSearchSvg as={CancelSearchIcon} />
            </InputAdornment>
          ) : null,
        }}
        onChange={(event) => setQuery(event.target.value)}
        onClick={(event) => {
          event.stopPropagation();
          setAnchorEl(event.currentTarget);
        }}
        autoComplete="off"
      />
      <GlobalSearchPopper open={open} anchorEl={anchorEl} ref={popperRef}>
        {transactions.status === 'loading' ||
        categories.status === 'loading' ||
        accounts.status === 'loading' ? (
          <Loading />
        ) : (
          <>
            {filterQuery(query) ? (
              <ShowResults to={`/search/${query}`}>
                {t('SEARCH.SHOW_RESULTS')}
              </ShowResults>
            ) : (
              <div>Recent queries...</div>
            )}
            <ResultsTitle>
              {t('SEARCH.TRANSACTIONS')}{' '}
              <ResultsCount>{searchTransactions.length}</ResultsCount>{' '}
            </ResultsTitle>
            <div>
              <TransactionsResults
                transactions={sliceData(searchTransactions, 3)}
                categories={categoriesData}
                accounts={accountsData}
                query={query}
              />
            </div>
            <ResultsTitle>
              {t('SEARCH.CATEGORIES')}{' '}
              <ResultsCount>{searchCategories.length}</ResultsCount>
            </ResultsTitle>
            <div>
              <CategoriesResults
                categories={sliceData(searchCategories, 3)}
                query={query}
              />
            </div>
            <ResultsTitle>
              {t('SEARCH.ACCOUNTS')}{' '}
              <ResultsCount>{searchAccounts.length}</ResultsCount>
            </ResultsTitle>
            <div>
              <AccountsResults
                accounts={sliceData(searchAccounts, 3)}
                categories={categoriesData}
                query={query}
              />
            </div>
          </>
        )}
      </GlobalSearchPopper>
    </>
  );
}
