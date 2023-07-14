export const pages = {
  home: '/',
  transactions: {
    main: '/transactions',
    all: '/transactions/all',
    expenses: '/transactions/expenses',
    incomes: '/transactions/incomes',
    transfers: '/transactions/transfers',
    info: {
      main: '/transactions/infoTransaction',
    },
  },
  cash: {
    main: '/cash',
    all: '/cash/all',
    cards: '/cash/cards',
    cash: '/cash/cash',
    transfers: '/cash/transfers',
    trash: {
      main: '/cash/trash',
      all: '/cash/trash/all',
      cards: '/cash/trash/cards',
      cash: '/cash/trash/cash',
    },
    add: {
      card: '/cash/addAccount/card',
      cash: '/cash/addAccount/cash',
    },
    info: {
      main: '/cash/infoAccount',
    },
  },
  newTransaction: {
    main: '/newTransaction',
    expense: '/newTransaction/expense',
    income: '/newTransaction/income',
    transfer: '/newTransaction/transfer',
  },
  categories: {
    main: '/categories',
    all: '/categories/all',
    expenses: '/categories/expenses',
    incomes: '/categories/incomes',
    trash: {
      main: '/categories/trash',
      all: '/categories/trash/all',
      expenses: '/categories/trash/expenses',
      incomes: '/categories/trash/incomes',
    },
    add: {
      expense: '/categories/addCategory/expense',
      income: '/categories/addCategory/income',
    },
    info: {
      main: '/categories/infoCategory',
    },
  },
  analysis: {
    main: '/analysis',
  },
};
