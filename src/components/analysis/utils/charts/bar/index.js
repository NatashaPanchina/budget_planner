import { dinero, add, toDecimal } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

import { createPeriod } from '../../period';

export function createBarData({
  transactions,
  categories,
  chartFilter,
  isDetailed,
  date,
}) {
  let period = createPeriod(date);
  let dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  });
  switch (chartFilter) {
    case 'expensesToIncomes':
      return createExpensesToIncomesData(transactions, period, dateFormatter);
    case 'expenses':
      return createData(
        isDetailed,
        categories,
        transactions,
        period,
        dateFormatter,
        'expense',
      );
    case 'incomes':
      return createData(
        isDetailed,
        categories,
        transactions,
        period,
        dateFormatter,
        'income',
      );
    case 'transfers':
      return [];
    default:
      return [];
  }
}

function createData(
  isDetailed,
  categories,
  transactions,
  period,
  dateFormatter,
  transactionFilter,
) {
  if (isDetailed)
    return createDetailedData(
      categories,
      transactions,
      period,
      dateFormatter,
      transactionFilter,
    );
  return createSimpleData(
    transactions,
    period,
    dateFormatter,
    transactionFilter,
  );
}

function createSimpleData(
  transactions,
  period,
  dateFormatter,
  transactionFilter,
) {
  let color =
    transactionFilter === 'expense'
      ? ['#FF599F', '#F4395B']
      : ['#B3FF53', '#6EBD0A'];
  return period.map((date) => {
    return {
      [`${transactionFilter}sColor`]: color,
      date: dateFormatter.format(date.to),
      [`${transactionFilter}s`]: toDecimal(
        transactions
          .filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            return (
              transaction.transactionType === transactionFilter &&
              transactionDate >= date.from &&
              transactionDate <= date.to
            );
          })
          .reduce(
            (sum, transaction) => add(sum, dinero(transaction.amount)),
            dinero({ amount: 0, currency: USD }),
          ),
      ),
    };
  });
}

function createDetailedData(
  categories,
  transactions,
  period,
  dateFormatter,
  transactionFilter,
) {
  let filterCategories = categories.filter(
    (category) => category.type === transactionFilter,
  );
  let resultData = [];
  resultData = period.map((date) => {
    return Object.assign(
      {
        date: dateFormatter.format(date.to),
      },
      ...filterCategories.map((category) => {
        let filteredTransactions = transactions.filter(
          (transaction) => transaction.category === category.id,
        );
        if (filteredTransactions.length) {
          return {
            [`${category.description}Color`]: category.color,
            [category.description]: toDecimal(
              filteredTransactions
                .filter((transaction) => {
                  const transactionDate = new Date(transaction.date);
                  return (
                    transaction.category === category.id &&
                    transactionDate >= date.from &&
                    transactionDate <= date.to
                  );
                })
                .reduce(
                  (sum, transaction) => add(sum, dinero(transaction.amount)),
                  dinero({ amount: 0, currency: USD }),
                ),
            ),
          };
        }
      }),
    );
  });
  return resultData;
}

function createExpensesToIncomesData(transactions, period, dateFormatter) {
  return period.map((date) => {
    return {
      incomesColor: ['#B3FF53', '#6EBD0A'],
      incomes: toDecimal(
        transactions
          .filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            return (
              transaction.transactionType === 'income' &&
              transactionDate >= date.from &&
              transactionDate <= date.to
            );
          })
          .reduce(
            (sum, transaction) => add(sum, dinero(transaction.amount)),
            dinero({ amount: 0, currency: USD }),
          ),
      ),
      expensesColor: ['#FF599F', '#F4395B'],
      expenses: toDecimal(
        transactions
          .filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            return (
              transaction.transactionType === 'expense' &&
              transactionDate >= date.from &&
              transactionDate <= date.to
            );
          })
          .reduce(
            (sum, transaction) => add(sum, dinero(transaction.amount)),
            dinero({ amount: 0, currency: USD }),
          ),
      ),
      date: dateFormatter.format(date.to),
    };
  });
}
