import { connect } from "react-redux";

import { archiveCategory, deleteCategory } from "../actions/Actions.js";
import Categories from "../components/categories/Categories.js";

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = {
  archiveCategory,
  deleteCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
