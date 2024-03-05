import { convertPeriod } from '../../../../utils/format/date';

export const renderKeys = (
  chartFilter,
  isDetailed,
  transactions,
  categories,
  date,
  isCompare,
  comparedDate,
) => {
  const first = convertPeriod(date.from, date.during, 'EN');
  const second = convertPeriod(comparedDate.from, comparedDate.during, 'EN');
  switch (chartFilter) {
    case 'savings':
      if (isCompare) {
        return [`${first} savings`, `${second} savings`];
      }
      return ['savings'];
    case 'expensesToIncomes':
      return ['expenses', 'incomes'];
    case 'expenses':
      if (isCompare) {
        return [`${first} expenses`, `${second} expenses`];
      }
      if (isDetailed) {
        return Array.from(
          new Set(
            transactions
              .filter((transaction) => {
                const transactionDate = new Date(transaction.date);
                return (
                  transaction.transactionType === 'expense' &&
                  transactionDate <= date.to &&
                  transactionDate >= date.from
                );
              })
              .map((transaction) => {
                return categories.find(
                  (category) => category.id === transaction.category,
                ).description;
              }),
          ),
        );
      }
      return ['expenses'];
    case 'incomes':
      if (isCompare) {
        return [`${first} incomes`, `${second} incomes`];
      }
      if (isDetailed) {
        return Array.from(
          new Set(
            transactions
              .filter((transaction) => transaction.transactionType === 'income')
              .map((transaction) => {
                return categories.find(
                  (category) => category.id === transaction.category,
                ).description;
              }),
          ),
        );
      }
      return ['incomes'];
    default:
      return [chartFilter];
  }
};
