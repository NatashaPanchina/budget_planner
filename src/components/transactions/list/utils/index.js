import { add, dinero, subtract, toDecimal, toSnapshot } from 'dinero.js';
import { createFiltertype } from '../../utils';
import { idbAddItem, idbDeleteItem } from '../../../../indexedDB/IndexedDB';
import { USD } from '@dinero.js/currencies';
import { deleteTransaction, editAccount } from '../../../../actions/Actions';
import { currencies } from '../../../../utils/constants/currencies';
import { dineroFromFloat } from '../../../../utils/format/cash';
import { convertCash } from '../../../../utils/rates';
import dayjs from 'dayjs';

const createNewBalance = async (transaction, accounts, mainCurrency) => {
  const account = accounts.find(
    (account) => account.id === transaction.account,
  );

  if (!account) {
    return toSnapshot(dinero({ amount: 0, currency: USD }));
  }

  let accountBalance = dinero(account.balance);
  let accountCurrency = account.balance.currency.code;
  let convertedAmount = dinero(transaction.amount);
  let transactionCurrency = transaction.amount.currency.code;

  //check if amount's currency other than account's one
  if (accountCurrency !== transactionCurrency) {
    const date = dayjs(new Date(transaction.date)).format('YYYY-MM-DD');
    const amount = Number(toDecimal(dinero(transaction.amount)));
    const convertedCash = await convertCash(
      date,
      amount,
      transactionCurrency,
      accountCurrency,
      mainCurrency,
    );
    convertedAmount = dineroFromFloat({
      amount: convertedCash,
      currency: currencies[accountCurrency],
      scale: 2,
    });
  }

  switch (transaction.transactionType) {
    case 'income':
      return toSnapshot(subtract(accountBalance, convertedAmount));
    case 'expense':
      return toSnapshot(add(accountBalance, convertedAmount));
    default:
      return toSnapshot(accountBalance);
  }
};

export function filterByType(transactions, filterType) {
  const transactionType = createFiltertype(filterType);
  return filterType === 'all'
    ? transactions
    : transactions.filter(
        (transaction) => transaction.transactionType === transactionType,
      );
}

export function filterByAccounts(transactions, filterAccount) {
  return filterAccount === 'all'
    ? transactions
    : transactions.filter(
        (transaction) => transaction.account === filterAccount,
      );
}

export const deleteClick = async (
  transaction,
  accounts,
  dispatch,
  mainCurrency,
) => {
  const newBalance = await createNewBalance(
    transaction,
    accounts,
    mainCurrency,
  );
  let newMainCurrencyBalance = newBalance;
  if (newBalance.currency.code !== mainCurrency) {
    const date = dayjs(new Date(transaction.date)).format('YYYY-MM-DD');
    const convertedBalance = await convertCash(
      date,
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
  const transactionAccount = accounts.find(
    (account) => transaction.account === account.id,
  );
  const newAccount = {
    ...transactionAccount,
    balance: newBalance,
    formatBalance: toDecimal(dinero(newBalance)),
    mainCurrencyBalance: newMainCurrencyBalance,
  };
  if (transactionAccount) {
    dispatch(editAccount(transactionAccount.id, newAccount));
    idbAddItem(newAccount, 'accounts');
    dispatch(deleteTransaction(transaction.id));
    idbDeleteItem(transaction.id, 'transactions');
  }
};
