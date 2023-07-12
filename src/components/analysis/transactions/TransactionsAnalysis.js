import React, { useState } from "react";
import PropTypes from "prop-types";
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

import { ReactComponent as FilterIcon } from "../../../assets/icons/shared/filter.svg";
import { ReactComponent as ExpenseIcon } from "../../../assets/icons/shared/expense.svg";
import { ReactComponent as IncomeIcon } from "../../../assets/icons/shared/income.svg";
import { ReactComponent as PositiveBalanceIcon } from "../../../assets/icons/shared/positiveBalance.svg";
import { ReactComponent as NegativeBalanceIcon } from "../../../assets/icons/shared/negativeBalance.svg";
import lineChartIcon from "../../../assets/icons/shared/lineChart.svg";
import barChartIcon from "../../../assets/icons/shared/barChart.svg";
import pieChartIcon from "../../../assets/icons/shared/pieChart.svg";
import tableIcon from "../../../assets/icons/shared/table.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/icons/shared/calendar.svg";

import {
  AnalysisContainer,
  AnalysisHeader,
  ChartButton,
  ChartButtonsContainer,
  ChartsContainer,
  CommonCalcItem,
  CommonInfoAmount,
  CommonInfoContainer,
  CommonInfoCount,
  CommonInfoItem,
  CommonInfoSvg,
  CommonInfoTitle,
  Filter,
  FilterSvg,
  HeaderTitle,
  ToggleButtonsContainer,
  ToggleChartButton,
} from "./TransactionsAnalysis.styled.js";
import "../Analysis.css";

