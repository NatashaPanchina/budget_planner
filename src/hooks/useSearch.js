import { useEffect, useState } from 'react';
import { filterQuery } from '../utils/format/search';
import { idbSearchItems } from '../indexedDB/IndexedDB';
import { useParams } from 'react-router-dom';
import {
  filterByAccounts,
  filterByType,
} from '../components/transactions/list/utils';

export const useTransactionsSearch = (
  query,
  accounts,
  categories,
  transactions,
) => {
  const { filterAccount, filterType } = useParams();
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    if (query) {
      idbSearchItems(
        filterQuery(query, accounts, categories),
        'transactions',
      ).then((result) => {
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
