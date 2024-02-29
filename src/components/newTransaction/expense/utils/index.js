import { dinero, subtract, toDecimal, toSnapshot } from 'dinero.js';
import { currencies } from '../../../../utils/constants/currencies';
import { dineroFromFloat } from '../../../../utils/format/cash';
import { toStringDate } from '../../../../utils/format/date';
import { idbAddItem } from '../../../../indexedDB/IndexedDB';
import { convertCash } from '../../../../utils/rates';
import { v4 as uuidv4 } from 'uuid';

export const doneEventClick = async (
  currency,
  amount,
  transactionType,
  category,
  account,
  date,
  notes,
  tags,
  filteredAccounts,
  dispatch,
  addNewTransaction,
  editAccount,
) => {
  const newAmount = dineroFromFloat({
    amount,
    currency: currencies[currency],
    scale: 2,
  });
  const newTransaction = {
    id: uuidv4(),
    transactionType,
    category,
    account,
    amount: toSnapshot(newAmount),
    formatAmount: toDecimal(newAmount),
    date: toStringDate(new Date(date.format())),
    notes,
    tags,
  };
  dispatch(addNewTransaction(newTransaction));
  idbAddItem(newTransaction, 'transactions');
  const transactionAccount = filteredAccounts.find(
    (filteredAccount) => filteredAccount.id === account,
  );
  if (!transactionAccount) {
    return;
  }
  const previousBalance = transactionAccount.balance;
  const previousBalanceDinero = dinero(previousBalance);
  let newBalance = previousBalance;
  if (previousBalance.currency.code === currency) {
    newBalance = toSnapshot(subtract(previousBalanceDinero, newAmount));
  } else {
    const to = previousBalance.currency.code;
    const convertedAmount = await convertCash(
      date.format('YYYY-MM-DD'),
      Number(toDecimal(newAmount)),
      currency,
      to,
    );
    const convertedDinero = dineroFromFloat({
      amount: convertedAmount,
      currency: currencies[to],
      scale: 2,
    });
    newBalance = toSnapshot(subtract(previousBalanceDinero, convertedDinero));
  }
  dispatch(
    editAccount(transactionAccount.id, {
      ...transactionAccount,
      balance: newBalance,
    }),
  );
  idbAddItem({ ...transactionAccount, balance: newBalance }, 'accounts');
};
