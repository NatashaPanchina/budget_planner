import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { subtract, dinero, lessThan } from 'dinero.js';
import { USD } from '@dinero.js/currencies';
import { useTranslation } from 'react-i18next';

import { formatDineroOutput } from '../../../utils/format/cash';
import {
  renderAccounts,
  filterTransactions,
  filterByType,
  createSum,
  filterArchivedAccounts,
  createAverageAmount,
  createLocaleTransactions,
} from '../utils/shared';
import { dateFormatter } from '../../../utils/format/date';
import LineChart from '../linechart/LineChart';
import BarChart from '../barchart/BarChart';
import PieChart from '../piechart/PieChart';
import Table from '../table/Table';

import { ReactComponent as FilterIcon } from '../../../assets/icons/shared/filter.svg';
import { ReactComponent as ExpenseIcon } from '../../../assets/icons/shared/expense.svg';
import { ReactComponent as IncomeIcon } from '../../../assets/icons/shared/income.svg';
import { ReactComponent as PositiveBalanceIcon } from '../../../assets/icons/shared/positiveBalance.svg';
import { ReactComponent as NegativeBalanceIcon } from '../../../assets/icons/shared/negativeBalance.svg';
import { ReactComponent as LineChartIcon } from '../../../assets/icons/shared/lineChart.svg';
import { ReactComponent as BarChartIcon } from '../../../assets/icons/shared/barChart.svg';
import { ReactComponent as PieChartIcon } from '../../../assets/icons/shared/pieChart.svg';
import { ReactComponent as TableIcon } from '../../../assets/icons/shared/table.svg';
import { ReactComponent as CalendarIcon } from '../../../assets/icons/shared/calendar.svg';

import {
  AccountsList,
  AnalysisHeader,
  ChartButton,
  ChartButtonsContainer,
  ChartSvg,
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
} from './TransactionsAnalysis.styled.js';
import { hideElement, useOutsideClick } from '../../../hooks/useOutsideClick';

