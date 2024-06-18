export const mockDbData = {
  profile: {
    id: '7bd41b93-5361-45f7-8161-5fc8fc939042',
    providerId: 'google.com',
    displayName: 'Natalie',
    email: 'pancnatasha@gmail.com',
    emailVerified: true,
    createdAt: '1706171362457',
    lastLoginAt: '1706189250431',
    phoneNumber: null,
    photoURL: null,
    currency: 'USD',
    backupDate: 1699722082303,
  },
  accounts: {
    fetching: false,
    accounts: [
      {
        id: 'b41b8e1d-4552-432a-9864-4f4a9971cdb2',
        creationDate: 1699722082303,
        archived: false,
        type: 'card',
        description: 'Sberbank',
        formatBalance: '2500.00',
        mainCurrencyBalance: {
          amount: 250000,
          currency: {
            code: 'USD',
            base: 10,
            exponent: 2,
          },
          scale: 2,
        },
        balance: {
          amount: 250000,
          currency: {
            code: 'USD',
            base: 10,
            exponent: 2,
          },
          scale: 2,
        },
        color: ['#07CC32', '#009B76'],
        date: '06/14/2023',
        notes: '',
        tags: [''],
      },
      {
        id: 'c3da7abe-3d29-4e8e-b350-ea13915a7d72',
        creationDate: 1699722082303,
        archived: false,
        type: 'cash',
        description: 'Wallet',
        formatBalance: '900.70',
        mainCurrencyBalance: {
          amount: 90070,
          currency: {
            code: 'USD',
            base: 10,
            exponent: 2,
          },
          scale: 2,
        },
        balance: {
          amount: 90070,
          currency: {
            code: 'USD',
            base: 10,
            exponent: 2,
          },
          scale: 2,
        },
        color: ['#FFB340', '#FF5353'],
        date: '06/14/2023',
        notes: '',
        tags: [''],
      },
    ],
  },
  categories: {
    categories: [
      {
        id: '656e20e0-72c6-494a-848b-e3ac9c0bf147',
        creationDate: 1699722082303,
        visible: true,
        archived: false,
        type: 'income',
        description: 'Salary',
        color: ['#45E9FF', '#4579FF'],
        icon: 128184,
        date: '06/14/2023',
        notes: '',
        tags: [''],
      },
      {
        id: 'd9361853-bfe4-4dbf-afb0-937ab2240a60',
        creationDate: 1699722082303,
        visible: true,
        archived: false,
        type: 'expense',
        description: 'Medicine',
        color: ['#FF9D0B', '#FF234B'],
        icon: 128138,
        date: '06/14/2023',
        notes: '',
        tags: [''],
      },
      {
        id: '9c62223b-fbdf-4ef6-bfd0-358c96ebf774',
        creationDate: 1699722082303,
        visible: true,
        archived: false,
        type: 'expense',
        description: 'Utilities',
        color: ['#D0E917', '#91D607'],
        icon: 9889,
        date: '06/14/2023',
        notes: '',
        tags: [''],
      },
    ],
  },
  transactions: {
    transactions: [
      {
        id: '561bed15-5693-4b6b-8f4d-3ddc074e0c85',
        creationDate: 1699722082303,
        transactionType: 'expense',
        category: 'd9361853-bfe4-4dbf-afb0-937ab2240a60',
        account: 'b41b8e1d-4552-432a-9864-4f4a9971cdb2',
        amount: {
          amount: 15000,
          currency: {
            code: 'USD',
            base: 10,
            exponent: 2,
          },
          scale: 2,
        },
        mainCurrencyAmount: {
          amount: 15000,
          currency: {
            code: 'USD',
            base: 10,
            exponent: 2,
          },
          scale: 2,
        },
        formatAmount: '150.00',
        date: '04/30/2024',
        notes: 'L-carnitine, Collagen, Vitamins B, C',
        tags: [''],
      },
      {
        id: '7d246f83-6532-4eea-98a0-2978be114789',
        creationDate: 1699722082303,
        transactionType: 'expense',
        category: '9c62223b-fbdf-4ef6-bfd0-358c96ebf774',
        account: 'b41b8e1d-4552-432a-9864-4f4a9971cdb2',
        amount: {
          amount: 5000,
          currency: {
            code: 'USD',
            base: 10,
            exponent: 2,
          },
          scale: 2,
        },
        mainCurrencyAmount: {
          amount: 5000,
          currency: {
            code: 'USD',
            base: 10,
            exponent: 2,
          },
          scale: 2,
        },
        formatAmount: '50.00',
        date: '04/06/2024',
        notes: '',
        tags: [''],
      },
      {
        id: '6797457d-ffcb-4ae6-9a7f-43de65c755ce',
        creationDate: 1699722082303,
        transactionType: 'expense',
        category: '9c62223b-fbdf-4ef6-bfd0-358c96ebf774',
        account: 'b41b8e1d-4552-432a-9864-4f4a9971cdb2',
        amount: {
          amount: 25000,
          currency: {
            code: 'USD',
            base: 10,
            exponent: 2,
          },
          scale: 2,
        },
        mainCurrencyAmount: {
          amount: 25000,
          currency: {
            code: 'USD',
            base: 10,
            exponent: 2,
          },
          scale: 2,
        },
        formatAmount: '250.00',
        date: '04/10/2024',
        notes: '',
        tags: [''],
      },
      {
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
        date: '04/13/2024',
        notes: '',
        tags: [''],
      },
      {
        id: 'd54cf1d9-5672-46ae-81b1-7e3403dab21b',
        creationDate: 1699722082303,
        transactionType: 'income',
        category: '656e20e0-72c6-494a-848b-e3ac9c0bf147',
        account: 'c3da7abe-3d29-4e8e-b350-ea13915a7d72',
        amount: {
          amount: 50000,
          currency: {
            code: 'USD',
            base: 10,
            exponent: 2,
          },
          scale: 2,
        },
        mainCurrencyAmount: {
          amount: 50000,
          currency: {
            code: 'USD',
            base: 10,
            exponent: 2,
          },
          scale: 2,
        },
        formatAmount: '500.00',
        date: '04/21/2024',
        notes: '',
        tags: [''],
      },
      {
        id: '31287fa2-3e1f-44a5-b124-d3d2f490b601',
        creationDate: 1699722082303,
        transactionType: 'income',
        category: '8bad08aa-3cb0-42f1-bb4d-49622e7826b1',
        account: 'b41b8e1d-4552-432a-9864-4f4a9971cdb2',
        amount: {
          amount: 50000,
          currency: {
            code: 'USD',
            base: 10,
            exponent: 2,
          },
          scale: 2,
        },
        mainCurrencyAmount: {
          amount: 50000,
          currency: {
            code: 'USD',
            base: 10,
            exponent: 2,
          },
          scale: 2,
        },
        formatAmount: '500.00',
        date: '04/20/2024',
        notes: '',
        tags: [''],
      },
    ],
  },
};