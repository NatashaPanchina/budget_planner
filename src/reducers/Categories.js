import {
  IDB_FETCH_CATEGORIES_INIT,
  IDB_FETCH_CATEGORIES_SUCCESS,
  IDB_FETCH_CATEGORIES_FAILURE,
  ADD_NEW_CATEGORY,
  ARCHIVE_CATEGORY,
  RESTORE_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
} from '../actions/ActionTypes';

const initialState = {
  status: 'idle',
  error: null,
  categories: [],
};

const categories = (state = initialState, { type, payload }) => {
  switch (type) {
    case IDB_FETCH_CATEGORIES_INIT:
      return {
        ...state,
        status: 'loading',
      };
    case IDB_FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        categories: payload,
      };
    case IDB_FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        status: 'failed',
        error: payload.message,
      };
    case ADD_NEW_CATEGORY:
      return {
        ...state,
        categories: [payload, ...state.categories],
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === payload.id ? payload.newCategory : category,
        ),
      };
    case ARCHIVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === payload ? { ...category, archived: true } : category,
        ),
      };
    case RESTORE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === payload ? { ...category, archived: false } : category,
        ),
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== payload,
        ),
      };
    default:
      return state;
  }
};

export default categories;
