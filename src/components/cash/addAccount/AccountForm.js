import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import CashForm from "./CashForm.js";
import CardForm from "./CardForm.js";

function AccountForm({ addNewAccount }) {
  const { accountType } = useParams();

  switch (accountType) {
    case "card":
      return (
        <CardForm accountType={accountType} addNewAccount={addNewAccount} />
      );
    case "cash":
      return (
        <CashForm accountType={accountType} addNewAccount={addNewAccount} />
      );
    default:
      return <CardForm addNewAccount={addNewAccount} />;
  }
}

AccountForm.propTypes = {
  addNewAccount: PropTypes.func,
}

export default AccountForm;