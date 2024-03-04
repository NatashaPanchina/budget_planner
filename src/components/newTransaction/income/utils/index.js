import { toSnapshot } from '@dinero.js/core';
import { v4 as uuidv4 } from 'uuid';
import { add, dinero, toDecimal } from 'dinero.js';
import { idbAddItem } from '../../../../indexedDB/IndexedDB';
import { dineroFromFloat } from '../../../../utils/format/cash';
import { currencies } from '../../../../utils/constants/currencies';
import { toStringDate } from '../../../../utils/format/date';
import { addNewTransaction, editAccount } from '../../../../actions/Actions';
import { convertCash } from '../../../../utils/rates';

export const doneEventClick = async (
  currency,
  amount,
  transactionType,
  category,
  account,
  date,
  notes,
  tags,
  filteredAccounts,
  dispatch,
  mainCurrency,
) => {
  const newAmount = dineroFromFloat({
    amount,
    currency: currencies[currency],
    scale: 2,
  });

  let mainCurrencyAmount = newAmount;

  if (currency !== mainCurrency) {
    const convertedAmount = await convertCash(
      date.format('YYYY-MM-DD'),
      Number(toDecimal(newAmount)),
      currency,
      mainCurrency,
      mainCurrency,
    );
    mainCurrencyAmount = dineroFromFloat({
      amount: convertedAmount,
      currency: currencies[mainCurrency],
      scale: 2,
    });
  }

  const newTransaction = {
    id: uuidv4(),
    creationDate: Date.now(),
    transactionType,
    category,
    account,
    amount: toSnapshot(newAmount),
    mainCurrencyAmount: toSnapshot(mainCurrencyAmount),
    formatAmount: toDecimal(newAmount),
    date: toStringDate(new Date(date.format())),
    notes,
    tags,
  };

  dispatch(addNewTransaction(newTransaction));
  idbAddItem(newTransaction, 'transactions');

  const transactionAccount = filteredAccounts.find(
    (filteredAccount) => filteredAccount.id === account,
  );
  if (!transactionAccount) {
    return;
  }
  const previousBalance = transactionAccount.balance;
  const previousBalanceDinero = dinero(previousBalance);
  let newBalance = previousBalance;

  if (previousBalance.currency.code === currency) {
    newBalance = toSnapshot(add(previousBalanceDinero, newAmount));
  } else {
    const to = previousBalance.currency.code;
    const convertedAmount = await convertCash(
      date.format('YYYY-MM-DD'),
      Number(toDecimal(newAmount)),
      currency,
      to,
      mainCurrency,
    );
    const convertedDinero = dineroFromFloat({
      amount: convertedAmount,
      currency: currencies[to],
      scale: 2,
    });
    newBalance = toSnapshot(add(previousBalanceDinero, convertedDinero));
  }

  let newMainCurrencyBalance = newBalance;

  if (newBalance.currency.code !== mainCurrency) {
    const convertedBalance = await convertCash(
      date.format('YYYY-MM-DD'),
      Number(toDecimal(dinero(newBalance))),
      newBalance.currency.code,
      mainCurrency,
      mainCurrency,
    );
    newMainCurrencyBalance = toSnapshot(
      dineroFromFloat({
        amount: convertedBalance,
        currency: currencies[mainCurrency],
        scale: 2,
      }),
    );
  }

  const newAccount = {
    ...transactionAccount,
    balance: newBalance,
    formatBalance: toDecimal(dinero(newBalance)),
    mainCurrencyBalance: newMainCurrencyBalance,
  };
  dispatch(editAccount(transactionAccount.id, newAccount));
  idbAddItem(newAccount, 'accounts');
};
