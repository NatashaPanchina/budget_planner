import { connect } from "react-redux";

import { addNewAccount } from "../actions/Actions.js";
import AddAccount from "../components/cash/addAccount/AddAccount.js";

const mapDispatchToProps = {
  addNewAccount,
};

export default connect(null, mapDispatchToProps)(AddAccount);
