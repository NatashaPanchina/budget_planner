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
import { sortByDate } from '../utils/sort';

const sortTransactions = (
  transactions,
  sort,
  type,
  accounts,
  categories,
  currencies,
  amount,
  notes,
) => {
  let result = transactions;

  if (type !== 'All') {
    result = transactions.filter(
      (transaction) => transaction.transactionType === type,
    );
  }

  if (accounts) {
    result = result.filter((transaction) => {
      for (const description in accounts) {
        const account = accounts[description];
        if (account.checked && transaction.account === account.id) {
          return true;
        }
      }
      return false;
    });
  }

  if (categories) {
    result = result.filter((transaction) => {
      for (const description in categories) {
        const category = categories[description];
        if (category.checked && transaction.category === category.id) {
          return true;
        }
      }
      return false;
    });
  }

  if (currencies) {
    result = result.filter((transaction) => {
      for (const description in currencies) {
        const currency = currencies[description];
        if (currency && transaction.amount.currency.code === description) {
          return true;
        }
      }
      return false;
    });
  }

  if (amount) {
    if (amount.from !== null && amount.to !== null) {
      const from = amount.from;
      const to = amount.to;
      result = result.filter((transaction) => {
        const transactionAmount = Number(transaction.formatAmount);
        return transactionAmount >= from && transactionAmount <= to;
      });
    }
  }

  if (notes !== 'All') {
    result = result.filter((transaction) => {
      if (notes === 'false' && transaction.notes.length === 0) return true;
      if (notes === 'true' && transaction.notes.length > 0) return true;
      return false;
    });
  }

  switch (sort) {
    case 'By date':
      return sortByDate(result);
    case 'By adding':
      return result
        .slice()
        .sort((a, b) =>
          a.creationDate < b.creationDate
            ? 1
            : a.creationDate > b.creationDate
            ? -1
            : 0,
        );
    default:
      return result;
  }
};

export const useTransactionsSearch = (query, transactions, filters) => {
  const { filterAccount, filterType } = useParams();
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const { sort, type, accounts, categories, currencies, amount, notes } =
    filters;

  useEffect(() => {
    console.log('useEffect');
    const filteredQuery = filterQuery(query);
    if (filteredQuery) {
      idbSearchItems(filteredQuery, 'transactions').then((result) => {
        let sortedTransactions = filterByType(
          filterByAccounts(result, filterAccount),
          filterType,
        );
        sortedTransactions = sortTransactions(
          sortedTransactions,
          sort,
          type,
          accounts,
          categories,
          currencies,
          amount,
          notes,
        );
        setFilteredTransactions(sortedTransactions);
      });
    } else {
      let sortedTransactions = filterByType(
        filterByAccounts(transactions, filterAccount),
        filterType,
      );
      sortedTransactions = sortTransactions(
        sortedTransactions,
        sort,
        type,
        accounts,
        categories,
        currencies,
        amount,
        notes,
      );
      setFilteredTransactions(sortedTransactions);
    }
  }, [
    transactions,
    filterType,
    filterAccount,
    query,
    sort,
    type,
    accounts,
    categories,
    currencies,
    amount.from,
    amount.to,
    notes,
  ]);

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
