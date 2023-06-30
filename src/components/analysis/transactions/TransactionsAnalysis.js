import React, { useState } from "react";
import { subtract, dinero, lessThan } from "dinero.js";
import { USD } from "@dinero.js/currencies";
import { useTranslation } from "react-i18next";

import { formatDineroOutput } from "../../../utils/format/cash";
import {
  renderAccounts,
  filterTransactions,
  filterByType,
  createSum,
  filterArchivedAccounts,
  createAverageAmount,
  createLocaleTransactions,
} from "../utils/shared";
import { dateFormatter } from "../../../utils/format/date";
import LineChart from "../linechart/LineChart";
import BarChart from "../barchart/BarChart";
import PieChart from "../piechart/PieChart";
import Table from "../table/Table";

import filterIcon from "../../../assets/icons/shared/filter.svg";
import expenseIcon from "../../../assets/icons/shared/expense.svg";
import incomeIcon from "../../../assets/icons/shared/income.svg";
import positiveBalanceIcon from "../../../assets/icons/shared/positiveBalance.svg";
import negativeBalanceIcon from "../../../assets/icons/shared/negativeBalance.svg";
import lineChartIcon from "../../../assets/icons/shared/lineChart.svg";
import barChartIcon from "../../../assets/icons/shared/barChart.svg";
import pieChartIcon from "../../../assets/icons/shared/pieChart.svg";
import tableIcon from "../../../assets/icons/shared/table.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/icons/shared/calendar.svg";

import "../Analysis.css";

