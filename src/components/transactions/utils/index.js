import { add, dinero, subtract, toDecimal, toSnapshot } from 'dinero.js';
import { dineroFromFloat } from '../../../utils/format/cash';
import { currencies } from '../../../utils/constants/currencies';
import dayjs from 'dayjs';
import { convertCash } from '../../../utils/rates';

export function createLocaleTransactions(NAME, count) {
  const lastNumber = Number(String(count).match(/\d$/g)[0]);
  if (lastNumber === 0) {
    return `${NAME}.TRANSACTIONS.MORE_THAN_FIVE`;
  } else if (lastNumber === 1) {
    return `${NAME}.TRANSACTIONS.ONE`;
  } else if (lastNumber < 5) {
    return `${NAME}.TRANSACTIONS.LESS_THAN_FIVE`;
  } else if (lastNumber >= 5) {
    return `${NAME}.TRANSACTIONS.MORE_THAN_FIVE`;
  } else {
    return `${NAME}.TRANSACTIONS.MORE_THAN_FIVE`;
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
  if (!filterAccount) return '';
  if (!accounts.length) return '';
  if (filterAccount === 'all') return accounts[0].id;
  return filterAccount;
}

export const getTotalBalance = async (mainCurrency, data) => {
  return await data.reduce(
    async (sum, account) => {
      let balance = account.balance;
      let dineroBalance = dinero(balance);
      if (balance.currency.code !== mainCurrency) {
        const date = dayjs(new Date(account.date)).format('YYYY-MM-DD');
        const amount = Number(toDecimal(dineroBalance));
        balance = await convertCash(
          date,
          amount,
          balance.currency.code,
          mainCurrency,
          mainCurrency,
        );
        dineroBalance = dineroFromFloat({
          amount: balance,
          currency: currencies[mainCurrency],
          scale: 2,
        });
      }
      return add(await sum, dineroBalance);
    },
    dinero({ amount: 0, currency: currencies[mainCurrency] }),
  );
};

export const createNewBalance = async (
  prevTransaction,
  newTransaction,
  accounts,
  mainCurrency,
) => {
  const prevAccount = accounts.find(
    (account) => account.id === prevTransaction.account,
  );
  const newAccount = accounts.find(
    (account) => account.id === newTransaction.account,
  );

  if (!newAccount || !prevAccount) {
    return {
      prevAccountBalance: toSnapshot(
        dinero({ amount: 0, currency: currencies.USD }),
      ),
      newAccountBalance: toSnapshot(
        dinero({ amount: 0, currency: currencies.USD }),
      ),
    };
  }

  let prevAccountBalance = dinero(prevAccount.balance),
    newAccountBalance = dinero(newAccount.balance);
  let prevAccountCurrency = prevAccount.balance.currency.code,
    newAccountCurrency = newAccount.balance.currency.code;
  let convertedPrevAmount = dinero(prevTransaction.amount),
    convertedNewAmount = dinero(newTransaction.amount);
  let prevTransactionCurrency = prevTransaction.amount.currency.code,
    newTransactionCurrency = newTransaction.amount.currency.code;

  //check if amount's currency other than account's one
  if (prevAccountCurrency !== prevTransactionCurrency) {
    const date = dayjs(new Date(prevTransaction.date)).format('YYYY-MM-DD');
    const amount = Number(toDecimal(dinero(prevTransaction.amount)));
    const convertedAmount = await convertCash(
      date,
      amount,
      prevTransactionCurrency,
      prevAccountCurrency,
      mainCurrency,
    );
    convertedPrevAmount = dineroFromFloat({
      amount: convertedAmount,
      currency: currencies[prevAccountCurrency],
      scale: 2,
    });
  }
  if (newAccountCurrency !== newTransactionCurrency) {
    const date = dayjs(new Date(newTransaction.date)).format('YYYY-MM-DD');
    const amount = Number(toDecimal(dinero(newTransaction.amount)));
    const convertedAmount = await convertCash(
      date,
      amount,
      newTransactionCurrency,
      newAccountCurrency,
      mainCurrency,
    );
    convertedNewAmount = dineroFromFloat({
      amount: convertedAmount,
      currency: currencies[newAccountCurrency],
      scale: 2,
    });
  }

  switch (newTransaction.transactionType) {
    case 'income':
      //если это один и тот же счет
      if (prevAccount === newAccount) {
        const balance = subtract(prevAccountBalance, convertedPrevAmount);
        return {
          prevAccountBalance: toSnapshot(add(balance, convertedNewAmount)),
          newAccountBalance: toSnapshot(add(balance, convertedNewAmount)),
        };
      }
      return {
        prevAccountBalance: toSnapshot(
          subtract(prevAccountBalance, convertedPrevAmount),
        ),
        newAccountBalance: toSnapshot(
          add(newAccountBalance, convertedNewAmount),
        ),
      };

    case 'expense':
      if (prevAccount === newAccount) {
        const balance = add(prevAccountBalance, convertedPrevAmount);
        return {
          prevAccountBalance: toSnapshot(subtract(balance, convertedNewAmount)),
          newAccountBalance: toSnapshot(subtract(balance, convertedNewAmount)),
        };
      }
      return {
        prevAccountBalance: toSnapshot(
          add(prevAccountBalance, convertedPrevAmount),
        ),
        newAccountBalance: toSnapshot(
          subtract(newAccountBalance, convertedNewAmount),
        ),
      };
    default:
      return {
        prevAccountBalance: toSnapshot(prevAccountBalance),
        newAccountBalance: toSnapshot(newAccountBalance),
      };
  }
};
