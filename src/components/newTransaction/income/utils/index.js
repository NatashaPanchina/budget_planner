import { toSnapshot } from '@dinero.js/core';
import { v4 as uuidv4 } from 'uuid';
import { add, dinero, toDecimal } from 'dinero.js';
import { idbAddItem } from '../../../../indexedDB/IndexedDB';
import { dineroFromFloat } from '../../../../utils/format/cash';
import { currencies } from '../../../../utils/constants/currencies';
import { toStringDate } from '../../../../utils/format/date';

export const doneEventClick = (
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
  addNewTransaction,
  editAccount,
) => {
  const newAmount = dineroFromFloat({
    amount,
    currency: currencies[currency],
    scale: 2,
  });
  const newTransaction = {
    id: uuidv4(),
    transactionType,
    category,
    account,
    amount: toSnapshot(newAmount),
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
  if (transactionAccount) {
    const previousBalance = dinero(transactionAccount.balance);
    const newBalance = toSnapshot(add(previousBalance, newAmount));
    dispatch(
      editAccount(transactionAccount.id, {
        ...transactionAccount,
        balance: newBalance,
      }),
    );
    idbAddItem({ ...transactionAccount, balance: newBalance }, 'accounts');
  }
};
