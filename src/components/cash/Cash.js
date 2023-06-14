import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  fetchAccountsData,
  archiveAccount,
  deleteAccount,
} from "../../actions/Actions.js";
import CashList from "./list/CashList.js";
import CashChart from "./pieChart/CashChart.js";

import filterIcon from "../../assets/icons/shared/filter.svg";

import "./Cash.css";

function isActive({ isActive }) {
  return isActive ? `accounts_title active_accounts_title` : `accounts_title`;
}

function Cash({
  accounts: { status, accounts },
  fetchAccountsData,
  archiveAccount,
}) {
  let notArchivedAccounts = accounts.filter(
    (account) => account.archived === false
  );

  useEffect(() => {
    fetchAccountsData();
  }, [fetchAccountsData]);

  return status === "loading" ? (
    <div>Loading</div>
  ) : (
    <div id="accounts_content">
      <div id="accounts_more_info">
        Total balance
        <CashChart data={notArchivedAccounts} />
      </div>
      <div id="accounts_main_info">
        <div id="accounts_titles">
          <NavLink to="/cash/all" className={isActive}>
            All
          </NavLink>
          <NavLink to="/cash/cards" className={isActive}>
            Cards
          </NavLink>
          <NavLink to="/cash/cash" className={isActive}>
            Cash
          </NavLink>
          <NavLink to="/cash/transfers" className={isActive}>
            Transfers
          </NavLink>
          <img src={filterIcon} alt="filter" />
        </div>
        <CashList
          notArchivedAccounts={notArchivedAccounts}
          archiveAccount={archiveAccount}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
  };
};

const mapDispatchtoProps = {
  fetchAccountsData,
  archiveAccount,
  deleteAccount,
};

export default connect(mapStateToProps, mapDispatchtoProps)(Cash);
