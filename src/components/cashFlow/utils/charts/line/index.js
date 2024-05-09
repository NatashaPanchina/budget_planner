import { dinero, add, toDecimal } from 'dinero.js';
import { createPeriod } from '../../period';
import { chartsColors } from '../../../../../utils/constants/chartsColors';
import { currencies } from '../../../../../utils/constants/currencies';
import { toStringDate } from '../../../../../utils/format/date';

export function createLineData(
  { transactions, categories, chartFilter, isDetailed, date },
  mainCurrency,
) {
  const period = createPeriod(date);

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
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
          mainCurrency,
          'expense',
        ),
        ...createData(
          isDetailed,
          transactions,
          categories,
          period,
          dateFormatter,
          mainCurrency,
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
        mainCurrency,
        'expense',
      );
    case 'incomes':
      return createData(
        isDetailed,
        transactions,
        categories,
        period,
        dateFormatter,
        mainCurrency,
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
  mainCurrency,
  transactionFilter,
) {
  if (isDetailed) {
    return createDetailedData(
      transactions,
      categories,
      period,
      dateFormatter,
      mainCurrency,
      transactionFilter,
    );
  }
  return createSimpleData(
    transactions,
    period,
    dateFormatter,
    mainCurrency,
    transactionFilter,
  );
}

function createSimpleData(
  transactions,
  period,
  dateFormatter,
  mainCurrency,
  transactionFilter,
) {
  const color =
    transactionFilter === 'expense'
      ? chartsColors.expenses
      : chartsColors.incomes;

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
                const transactionDate = transaction.date;
                return (
                  transaction.transactionType === transactionFilter &&
                  transactionDate >= toStringDate(date.from) &&
                  transactionDate <= toStringDate(date.to)
                );
              })
              .reduce(
                (sum, transaction) =>
                  add(sum, dinero(transaction.mainCurrencyAmount)),
                dinero({ amount: 0, currency: currencies[mainCurrency] }),
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
  mainCurrency,
  transactionFilter,
) {
  const result = [];

  //сначала находим все категории по типу chartFilter (expenses или incomes)
  const filterCategories = categories.filter(
    (category) => category.type === transactionFilter,
  );
  filterCategories.forEach((category) => {
    const filteredTransactions = transactions.filter(
      (transaction) => transaction.category === category.id,
    );
    //если длина filteredTransactions равна 0, значит этой категории в транзакциях нет, пропускаем
    if (filteredTransactions.length) {
      const dataItem = {
        id: category.description,
        color: category.color,
        data: period.map((date) => {
          return {
            x: dateFormatter.format(date.to),
            y: toDecimal(
              filteredTransactions
                .filter((transaction) => {
                  const transactionDate = transaction.date;
                  return (
                    transactionDate >= toStringDate(date.from) &&
                    transactionDate <= toStringDate(date.to)
                  );
                })
                .reduce(
                  (sum, transaction) =>
                    add(sum, dinero(transaction.mainCurrencyAmount)),
                  dinero({ amount: 0, currency: currencies[mainCurrency] }),
                ),
            ),
          };
        }),
      };
      const totalSum = dataItem.data.reduce((sum, item) => {
        return sum + Number(item.y);
      }, 0);
      if (totalSum > 0) {
        result.push(dataItem);
      }
    }
  });
  return result;
}
