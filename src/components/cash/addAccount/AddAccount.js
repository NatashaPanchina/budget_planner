import React from "react";
import { connect } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { addNewAccount } from "../../../actions/Actions";
import { createCashType } from "../utils";
import AccountForm from "./AccountForm.js";

import { ReactComponent as BackIcon } from "../../../assets/icons/shared/back.svg";

import "./AddAccount.css";

function isActiveLink(isActive) {
  return isActive ? "active_account_type" : "";
}

function AddAccount({ addNewAccount }) {
  const { t } = useTranslation();
  const { accountType } = useParams();

  return (
    <div className="add_account_content">
      <div className="accounts_title_block">
        <Link
          className="account_back_nav"
          to={`/cash/${createCashType(accountType)}`}
        >
          <BackIcon />
        </Link>
        <div className="add_account_titles">
          <div className="add_account_title">
            <NavLink
              to={`/cash/addAccount/card`}
              className={({ isActive }) => `${isActiveLink(isActive)}`}
            >
              {t("ADD_ACCOUNT.CARD")}
            </NavLink>
          </div>
          <div className="add_account_title">
            <NavLink
              to={`/cash/addAccount/cash`}
              className={({ isActive }) => `${isActiveLink(isActive)}`}
            >
              {t("ADD_ACCOUNT.CASH")}
            </NavLink>
          </div>
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
