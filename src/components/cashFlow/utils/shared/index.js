import React from 'react';
import { add, dinero, toDecimal } from 'dinero.js';
import { formatNumberOutput } from '../../../../utils/format/cash';
import { styled } from '@mui/material';
import { AccountsMenuItem } from '../../transactions/TransactionsAnalysis.styled';
import { currencies } from '../../../../utils/constants/currencies';
import { toStringDate } from '../../../../utils/format/date';

export function createLocaleTransactions(NAME, count) {
  const lastNumber = Number(String(count).match(/\d$/g)[0]);
  if (lastNumber === 0) {
    return `${NAME}.TRANSACTIONS.MORE_THAN_FIVE`;
  } else if (lastNumber === 1) {
    return `${NAME}.TRANSACTIONS.ONE`;
  } else if (lastNumber < 5) {
    return `${NAME}.TRANSACTIONS.LESS_THAN_FIVE`;
  } else if (lastNumber >= 5) {
    return `${NAME}.TRANSACTIONS.MORE_THAN_FIVE`;
  } else {
    return `${NAME}.TRANSACTIONS.MORE_THAN_FIVE`;
  }
}

const ListItemSvg = styled('svg')((props) => ({
  marginRight: props.theme.spacing(2),
}));

export function renderAccounts(t, accounts) {
  let result = [];
  result.push(
    <AccountsMenuItem key="All accounts" value="All accounts">
      {t('ANALYSIS.ALL_ACCOUNTS')}
    </AccountsMenuItem>,
  );
  accounts.forEach((account) => {
    result.push(
      <AccountsMenuItem key={account.id} value={account.description}>
        <ListItemSvg
          width="34"
          height="23"
          viewBox="0 0 34 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0"
            y="0"
            width="34"
            height="23"
            rx="5"
            fill={`url(#${account.description.replaceAll(' ', '_')})`}
          ></rect>
          <defs>
            <linearGradient
              id={account.description.replaceAll(' ', '_')}
              x1="0"
              y1="0"
              x2="34"
              y2="11.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={account.color[0]} />
              <stop offset="1" stopColor={account.color[1]} />
            </linearGradient>
          </defs>
        </ListItemSvg>
        {account.description}
      </AccountsMenuItem>,
    );
  });
  return result;
}

export function filterByType(transactions, type) {
  return transactions.filter(
    (transaction) => transaction.transactionType === type,
  );
}

export function createSum(values, mainCurrency) {
  return values.reduce(
    (sum, value) => add(sum, dinero(value.mainCurrencyAmount)),
    dinero({ amount: 0, currency: currencies[mainCurrency] }),
  );
}

export function filterArchivedAccounts(accounts) {
  return accounts.filter((account) => account.archived === false);
}

export function createAverageAmount(date, sum, mainCurrency) {
  switch (date.during) {
    case 'month':
      return formatNumberOutput(
        (Number(toDecimal(sum)) / 4).toFixed(2),
        mainCurrency,
      );
    default:
      return formatNumberOutput(0, mainCurrency);
  }
}

export const filterByDate = (transactions, date) => {
  return transactions.filter((transaction) => {
    const transactionDate = transaction.date;
    return (
      transactionDate >= toStringDate(date.from) &&
      transactionDate <= toStringDate(date.to)
    );
  });
};

export function filterByAccount(transactions, accounts, accountFilter) {
  if (accountFilter === 'All accounts') {
    return transactions;
  }
  return transactions.filter((transaction) => {
    const transactionAccount = accounts.find(
      (account) => account.id === transaction.account,
    );
    if (!transactionAccount) return null;
    return transactionAccount.description === accountFilter;
  });
}

export function createTypeFilter(chartFilter) {
  switch (chartFilter) {
    case 'expenses':
      return 'expense';
    case 'incomes':
      return 'income';
    case 'transfers':
      return 'transfer';
    default:
      return 'expense';
  }
}

export const getCashRate = (currentData, comparedData) => {
  if (!currentData && !comparedData) return 0;
  const current = Number(currentData);
  const compared = Number(comparedData);
  if (current === 0 && compared === 0) return 0;
  if (compared === 0) return 100;
  return ((current / compared) * 100 - 100).toFixed(2);
};
