import { dinero, add, toDecimal } from 'dinero.js';
import { createPeriod } from '../../period';
import { chartsColors } from '../../../../../utils/constants/chartsColors';
import { currencies } from '../../../../../utils/constants/currencies';

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
                const transactionDate = new Date(transaction.date);
                return (
                  transaction.transactionType === transactionFilter &&
                  transactionDate >= date.from &&
                  transactionDate <= date.to
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
                  (sum, transaction) =>
                    add(sum, dinero(transaction.mainCurrencyAmount)),
                  dinero({ amount: 0, currency: currencies[mainCurrency] }),
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
