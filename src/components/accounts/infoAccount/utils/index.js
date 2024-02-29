import { toDecimal, toSnapshot } from 'dinero.js';
import { currencies } from '../../../../utils/constants/currencies';
import { dineroFromFloat } from '../../../../utils/format/cash';
import { toStringDate } from '../../../../utils/format/date';
import { editAccount } from '../../../../actions/Actions';
import { idbAddItem } from '../../../../indexedDB/IndexedDB';

export const doneEventHandler = (
  clickedAccount,
  id,
  accountType,
  description,
  currency,
  balance,
  selectedColor,
  dateObj,
  notes,
  tags,
  dispatch,
) => {
  const date = toStringDate(new Date(dateObj.format()));
  const newBalance = dineroFromFloat({
    amount: balance,
    currency: currencies[currency],
    scale: 2,
  });
  const newAccount = {
    id,
    archived: false,
    type: accountType,
    description,
    currency,
    formatBalance: toDecimal(newBalance),
    balance: toSnapshot(newBalance),
    color: selectedColor,
    date,
    notes,
    tags,
  };
  dispatch(editAccount(clickedAccount, newAccount));
  idbAddItem(newAccount, 'accounts');
};
