import React from "react";
import { connect } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";

import { addNewAccount } from "../../../actions/Actions";
import { createCashType } from "../api";
import AccountForm from "./AccountForm.js";

import { ReactComponent as BackIcon } from "../../../assets/icons/shared/back.svg";

import "./AddAccount.css";

function isActive({ isActive }) {
  return isActive ? "active_account_type" : "";
}

function AddAccount({ addNewAccount }) {
  const { accountType } = useParams();

  return (
    <div id="add_account_content">
      <div id="accounts_title_block">
        <Link id="account_back_nav" to={`/cash/${createCashType(accountType)}`}>
          <BackIcon />
        </Link>
        <div id="add_account_titles">
          <NavLink
            to={`/addAccount/card`}
            id="add_account_title"
            className={isActive}
          >
            New Card
          </NavLink>
          <NavLink
            to={`/addAccount/cash`}
            id="add_account_title"
            className={isActive}
          >
            New Cash
          </NavLink>
        </div>
      </div>
      <AccountForm addNewAccount={addNewAccount} />
    </div>
  );
}

const mapDispatchToProps = {
  addNewAccount,
};

export default connect(null, mapDispatchToProps)(AddAccount);
