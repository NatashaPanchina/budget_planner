import { dinero, toDecimal, toSnapshot } from 'dinero.js';
import { currencies } from '../../../../utils/constants/currencies';
import { dineroFromFloat } from '../../../../utils/format/cash';
import { toStringDate } from '../../../../utils/format/date';
import { idbAddItem } from '../../../../indexedDB/IndexedDB';
import { convertCash } from '../../../../utils/rates';
import { createNewBalance } from '../../utils';
import { editAccount, editTransaction } from '../../../../actions/Actions';

export const doneEventHandler = async (
  clickedTransaction,
  id,
  creationDate,
  transactionType,
  category,
  account,
  currency,
  amount,
  dateObj,
  notes,
  tags,
  prevTransaction,
  accounts,
  dispatch,
  mainCurrency,
) => {
  const newAmount = dineroFromFloat({
    amount,
    currency: currencies[currency],
    scale: 2,
  });
  const date = toStringDate(new Date(dateObj.format()));

  let mainCurrencyAmount = newAmount;

  if (currency !== mainCurrency) {
    const convertedAmount = await convertCash(
      dateObj.format('YYYY-MM-DD'),
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
    id,
    creationDate,
    transactionType,
    category,
    account,
    amount: toSnapshot(newAmount),
    formatAmount: toDecimal(newAmount),
    mainCurrencyAmount: toSnapshot(mainCurrencyAmount),
    date,
    notes,
    tags,
  };
  dispatch(editTransaction(clickedTransaction, newTransaction));
  idbAddItem(newTransaction, 'transactions');

  const balance = await createNewBalance(
    prevTransaction,
    newTransaction,
    accounts,
    mainCurrency,
  );

  const prevTransactionAccount = accounts.find(
    (account) => account.id === prevTransaction.account,
  );
  const newTransactionAccount = accounts.find(
    (account) => account.id === newTransaction.account,
  );

  let prevMainCurrencyBalance = balance.prevAccountBalance;

  if (balance.prevAccountBalance.currency.code !== mainCurrency) {
    const convertedBalance = await convertCash(
      dateObj.format('YYYY-MM-DD'),
      Number(toDecimal(dinero(balance.prevAccountBalance))),
      balance.prevAccountBalance.currency.code,
      mainCurrency,
      mainCurrency,
    );
    prevMainCurrencyBalance = toSnapshot(
      dineroFromFloat({
        amount: convertedBalance,
        currency: currencies[mainCurrency],
        scale: 2,
      }),
    );
  }

  let newMainCurrencyBalance = balance.newAccountBalance;

  if (balance.newAccountBalance.currency.code !== mainCurrency) {
    const convertedBalance = await convertCash(
      dateObj.format('YYYY-MM-DD'),
      Number(toDecimal(dinero(balance.newAccountBalance))),
      balance.newAccountBalance.currency.code,
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

  if (prevTransactionAccount) {
    const newAccount = {
      ...prevTransactionAccount,
      balance: balance.prevAccountBalance,
      formatBalance: toDecimal(dinero(balance.prevAccountBalance)),
      mainCurrencyBalance: prevMainCurrencyBalance,
    };
    dispatch(editAccount(prevTransactionAccount.id, newAccount));
    idbAddItem(newAccount, 'accounts');
  }

  if (newTransactionAccount) {
    const newAccount = {
      ...newTransactionAccount,
      balance: balance.newAccountBalance,
      formatBalance: toDecimal(dinero(balance.newAccountBalance)),
      mainCurrencyBalance: newMainCurrencyBalance,
    };

    dispatch(editAccount(newTransactionAccount.id, newAccount));
    idbAddItem(newAccount, 'accounts');
  }
};
