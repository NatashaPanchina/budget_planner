export const pages = {
  home: '/',
  signup: '/signup',
  signin: '/signin',
  enterName: '/enterName',
  selectMainCurrency: '/selectMainCurrency',
  loadingDemo: '/loadingDemo',
  dashboard: '/dashboard',
  transactions: {
    main: '/transactions',
    all: '/transactions/all',
    expenses: '/transactions/expenses',
    incomes: '/transactions/incomes',
    transfers: '/transactions/transfers',
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
  },
  goals: {
    main: '/goals',
  },
  analysis: {
    main: '/analysis',
  },
  settings: {
    main: '/settings',
    account: '/settings/account',
    devices: '/settings/devices',
    security: '/settings/security',
    appearance: '/settings/appearance',
    language: '/settings/language',
    mainCurrency: '/settings/mainCurrency',
    notifications: '/settings/notifications',
    dataBackup: '/settings/dataBackup',
    storageUsage: '/settings/storageUsage',
    demo: '/settings/demo',
  },
  profile: '/settings/account',
  currency: 'settings/mainCurrency',
  accountDeleting: '/accountDeleting',
};
