import React from 'react';
import { add, dinero, toDecimal } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

import { formatNumberOutput } from '../../../../utils/format/cash';
import { styled } from '@mui/material';

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

const ListItem = styled('div')((props) => ({
  display: 'flex',
  alignItems: 'center',
  height: 40,
  margin: props.theme.spacing(2),
  paddingLeft: props.theme.spacing(2),
  borderRadius: props.theme.borderRadius,
  cursor: 'pointer',
  fontSize: '0.875rem',
  '&:hover': {
    backgroundColor: props.theme.colors.background.ordinary,
  },
}));

const ListItemSvg = styled('svg')((props) => ({
  marginRight: props.theme.spacing(2),
}));

export function renderAccounts(t, accounts, setAccountFilter) {
  return (
    <>
      <ListItem onClick={() => setAccountFilter('All cash')}>
        {t('ANALYSIS.ALL_CASH')}
      </ListItem>
      {accounts.map((account) => (
        <ListItem
          key={account.id}
          onClick={() => setAccountFilter(account.description)}
        >
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
        </ListItem>
      ))}
    </>
  );
}

export function filterTransactions(
  transactions,
  accounts,
  date,
  accountFilter,
) {
  if (accountFilter === 'All cash') {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= date.from && transactionDate <= date.to;
    });
  }
  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const transactionAccount = accounts.find(
      (account) => account.id === transaction.account,
    );
    return (
      transactionDate >= date.from &&
      transactionDate <= date.to &&
      transactionAccount.description === accountFilter
    );
  });
}

export function filterByType(transactions, type) {
  return transactions.filter(
    (transaction) => transaction.transactionType === type,
  );
}

export function createSum(values) {
  return values.reduce(
    (sum, value) => add(sum, dinero(value.amount)),
    dinero({ amount: 0, currency: USD }),
  );
}

export function filterArchivedAccounts(accounts) {
  return accounts.filter((account) => account.archived === false);
}

export function createAverageAmount(date, sum) {
  switch (date.during) {
    case 'month':
      return formatNumberOutput((Number(toDecimal(sum)) / 4).toFixed(2), 'USD');
    default:
      return formatNumberOutput(0, 'USD');
  }
}
