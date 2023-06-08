import { connect } from "react-redux";

import { editAccount } from "../actions/Actions.js";
import InfoAccount from "../components/cash/infoAccount/InfoAccount.js";

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
  };
};

const mapDispatchToProps = {
  editAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoAccount);
