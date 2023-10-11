import { useEffect, useState } from 'react';
import { filterQuery } from '../utils/format/search';
import { idbSearchItems } from '../indexedDB/IndexedDB';
import { useParams } from 'react-router-dom';
import {
  filterByAccounts,
  filterByType,
} from '../components/transactions/list/utils';
import {
  createAccountFilter,
  filterAccounts,
} from '../components/accounts/utils';
import {
  createFilterType,
  filterCategories,
} from '../components/categories/utils';

export const useTransactionsSearch = (query, transactions) => {
  const { filterAccount, filterType } = useParams();
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const filtered = filterQuery(query);
    if (filtered) {
      idbSearchItems(filtered, 'transactions').then((result) => {
        setFilteredTransactions(
          filterByType(filterByAccounts(result, filterAccount), filterType),
        );
      });
    } else {
      setFilteredTransactions(
        filterByType(filterByAccounts(transactions, filterAccount), filterType),
      );
    }
  }, [transactions, filterType, filterAccount, query]);

  return filteredTransactions;
};

export const useGlobalTransactionsSearch = (query, transactions) => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const filtered = filterQuery(query);
    if (filtered) {
      idbSearchItems(filtered, 'transactions').then((result) =>
        setFilteredTransactions(result),
      );
    } else {
      setFilteredTransactions(transactions);
    }
  }, [transactions, query]);

  return filteredTransactions;
};

export const useAccountsSearch = (query, accounts, isArchived) => {
  const filterAccount = createAccountFilter(useParams().filterCash);

  const [filteredAccounts, setFilteredAccounts] = useState([]);

  useEffect(() => {
    const filtered = filterQuery(query);
    if (filtered) {
      idbSearchItems(filtered, 'accounts').then((result) => {
        setFilteredAccounts(
          filterAccounts(
            filterAccount,
            result.filter((account) => account.archived === isArchived),
          ),
        );
      });
    } else {
      setFilteredAccounts(
        filterAccounts(
          filterAccount,
          accounts.filter((account) => account.archived === isArchived),
        ),
      );
    }
  }, [accounts, filterAccount, query]);

  return filteredAccounts;
};

export const useGlobalAccountsSearch = (query, accounts) => {
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  useEffect(() => {
    const filtered = filterQuery(query);
    if (filtered) {
      idbSearchItems(filtered, 'accounts').then((result) => {
        setFilteredAccounts(
          result.filter((account) => account.archived === false),
        );
      });
    } else {
      setFilteredAccounts(
        accounts.filter((account) => account.archived === false),
      );
    }
  }, [accounts, query]);

  return filteredAccounts;
};

export const useCategoriesSearch = (query, categories, isArchived) => {
  const filterType = createFilterType(useParams().filterType);

  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const filtered = filterQuery(query);
    if (filtered) {
      idbSearchItems(filtered, 'categories').then((result) => {
        setFilteredCategories(
          filterCategories(
            filterType,
            result.filter((category) => category.archived === isArchived),
          ),
        );
      });
    } else {
      setFilteredCategories(
        filterCategories(
          filterType,
          categories.filter((category) => category.archived === isArchived),
        ),
      );
    }
  }, [categories, filterType, query]);

  return filteredCategories;
};

export const useGlobalCategoriesSearch = (query, categories) => {
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const filtered = filterQuery(query);
    if (filtered) {
      idbSearchItems(filtered, 'categories').then((result) => {
        setFilteredCategories(
          result.filter((category) => category.archived === false),
        );
      });
    } else {
      setFilteredCategories(
        categories.filter((category) => category.archived === false),
      );
    }
  }, [categories, query]);

  return filteredCategories;
};
