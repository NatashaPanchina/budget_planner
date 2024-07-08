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
import { sortByAdding, sortByAlphabet, sortByDate } from '../utils/sort';
import { toStringDate } from '../utils/format/date';

const sortTransactions = (
  transactions,
  sort,
  type,
  accounts,
  categories,
  currencies,
  amount,
  notes,
  date,
) => {
  let result = transactions;

  result = transactions.filter((transaction) => {
    const transactionDate = transaction.date;
    return (
      transactionDate >= toStringDate(date.from) &&
      transactionDate <= toStringDate(date.to)
    );
  });

  if (type !== 'All') {
    result = result.filter(
      (transaction) => transaction.transactionType === type,
    );
  }

  const sortedAccounts = accounts.filter((account) => account.checked);
  if (sortedAccounts.length) {
    console.log(sortedAccounts, 'Accounts');
    result = result.filter((transaction) => {
      for (let account of sortedAccounts) {
        console.log(transaction.account === account.id, 'equal');
        if (transaction.account === account.id) return true;
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
  const { date, sort, type, accounts, categories, currencies, amount, notes } =
    filters;

  useEffect(() => {
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
          date,
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
        date,
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
    date,
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

const sortAccounts = (accounts, sort, type, currencies, balance, notes) => {
  let result = accounts;

  if (type !== 'All') {
    result = accounts.filter((account) => account.type === type);
  }

  if (currencies) {
    result = result.filter((account) => {
      for (const description in currencies) {
        const currency = currencies[description];
        if (currency && account.balance.currency.code === description) {
          return true;
        }
      }
      return false;
    });
  }

  if (balance) {
    if (balance.from !== null && balance.to !== null) {
      const from = balance.from;
      const to = balance.to;
      result = result.filter((account) => {
        const accountBalance = Number(account.formatBalance);
        return accountBalance >= from && accountBalance <= to;
      });
    }
  }

  if (notes !== 'All') {
    result = result.filter((account) => {
      if (notes === 'false' && account.notes.length === 0) return true;
      if (notes === 'true' && account.notes.length > 0) return true;
      return false;
    });
  }

  switch (sort) {
    case 'By date':
      return sortByDate(result);
    case 'By adding':
      return sortByAdding(result);
    default:
      return result;
  }
};

export const useAccountsSearch = (
  query,
  accounts,
  isArchived,
  filters = {
    sort: 'By date',
    type: 'All',
    currencies: null,
    balance: { from: null, to: null },
    notes: 'All',
  },
) => {
  const filterAccount = createAccountFilter(useParams().filterCash);
  const { sort, type, currencies, balance, notes } = filters;
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  useEffect(() => {
    const filtered = filterQuery(query);
    if (filtered) {
      idbSearchItems(filtered, 'accounts').then((result) => {
        let sortedAccounts = filterAccounts(
          filterAccount,
          result.filter((account) => account.archived === isArchived),
        );
        sortedAccounts = sortAccounts(
          sortedAccounts,
          sort,
          type,
          currencies,
          balance,
          notes,
        );
        setFilteredAccounts(sortedAccounts);
      });
    } else {
      let sortedAccounts = filterAccounts(
        filterAccount,
        accounts.filter((account) => account.archived === isArchived),
      );
      sortedAccounts = sortAccounts(
        sortedAccounts,
        sort,
        type,
        currencies,
        balance,
        notes,
      );
      setFilteredAccounts(sortedAccounts);
    }
  }, [
    accounts,
    filterAccount,
    query,
    sort,
    type,
    currencies,
    balance.from,
    balance.to,
    notes,
  ]);

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

const sortCategories = (categories, sort, type, notes) => {
  let result = categories;

  if (type !== 'All') {
    result = categories.filter((category) => category.type === type);
  }

  if (notes !== 'All') {
    result = result.filter((category) => {
      if (notes === 'false' && category.notes.length === 0) return true;
      if (notes === 'true' && category.notes.length > 0) return true;
      return false;
    });
  }

  switch (sort) {
    case 'By date':
      return sortByDate(result);
    case 'By adding':
      return sortByAdding(result);
    case 'By alphabet':
      return sortByAlphabet(result);
    default:
      return result;
  }
};

export const useCategoriesSearch = (
  query,
  categories,
  isArchived,
  filters = { sort: 'By date', type: 'All', notes: 'All' },
) => {
  const filterType = createFilterType(useParams().filterType);
  const { sort, type, notes } = filters;
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const filtered = filterQuery(query);
    if (filtered) {
      idbSearchItems(filtered, 'categories').then((result) => {
        let sortedCategories = filterCategories(
          filterType,
          result.filter((category) => category.archived === isArchived),
        );
        sortedCategories = sortCategories(sortedCategories, sort, type, notes);
        setFilteredCategories(sortedCategories);
      });
    } else {
      let sortedCategories = filterCategories(
        filterType,
        categories.filter((category) => category.archived === isArchived),
      );
      sortedCategories = sortCategories(sortedCategories, sort, type, notes);
      setFilteredCategories(sortedCategories);
    }
  }, [categories, filterType, query, sort, type, notes]);

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
