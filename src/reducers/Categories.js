import {
  ADD_NEW_CATEGORY,
  ARCHIVE_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  RECEIVE_IDB_CATEGORIES,
  REQUEST_IDB,
} from "../actions/ActionTypes";

const initialState = {
  fetching: false,
  categories: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
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
    case REQUEST_IDB:
      return Object.assign({}, state, { fetching: true });
    case RECEIVE_IDB_CATEGORIES:
      return { fetching: false, categories: payload };
    default:
      return state;
  }
};
