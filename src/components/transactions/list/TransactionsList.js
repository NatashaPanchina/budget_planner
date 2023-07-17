import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { dinero } from 'dinero.js';

import { formatDineroOutput } from '../../../utils/format/cash';
import { idbAddItem, idbDeleteItem } from '../../../indexedDB/IndexedDB';
import { dateFormatter } from '../../../utils/format/date';

import { categoryIcons } from '../../../utils/constants/icons';
import searchIcon from '../../../assets/icons/shared/search.svg';
import { ReactComponent as PlusIcon } from '../../../assets/icons/shared/plus.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/shared/editTransaction.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/shared/deleteTransaction.svg';

import { useDispatch } from 'react-redux';
import {
  createNewBalance,
  renderNotes,
  createFiltertype,
  createFilterAccount,
  filterByType,
  filterByAccounts,
} from './utils';
import { pages } from '../../../utils/constants/pages';
import {
  Account,
  Amount,
  Category,
  TransactionDate,
  Description,
  TransactionItem,
  TransactionsTitleContainer,
  TransactionsTitleLink,
  CategorySvg,
  AccountSvg,
  ItemButtonSvg,
  ItemButtonsContainer,
} from '../Transactions.styled';
import {
  AddButton,
  AddButtonSvg,
  Search,
  SearchImg,
  SearchInput,
} from '../../../theme/global';

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
      <TransactionsTitleContainer>
        <TransactionsTitleLink
          to={`${pages.transactions.all}/${filterAccount}`}
        >
          {t('TRANSACTIONS.ALL')}
        </TransactionsTitleLink>
        <TransactionsTitleLink
          to={`${pages.transactions.expenses}/${filterAccount}`}
        >
          {t('TRANSACTIONS.FILTER_EXPENSES')}
        </TransactionsTitleLink>
        <TransactionsTitleLink
          to={`${pages.transactions.incomes}/${filterAccount}`}
        >
          {t('TRANSACTIONS.FILTER_INCOMES')}
        </TransactionsTitleLink>
        <TransactionsTitleLink
          to={`${pages.transactions.transfers}/${filterAccount}`}
        >
          {t('TRANSACTIONS.FILTER_TRANSFERS')}
        </TransactionsTitleLink>
      </TransactionsTitleContainer>
      <Search>
        <SearchInput
          type="text"
          placeholder={t('TRANSACTIONS.SEARCH')}
        ></SearchInput>
        <SearchImg src={searchIcon} alt="search" />
      </Search>
      <AddButton
        to={`${pages.newTransaction[transactionType]}/${transactionAccount}`}
      >
        <AddButtonSvg as={PlusIcon} />
        {t('TRANSACTIONS.NEW_TRANSACTION')}
      </AddButton>
      <Description>
        <span>{t('TRANSACTIONS.CATEGORY')}</span>
        <span>{t('TRANSACTIONS.CASH')}</span>
        <span>{t('TRANSACTIONS.AMOUNT')}</span>
        <span>{t('TRANSACTIONS.DATE')}</span>
      </Description>
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
            <TransactionItem key={transaction.id}>
              <Category>
                <CategorySvg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="19"
                    cy="19"
                    r="19"
                    fill={`url(#${index})`}
                  ></circle>
                  <Icon height="24" width="24" x="7" y="7" />
                  <defs>
                    <linearGradient
                      id={index}
                      x1="0"
                      y1="0"
                      x2="38"
                      y2="38"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor={transactionCategory.color[0]} />
                      <stop
                        offset="1"
                        stopColor={transactionCategory.color[1]}
                      />
                    </linearGradient>
                  </defs>
                </CategorySvg>
                {transactionCategory.description}
              </Category>
              <Account>
                <AccountSvg
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
                </AccountSvg>
                {transactionAccount.description}
              </Account>
              <Amount $amountType={transaction.transactionType}>
                {formatDineroOutput(dinero(transaction.amount), 'USD')}
              </Amount>
              <TransactionDate>
                {dateFormatter.format(new Date(transaction.date))}
              </TransactionDate>
              {renderNotes(transaction.notes)}
              <ItemButtonsContainer>
                <Link to={`${pages.transactions.info.main}/${transaction.id}`}>
                  <ItemButtonSvg as={EditIcon} />
                </Link>
                <ItemButtonSvg
                  as={DeleteIcon}
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
              </ItemButtonsContainer>
            </TransactionItem>
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
