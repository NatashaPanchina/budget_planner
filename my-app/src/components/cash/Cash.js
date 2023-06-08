import React from "react";
import { NavLink } from "react-router-dom";

import CashList from "./list/CashList.js";
import CashChart from "./pieChart/CashChart.js";

import filterIcon from "./images/filterIcon.svg";

import "./Cash.css";

function isActive({ isActive }) {
  return isActive ? `accounts_title active_accounts_title` : `accounts_title`;
}

export default function Cash({
  accounts: { fetching, accounts },
  archiveAccount,
}) {
  let notArchivedAccounts = accounts.filter(
    (account) => account.archived === false
  );

  //чекаем загрузились ли accounts из indexedDB
  return !fetching ? (
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
          <img src={filterIcon} />
        </div>
        <CashList
          notArchivedAccounts={notArchivedAccounts}
          archiveAccount={archiveAccount}
        />
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
}
