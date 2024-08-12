import { toDecimal, toSnapshot } from 'dinero.js';
import { currencies } from '../../../../utils/constants/currencies';
import { dineroFromFloat } from '../../../../utils/format/cash';
import { toStringDate } from '../../../../utils/format/date';
import { idbAddItem } from '../../../../indexedDB/IndexedDB';
import { v4 as uuidv4 } from 'uuid';
import {
  addNewAccount,
  addNewCategory,
  addNewTransaction,
} from '../../../../actions/Actions';
import { convertCash } from '../../../../utils/rates';
import { adjustmentsIds } from '../../../../utils/constants/balanceAdjustment';

export const cardDoneHandler = async (
  description,
  currency,
  balance,
  selectedColor,
  dateObj,
  notes,
  tags,
  categories,
  dispatch,
  mainCurrency,
) => {
  const date = toStringDate(new Date(dateObj.format()));
  const newBalance = dineroFromFloat({
    amount: balance,
    currency: currencies[currency],
    scale: 2,
  });

  let mainCurrencyBalance = newBalance;

  if (currency !== mainCurrency) {
    const convertedBalance = await convertCash(
      dateObj.format('YYYY-MM-DD'),
      Number(toDecimal(newBalance)),
      currency,
      mainCurrency,
      mainCurrency,
    );
    mainCurrencyBalance = dineroFromFloat({
      amount: convertedBalance,
      currency: currencies[mainCurrency],
      scale: 2,
    });
  }

  const newAccount = {
    id: uuidv4(),
    creationDate: Date.now(),
    archived: false,
    type: 'card',
    description,
    formatBalance: toDecimal(newBalance),
    mainCurrencyBalance: toSnapshot(mainCurrencyBalance),
    balance: toSnapshot(newBalance),
    color: selectedColor,
    date,
    notes,
    tags,
  };
  dispatch(addNewAccount(newAccount));
  idbAddItem(newAccount, 'accounts');
  //create a balance adjustment transaction
  let category = categories.find(
    (category) => category.id === adjustmentsIds.income,
  );
  if (!category) {
    const newCategory = {
      id: adjustmentsIds.income,
      creationDate: Date.now(),
      visible: false,
      archived: false,
      type: 'income',
      description: 'Balance adjustment',
      color: ['#45E9FF', '#4579FF'],
      icon: 128736,
      date: toStringDate(new Date()),
      notes: '',
      tags: [''],
    };
    category = newCategory;
    dispatch(addNewCategory(newCategory));
    idbAddItem(newCategory, 'categories');
  }
  const newTransaction = {
    id: uuidv4(),
    creationDate: Date.now(),
    transactionType: 'income',
    category: category.id,
    account: newAccount.id,
    amount: toSnapshot(newBalance),
    mainCurrencyAmount: toSnapshot(mainCurrencyBalance),
    formatAmount: toDecimal(newBalance),
    date,
    notes: '',
    tags: [''],
  };
  dispatch(addNewTransaction(newTransaction));
  idbAddItem(newTransaction, 'transactions');
};

export const cashDoneEventHandler = async (
  description,
  currency,
  balance,
  selectedColor,
  dateObj,
  notes,
  tags,
  categories,
  dispatch,
  mainCurrency,
) => {
  const date = toStringDate(new Date(dateObj.format()));
  const newBalance = dineroFromFloat({
    amount: balance,
    currency: currencies[currency],
    scale: 2,
  });

  let mainCurrencyBalance = newBalance;

  if (currency !== mainCurrency) {
    const convertedBalance = await convertCash(
      dateObj.format('YYYY-MM-DD'),
      Number(toDecimal(newBalance)),
      currency,
      mainCurrency,
      mainCurrency,
    );
    mainCurrencyBalance = dineroFromFloat({
      amount: convertedBalance,
      currency: currencies[mainCurrency],
      scale: 2,
    });
  }

  const newAccount = {
    id: uuidv4(),
    creationDate: Date.now(),
    archived: false,
    type: 'cash',
    description,
    formatBalance: toDecimal(newBalance),
    mainCurrencyBalance: toSnapshot(mainCurrencyBalance),
    balance: toSnapshot(newBalance),
    color: selectedColor,
    date,
    notes,
    tags,
  };
  dispatch(addNewAccount(newAccount));
  idbAddItem(newAccount, 'accounts');

  //create a balance adjustment transaction
  let category = categories.find(
    (category) => category.id === adjustmentsIds.income,
  );
  if (!category) {
    const newCategory = {
      id: adjustmentsIds.income,
      creationDate: Date.now(),
      visible: false,
      archived: false,
      type: 'income',
      description: 'Balance adjustment',
      color: ['#45E9FF', '#4579FF'],
      icon: 91,
      date: toStringDate(new Date()),
      notes: '',
      tags: [''],
    };
    category = newCategory;
    dispatch(addNewCategory(newCategory));
    idbAddItem(newCategory, 'categories');
  }

  const newTransaction = {
    id: uuidv4(),
    creationDate: Date.now(),
    transactionType: 'income',
    category: category.id,
    account: newAccount.id,
    amount: toSnapshot(newBalance),
    mainCurrencyAmount: toSnapshot(mainCurrencyBalance),
    formatAmount: toDecimal(newBalance),
    date,
    notes: '',
    tags: [''],
  };
  dispatch(addNewTransaction(newTransaction));
  idbAddItem(newTransaction, 'transactions');
};
