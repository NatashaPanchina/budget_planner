import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { add, dinero, subtract, toSnapshot } from 'dinero.js';

import { formatDineroOutput } from '../../../utils/format/cash';
import { idbAddItem, idbDeleteItem } from '../../../indexedDB/IndexedDB';
import { dateFormatter } from '../../../utils/format/date';

import { categoryIcons } from '../../../utils/constants/icons';
import notesIcon from '../../../assets/icons/shared/notes.svg';
import searchIcon from '../../../assets/icons/shared/search.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/shared/plus.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/shared/editTransaction.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/shared/deleteTransaction.svg';

import './TransactionsList.css';
import { useDispatch } from 'react-redux';
import { pages } from '../../../utils/constants/pages';

function isActive({ isActive }) {
  return isActive ? 'active_transactions_title' : '';
}

function createNewBalance(transaction, accounts) {
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

function renderNotes(notes) {
  if (notes) {
    return (
      <div className="transaction_notes">
        <img src={notesIcon} className="notes_icon" alt="notes" />
        {notes}
      </div>
    );
  }
}

//для транзакций нужно убрать s на конце, a для
// all сделать по умолчанию expense
function createFiltertype(filterType) {
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

function createFilterAccount(accounts, filterAccount) {
  if (!accounts.length) return '';
  return filterAccount === 'all'
    ? accounts[0].id
    : accounts.find((account) => account.id === filterAccount).id;
}

function filterByType(transactions, filterType) {
  const transactionType = createFiltertype(filterType);
  return filterType === 'all'
    ? transactions
    : transactions.filter(
        (transaction) => transaction.transactionType === transactionType,
      );
}

function filterByAccounts(transactions, filterAccount) {
  return filterAccount === 'all'
    ? transactions
    : transactions.filter(
        (transaction) => transaction.account === filterAccount,
      );
}

function TransactionsList({
  transactions,
  accounts,
  categories,
  deleteTransaction,
  editAccount,
}) {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { filterAccount, filterType } = useParams();
  const transactionType = createFiltertype(filterType);
  const transactionAccount = createFilterAccount(accounts, filterAccount);
  const filteredTransactions = filterByType(
    filterByAccounts(transactions, filterAccount),
    filterType,
  );

  return (
    <React.Fragment>
      <div className="transactions_titles">
        <div className="transactions_title">
          <NavLink
            to={`${pages.transactions.all}/${filterAccount}`}
            className={isActive}
          >
            {t('TRANSACTIONS.ALL')}
          </NavLink>
        </div>
        <div className="transactions_title">
          <NavLink
            to={`${pages.transactions.expenses}/${filterAccount}`}
            className={isActive}
          >
            {t('TRANSACTIONS.FILTER_EXPENSES')}
          </NavLink>
        </div>
        <div className="transactions_title">
          <NavLink
            to={`${pages.transactions.incomes}/${filterAccount}`}
            className={isActive}
          >
            {t('TRANSACTIONS.FILTER_INCOMES')}
          </NavLink>
        </div>
        <div className="transactions_title">
          <NavLink
            to={`${pages.transactions.transfers}/${filterAccount}`}
            className={isActive}
          >
            {t('TRANSACTIONS.FILTER_TRANSFERS')}
          </NavLink>
        </div>
      </div>
      <div className="search">
        <input type="text" placeholder={t('TRANSACTIONS.SEARCH')}></input>
        <img src={searchIcon} alt="search" />
      </div>
      <div className="new_transaction_btn">
        <Link
          to={`${pages.newTransaction[transactionType]}/${transactionAccount}`}
        >
          <PlusIcon />
          {t('TRANSACTIONS.NEW_TRANSACTION')}
        </Link>
      </div>
      <div className="transactions_description">
        <span>{t('TRANSACTIONS.CATEGORY')}</span>
        <span>{t('TRANSACTIONS.CASH')}</span>
        <span>{t('TRANSACTIONS.AMOUNT')}</span>
        <span>{t('TRANSACTIONS.DATE')}</span>
      </div>
      {filteredTransactions ? (
        filteredTransactions.map((transaction, index) => {
          const transactionCategory = categories.find(
            (category) => category.id === transaction.category,
          );
          const transactionAccount = accounts.find(
            (account) => account.id === transaction.account,
          );
          const Icon = categoryIcons[transactionCategory.icon];
          return (
            <div key={transaction.id} className="transactions_item">
              <div className="transaction_description">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="17"
                    cy="17"
                    r="17"
                    fill={`url(#${index})`}
                  ></circle>
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
                      <stop stopColor={transactionCategory.color[0]} />
                      <stop
                        offset="1"
                        stopColor={transactionCategory.color[1]}
                      />
                    </linearGradient>
                  </defs>
                </svg>
                {transactionCategory.description}
              </div>
              <div className="transaction_account">
                <svg
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
                    fill={`url(#${transactionAccount.description.replaceAll(
                      ' ',
                      '_',
                    )})`}
                  ></rect>
                  <defs>
                    <linearGradient
                      id={transactionAccount.description.replaceAll(' ', '_')}
                      x1="0"
                      y1="0"
                      x2="34"
                      y2="11.5"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor={transactionAccount.color[0]} />
                      <stop
                        offset="1"
                        stopColor={transactionAccount.color[1]}
                      />
                    </linearGradient>
                  </defs>
                </svg>
                {transactionAccount.description}
              </div>
              <div
                className={`transaction_${transaction.transactionType}_amount`}
              >
                {formatDineroOutput(dinero(transaction.amount), 'USD')}
              </div>
              <div className="transaction_date">
                {dateFormatter.format(new Date(transaction.date))}
              </div>
              {renderNotes(transaction.notes)}
              <div className="transaction_item_buttons">
                <Link to={`${pages.transactions.info.main}/${transaction.id}`}>
                  <EditIcon />
                </Link>
                <DeleteIcon
                  onClick={() => {
                    const newBalance = createNewBalance(transaction, accounts);
                    dispatch(
                      editAccount(transactionAccount.id, {
                        ...transactionAccount,
                        balance: newBalance,
                      }),
                    );
                    idbAddItem(
                      { ...transactionAccount, balance: newBalance },
                      'accounts',
                    );
                    dispatch(deleteTransaction(transaction.id));
                    idbDeleteItem(transaction.id, 'transactions');
                  }}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div>{t('TRANSACTIONS.NO_TRANSACTIONS')}</div>
      )}
    </React.Fragment>
  );
}

TransactionsList.propTypes = {
  transactions: PropTypes.array,
  accounts: PropTypes.array,
  categories: PropTypes.array,
  deleteTransaction: PropTypes.func,
  editAccount: PropTypes.func,
};

export default TransactionsList;
