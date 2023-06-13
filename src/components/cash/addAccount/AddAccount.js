import React from "react";
import { Link, NavLink, useParams } from "react-router-dom";

import { createCashType } from "../api";
import AccountForm from "./AccountForm.js";

import { ReactComponent as BackIcon } from "../images/backIcon.svg";

import "./AddAccount.css";

function isActive({ isActive }) {
  return isActive ? "active_account_type" : "";
}

export default function AddAccount({ addNewAccount }) {
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