function TransactionsAnalysis({
  transactions,
  categories,
  accounts,
}) {
  const { t } = useTranslation();

  const [date] = useState({
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
      <AnalysisHeader>
        <HeaderTitle>{t("ANALYSIS.TRANSACTIONS_ANALYSIS")}</HeaderTitle>
        <Filter
          onClick={() =>
            document.querySelector(".accounts_filter").classList.toggle("none")
          }
        >
          <FilterSvg as={FilterIcon} />
          {accountFilter === "All cash"
            ? t("ANALYSIS.ALL_CASH")
            : accountFilter}
          {renderAccounts(t, notArchivedAccounts, setAccountFilter)}
        </Filter>
        <Filter>
          <FilterSvg as={CalendarIcon} />
          {`${dateFormatter.format(date.from)} - ${dateFormatter.format(
            date.to
          )}`}
        </Filter>
      </AnalysisHeader>
      <AnalysisContainer>
        <div>
          <CommonInfoContainer>
            <CommonInfoItem>
              <CommonInfoSvg as={ExpenseIcon} />
              <div>
                <CommonInfoTitle>
                  {t("ANALYSIS.TOTAL_EXPENSES")}:
                </CommonInfoTitle>
                <CommonInfoAmount $amountType="expense">
                  {formatDineroOutput(expensesSum, "USD")}
                </CommonInfoAmount>
                <CommonInfoCount>
                  {expenses.length}{" "}
                  {t(createLocaleTransactions("ANALYSIS", expenses.length))}
                </CommonInfoCount>
              </div>
            </CommonInfoItem>
            <CommonInfoItem>
              <CommonInfoSvg as={IncomeIcon} />
              <div>
                <CommonInfoTitle>
                  {t("ANALYSIS.TOTAL_INCOMES")}:
                </CommonInfoTitle>
                <CommonInfoAmount $amountType="income">
                  {formatDineroOutput(incomesSum, "USD")}
                </CommonInfoAmount>
                <CommonInfoCount>
                  {incomes.length}{" "}
                  {t(createLocaleTransactions("ANALYSIS", incomes.length))}
                </CommonInfoCount>
              </div>
            </CommonInfoItem>
            <CommonInfoItem>
              {lessThan(saldo, dinero({ amount: 0, currency: USD })) ? (
                <CommonInfoSvg as={NegativeBalanceIcon} />
              ) : (
                <CommonInfoSvg as={PositiveBalanceIcon} />
              )}
              <div>
                <CommonInfoTitle>{t("ANALYSIS.SALDO")}:</CommonInfoTitle>
                <CommonInfoAmount $amountType="saldo">
                  {formatDineroOutput(saldo, "USD")}
                </CommonInfoAmount>
              </div>
            </CommonInfoItem>
            <CommonCalcItem>
              <CommonInfoTitle>
                {t("ANALYSIS.TOTAL_TRANSACTIONS")}:
              </CommonInfoTitle>
              <CommonInfoAmount $amountType="all">
                {filteredTransactions.length}
              </CommonInfoAmount>
            </CommonCalcItem>
            <CommonCalcItem>
              <CommonInfoTitle>
                {t("ANALYSIS.AVERAGE_WEEKLY_EXPENSE")}:
              </CommonInfoTitle>
              <CommonInfoAmount $amountType="expense">
                {averageExpense}
              </CommonInfoAmount>
            </CommonCalcItem>
            <CommonCalcItem>
              <CommonInfoTitle>
                {t("ANALYSIS.AVERAGE_WEEKLY_INCOME")}:
              </CommonInfoTitle>
              <CommonInfoAmount $amountType="income">
                {averageIncome}
              </CommonInfoAmount>
            </CommonCalcItem>
          </CommonInfoContainer>
          <ChartsContainer>
            <img src={lineChartIcon} className="chart_icon" alt="linechart" />
            <ChartButtonsContainer>
              <ChartButton
                className={
                  lineChartFilter === "expensesToIncomes" ? "active_filter" : ""
                }
                onClick={() => setLineChartFilter("expensesToIncomes")}
              >
                {t("ANALYSIS.EXPENSES_TO_INCOMES")}
              </ChartButton>
              <ChartButton
                className={
                  lineChartFilter === "expenses" ? "active_filter" : ""
                }
                onClick={() => setLineChartFilter("expenses")}
              >
                {t("ANALYSIS.EXPENSES")}
              </ChartButton>
              <ChartButton
                className={lineChartFilter === "incomes" ? "active_filter" : ""}
                onClick={() => setLineChartFilter("incomes")}
              >
                {t("ANALYSIS.INCOMES")}
              </ChartButton>
              <ChartButton
                className={
                  lineChartFilter === "transfers" ? "active_filter" : ""
                }
                onClick={() => setLineChartFilter("transfers")}
              >
                {t("ANALYSIS.TRANSFERS")}
              </ChartButton>
            </ChartButtonsContainer>
            <ToggleButtonsContainer>
              <ToggleChartButton
                className={isLineChartDetailed ? "" : "active_more_btn"}
                onClick={() => setIsLineChartDetailed(false)}
              >
                {t("ANALYSIS.TOTAL")}
              </ToggleChartButton>
              <ToggleChartButton
                className={isLineChartDetailed ? "active_more_btn" : ""}
                onClick={() => setIsLineChartDetailed(true)}
              >
                {t("ANALYSIS.BY_CATEGORIES")}
              </ToggleChartButton>
            </ToggleButtonsContainer>
            <LineChart
              transactions={filteredTransactions}
              categories={categories}
              chartFilter={lineChartFilter}
              isDetailed={isLineChartDetailed}
              date={date}
            />
          </ChartsContainer>
          <ChartsContainer>
            <img src={barChartIcon} className="chart_icon" alt="barchart" />
            <ChartButtonsContainer>
              <ChartButton
                className={
                  barChartFilter === "expensesToIncomes" ? "active_filter" : ""
                }
                onClick={() => setBarChartFilter("expensesToIncomes")}
              >
                {t("ANALYSIS.EXPENSES_TO_INCOMES")}
              </ChartButton>
              <ChartButton
                className={barChartFilter === "expenses" ? "active_filter" : ""}
                onClick={() => setBarChartFilter("expenses")}
              >
                {t("ANALYSIS.EXPENSES")}
              </ChartButton>
              <ChartButton
                className={barChartFilter === "incomes" ? "active_filter" : ""}
                onClick={() => setBarChartFilter("incomes")}
              >
                {t("ANALYSIS.INCOMES")}
              </ChartButton>
              <ChartButton
                className={
                  barChartFilter === "transfers" ? "active_filter" : ""
                }
                onClick={() => setBarChartFilter("transfers")}
              >
                {t("ANALYSIS.TRANSFERS")}
              </ChartButton>
            </ChartButtonsContainer>
            <ToggleButtonsContainer>
              <ToggleChartButton
                className={isBarChartDetailed ? "" : "active_more_btn"}
                onClick={() => setIsBarChartDetailed(false)}
              >
                {t("ANALYSIS.TOTAL")}
              </ToggleChartButton>
              <ToggleChartButton
                className={isBarChartDetailed ? "active_more_btn" : ""}
                onClick={() => setIsBarChartDetailed(true)}
              >
                {t("ANALYSIS.BY_CATEGORIES")}
              </ToggleChartButton>
            </ToggleButtonsContainer>
            <BarChart
              transactions={filteredTransactions}
              categories={categories}
              chartFilter={barChartFilter}
              isDetailed={isBarChartDetailed}
              date={date}
            />
          </ChartsContainer>
          <ChartsContainer>
            <img src={pieChartIcon} className="chart_icon" alt="piechart" />
            <ChartButtonsContainer>
              <ChartButton
                className={pieChartFilter === "expenses" ? "active_filter" : ""}
                onClick={() => setPieChartFilter("expenses")}
              >
                {t("ANALYSIS.EXPENSES")}
              </ChartButton>
              <ChartButton
                className={pieChartFilter === "incomes" ? "active_filter" : ""}
                onClick={() => setPieChartFilter("incomes")}
              >
                {t("ANALYSIS.INCOMES")}
              </ChartButton>
              <ChartButton
                className={
                  pieChartFilter === "transfers" ? "active_filter" : ""
                }
                onClick={() => setPieChartFilter("transfers")}
              >
                {t("ANALYSIS.TRANSFERS")}
              </ChartButton>
            </ChartButtonsContainer>
            <PieChart
              transactions={filteredTransactions}
              categories={categories}
              chartFilter={pieChartFilter}
              date={date}
            />
          </ChartsContainer>
          <ChartsContainer>
            <img src={tableIcon} className="chart_icon" alt="table" />
            <ChartButtonsContainer>
              <ChartButton
                className={tableFilter === "expenses" ? "active_filter" : ""}
                onClick={() => setTableFilter("expenses")}
              >
                {t("ANALYSIS.EXPENSES")}
              </ChartButton>
              <ChartButton
                className={tableFilter === "incomes" ? "active_filter" : ""}
                onClick={() => setTableFilter("incomes")}
              >
                {t("ANALYSIS.INCOMES")}
              </ChartButton>
              <ChartButton
                className={tableFilter === "transfers" ? "active_filter" : ""}
                onClick={() => setTableFilter("transfers")}
              >
                {t("ANALYSIS.TRANSFERS")}
              </ChartButton>
            </ChartButtonsContainer>
            <Table
              transactions={filteredTransactions}
              categories={categories}
              tableFilter={tableFilter}
              date={date}
            />
          </ChartsContainer>
        </div>
      </AnalysisContainer>
    </React.Fragment>
  );
}

TransactionsAnalysis.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  accounts: PropTypes.array,
};

export default TransactionsAnalysis;
