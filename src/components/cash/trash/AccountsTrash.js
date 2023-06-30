import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { dinero } from "dinero.js";

import { formatDineroOutput } from "../../../utils/format/cash";
import {
  createCashFilter,
  createLocaleCashType,
  filterAccounts,
  renderNotes,
} from "../utils";
import { idbAddItem, idbDeleteItem } from "../../../indexedDB/IndexedDB";
import {
  fetchAccountsData,
  fetchTransactionsData,
  restoreAccount,
  deleteAccount,
  deleteTransaction,
} from "../../../actions/Actions";

import { ReactComponent as BackIcon } from "../../../assets/icons/shared/back.svg";
import { ReactComponent as TrashIcon } from "../../../assets/icons/shared/trash.svg";
import { ReactComponent as RestoreIcon } from "../../../assets/icons/shared/restore.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/shared/delete.svg";
import searchIcon from "../../../assets/icons/shared/search.svg";
import cardBackground from "../../../assets/icons/shared/cardBackground.svg";

import "./AccountsTrash.css";

function renderAccounts(
  accounts,
  transactions,
  restoreAccount,
  deleteAccount,
  deleteTransaction,
  t
) {
  return (
    <React.Fragment>
      {accounts.map((account) => {
        const balance = dinero(account.balance);
        return (
          <div className="account_item" key={account.id}>
            <div className="account_info">
              <div
                className={`${account.description} card`}
                style={{
                  background: `url(${cardBackground}) 0% 0% / cover no-repeat,
                                                  linear-gradient(90deg, ${account.color[0]} 0%, ${account.color[1]} 100%)`,
                  boxShadow: `0px 4px 10px #DCE2DF`,
                }}
              >
                <div className="card_name">{account.description}</div>
                <div className="card_balance_info">
                  <div className="card_balance">
                    {formatDineroOutput(balance, "USD")}
                  </div>
                  <div className="card_balance_title">
                    {t("ACCOUNTS_TRASH.CURRENT_BALANCE")}
                  </div>
                </div>
              </div>
              {renderNotes(account.notes)}
            </div>
            <div className="account_buttons">
              <div
                onClick={() => {
                  restoreAccount(account.id);
                  idbAddItem({ ...account, archived: false }, "accounts");
                }}
              >
                <RestoreIcon /> {t("ACCOUNTS_TRASH.RESTORE")}
              </div>
              <div
                onClick={() => {
                  transactions.forEach((transaction) => {
                    if (transaction.account === account.id) {
                      deleteTransaction(transaction.id);
                      idbDeleteItem(transaction.id, "transactions");
                    }
                  });
                  deleteAccount(account.id);
                  idbDeleteItem(account.id, "accounts");
                }}
              >
                <DeleteIcon /> {t("ACCOUNTS_TRASH.DELETE")}
              </div>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
}

function isActive({ isActive }) {
  return isActive ? `accounts_title active_accounts_title` : `accounts_title`;
}
function AccountsTrash({
  accounts,
  transactions,
  fetchTransactionsData,
  fetchAccountsData,
  restoreAccount,
  deleteAccount,
  deleteTransaction,
}) {
  const { t } = useTranslation();
  const filterType = createCashFilter(useParams().filterType);
  const archivedAccounts = accounts.accounts.filter(
    (account) => account.archived
  );

  useEffect(() => {
    fetchAccountsData();
    fetchTransactionsData();
  }, [fetchAccountsData, fetchTransactionsData]);

  return accounts.status === "loading" || transactions.status === "loading" ? (
    <div>Loading</div>
  ) : (
    <div className="accounts_trash_content">
      <div className="trash_header">
        <Link className="account_back_nav" to={`/cash/all`}>
          <BackIcon />
        </Link>
        {t("ACCOUNTS_TRASH.ARCHIVED_CASH")}
        <div className="trash_icon">
          <TrashIcon />
          <div className="trash_count">{archivedAccounts.length}</div>
        </div>
      </div>
      <div className="accounts_titles">
        <NavLink to="/cash/trash/all" className={isActive}>
          {t("ACCOUNTS_TRASH.ALL")}
        </NavLink>
        <NavLink to="/cash/trash/cards" className={isActive}>
          {t("ACCOUNTS_TRASH.CARDS")}
        </NavLink>
        <NavLink to="/cash/trash/cash" className={isActive}>
          {t("ACCOUNTS_TRASH.CASH")}
        </NavLink>
      </div>
      <div className="search">
        <input type="text" placeholder={t("ACCOUNTS_TRASH.SEARCH")}></input>
        <img src={searchIcon} alt="search" />
      </div>
      <div className="archived_count">
        {t(`ACCOUNTS_TRASH.${createLocaleCashType(filterType)}_COUNT`)}
        {archivedAccounts.length}
      </div>
      {renderAccounts(
        filterAccounts(filterType, archivedAccounts),
        transactions.transactions,
        restoreAccount,
        deleteAccount,
        deleteTransaction,
        t
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    transactions: state.transactions,
  };
};

const mapDispatchToProps = {
  fetchAccountsData,
  fetchTransactionsData,
  restoreAccount,
  deleteAccount,
  deleteTransaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountsTrash);
