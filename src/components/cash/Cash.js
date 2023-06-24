import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  fetchAccountsData,
  archiveAccount,
  deleteAccount,
} from "../../actions/Actions.js";
import CashList from "./list/CashList.js";
import CashChart from "./pieChart/CashChart.js";

import { ReactComponent as FilterIcon } from "../../assets/icons/shared/filter.svg";
import { ReactComponent as ArchiveBasket } from "../../assets/icons/shared/archiveBasket.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/shared/calendar.svg";

import "./Cash.css";

function isActive({ isActive }) {
  return isActive ? `accounts_title active_accounts_title` : `accounts_title`;
}

function Cash({
  accounts: { status, accounts },
  fetchAccountsData,
  archiveAccount,
}) {
  const { t } = useTranslation();
  let notArchivedAccounts = accounts.filter(
    (account) => account.archived === false
  );

  useEffect(() => {
    fetchAccountsData();
  }, [fetchAccountsData]);

  return status === "loading" ? (
    <div>Loading</div>
  ) : (
    <div className="accounts_content">
      <div className="accounts_more_info">
        {t("CASH.TOTAL_BALANCE")}
        <CashChart data={notArchivedAccounts} />
      </div>
      <div className="accounts_main_info">
        <div className="accounts_header">
          <div className="filtered_title">{t("CASH.CASH_TITLE")}</div>
          <div className="filtered_field">
            <FilterIcon />
            {t("CASH.FILTER_KEY")}
          </div>
          <div className="filtered_field">
            <CalendarIcon />
            {t("CASH.FILTER_DATE")}
          </div>
          <div className="archived">
            <ArchiveBasket />
          </div>
        </div>
        <div className="accounts_titles">
          <NavLink to="/cash/all" className={isActive}>
            {t("CASH.FILTER_ALL")}
          </NavLink>
          <NavLink to="/cash/cards" className={isActive}>
            {t("CASH.FILTER_CARDS")}
          </NavLink>
          <NavLink to="/cash/cash" className={isActive}>
            {t("CASH.FILTER_CASH")}
          </NavLink>
          <NavLink to="/cash/transfers" className={isActive}>
            {t("CASH.FILTER_TRANSFERS")}
          </NavLink>
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
