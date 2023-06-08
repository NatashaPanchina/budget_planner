import { combineReducers } from "redux";

import accounts from "./Cash.js";
import categories from "./Categories.js";

export const createRootReducer = combineReducers({
  accounts,
  categories,
});