export default function TransactionsAnalysis({
  transactions,
  categories,
  accounts,
}) {
  const { t } = useTranslation();

  const [date, setDate] = useState({
    from: new Date("6/1/2023"),
    to: new Date("6/30/2023"),
    during: "month",
  });
  const [accountFilter, setAccountFilter] = useState("All cash");
  const [lineChartFilter, setLineChartFilter] = useState("expensesToIncomes");
  const [isLineChartDetailed, setIsLineChartDetailed] = useState(false);
  const [barChartFilter, setBarChartFilter] = useState("expensesToIncomes");
  const [isBarChartDetailed, setIsBarChartDetailed] = useState(false);
  const [pieChartFilter, setPieChartFilter] = useState("expenses");
  const [tableFilter, setTableFilter] = useState("expenses");
  const notArchivedAccounts = filterArchivedAccounts(accounts);
  const filteredTransactions = filterTransactions(
    transactions,
    notArchivedAccounts,
    date,
    accountFilter
  );
  const expenses = filterByType(filteredTransactions, "expense");
  const incomes = filterByType(filteredTransactions, "income");
  const expensesSum = createSum(expenses);
  const incomesSum = createSum(incomes);
  const saldo = subtract(incomesSum, expensesSum);
  const averageExpense = createAverageAmount(date, expensesSum);
  const averageIncome = createAverageAmount(date, incomesSum);

  return (
    <React.Fragment>
      <div className="analysis_titles">
        <div className="filter_title">
          {t("ANALYSIS.TRANSACTIONS_ANALYSIS")}
        </div>
        <div
          className="filter_account"
          onClick={() =>
            document.querySelector(".accounts_filter").classList.toggle("none")
          }
        >
          <img src={filterIcon} height="20px" alt="filter" />
          {accountFilter === "All cash"
            ? t("ANALYSIS.ALL_CASH")
            : accountFilter}
          {renderAccounts(t, notArchivedAccounts, setAccountFilter)}
        </div>

        <div className="filter_date">
          <CalendarIcon />
          {`${dateFormatter.format(date.from)} - ${dateFormatter.format(
            date.to
          )}`}
        </div>
      </div>
      <div className="analysis_content">
        <div className="analysis_container">
          <div className="common_analysis_info">
            <div className="common_info_block">
              <img src={expenseIcon} alt="expense" />
              <div>
                <div className="common_analysis_titles">
                  {t("ANALYSIS.TOTAL_EXPENSES")}:
                </div>
                <div className="analysis_expenses_amount">
                  {formatDineroOutput(expensesSum, "USD")}
                </div>
                <div className="common_analysis_count">
                  {expenses.length}{" "}
                  {t(createLocaleTransactions("ANALYSIS", expenses.length))}
                </div>
              </div>
            </div>
            <div className="common_info_block">
              <img src={incomeIcon} alt="income" />
              <div>
                <div className="common_analysis_titles">
                  {t("ANALYSIS.TOTAL_INCOMES")}:
                </div>
                <div className="analysis_incomes_amount">
                  {formatDineroOutput(incomesSum, "USD")}
                </div>
                <div className="common_analysis_count">
                  {incomes.length}{" "}
                  {t(createLocaleTransactions("ANALYSIS", incomes.length))}
                </div>
              </div>
            </div>
            <div className="common_info_block">
              {lessThan(saldo, dinero({ amount: 0, currency: USD })) ? (
                <img src={negativeBalanceIcon} alt="negative_balance" />
              ) : (
                <img src={positiveBalanceIcon} alt="positive_balance" />
              )}
              <div>
                <div className="common_analysis_titles">
                  {t("ANALYSIS.SALDO")}:
                </div>
                <div className="analysis_balance_amount">
                  {formatDineroOutput(saldo, "USD")}
                </div>
              </div>
            </div>
            <div className="add_info_block">
              <div className="common_analysis_titles">
                {t("ANALYSIS.TOTAL_TRANSACTIONS")}:
              </div>
              <div className="common_analysis_amount">
                {filteredTransactions.length}
              </div>
            </div>
            <div className="add_info_block">
              <div className="common_analysis_titles">
                {t("ANALYSIS.AVERAGE_WEEKLY_EXPENSE")}:
              </div>
              <div className="common_analysis_expenses_amount">
                {averageExpense}
              </div>
            </div>
            <div className="add_info_block">
              <div className="common_analysis_titles">
                {t("ANALYSIS.AVERAGE_WEEKLY_INCOME")}:
              </div>
              <div className="common_analysis_incomes_amount">
                {averageIncome}
              </div>
            </div>
          </div>
          <div className="line_chart_analysis">
            <img src={lineChartIcon} className="chart_icon" alt="linechart" />
            <div className="charts_buttons">
              <button
                className={
                  lineChartFilter === "expensesToIncomes" ? "active_filter" : ""
                }
                onClick={() => setLineChartFilter("expensesToIncomes")}
              >
                {t("ANALYSIS.EXPENSES_TO_INCOMES")}
              </button>
              <button
                className={
                  lineChartFilter === "expenses" ? "active_filter" : ""
                }
                onClick={() => setLineChartFilter("expenses")}
              >
                {t("ANALYSIS.EXPENSES")}
              </button>
              <button
                className={lineChartFilter === "incomes" ? "active_filter" : ""}
                onClick={() => setLineChartFilter("incomes")}
              >
                {t("ANALYSIS.INCOMES")}
              </button>
              <button
                className={
                  lineChartFilter === "transfers" ? "active_filter" : ""
                }
                onClick={() => setLineChartFilter("transfers")}
              >
                {t("ANALYSIS.TRANSFERS")}
              </button>
            </div>
            <div className="more_charts_btns">
              <button
                className={isLineChartDetailed ? "" : "active_more_btn"}
                onClick={() => setIsLineChartDetailed(false)}
              >
                {t("ANALYSIS.TOTAL")}
              </button>
              <button
                className={isLineChartDetailed ? "active_more_btn" : ""}
                onClick={() => setIsLineChartDetailed(true)}
              >
                {t("ANALYSIS.BY_CATEGORIES")}
              </button>
            </div>
            <LineChart
              transactions={filteredTransactions}
              categories={categories}
              chartFilter={lineChartFilter}
              isDetailed={isLineChartDetailed}
              date={date}
            />
          </div>
          <div className="bar_chart_analysis">
            <img src={barChartIcon} className="chart_icon" alt="barchart" />
            <div className="charts_buttons">
              <button
                className={
                  barChartFilter === "expensesToIncomes" ? "active_filter" : ""
                }
                onClick={() => setBarChartFilter("expensesToIncomes")}
              >
                {t("ANALYSIS.EXPENSES_TO_INCOMES")}
              </button>
              <button
                className={barChartFilter === "expenses" ? "active_filter" : ""}
                onClick={() => setBarChartFilter("expenses")}
              >
                {t("ANALYSIS.EXPENSES")}
              </button>
              <button
                className={barChartFilter === "incomes" ? "active_filter" : ""}
                onClick={() => setBarChartFilter("incomes")}
              >
                {t("ANALYSIS.INCOMES")}
              </button>
              <button
                className={
                  barChartFilter === "transfers" ? "active_filter" : ""
                }
                onClick={() => setBarChartFilter("transfers")}
              >
                {t("ANALYSIS.TRANSFERS")}
              </button>
            </div>
            <div className="more_charts_btns">
              <button
                className={isBarChartDetailed ? "" : "active_more_btn"}
                onClick={() => setIsBarChartDetailed(false)}
              >
                {t("ANALYSIS.TOTAL")}
              </button>
              <button
                className={isBarChartDetailed ? "active_more_btn" : ""}
                onClick={() => setIsBarChartDetailed(true)}
              >
                {t("ANALYSIS.BY_CATEGORIES")}
              </button>
            </div>
            <BarChart
              transactions={filteredTransactions}
              categories={categories}
              chartFilter={barChartFilter}
              isDetailed={isBarChartDetailed}
              date={date}
            />
          </div>
          <div className="pie_chart_analysis">
            <img src={pieChartIcon} className="chart_icon" alt="piechart" />
            <div className="charts_buttons">
              <button
                className={pieChartFilter === "expenses" ? "active_filter" : ""}
                onClick={() => setPieChartFilter("expenses")}
              >
                {t("ANALYSIS.EXPENSES")}
              </button>
              <button
                className={pieChartFilter === "incomes" ? "active_filter" : ""}
                onClick={() => setPieChartFilter("incomes")}
              >
                {t("ANALYSIS.INCOMES")}
              </button>
              <button
                className={
                  pieChartFilter === "transfers" ? "active_filter" : ""
                }
                onClick={() => setPieChartFilter("transfers")}
              >
                {t("ANALYSIS.TRANSFERS")}
              </button>
            </div>
            <PieChart
              transactions={filteredTransactions}
              categories={categories}
              chartFilter={pieChartFilter}
              date={date}
            />
          </div>
          <div className="analysis_table">
            <img src={tableIcon} className="chart_icon" alt="table" />
            <div className="charts_buttons">
              <button
                className={tableFilter === "expenses" ? "active_filter" : ""}
                onClick={() => setTableFilter("expenses")}
              >
                {t("ANALYSIS.EXPENSES")}
              </button>
              <button
                className={tableFilter === "incomes" ? "active_filter" : ""}
                onClick={() => setTableFilter("incomes")}
              >
                {t("ANALYSIS.INCOMES")}
              </button>
              <button
                className={tableFilter === "transfers" ? "active_filter" : ""}
                onClick={() => setTableFilter("transfers")}
              >
                {t("ANALYSIS.TRANSFERS")}
              </button>
            </div>
            <Table
              transactions={filteredTransactions}
              categories={categories}
              tableFilter={tableFilter}
              date={date}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
