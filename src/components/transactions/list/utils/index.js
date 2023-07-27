import React from 'react';

import { add, dinero, subtract, toSnapshot } from 'dinero.js';

import { ReactComponent as NotesIcon } from '../../../../assets/icons/shared/notes.svg';
import { Notes, NotesSvg } from '../../Transactions.styled';

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
  if (!accounts.length) return '';
  return filterAccount === 'all'
    ? accounts[0].id
    : accounts.find((account) => account.id === filterAccount).id;
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