import { dinero, add, toDecimal } from "dinero.js";
import { USD } from "@dinero.js/currencies";

export function createPieData({ transactions, categories, chartFilter, date }) {
  switch (chartFilter) {
    case "expenses":
      return createData(transactions, categories, date, "expense");
    case "incomes":
      return createData(transactions, categories, date, "income");
    case "transfers":
      return [];
    default:
      return [];
  }
}

function createData(transactions, categories, date, transactionFilter) {
  let result = [];

  let filterCategories = categories.filter(
    (category) => category.type === transactionFilter
  );

  filterCategories.forEach((category) => {
    let filteredTransactions = transactions.filter(
      (transaction) => transaction.category === category.id
    );
    if (filteredTransactions.length) {
      let dataItem = {
        category,
        sum: toDecimal(
          transactions
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
              dinero({ amount: 0, currency: USD })
            )
        ),
      };
      result.push(dataItem);
    }
  });
  return result;
}
