import 'core-js/stable/structured-clone';
import 'fake-indexeddb/auto';
import { mockRates } from './mocks';
import { convertCash } from '../../../utils/rates';
import { idbGetItem } from '../../../indexedDB/IndexedDB';

const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({ json: () => Promise.resolve(mockRates) });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe('convertCash', () => {
  it('convert from main currency to another currency', async () => {
    const value = await convertCash('2024-02-21', 100, 'USD', 'KZT', 'USD');
    expect(value).toBe(45140);
    const idbData = await idbGetItem('2024-02-20', 'rates');
    expect(idbData).toEqual({
      date: '2024-02-20',
      rates: {
        data: {
          EUR: {
            value: 0.92,
          },
          KZT: {
            value: 451.4,
          },
        },
        date: '2024-02-20',
      },
    });
  });

  it('convert from another currency to main currency', async () => {
    const value = await convertCash('2024-02-21', 100, 'EUR', 'USD', 'USD');
    expect(value).toBeCloseTo(108.695);
    const idbData = await idbGetItem('2024-02-20', 'rates');
    expect(idbData).toEqual({
      date: '2024-02-20',
      rates: {
        data: {
          EUR: {
            value: 0.92,
          },
          KZT: {
            value: 451.4,
          },
        },
        date: '2024-02-20',
      },
    });
  });

  it('convert from one currency to another currency', async () => {
    const value = await convertCash('2024-02-21', 100000, 'KZT', 'EUR', 'USD');
    expect(value).toBeCloseTo(203.81);
    const idbData = await idbGetItem('2024-02-20', 'rates');
    expect(idbData).toEqual({
      date: '2024-02-20',
      rates: {
        data: {
          EUR: {
            value: 0.92,
          },
          KZT: {
            value: 451.4,
          },
        },
        date: '2024-02-20',
      },
    });
  });
});