function TransactionsAnalysis({ transactions, categories, accounts }) {
  const { t } = useTranslation();

  const [date] = useState({
    from: new Date('6/1/2023'),
    to: new Date('6/30/2023'),
    during: 'month',
  });
  const [accountFilter, setAccountFilter] = useState('All cash');
  const [lineChartFilter, setLineChartFilter] = useState('expensesToIncomes');
  const [isLineChartDetailed, setIsLineChartDetailed] = useState(false);
  const [barChartFilter, setBarChartFilter] = useState('expensesToIncomes');
  const [isBarChartDetailed, setIsBarChartDetailed] = useState(false);
  const [pieChartFilter, setPieChartFilter] = useState('expenses');
  const [tableFilter, setTableFilter] = useState('expenses');
  const notArchivedAccounts = filterArchivedAccounts(accounts);
  const filteredTransactions = filterTransactions(
    transactions,
    notArchivedAccounts,
    date,
    accountFilter,
  );
  const expenses = filterByType(filteredTransactions, 'expense');
  const incomes = filterByType(filteredTransactions, 'income');
  const expensesSum = createSum(expenses);
  const incomesSum = createSum(incomes);
  const saldo = subtract(incomesSum, expensesSum);
  const averageExpense = createAverageAmount(date, expensesSum);
  const averageIncome = createAverageAmount(date, incomesSum);

  const accountsRef = useOutsideClick(hideElement);

  return (
    <React.Fragment>
      <AnalysisHeader>
        <HeaderTitle>{t('ANALYSIS.TRANSACTIONS_ANALYSIS')}</HeaderTitle>
        <Filter
          onClick={(event) => {
            accountsRef.current.classList.toggle('none');
            event.stopPropagation();
          }}
        >
          <FilterSvg as={FilterIcon} />
          {accountFilter === 'All cash'
            ? t('ANALYSIS.ALL_CASH')
            : accountFilter}
        </Filter>
        <AccountsList ref={accountsRef} className="none">
          {renderAccounts(t, notArchivedAccounts, setAccountFilter)}
        </AccountsList>
        <Filter>
          <FilterSvg as={CalendarIcon} />
          {`${dateFormatter.format(date.from)} - ${dateFormatter.format(
            date.to,
          )}`}
        </Filter>
      </AnalysisHeader>
      <CommonInfoContainer>
        <CommonInfoItem>
          <CommonInfoSvg as={ExpenseIcon} />
          <div>
            <CommonInfoTitle>{t('ANALYSIS.TOTAL_EXPENSES')}:</CommonInfoTitle>
            <CommonInfoAmount $amountType="expense">
              {formatDineroOutput(expensesSum, 'USD')}
            </CommonInfoAmount>
            <CommonInfoCount>
              {expenses.length}{' '}
              {t(createLocaleTransactions('ANALYSIS', expenses.length))}
            </CommonInfoCount>
          </div>
        </CommonInfoItem>
        <CommonInfoItem>
          <CommonInfoSvg as={IncomeIcon} />
          <div>
            <CommonInfoTitle>{t('ANALYSIS.TOTAL_INCOMES')}:</CommonInfoTitle>
            <CommonInfoAmount $amountType="income">
              {formatDineroOutput(incomesSum, 'USD')}
            </CommonInfoAmount>
            <CommonInfoCount>
              {incomes.length}{' '}
              {t(createLocaleTransactions('ANALYSIS', incomes.length))}
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
            <CommonInfoTitle>{t('ANALYSIS.SALDO')}:</CommonInfoTitle>
            <CommonInfoAmount $amountType="saldo">
              {formatDineroOutput(saldo, 'USD')}
            </CommonInfoAmount>
          </div>
        </CommonInfoItem>
        <CommonCalcItem>
          <CommonInfoTitle>{t('ANALYSIS.TOTAL_TRANSACTIONS')}:</CommonInfoTitle>
          <CommonInfoAmount $amountType="all">
            {filteredTransactions.length}
          </CommonInfoAmount>
        </CommonCalcItem>
        <CommonCalcItem>
          <CommonInfoTitle>
            {t('ANALYSIS.AVERAGE_WEEKLY_EXPENSE')}:
          </CommonInfoTitle>
          <CommonInfoAmount $amountType="expense">
            {averageExpense}
          </CommonInfoAmount>
        </CommonCalcItem>
        <CommonCalcItem>
          <CommonInfoTitle>
            {t('ANALYSIS.AVERAGE_WEEKLY_INCOME')}:
          </CommonInfoTitle>
          <CommonInfoAmount $amountType="income">
            {averageIncome}
          </CommonInfoAmount>
        </CommonCalcItem>
      </CommonInfoContainer>
      <ChartsContainer>
        <ChartSvg as={LineChartIcon} />
        <ChartButtonsContainer>
          <ChartButton
            $isActive={lineChartFilter === 'expensesToIncomes'}
            onClick={() => setLineChartFilter('expensesToIncomes')}
          >
            {t('ANALYSIS.EXPENSES_TO_INCOMES')}
          </ChartButton>
          <ChartButton
            $isActive={lineChartFilter === 'expenses'}
            onClick={() => setLineChartFilter('expenses')}
          >
            {t('ANALYSIS.EXPENSES')}
          </ChartButton>
          <ChartButton
            $isActive={lineChartFilter === 'incomes'}
            onClick={() => setLineChartFilter('incomes')}
          >
            {t('ANALYSIS.INCOMES')}
          </ChartButton>
          <ChartButton
            $isActive={lineChartFilter === 'transfers'}
            onClick={() => setLineChartFilter('transfers')}
          >
            {t('ANALYSIS.TRANSFERS')}
          </ChartButton>
        </ChartButtonsContainer>
        <ToggleButtonsContainer>
          <ToggleChartButton
            $isActive={!isLineChartDetailed}
            onClick={() => setIsLineChartDetailed(false)}
          >
            {t('ANALYSIS.TOTAL')}
          </ToggleChartButton>
          <ToggleChartButton
            $isActive={isLineChartDetailed}
            onClick={() => setIsLineChartDetailed(true)}
          >
            {t('ANALYSIS.BY_CATEGORIES')}
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
        <ChartSvg as={BarChartIcon} />
        <ChartButtonsContainer>
          <ChartButton
            $isActive={barChartFilter === 'expensesToIncomes'}
            onClick={() => setBarChartFilter('expensesToIncomes')}
          >
            {t('ANALYSIS.EXPENSES_TO_INCOMES')}
          </ChartButton>
          <ChartButton
            $isActive={barChartFilter === 'expenses'}
            onClick={() => setBarChartFilter('expenses')}
          >
            {t('ANALYSIS.EXPENSES')}
          </ChartButton>
          <ChartButton
            $isActive={barChartFilter === 'incomes'}
            onClick={() => setBarChartFilter('incomes')}
          >
            {t('ANALYSIS.INCOMES')}
          </ChartButton>
          <ChartButton
            $isActive={barChartFilter === 'transfers'}
            onClick={() => setBarChartFilter('transfers')}
          >
            {t('ANALYSIS.TRANSFERS')}
          </ChartButton>
        </ChartButtonsContainer>
        <ToggleButtonsContainer>
          <ToggleChartButton
            $isActive={!isBarChartDetailed}
            onClick={() => setIsBarChartDetailed(false)}
          >
            {t('ANALYSIS.TOTAL')}
          </ToggleChartButton>
          <ToggleChartButton
            $isActive={isBarChartDetailed}
            onClick={() => setIsBarChartDetailed(true)}
          >
            {t('ANALYSIS.BY_CATEGORIES')}
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
        <ChartSvg as={PieChartIcon} />
        <ChartButtonsContainer>
          <ChartButton
            $isActive={pieChartFilter === 'expenses'}
            onClick={() => setPieChartFilter('expenses')}
          >
            {t('ANALYSIS.EXPENSES')}
          </ChartButton>
          <ChartButton
            $isActive={pieChartFilter === 'incomes'}
            onClick={() => setPieChartFilter('incomes')}
          >
            {t('ANALYSIS.INCOMES')}
          </ChartButton>
          <ChartButton
            $isActive={pieChartFilter === 'transfers'}
            onClick={() => setPieChartFilter('transfers')}
          >
            {t('ANALYSIS.TRANSFERS')}
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
        <ChartSvg as={TableIcon} />
        <ChartButtonsContainer>
          <ChartButton
            $isActive={tableFilter === 'expenses'}
            onClick={() => setTableFilter('expenses')}
          >
            {t('ANALYSIS.EXPENSES')}
          </ChartButton>
          <ChartButton
            $isActive={tableFilter === 'incomes'}
            onClick={() => setTableFilter('incomes')}
          >
            {t('ANALYSIS.INCOMES')}
          </ChartButton>
          <ChartButton
            $isActive={tableFilter === 'transfers'}
            onClick={() => setTableFilter('transfers')}
          >
            {t('ANALYSIS.TRANSFERS')}
          </ChartButton>
        </ChartButtonsContainer>
        <Table
          transactions={filteredTransactions}
          categories={categories}
          tableFilter={tableFilter}
          date={date}
        />
      </ChartsContainer>
    </React.Fragment>
  );
}

TransactionsAnalysis.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  accounts: PropTypes.array,
};

export default TransactionsAnalysis;
