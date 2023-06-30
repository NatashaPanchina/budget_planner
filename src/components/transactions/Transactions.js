import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import AccountsSlider from "./slider/AccountsSlider.js";
import TransactionsList from "./list/TransactionsList.js";
import {
  fetchTransactionsData,
  fetchAccountsData,
  fetchCategoriesData,
  addNewTransaction,
  editTransaction,
  deleteTransaction,
  editAccount,
} from "../../actions/Actions";

import filterIcon from "../../assets/icons/shared/filter.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/shared/calendar.svg";

import "./Transactions.css";

function Transactions({
  fetchTransactionsData,
  fetchAccountsData,
  fetchCategoriesData,
  transactions,
  accounts,
  categories,
  addNewTransaction,
  editTransaction,
  deleteTransaction,
  editAccount,
}) {
  const [accountsData, setAccountsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    fetchAccountsData();
    fetchCategoriesData();
    fetchTransactionsData();
  }, [fetchAccountsData, fetchCategoriesData, fetchTransactionsData]);

  useEffect(() => {
    if (accounts.status === "succeeded") {
      setAccountsData(accounts.accounts);
    }
    if (categories.status === "succeeded") {
      setCategoriesData(categories.categories);
    }
    if (transactions.status === "succeeded") {
      setTransactionsData(transactions.transactions);
    }
  }, [
    accounts.status,
    categories.status,
    transactions.status,
    accounts.accounts,
    categories.categories,
    transactions.transactions,
  ]);

  return accounts.status === "loading" ||
    categories.status === "loading" ||
    transactions.status === "loading" ? (
    <div>Loading</div>
  ) : (
    <div className="transactions_content">
      <AccountsSlider transactions={transactionsData} accounts={accountsData} />
      <div className="transactions_main_info">
        <div className="transactions_main_header">
          <div className="filtered_title">
            {t("TRANSACTIONS.TRANSACTIONS_HEADER")}
          </div>
          <div className="filtered_field">
            <img src={filterIcon} alt="filter" />
            {t("TRANSACTIONS.FILTER_KEY")}
          </div>
          <div className="filtered_field">
            <CalendarIcon />
            {t("TRANSACTIONS.FILTER_DATE")}
          </div>
        </div>
        <TransactionsList
          transactions={transactionsData}
          accounts={accountsData}
          categories={categoriesData}
          deleteTransaction={deleteTransaction}
          editAccount={editAccount}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
    accounts: state.accounts,
    categories: state.categories,
  };
};

const mapDispatchToProps = {
  fetchTransactionsData,
  fetchAccountsData,
  fetchCategoriesData,
  addNewTransaction,
  editTransaction,
  deleteTransaction,
  editAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
