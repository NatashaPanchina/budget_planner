import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { createLocaleTransactions } from "../utils/index.js";
import Slider from "./Slider.js";

import expenseIcon from "../../../assets/icons/shared/expense.svg";
import incomeIcon from "../../../assets/icons/shared/income.svg";
import transfersIcon from "../../../assets/icons/shared/transfers.svg";

import "./AccountsSlider.css";

export default function AccountsSlider({ transactions, accounts }) {
  const { t } = useTranslation();

  const notArchivedAccounts = accounts.filter(
    (account) => account.archived === false
  );
  const { filterType, filterAccount } = useParams();

  const filteredTransactions =
    filterAccount === "all"
      ? transactions
      : transactions.filter(
          (transaction) => transaction.account === filterAccount
        );
  const allTransactions = filteredTransactions.length;
  const expensesTransactions = filteredTransactions.filter(
    (transaction) => transaction.transactionType === "expense"
  ).length;
  const incomesTransactions = filteredTransactions.filter(
    (transaction) => transaction.transactionType === "income"
  ).length;
  const transfersTransactions =
    allTransactions - (expensesTransactions + incomesTransactions);

  return (
    <div className="transactions_more_info">
      <div className="transaction_more_title">
        {t("TRANSACTIONS.CURRENT_CASH")}
      </div>
      <Slider
        filterType={filterType}
        notArchivedAccounts={notArchivedAccounts}
      />
      <div className="count_transactions_info">
        {t("TRANSACTIONS.TOTAL")}
        <div className="total_transactions_count">
          {allTransactions}{" "}
          {t(createLocaleTransactions("TRANSACTIONS", allTransactions))}
        </div>
        <div className="transactions_count_item">
          <img src={expenseIcon} alt="expenses" />
          <div>
            {t("TRANSACTIONS.FILTER_EXPENSES")}
            <div className="expense_transactions_count">
              {expensesTransactions}{" "}
              {t(
                createLocaleTransactions("TRANSACTIONS", expensesTransactions)
              )}
            </div>
          </div>
        </div>
        <div className="transactions_count_item">
          <img src={incomeIcon} alt="incomes" />
          <div>
            {t("TRANSACTIONS.FILTER_INCOMES")}
            <div className="income_transactions_count">
              {incomesTransactions}{" "}
              {t(createLocaleTransactions("TRANSACTIONS", incomesTransactions))}
            </div>
          </div>
        </div>
        <div className="transactions_count_item">
          <img src={transfersIcon} alt="transfers" />
          <div>
            {t("TRANSACTIONS.FILTER_TRANSFERS")}
            <div className="transfer_transactions_count">
              {transfersTransactions}{" "}
              {t(
                createLocaleTransactions("TRANSACTIONS", transfersTransactions)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
