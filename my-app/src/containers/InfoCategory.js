import { connect } from "react-redux";

import { editCategory } from "../actions/Actions.js";
import InfoCategory from "../components/categories/infoCategory/InfoCategory.js";

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

const mapDispatchToProps = {
  editCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoCategory);
