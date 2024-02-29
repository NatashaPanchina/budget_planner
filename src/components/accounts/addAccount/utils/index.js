import { toDecimal, toSnapshot } from 'dinero.js';
import { currencies } from '../../../../utils/constants/currencies';
import { dineroFromFloat } from '../../../../utils/format/cash';
import { toStringDate } from '../../../../utils/format/date';
import { idbAddItem } from '../../../../indexedDB/IndexedDB';
import { v4 as uuidv4 } from 'uuid';
import { addNewAccount } from '../../../../actions/Actions';

export const cardDoneHandler = (
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
  const newAccount = {
    id: uuidv4(),
    archived: false,
    type: 'card',
    description,
    currency,
    formatBalance: toDecimal(newBalance),
    balance: toSnapshot(newBalance),
    color: selectedColor,
    date,
    notes,
    tags,
  };
  dispatch(addNewAccount(newAccount));
  idbAddItem(newAccount, 'accounts');
};

export const cashDoneEventHandler = (
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
  const newAccount = {
    id: uuidv4(),
    archived: false,
    type: 'cash',
    description,
    currency,
    formatBalance: toDecimal(newBalance),
    balance: toSnapshot(newBalance),
    color: selectedColor,
    date,
    notes,
    tags,
  };
  dispatch(addNewAccount(newAccount));
  idbAddItem(newAccount, 'accounts');
};
