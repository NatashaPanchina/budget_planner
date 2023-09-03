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

export const filterQuery = (query, accounts, categories) => {
  //delete spaces from the start and the end
  const data = query.replaceAll(/^ +/g, '').replaceAll(/ +$/g, '');
  let result = data;

  //check if query is a currency number
  // 1 => true
  // 1.00 => true
  // $1 => true
  // $1000 => true
  // 0.1 => true
  // 1,000.00 => true
  // $1,000,000 => true
  // 5678 => true
  if (/^\$?(([1-9](\d*|\d{0,2}(,\d{3})*))|0)(\.\d{1,2})?$/.test(data)) {
    //delete $ ,
    result = data.replace('$', '').replace(',', '');
    //if there is no . add 00 to the end
    result = /^\d+$/.test(result) ? `${result}00` : result;
    //add 0 to the end if amount is like 0.1
    // delete .
    result = /\d+\.\d{1}$/.test(result)
      ? `${result}0`.replace('.', '')
      : result.replace('.', '');
    //delete 0 from the start
    result = result.replace(/^0+/, '');
    return Number(result);
  }

  //check if query is account's or category's description
  result = accounts.find((account) => account.description === data);
  if (result) return result.id;

  result = categories.find((category) => category.description === data);
  if (result) return result.id;

  return data;
};
