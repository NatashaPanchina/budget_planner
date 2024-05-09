import { dinero, add, isZero, compare } from 'dinero.js';
import { currencies } from '../../../../../utils/constants/currencies';
import { toStringDate } from '../../../../../utils/format/date';

export function createTableData(
  { transactions, categories, tableFilter, date },
  mainCurrency,
) {
  switch (tableFilter) {
    case 'expenses':
      return createExpensesData(transactions, categories, date, mainCurrency);
    case 'incomes':
      return createIncomesData(transactions, categories, date, mainCurrency);
    case 'transfers':
      return [];
    case 'accounts':
      return [];
    default:
      return [];
  }
}

function createExpensesData(transactions, categories, date, mainCurrency) {
  let expensesData = [];
  categories.forEach((category) => {
    const dataItem = {
      category,
      sum: transactions
        .filter((transaction) => {
          const transactionDate = transaction.date;
          return (
            transaction.transactionType === 'expense' &&
            transaction.category === category.id &&
            transactionDate >= toStringDate(date.from) &&
            transactionDate <= toStringDate(date.to)
          );
        })
        .reduce(
          (sum, transaction) =>
            add(sum, dinero(transaction.mainCurrencyAmount)),
          dinero({ amount: 0, currency: currencies[mainCurrency] }),
        ),
    };
    if (!isZero(dataItem.sum)) expensesData.push(dataItem);
  });

  return expensesData.sort((a, b) => compare(b.sum, a.sum));
}

function createIncomesData(transactions, categories, date, mainCurrency) {
  let incomesData = [];
  categories.forEach((category) => {
    const dataItem = {
      category,
      sum: transactions
        .filter((transaction) => {
          const transactionDate = transaction.date;
          return (
            transaction.transactionType === 'income' &&
            transaction.category === category.id &&
            transactionDate >= toStringDate(date.from) &&
            transactionDate <= toStringDate(date.to)
          );
        })
        .reduce(
          (sum, transaction) =>
            add(sum, dinero(transaction.mainCurrencyAmount)),
          dinero({ amount: 0, currency: currencies[mainCurrency] }),
        ),
    };
    if (!isZero(dataItem.sum)) incomesData.push(dataItem);
  });
  return incomesData;
}
