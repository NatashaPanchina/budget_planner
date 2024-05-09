import { dinero, add, toDecimal, subtract } from 'dinero.js';
import { createPeriod } from '../../period';
import { chartsColors } from '../../../../../utils/constants/chartsColors';
import { currencies } from '../../../../../utils/constants/currencies';
import { convertPeriod, toStringDate } from '../../../../../utils/format/date';

export function createBarData(
  {
    transactions,
    categories,
    chartFilter,
    isCompare,
    isDetailed,
    date,
    comparedDate,
  },
  mainCurrency,
) {
  const currentPeriod = createPeriod(date);
  const comparedPeriod = createPeriod(comparedDate);

  let dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  });

  switch (chartFilter) {
    case 'savings':
      return createData(
        isCompare,
        false,
        categories,
        transactions,
        currentPeriod,
        comparedPeriod,
        dateFormatter,
        date,
        mainCurrency,
        'savings',
      );
    case 'expensesToIncomes':
      return createExpensesToIncomesData(
        transactions,
        currentPeriod,
        dateFormatter,
        mainCurrency,
      );
    case 'expenses':
      return createData(
        isCompare,
        isDetailed,
        categories,
        transactions,
        currentPeriod,
        comparedPeriod,
        dateFormatter,
        date,
        mainCurrency,
        'expense',
      );
    case 'incomes':
      return createData(
        isCompare,
        isDetailed,
        categories,
        transactions,
        currentPeriod,
        comparedPeriod,
        dateFormatter,
        date,
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
  isCompare,
  isDetailed,
  categories,
  transactions,
  currentPeriod,
  comparedPeriod,
  dateFormatter,
  date,
  mainCurrency,
  transactionFilter,
) {
  //вместо проверки на savings сделать чтобы работало с expenses и income
  if (isCompare) {
    return createComparedData(
      transactions,
      currentPeriod,
      comparedPeriod,
      dateFormatter,
      date,
      mainCurrency,
      transactionFilter,
    );
  }
  if (isDetailed)
    return createDetailedData(
      categories,
      transactions,
      currentPeriod,
      dateFormatter,
      mainCurrency,
      transactionFilter,
    );
  return createSimpleData(
    transactions,
    currentPeriod,
    dateFormatter,
    mainCurrency,
    transactionFilter,
  );
}

function createSimpleData(
  transactions,
  currentPeriod,
  dateFormatter,
  mainCurrency,
  transactionFilter,
) {
  const filter = transactionFilter;

  const color =
    transactionFilter === 'expense'
      ? chartsColors.expenses
      : transactionFilter === 'income'
      ? chartsColors.incomes
      : chartsColors.savings;

  if (transactionFilter === 'savings') {
    return currentPeriod.map((date) => {
      const expenses = transactions
        .filter((transaction) => {
          const transactionDate = transaction.date;
          return (
            transaction.transactionType === 'expense' &&
            transactionDate >= toStringDate(date.from) &&
            transactionDate <= toStringDate(date.to)
          );
        })
        .reduce(
          (sum, transaction) =>
            add(sum, dinero(transaction.mainCurrencyAmount)),
          dinero({ amount: 0, currency: currencies[mainCurrency] }),
        );
      const incomes = transactions
        .filter((transaction) => {
          const transactionDate = transaction.date;
          return (
            transaction.transactionType === 'income' &&
            transactionDate >= toStringDate(date.from) &&
            transactionDate <= toStringDate(date.to)
          );
        })
        .reduce(
          (sum, transaction) =>
            add(sum, dinero(transaction.mainCurrencyAmount)),
          dinero({ amount: 0, currency: currencies[mainCurrency] }),
        );
      return {
        [`${filter}Color`]: color,
        date: dateFormatter.format(date.to),
        [filter]: toDecimal(subtract(incomes, expenses)),
      };
    });
  }
  return currentPeriod.map((date) => {
    return {
      [`${filter}sColor`]: color,
      date: dateFormatter.format(date.to),
      [`${filter}s`]: toDecimal(
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
  });
}

function createDetailedData(
  categories,
  transactions,
  currentPeriod,
  dateFormatter,
  mainCurrency,
  transactionFilter,
) {
  const filterCategories = categories.filter(
    (category) => category.type === transactionFilter,
  );
  let resultData = [];
  resultData = currentPeriod.map((date) => {
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
            ),
          };
        }
      }),
    );
  });
  return resultData;
}

