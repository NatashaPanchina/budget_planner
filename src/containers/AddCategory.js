import { connect } from "react-redux";

import { addNewCategory } from "../actions/Actions.js";
import AddCategory from "../components/categories/addCategory/AddCategory.js";

const mapDispatchToProps = {
  addNewCategory,
};

export default connect(null, mapDispatchToProps)(AddCategory);
