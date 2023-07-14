import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import { v4 as uuidv4 } from 'uuid';

import { dinero, toSnapshot, toDecimal, add } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

import { idbAddItem } from '../../../indexedDB/IndexedDB.js';
import { dineroFromFloat } from '../../../utils/format/cash';
import {
  renderSelectedCategory,
  renderCategories,
  renderAccounts,
  renderSelectedAccount,
} from '../../transactions/utils';
import {
  hideElement,
  useOutsideClick,
} from '../../../hooks/useOutsideClick.js';

import { ReactComponent as PlusIcon } from '../../../assets/icons/shared/plus.svg';
import searchIcon from '../../../assets/icons/shared/search.svg';
import { pages } from '../../../utils/constants/pages.js';

function IncomeTransactionForm({
  categories,
  accounts,
  addNewTransaction,
  editAccount,
}) {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const [activeItem, setActiveItem] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  const transactionType = 'income';
  const [category, setCategory] = useState();
  const [account, setAccount] = useState();
  const [amount, setAmount] = useState(
    toDecimal(dinero({ amount: 0, currency: USD })),
  );
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [tags] = useState([]);

  const categoriesRef = useOutsideClick(hideElement);
  const accountsRef = useOutsideClick(hideElement);

  useEffect(() => {
    setFilteredAccounts(accounts);
    setFilteredCategories(categories);
    if (categories.length) setCategory(categories[0].id);
    if (accounts.length) setAccount(accounts[0].id);
  }, [accounts, categories]);

  return (
    <React.Fragment>
      <div
        className={`transaction_item ${
          activeItem === '1' ? `${transactionType}_active_item` : ''
        }`}
        onClick={() => setActiveItem('1')}
      >
        <div className="info_items">{t('NEW_TRANSACTION.CATEGORY')}</div>
        <div className="input_items">
          <div
            className="selected_category"
            onClick={(event) => {
              setActiveItem('1');
              categoriesRef.current.classList.toggle('none');
              accountsRef.current.classList.add('none');
              event.stopPropagation();
            }}
          >
            {category ? (
              renderSelectedCategory(category, filteredCategories)
            ) : (
              <Link to={pages.categories.add[transactionType]}>
                <PlusIcon />
                {t('NEW_TRANSACTION.ADD_CATEGORY')}
              </Link>
            )}
          </div>
        </div>
      </div>
      <div ref={categoriesRef} className="categories_list none">
        <div className="search">
          <input
            type="text"
            placeholder={t('NEW_TRANSACTION.SEARCH_CATEGORY')}
          ></input>
          <img src={searchIcon} alt="search" />
        </div>
        <div className="add_category_btn">
          <Link to={pages.categories.add[transactionType]}>
            <PlusIcon />
            {t('NEW_TRANSACTION.ADD_CATEGORY')}
          </Link>
        </div>
        {renderCategories(filteredCategories, setCategory)}
      </div>
      <div
        className={`transaction_item ${
          activeItem === '2' ? `${transactionType}_active_item` : ''
        }`}
        onClick={() => setActiveItem('2')}
      >
        <div className="info_items">{t('NEW_TRANSACTION.CASH')}</div>
        <div
          className="input_items"
          onClick={(event) => {
            setActiveItem('2');
            accountsRef.current.classList.toggle('none');
            categoriesRef.current.classList.add('none');
            event.stopPropagation();
          }}
        >
          {account ? (
            renderSelectedAccount(account, filteredAccounts)
          ) : (
            <Link to={pages.cash.add.card}>
              <PlusIcon />
              {t('NEW_TRANSACTION.ADD_CASH')}
            </Link>
          )}
        </div>
      </div>
      <div ref={accountsRef} className="accounts_list none">
        <div className="search">
          <input
            type="text"
            placeholder={t('NEW_TRANSACTION.SEARCH_CASH')}
          ></input>
          <img src={searchIcon} alt="search" />
        </div>
        <div className="add_category_btn">
          <Link to={pages.cash.add.card}>
            <PlusIcon />
            {t('NEW_TRANSACTION.ADD_CASH')}
          </Link>
        </div>
        {renderAccounts(filteredAccounts, setAccount)}
      </div>
      <div
        className={`transaction_item ${
          activeItem === '3' ? `${transactionType}_active_item` : ''
        }`}
        onClick={() => setActiveItem('3')}
      >
        <div className="info_items">{t('NEW_TRANSACTION.AMOUNT')}</div>
        <div className="input_items">
          ${' '}
          <NumericFormat
            thousandSeparator=","
            decimalSeparator="."
            decimalScale={2}
            allowNegative={false}
            placeholder="0.00"
            onValueChange={(values) => setAmount(values.floatValue)}
            value={amount}
          />
        </div>
      </div>
      <div
        className={`transaction_item ${
          activeItem === '4' ? `${transactionType}_active_item` : ''
        }`}
        onClick={() => setActiveItem('4')}
      >
        <div className="info_items">{t('NEW_TRANSACTION.DATE')}</div>
        <div className="input_items">
          <input
            type="date"
            onChange={(event) => setDate(new Date(event.target.value))}
          ></input>
        </div>
      </div>
      <div
        className={`transaction_item ${
          activeItem === '5' ? `${transactionType}_active_item` : ''
        }`}
        onClick={() => setActiveItem('5')}
      >
        <div className="info_items">{t('NEW_TRANSACTION.NOTES')}</div>
        <input
          type="text"
          onChange={(event) => setNotes(event.target.value)}
          defaultValue={notes}
        ></input>
      </div>
      <div
        className={`transaction_item ${
          activeItem === '6' ? `${transactionType}_active_item` : ''
        }`}
        onClick={() => setActiveItem('6')}
      >
        <div className="info_items">{t('NEW_TRANSACTION.TAGS')}</div>
        <input type="text"></input>
      </div>
      <div className="transactions_button_block">
        <div className="done_button_div">
          <Link to={`${pages.transactions[`${transactionType}s`]}/${account}`}>
            <button
              className={`${transactionType}_button`}
              onClick={() => {
                const newTransaction = {
                  id: uuidv4(),
                  transactionType,
                  category,
                  account,
                  amount: toSnapshot(
                    dineroFromFloat({ amount, currency: USD, scale: 2 }),
                  ),
                  date: date.toISOString(),
                  notes,
                  tags,
                };
                dispatch(addNewTransaction(newTransaction));
                idbAddItem(newTransaction, 'transactions');
                const transactionAccount = filteredAccounts.find(
                  (filteredAccount) => filteredAccount.id === account,
                );
                const previousBalance = dinero(transactionAccount.balance);
                const newBalance = toSnapshot(
                  add(
                    previousBalance,
                    dineroFromFloat({ amount, currency: USD, scale: 2 }),
                  ),
                );
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
              }}
            >
              {t('NEW_TRANSACTION.DONE')}
            </button>
          </Link>
        </div>
        <div className="cancel_button_div">
          <Link to={`${pages.transactions[`${transactionType}s`]}/${account}`}>
            <button className="account_cancel_button">
              {t('NEW_TRANSACTION.CANCEL')}
            </button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

IncomeTransactionForm.propTypes = {
  categories: PropTypes.array,
  accounts: PropTypes.array,
  addNewTransaction: PropTypes.func,
  editAccount: PropTypes.func,
};

export default IncomeTransactionForm;
