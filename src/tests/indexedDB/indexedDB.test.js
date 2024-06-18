import 'core-js/stable/structured-clone';
import 'fake-indexeddb/auto';
import {
  clearIdb,
  getAllData,
  idbAddItem,
  idbDeleteItem,
  idbGetItem,
  idbOpen,
  idbSearchItems,
  idbUpdateItem,
} from '../../indexedDB/IndexedDB';
import { mockCategory, mockTransaction } from './mocks';
import { mockDbData } from '../mocks/dbData';

describe('indexedDB', () => {
  it('open and init DB', () => {
    idbOpen().then((db) => {
      expect(db).toBeDefined();
      expect(db.name).toBe('budget-planner');
      //db returns DOMStringList
      expect(db.objectStoreNames).toEqual([
        'accounts',
        'categories',
        'profile',
        'rates',
        'transactions',
      ]);
    });
  });

  it('get all data', async () => {
    const data = await getAllData('accounts');
    expect(data).toEqual(mockDbData.accounts.accounts);
  });

  it('add and get the items', async () => {
    await idbAddItem(mockCategory, 'categories');
    const category = await idbGetItem(mockCategory.id, 'categories');
    expect(category).toEqual(mockCategory);
  });

  it('update the item', async () => {
    await idbUpdateItem(
      mockCategory.id,
      { description: 'Benefits' },
      'categories',
    );
    const category = await idbGetItem(mockCategory.id, 'categories');
    expect(category.description).toBe('Benefits');
  });

  it('delete the item', async () => {
    await idbDeleteItem(mockCategory.id, 'categories');
    const data = await idbSearchItems(mockCategory.id, 'categories');
    expect(data).toEqual([]);
  });

  it('searching', async () => {
    const expected = [];
    expected.push(mockTransaction);
    const data = await idbSearchItems('3000', 'transactions');
    expect(data).toEqual(expected);
  });

  it('clear db', async () => {
    await clearIdb();
    const accountsData = await getAllData('accounts');
    const transactionsData = await getAllData('transactions');
    const categoriesData = await getAllData('categories');

    expect(accountsData).toEqual([]);
    expect(transactionsData).toEqual([]);
    expect(categoriesData).toEqual([]);
  });
});
