import { add, dinero, subtract, toDecimal, toSnapshot } from 'dinero.js';
import { currencies } from '../../../../utils/constants/currencies';
import { dineroFromFloat } from '../../../../utils/format/cash';
import { toStringDate } from '../../../../utils/format/date';
import { editAccount, editTransaction } from '../../../../actions/Actions';
import { idbAddItem } from '../../../../indexedDB/IndexedDB';
import { USD } from '@dinero.js/currencies';

function createNewBalance(prevTransaction, newTransaction, accounts) {
  const prevAccount = accounts.find(
    (account) => account.id === prevTransaction.account,
  );
  const newAccount = accounts.find(
    (account) => account.id === newTransaction.account,
  );

  if (!newAccount || !prevAccount) {
    return {
      prevAccountBalance: toSnapshot(dinero({ amount: 0, currency: USD })),
      newAccountBalance: toSnapshot(dinero({ amount: 0, currency: USD })),
    };
  }

  switch (newTransaction.transactionType) {
    case 'income':
      //если это один и тот же счет
      if (prevAccount === newAccount) {
        const prevAccountBalance = subtract(
          dinero(prevAccount.balance),
          dinero(prevTransaction.amount),
        );
        return {
          prevAccountBalance: toSnapshot(prevAccountBalance),
          newAccountBalance: toSnapshot(
            add(prevAccountBalance, dinero(newTransaction.amount)),
          ),
        };
      } else {
        return {
          prevAccountBalance: toSnapshot(
            subtract(
              dinero(prevAccount.balance),
              dinero(prevTransaction.amount),
            ),
          ),
          newAccountBalance: toSnapshot(
            add(dinero(newAccount.balance), dinero(newTransaction.amount)),
          ),
        };
      }
    case 'expense':
      if (prevAccount === newAccount) {
        const prevAccountBalance = add(
          dinero(prevAccount.balance),
          dinero(prevTransaction.amount),
        );
        return {
          prevAccountBalance: toSnapshot(prevAccountBalance),
          newAccountBalance: toSnapshot(
            subtract(prevAccountBalance, dinero(newTransaction.amount)),
          ),
        };
      } else {
        return {
          prevAccountBalance: toSnapshot(
            add(dinero(prevAccount.balance), dinero(prevTransaction.amount)),
          ),
          newAccountBalance: toSnapshot(
            subtract(dinero(newAccount.balance), dinero(newTransaction.amount)),
          ),
        };
      }
    default:
      return {
        prevAccountBalance: prevAccount.balance,
        newAccountBalance: newAccount.balance,
      };
  }
}

export const doneEventHandler = (
  clickedTransaction,
  id,
  transactionType,
  category,
  account,
  currency,
  amount,
  dateObj,
  notes,
  tags,
  prevTransaction,
  accounts,
  dispatch,
  mainCurrency,
) => {
  const newAmount = dineroFromFloat({
    amount,
    currency: currencies[currency],
    scale: 2,
  });
  const date = toStringDate(new Date(dateObj.format()));

  const newTransaction = {
    id,
    transactionType,
    category,
    account,
    amount: toSnapshot(newAmount),
    formatAmount: toDecimal(newAmount),
    date,
    notes,
    tags,
  };
  dispatch(editTransaction(clickedTransaction, newTransaction));
  idbAddItem(newTransaction, 'transactions');

  const balance = createNewBalance(prevTransaction, newTransaction, accounts);

  const prevTransactionAccount = accounts.find(
    (account) => account.id === prevTransaction.account,
  );
  if (prevTransactionAccount) {
    dispatch(
      editAccount({
        ...prevTransactionAccount,
        balance: balance.prevAccountBalance,
      }),
    );
    idbAddItem(
      { ...prevTransactionAccount, balance: balance.prevAccountBalance },
      'accounts',
    );
  }

  const newTransactionAccount = accounts.find(
    (account) => account.id === newTransaction.account,
  );
  if (newTransactionAccount) {
    dispatch(
      editAccount({
        ...newTransactionAccount,
        balance: balance.newAccountBalance,
      }),
    );
    idbAddItem(
      { ...newTransactionAccount, balance: balance.newAccountBalance },
      'accounts',
    );
  }
};
