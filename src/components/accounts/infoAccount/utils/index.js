import { compare, dinero, subtract, toDecimal, toSnapshot } from 'dinero.js';
import { currencies } from '../../../../utils/constants/currencies';
import { dineroFromFloat } from '../../../../utils/format/cash';
import { toStringDate } from '../../../../utils/format/date';
import {
  addNewCategory,
  addNewTransaction,
  editAccount,
} from '../../../../actions/Actions';
import { idbAddItem } from '../../../../indexedDB/IndexedDB';
import { convertCash } from '../../../../utils/rates';
import { v4 as uuidv4 } from 'uuid';
import { adjustmentsIds } from '../../../../utils/constants/balanceAdjustment';

export const doneEventHandler = async (
  categories,
  accounts,
  clickedAccount,
  id,
  creationDate,
  accountType,
  description,
  currency,
  balance,
  selectedColor,
  dateObj,
  notes,
  tags,
  dispatch,
  mainCurrency,
) => {
  let selectedAccount = accounts.find(
    (account) => account.id === clickedAccount,
  );
  if (!selectedAccount) return null;

  const prevMainCurrencyBalance = dinero(selectedAccount.mainCurrencyBalance);
  const prevBalance = dinero(selectedAccount.balance);

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
    id,
    creationDate,
    archived: false,
    type: accountType,
    description,
    formatBalance: toDecimal(newBalance),
    mainCurrencyBalance: toSnapshot(mainCurrencyBalance),
    balance: toSnapshot(newBalance),
    color: selectedColor,
    date,
    notes,
    tags,
  };
  dispatch(editAccount(clickedAccount, newAccount));
  idbAddItem(newAccount, 'accounts');

  let prevBalanceCurrency = toSnapshot(prevBalance).currency.code;
  let transactionAmount = dinero({ amount: 0, currency: currencies[currency] });
  let convertedPrevBalance = prevBalance;

  if (prevBalanceCurrency !== currency) {
    const convertedBalance = await convertCash(
      dateObj.format('YYYY-MM-DD'),
      Number(toDecimal(prevBalance)),
      prevBalanceCurrency,
      currency,
      mainCurrency,
    );
    const convertedDinero = dineroFromFloat({
      amount: convertedBalance,
      currency: currencies[currency],
      scale: 2,
    });
    convertedPrevBalance = convertedDinero;
  }

  const comparing = compare(convertedPrevBalance, newBalance);
  if (comparing === 0) {
    return;
  }

  const type = comparing === -1 ? 'income' : 'expense';
  let category = null;

  if (type === 'income') {
    category = categories.find(
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
  }
  if (type === 'expense') {
    category = categories.find(
      (category) => category.id === adjustmentsIds.expense,
    );

    if (!category) {
      const newCategory = {
        id: adjustmentsIds.expense,
        creationDate: Date.now(),
        visible: false,
        archived: false,
        type: 'expense',
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
  }

  transactionAmount =
    type === 'income'
      ? subtract(newBalance, convertedPrevBalance)
      : subtract(convertedPrevBalance, newBalance);

  const mainCurrencyAmount =
    type === 'income'
      ? subtract(mainCurrencyBalance, prevMainCurrencyBalance)
      : subtract(prevMainCurrencyBalance, mainCurrencyBalance);

  const newTransaction = {
    id: uuidv4(),
    creationDate: Date.now(),
    transactionType: type,
    category: category.id,
    account: newAccount.id,
    amount: toSnapshot(transactionAmount),
    formatAmount: toDecimal(transactionAmount),
    mainCurrencyAmount: toSnapshot(mainCurrencyAmount),
    date: toStringDate(new Date()),
    notes: '',
    tags: [''],
  };
  dispatch(addNewTransaction(newTransaction));
  idbAddItem(newTransaction, 'transactions');
};
