import {
  IDB_FETCH_CATEGORIES_INIT,
  IDB_FETCH_CATEGORIES_SUCCESS,
  IDB_FETCH_CATEGORIES_FAILURE,
  ADD_NEW_CATEGORY,
  ARCHIVE_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
} from "../actions/ActionTypes";

const initialState = {
  status: "idle",
  error: null,
  categories: [],
};

const categories = (state = initialState, { type, payload }) => {
  switch (type) {
    case IDB_FETCH_CATEGORIES_INIT:
      return {
        ...state,
        status: "loading",
      };
    case IDB_FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        status: "succeeded",
        categories: payload,
      };
    case IDB_FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        status: "failed",
        error: payload.message,
      };
    case ADD_NEW_CATEGORY:
      return Object.assign({}, state, {
        categories: [payload, ...state.categories],
      });
    case EDIT_CATEGORY:
      return Object.assign({}, state, {
        categories: state.categories.map((category) =>
          category.description === payload.description
            ? payload.newCategory
            : category
        ),
      });
    case ARCHIVE_CATEGORY:
      return Object.assign({}, state, {
        categories: state.categories.map((category) =>
          category.description === payload
            ? Object.assign({}, category, { archived: true })
            : category
        ),
      });
    case DELETE_CATEGORY:
      return Object.assign({}, state, {
        categories: state.categories.filter(
          (category) => category.description !== payload
        ),
      });
    default:
      return state;
  }
};

export default categories;
