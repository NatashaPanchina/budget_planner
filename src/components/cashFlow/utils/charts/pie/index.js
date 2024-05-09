import { dinero, add, toDecimal } from 'dinero.js';
import { currencies } from '../../../../../utils/constants/currencies';
import { toStringDate } from '../../../../../utils/format/date';

export function createPieData(
  { transactions, categories, chartFilter, date },
  mainCurrency,
) {
  switch (chartFilter) {
    case 'expenses':
      return createData(
        transactions,
        categories,
        date,
        mainCurrency,
        'expense',
      );
    case 'incomes':
      return createData(transactions, categories, date, mainCurrency, 'income');
    case 'transfers':
      return [];
    default:
      return [];
  }
}

function createData(
  transactions,
  categories,
  date,
  mainCurrency,
  transactionFilter,
) {
  let result = [];

  const filterCategories = categories.filter(
    (category) => category.type === transactionFilter,
  );

  filterCategories.forEach((category) => {
    let filteredTransactions = transactions.filter(
      (transaction) => transaction.category === category.id,
    );
    if (filteredTransactions.length) {
      const totalSum = toDecimal(
        transactions
          .filter((transaction) => {
            const transactionDate = transaction.date;
            return (
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
      );
      if (totalSum !== '0.00') {
        const dataItem = {
          category,
          sum: totalSum,
        };
        result.push(dataItem);
      }
    }
  });
  return result;
}
