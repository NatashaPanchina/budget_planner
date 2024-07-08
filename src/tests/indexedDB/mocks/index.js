export const mockCategory = {
  id: '125e20e0-72c6-494a-848b-e3ac9c0bf130',
  creationDate: 1718305200000,
  visible: true,
  archived: false,
  type: 'income',
  description: 'Awards',
  color: ['#45E9FF', '#4579FF'],
  icon: 128184,
  date: '06/14/2024',
  notes: '',
  tags: [''],
};

export const mockTransaction = {
  id: '01b5b210-8883-4f02-a89a-3e77664f6e8c',
  creationDate: 1699722082303,
  transactionType: 'income',
  category: '656e20e0-72c6-494a-848b-e3ac9c0bf147',
  account: 'b41b8e1d-4552-432a-9864-4f4a9971cdb2',
  amount: {
    amount: 300000,
    currency: {
      code: 'USD',
      base: 10,
      exponent: 2,
    },
    scale: 2,
  },
  mainCurrencyAmount: {
    amount: 300000,
    currency: {
      code: 'USD',
      base: 10,
      exponent: 2,
    },
    scale: 2,
  },
  formatAmount: '3000.00',
  date: '06/13/2024',
  notes: '',
  tags: [''],
};
