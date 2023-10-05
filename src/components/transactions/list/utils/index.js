import React from 'react';

import { add, dinero, subtract, toSnapshot } from 'dinero.js';

import { ReactComponent as NotesIcon } from '../../../../assets/icons/shared/notes.svg';
import { Notes, NotesSvg } from '../../Transactions.styled';
import { createFiltertype } from '../../utils';
import { idbAddItem, idbDeleteItem } from '../../../../indexedDB/IndexedDB';

export function createNewBalance(transaction, accounts) {
  const account = accounts.find(
    (account) => account.id === transaction.account,
  );
  switch (transaction.transactionType) {
    case 'income':
      return toSnapshot(
        subtract(dinero(account.balance), dinero(transaction.amount)),
      );
    case 'expense':
      return toSnapshot(
        add(dinero(account.balance), dinero(transaction.amount)),
      );
    default:
      return account.balance;
  }
}

export function renderNotes(notes) {
  if (notes) {
    return (
      <Notes>
        <NotesSvg as={NotesIcon} />
        {notes}
      </Notes>
    );
  }
}

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

export const deleteClick = (
  transaction,
  accounts,
  editAccount,
  deleteTransaction,
  dispatch,
) => {
  const newBalance = createNewBalance(transaction, accounts);
  const transactionAccount = accounts.find(
    (account) => transaction.account === account.id,
  );
  dispatch(
    editAccount(transactionAccount.id, {
      ...transactionAccount,
      balance: newBalance,
    }),
  );
  idbAddItem({ ...transactionAccount, balance: newBalance }, 'accounts');
  dispatch(deleteTransaction(transaction.id));
  idbDeleteItem(transaction.id, 'transactions');
};
