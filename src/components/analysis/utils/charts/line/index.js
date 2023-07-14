import { dinero, add, toDecimal } from 'dinero.js';
import { USD } from '@dinero.js/currencies';

import { createPeriod } from '../../period';

export function createLineData({
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
      return [
        ...createData(
          isDetailed,
          transactions,
          categories,
          period,
          dateFormatter,
          'expense',
        ),
        ...createData(
          isDetailed,
          transactions,
          categories,
          period,
          dateFormatter,
          'income',
        ),
      ];
    case 'expenses':
      return createData(
        isDetailed,
        transactions,
        categories,
        period,
        dateFormatter,
        'expense',
      );
    case 'incomes':
      return createData(
        isDetailed,
        transactions,
        categories,
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
  transactions,
  categories,
  period,
  dateFormatter,
  transactionFilter,
) {
  if (isDetailed) {
    return createDetailedData(
      transactions,
      categories,
      period,
      dateFormatter,
      transactionFilter,
    );
  }
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
  return [
    {
      id: `${transactionFilter}s`,
      color,
      data: period.map((date) => {
        return {
          x: dateFormatter.format(date.to),
          y: toDecimal(
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
      }),
    },
  ];
}

function createDetailedData(
  transactions,
  categories,
  period,
  dateFormatter,
  transactionFilter,
) {
  let result = [];

  //сначала находим все категории по типу chartFilter (expenses или incomes)
  let filterCategories = categories.filter(
    (category) => category.type === transactionFilter,
  );
  filterCategories.forEach((category) => {
    let filteredTransactions = transactions.filter(
      (transaction) => transaction.category === category.id,
    );
    //если длина filteredTransactions равна 0, значит этой категории в транзакциях нет, пропускаем
    if (filteredTransactions.length) {
      let dataItem = {
        id: category.description,
        color: category.color,
        data: period.map((date) => {
          return {
            x: dateFormatter.format(date.to),
            y: toDecimal(
              filteredTransactions
                .filter((transaction) => {
                  const transactionDate = new Date(transaction.date);
                  return (
                    transactionDate >= date.from && transactionDate <= date.to
                  );
                })
                .reduce(
                  (sum, transaction) => add(sum, dinero(transaction.amount)),
                  dinero({ amount: 0, currency: USD }),
                ),
            ),
          };
        }),
      };
      result.push(dataItem);
    }
  });
  return result;
}