function createExpensesToIncomesData(
  transactions,
  currentPeriod,
  dateFormatter,
  mainCurrency,
) {
  return currentPeriod.map((date) => {
    return {
      incomesColor: chartsColors.incomes,
      incomes: toDecimal(
        transactions
          .filter((transaction) => {
            const transactionDate = transaction.date;
            return (
              transaction.transactionType === 'income' &&
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
      expensesColor: chartsColors.expenses,
      expenses: toDecimal(
        transactions
          .filter((transaction) => {
            const transactionDate = transaction.date;
            return (
              transaction.transactionType === 'expense' &&
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
      date: dateFormatter.format(date.to),
    };
  });
}

function createComparedData(
  transactions,
  currentPeriod,
  comparedPeriod,
  dateFormatter,
  date,
  mainCurrency,
  transactionFilter,
) {
  const result = [];

  if (transactionFilter === 'savings') {
    for (let i = 0; i < currentPeriod.length; i++) {
      const currentDate = currentPeriod[i];
      const comparedDate = comparedPeriod[i];

      const currentExpenses = transactions
        .filter((transaction) => {
          const transactionDate = transaction.date;
          return (
            transaction.transactionType === 'expense' &&
            transactionDate >= toStringDate(currentDate.from) &&
            transactionDate <= toStringDate(currentDate.to)
          );
        })
        .reduce(
          (sum, transaction) =>
            add(sum, dinero(transaction.mainCurrencyAmount)),
          dinero({ amount: 0, currency: currencies[mainCurrency] }),
        );

      const currentIncomes = transactions
        .filter((transaction) => {
          const transactionDate = transaction.date;
          return (
            transaction.transactionType === 'income' &&
            transactionDate >= toStringDate(currentDate.from) &&
            transactionDate <= toStringDate(currentDate.to)
          );
        })
        .reduce(
          (sum, transaction) =>
            add(sum, dinero(transaction.mainCurrencyAmount)),
          dinero({ amount: 0, currency: currencies[mainCurrency] }),
        );

      const currentSavings = toDecimal(
        subtract(currentIncomes, currentExpenses),
      );

      const comparedExpenses = transactions
        .filter((transaction) => {
          const transactionDate = transaction.date;
          return (
            transaction.transactionType === 'expense' &&
            transactionDate >= toStringDate(comparedDate.from) &&
            transactionDate <= toStringDate(comparedDate.to)
          );
        })
        .reduce(
          (sum, transaction) =>
            add(sum, dinero(transaction.mainCurrencyAmount)),
          dinero({ amount: 0, currency: currencies[mainCurrency] }),
        );

      const comparedIncomes = transactions
        .filter((transaction) => {
          const transactionDate = transaction.date;
          return (
            transaction.transactionType === 'income' &&
            transactionDate >= toStringDate(comparedDate.from) &&
            transactionDate <= toStringDate(comparedDate.to)
          );
        })
        .reduce(
          (sum, transaction) =>
            add(sum, dinero(transaction.mainCurrencyAmount)),
          dinero({ amount: 0, currency: currencies[mainCurrency] }),
        );

      const comparedSavings = toDecimal(
        subtract(comparedIncomes, comparedExpenses),
      );

      const formatDate = dateFormatter
        .format(currentDate.to)
        .replace(/\D/g, '');

      result.push({
        [`${convertPeriod(currentDate.from, date.during, 'EN')} savingsColor`]:
          chartsColors.savings,
        [`${convertPeriod(comparedDate.from, date.during, 'EN')} savingsColor`]:
          chartsColors.comparedSavings,
        [`${convertPeriod(currentDate.from, date.during, 'EN')} savings`]:
          currentSavings,
        [`${convertPeriod(comparedDate.from, date.during, 'EN')} savings`]:
          comparedSavings,
        date: formatDate,
      });
    }
  }

  if (transactionFilter === 'expense') {
    for (let i = 0; i < currentPeriod.length; i++) {
      const currentDate = currentPeriod[i];
      const comparedDate = comparedPeriod[i];

      const currentExpenses = transactions
        .filter((transaction) => {
          const transactionDate = transaction.date;
          return (
            transaction.transactionType === 'expense' &&
            transactionDate >= toStringDate(currentDate.from) &&
            transactionDate <= toStringDate(currentDate.to)
          );
        })
        .reduce(
          (sum, transaction) =>
            add(sum, dinero(transaction.mainCurrencyAmount)),
          dinero({ amount: 0, currency: currencies[mainCurrency] }),
        );

      const comparedExpenses = transactions
        .filter((transaction) => {
          const transactionDate = transaction.date;
          return (
            transaction.transactionType === 'expense' &&
            transactionDate >= toStringDate(comparedDate.from) &&
            transactionDate <= toStringDate(comparedDate.to)
          );
        })
        .reduce(
          (sum, transaction) =>
            add(sum, dinero(transaction.mainCurrencyAmount)),
          dinero({ amount: 0, currency: currencies[mainCurrency] }),
        );

      const formatDate = dateFormatter
        .format(currentDate.to)
        .replace(/\D/g, '');

      result.push({
        [`${convertPeriod(currentDate.from, date.during, 'EN')} expensesColor`]:
          chartsColors.expenses,
        [`${convertPeriod(
          comparedDate.from,
          date.during,
          'EN',
        )} expensesColor`]: chartsColors.comparedExpenses,
        [`${convertPeriod(currentDate.from, date.during, 'EN')} expenses`]:
          toDecimal(currentExpenses),
        [`${convertPeriod(comparedDate.from, date.during, 'EN')} expenses`]:
          toDecimal(comparedExpenses),
        date: formatDate,
      });
    }
  }

  if (transactionFilter === 'income') {
    for (let i = 0; i < currentPeriod.length; i++) {
      const currentDate = currentPeriod[i];
      const comparedDate = comparedPeriod[i];

      const currentIncomes = transactions
        .filter((transaction) => {
          const transactionDate = transaction.date;
          return (
            transaction.transactionType === 'income' &&
            transactionDate >= toStringDate(currentDate.from) &&
            transactionDate <= toStringDate(currentDate.to)
          );
        })
        .reduce(
          (sum, transaction) =>
            add(sum, dinero(transaction.mainCurrencyAmount)),
          dinero({ amount: 0, currency: currencies[mainCurrency] }),
        );

      const comparedIncomes = transactions
        .filter((transaction) => {
          const transactionDate = transaction.date;
          return (
            transaction.transactionType === 'income' &&
            transactionDate >= toStringDate(comparedDate.from) &&
            transactionDate <= toStringDate(comparedDate.to)
          );
        })
        .reduce(
          (sum, transaction) =>
            add(sum, dinero(transaction.mainCurrencyAmount)),
          dinero({ amount: 0, currency: currencies[mainCurrency] }),
        );

      const formatDate = dateFormatter
        .format(currentDate.to)
        .replace(/\D/g, '');

      result.push({
        [`${convertPeriod(currentDate.from, date.during, 'EN')} incomesColor`]:
          chartsColors.incomes,
        [`${convertPeriod(comparedDate.from, date.during, 'EN')} incomesColor`]:
          chartsColors.comparedIncomes,
        [`${convertPeriod(currentDate.from, date.during, 'EN')} incomes`]:
          toDecimal(currentIncomes),
        [`${convertPeriod(comparedDate.from, date.during, 'EN')} incomes`]:
          toDecimal(comparedIncomes),
        date: formatDate,
      });
    }
  }

  return result;
}
