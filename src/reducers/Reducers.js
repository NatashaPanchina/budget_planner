import { combineReducers } from 'redux';

import header from './Header.js';
import transactions from './Transactions.js';
import accounts from './Cash.js';
import categories from './Categories.js';

export const createRootReducer = combineReducers({
  header,
  transactions,
  accounts,
  categories,
});
