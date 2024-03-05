import React from 'react';
import { add, dinero, subtract, toDecimal, toSnapshot } from 'dinero.js';
import { categoryIcons } from '../../../utils/constants/icons';
import {
  dineroFromFloat,
  formatDineroOutput,
} from '../../../utils/format/cash';
import { ReactComponent as AdjustmentIcon } from '../../../assets/icons/shared/adjustment.svg';
import cardBackground from '../../../assets/icons/shared/cardBackground.svg';
import {
  Card,
  CardBalance,
  CardBalanceContainer,
  CardName,
  CardView,
  CurrentBalance,
} from '../../newTransaction/NewTransaction.styled';
import { MenuItem, styled } from '@mui/material';
import { currencies } from '../../../utils/constants/currencies';
import dayjs from 'dayjs';
import { convertCash } from '../../../utils/rates';

const CategoriesMenuItem = styled(MenuItem)((props) => ({
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colors.background.primary,
}));

const InfoContainer = styled('div')((props) => ({
  display: 'flex',
  alignItems: 'center',
  color: props.theme.colors.text.primary,
}));

const CategoriesItemSvg = styled('svg')((props) => ({
  width: 34,
  height: 34,
  marginRight: props.theme.spacing(3),
}));

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

export function renderCategories(categories) {
  return categories.length === 0 ? (
    <div>You don t have any categories yet</div>
  ) : (
    categories.map((category, index) => {
      let Icon = AdjustmentIcon;
      if (category.description !== 'Balance adjustment') {
        Icon = categoryIcons[category.icon];
      }
      return (
        <CategoriesMenuItem key={category.id} value={category.id}>
          <InfoContainer>
            <CategoriesItemSvg
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="17" cy="17" r="17" fill={`url(#${index})`}></circle>
              <Icon height="20" width="20" x="7" y="7" />
              <defs>
                <linearGradient
                  id={index}
                  x1="0"
                  y1="0"
                  x2="34"
                  y2="34"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor={category.color[0]} />
                  <stop offset="1" stopColor={category.color[1]} />
                </linearGradient>
              </defs>
            </CategoriesItemSvg>
            {category.description}
          </InfoContainer>
        </CategoriesMenuItem>
      );
    })
  );
}

export function renderAccounts(accounts, t) {
  return accounts.length === 0 ? (
    <div>You don t have any accounts yet</div>
  ) : (
    accounts.map((account) => {
      const balance = account.balance;
      return (
        <MenuItem key={account.id} value={account.id}>
          <CardView>
            <Card
              $from={account.color[0]}
              $to={account.color[1]}
              $cardBackground={cardBackground}
            >
              <CardName>{account.description}</CardName>
              <CardBalanceContainer>
                <CardBalance>
                  {formatDineroOutput(dinero(balance), balance.currency.code)}
                </CardBalance>
                <CurrentBalance>{t('ACCOUNTS.CURRENT_BALANCE')}</CurrentBalance>
              </CardBalanceContainer>
            </Card>
          </CardView>
        </MenuItem>
      );
    })
  );
}

