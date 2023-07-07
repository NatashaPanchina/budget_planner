import { dinero, add, isZero, compare } from "dinero.js";
import { USD } from "@dinero.js/currencies";

export function createTableData({
  transactions,
  categories,
  tableFilter,
  date,
}) {
  switch (tableFilter) {
    case "expenses":
      return createExpensesData(transactions, categories, date);
    case "incomes":
      return createIncomesData(transactions, categories, date);
    case "transfers":
      return [];
    case "accounts":
      return [];
    default:
      return [];
  }
}

function createExpensesData(transactions, categories, date) {
  let expensesData = [];
  categories.forEach((category) => {
    let dataItem = {
      category,
      sum: transactions
        .filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return (
            transaction.transactionType === "expense" &&
            transaction.category === category.id &&
            transactionDate >= date.from &&
            transactionDate <= date.to
          );
        })
        .reduce(
          (sum, transaction) => add(sum, dinero(transaction.amount)),
          dinero({ amount: 0, currency: USD })
        ),
    };
    if (!isZero(dataItem.sum)) expensesData.push(dataItem);
  });

  return expensesData.sort((a, b) => compare(b.sum, a.sum));
}

function createIncomesData(transactions, categories, date) {
  let incomesData = [];
  categories.forEach((category) => {
    let dataItem = {
      category,
      sum: transactions
        .filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return (
            transaction.transactionType === "income" &&
            transaction.category === category.id &&
            transactionDate >= date.from &&
            transactionDate <= date.to
          );
        })
        .reduce(
          (sum, transaction) => add(sum, dinero(transaction.amount)),
          dinero({ amount: 0, currency: USD })
        ),
    };
    if (!isZero(dataItem.sum)) incomesData.push(dataItem);
  });
  return incomesData;
}
