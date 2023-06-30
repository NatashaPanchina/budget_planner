import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  fetchCategoriesData,
  fetchAccountsData,
  addNewTransaction,
  editAccount,
} from "../../actions/Actions";
import ExpenseTransactionForm from "./expense/ExpenseTransactionForm";
import IncomeTransactionForm from "./income/IncomeTransactionForm";

import { ReactComponent as ExpenseIcon } from "../../assets/icons/shared/newExpense.svg";
import { ReactComponent as IncomeIcon } from "../../assets/icons/shared/newIncome.svg";
import { ReactComponent as TransferIcon } from "../../assets/icons/shared/newTransfer.svg";

import "./NewTransaction.css";
import TransferTransactionForm from "./transfer/TransferTransactionForm";

function renderTransactionForm(
  transactionType,
  categories,
  accounts,
  addNewTransaction,
  editAccount
) {
  switch (transactionType) {
    case "expense":
      return (
        <ExpenseTransactionForm
          categories={categories}
          accounts={accounts}
          addNewTransaction={addNewTransaction}
          editAccount={editAccount}
        />
      );
    case "income":
      return (
        <IncomeTransactionForm
          categories={categories}
          accounts={accounts}
          addNewTransaction={addNewTransaction}
          editAccount={editAccount}
        />
      );
    case "transfer":
      return <TransferTransactionForm accounts={accounts} />;
    default:
      return (
        <ExpenseTransactionForm
          categories={categories}
          accounts={accounts}
          addNewTransaction={addNewTransaction}
          editAccount={editAccount}
        />
      );
  }
}

function NewTransaction({
  categories,
  accounts,
  fetchCategoriesData,
  fetchAccountsData,
  addNewTransaction,
  editAccount,
}) {
  const { t } = useTranslation();
  const { transactionType, transactionAccount } = useParams();
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  useEffect(() => {
    fetchCategoriesData();
    fetchAccountsData();
  }, [fetchCategoriesData, fetchAccountsData]);

  useEffect(() => {
    if (categories.status === "succeeded") {
      const filteredCategories = categories.categories.filter(
        (category) =>
          category.type === transactionType && category.archived === false
      );
      setFilteredCategories(filteredCategories);
    }
  }, [categories.status, categories.categories, transactionType]);

  useEffect(() => {
    if (accounts.status === "succeeded") {
      const notArchivedAccounts = accounts.accounts.filter(
        (account) => account.archived === false
      );
      setFilteredAccounts(notArchivedAccounts);
    }
  }, [accounts.status, accounts.accounts]);

  return (
    <div className="main_content">
      <div className="content_title">
        <div className="title_item">
          <NavLink
            to={`/newTransaction/expense/${transactionAccount}`}
            className={({ isActive }) =>
              isActive ? "active_expense" : `not_active_expense`
            }
          >
            <ExpenseIcon />
            {t("NEW_TRANSACTION.TITLE.EXPENSE")}
          </NavLink>
        </div>
        <div className="title_item">
          <NavLink
            to={`/newTransaction/income/${transactionAccount}`}
            className={({ isActive }) =>
              isActive ? "active_income" : `not_active_income`
            }
          >
            <IncomeIcon />
            {t("NEW_TRANSACTION.TITLE.INCOME")}
          </NavLink>
        </div>
        <div className="title_item">
          <NavLink
            to={`/newTransaction/transfer/${transactionAccount}`}
            className={({ isActive }) =>
              isActive ? "active_transfer" : `not_active_transfer`
            }
          >
            <TransferIcon />
            {t("NEW_TRANSACTION.TITLE.TRANSFER")}
          </NavLink>
        </div>
      </div>
      {accounts.status === "loading" || categories.status === "loading" ? (
        <div>Loading</div>
      ) : (
        renderTransactionForm(
          transactionType,
          filteredCategories,
          filteredAccounts,
          addNewTransaction,
          editAccount
        )
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    accounts: state.accounts,
    transactions: state.transactions,
  };
};

const mapDispatchToProps = {
  fetchCategoriesData,
  fetchAccountsData,
  addNewTransaction,
  editAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTransaction);
