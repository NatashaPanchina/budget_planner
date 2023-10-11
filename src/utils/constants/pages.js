export const pages = {
  home: '/',
  dashboard: '/dashboard',
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
  accounts: {
    main: '/accounts',
    all: '/accounts/all',
    cards: '/accounts/cards',
    cash: '/accounts/cash',
    trash: {
      main: '/accounts/trash',
      all: '/accounts/trash/all',
      cards: '/accounts/trash/cards',
      cash: '/accounts/trash/cash',
    },
    add: {
      card: '/accounts/addAccount/card',
      cash: '/accounts/addAccount/cash',
    },
    info: {
      main: '/accounts/infoAccount',
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