//для транзакций нужно убрать s на конце, a для
// all сделать по умолчанию expense
export function createFiltertype(filterType) {
  switch (filterType) {
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

export function createFilterAccount(accounts, filterAccount) {
  if (!filterAccount) return '';
  if (!accounts.length) return '';
  if (filterAccount === 'all') return accounts[0].id;
  return filterAccount;
}

export const renderCurrencies = (names) => {
  let results = [];
  for (let currencyName in names) {
    results.push(
      <MenuItem key={names[currencyName]} value={names[currencyName]}>
        {names[currencyName]}
      </MenuItem>,
    );
  }
  return results;
};

export const getTotalBalance = async (mainCurrency, data) => {
  return await data.reduce(
    async (sum, account) => {
      let balance = account.balance;
      let dineroBalance = dinero(balance);
      if (balance.currency.code !== mainCurrency) {
        const date = dayjs(new Date(account.date)).format('YYYY-MM-DD');
        const amount = Number(toDecimal(dineroBalance));
        balance = await convertCash(
          date,
          amount,
          balance.currency.code,
          mainCurrency,
          mainCurrency,
        );
        dineroBalance = dineroFromFloat({
          amount: balance,
          currency: currencies[mainCurrency],
          scale: 2,
        });
      }
      return add(await sum, dineroBalance);
    },
    dinero({ amount: 0, currency: currencies[mainCurrency] }),
  );
};

export const createNewBalance = async (
  prevTransaction,
  newTransaction,
  accounts,
  mainCurrency,
) => {
  const prevAccount = accounts.find(
    (account) => account.id === prevTransaction.account,
  );
  const newAccount = accounts.find(
    (account) => account.id === newTransaction.account,
  );

  if (!newAccount || !prevAccount) {
    return {
      prevAccountBalance: toSnapshot(
        dinero({ amount: 0, currency: currencies.USD }),
      ),
      newAccountBalance: toSnapshot(
        dinero({ amount: 0, currency: currencies.USD }),
      ),
    };
  }

  let prevAccountBalance = dinero(prevAccount.balance),
    newAccountBalance = dinero(newAccount.balance);
  let prevAccountCurrency = prevAccount.balance.currency.code,
    newAccountCurrency = newAccount.balance.currency.code;
  let convertedPrevAmount = dinero(prevTransaction.amount),
    convertedNewAmount = dinero(newTransaction.amount);
  let prevTransactionCurrency = prevTransaction.amount.currency.code,
    newTransactionCurrency = newTransaction.amount.currency.code;

  //check if amount's currency other than account's one
  if (prevAccountCurrency !== prevTransactionCurrency) {
    const date = dayjs(new Date(prevTransaction.date)).format('YYYY-MM-DD');
    const amount = Number(toDecimal(dinero(prevTransaction.amount)));
    const convertedAmount = await convertCash(
      date,
      amount,
      prevTransactionCurrency,
      prevAccountCurrency,
      mainCurrency,
    );
    convertedPrevAmount = dineroFromFloat({
      amount: convertedAmount,
      currency: currencies[prevAccountCurrency],
      scale: 2,
    });
  }
  if (newAccountCurrency !== newTransactionCurrency) {
    const date = dayjs(new Date(newTransaction.date)).format('YYYY-MM-DD');
    const amount = Number(toDecimal(dinero(newTransaction.amount)));
    const convertedAmount = await convertCash(
      date,
      amount,
      newTransactionCurrency,
      newAccountCurrency,
      mainCurrency,
    );
    convertedNewAmount = dineroFromFloat({
      amount: convertedAmount,
      currency: currencies[newAccountCurrency],
      scale: 2,
    });
  }

  switch (newTransaction.transactionType) {
    case 'income':
      //если это один и тот же счет
      if (prevAccount === newAccount) {
        const balance = subtract(prevAccountBalance, convertedPrevAmount);
        return {
          prevAccountBalance: toSnapshot(add(balance, convertedNewAmount)),
          newAccountBalance: toSnapshot(add(balance, convertedNewAmount)),
        };
      }
      return {
        prevAccountBalance: toSnapshot(
          subtract(prevAccountBalance, convertedPrevAmount),
        ),
        newAccountBalance: toSnapshot(
          add(newAccountBalance, convertedNewAmount),
        ),
      };

    case 'expense':
      if (prevAccount === newAccount) {
        const balance = add(prevAccountBalance, convertedPrevAmount);
        return {
          prevAccountBalance: toSnapshot(subtract(balance, convertedNewAmount)),
          newAccountBalance: toSnapshot(subtract(balance, convertedNewAmount)),
        };
      }
      return {
        prevAccountBalance: toSnapshot(
          add(prevAccountBalance, convertedPrevAmount),
        ),
        newAccountBalance: toSnapshot(
          subtract(newAccountBalance, convertedNewAmount),
        ),
      };
    default:
      return {
        prevAccountBalance: toSnapshot(prevAccountBalance),
        newAccountBalance: toSnapshot(newAccountBalance),
      };
  }
};
