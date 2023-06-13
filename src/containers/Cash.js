import { connect } from "react-redux";

import { archiveAccount, deleteAccount } from "../actions/Actions.js";
import Cash from "../components/cash/Cash.js";

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
  };
};

const mapDispatchtoProps = {
  archiveAccount,
  deleteAccount,
};

export default connect(mapStateToProps, mapDispatchtoProps)(Cash);
