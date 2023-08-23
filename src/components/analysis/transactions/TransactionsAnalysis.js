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
import { ReactComponent as ExpenseIcon } from '../../../assets/icons/shared/analysisExpense.svg';
import { ReactComponent as AverageExpenseIcon } from '../../../assets/icons/shared/averageExpense.svg';
import { ReactComponent as AverageIncomeIcon } from '../../../assets/icons/shared/averageIncome.svg';
import { ReactComponent as IncomeIcon } from '../../../assets/icons/shared/analysisIncome.svg';
import { ReactComponent as PositiveBalanceIcon } from '../../../assets/icons/shared/positiveBalance.svg';
import { ReactComponent as NegativeBalanceIcon } from '../../../assets/icons/shared/negativeBalance.svg';
import { ReactComponent as TotalTransactionsIcon } from '../../../assets/icons/navigation/mobTransactions.svg';
import backgroundIcon from '../../../assets/icons/shared/sumBackground.svg';
import { ReactComponent as LineChartIcon } from '../../../assets/icons/shared/lineChart.svg';
import { ReactComponent as BarChartIcon } from '../../../assets/icons/shared/barChart.svg';
import { ReactComponent as PieChartIcon } from '../../../assets/icons/shared/pieChart.svg';
import { ReactComponent as TableIcon } from '../../../assets/icons/shared/table.svg';
import { ReactComponent as CalendarIcon } from '../../../assets/icons/shared/calendar.svg';

import {
  AccountsList,
  AnalysisHeader,
  AverageInfoSvg,
  ChartButton,
  ChartHeader,
  ChartSvg,
  ChartsContainer,
  CommonCalcItem,
  CommonInfoAmount,
  CommonInfoContainer,
  CommonInfoItem,
  CommonInfoSvg,
  CommonInfoTitle,
  Filter,
  FilterSvg,
  HeaderTitle,
  ToggleButtonsContainer,
  ToggleChartButton,
  TotalTransactionsSvg,
} from './TransactionsAnalysis.styled.js';
import { hideElement, useOutsideClick } from '../../../hooks/useOutsideClick';
import { Grid } from '@mui/material';

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
    <Grid item xs={12} sm={12} md={12} lg={12}>
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
        <CommonInfoItem $itemType="totalExpense" $background={backgroundIcon}>
          <CommonInfoSvg as={ExpenseIcon} />
          <div>
            <div>{t('ANALYSIS.TOTAL_EXPENSES')}:</div>
            <CommonInfoAmount>
              {formatDineroOutput(expensesSum, 'USD')}
            </CommonInfoAmount>
            <div>
              {expenses.length}{' '}
              {t(createLocaleTransactions('ANALYSIS', expenses.length))}
            </div>
          </div>
        </CommonInfoItem>
        <CommonInfoItem $itemType="totalIncome" $background={backgroundIcon}>
          <CommonInfoSvg as={IncomeIcon} />
          <div>
            <div>{t('ANALYSIS.TOTAL_INCOMES')}:</div>
            <CommonInfoAmount>
              {formatDineroOutput(incomesSum, 'USD')}
            </CommonInfoAmount>
            <div>
              {incomes.length}{' '}
              {t(createLocaleTransactions('ANALYSIS', incomes.length))}
            </div>
          </div>
        </CommonInfoItem>
        <CommonInfoItem $itemType="saldo" $background={backgroundIcon}>
          {lessThan(saldo, dinero({ amount: 0, currency: USD })) ? (
            <CommonInfoSvg as={NegativeBalanceIcon} />
          ) : (
            <CommonInfoSvg as={PositiveBalanceIcon} />
          )}
          <div>
            <div>{t('ANALYSIS.SALDO')}:</div>
            <CommonInfoAmount>
              {formatDineroOutput(saldo, 'USD')}
            </CommonInfoAmount>
          </div>
        </CommonInfoItem>
        <CommonCalcItem $itemType="averageExpense">
          <AverageInfoSvg as={AverageExpenseIcon} />
          <div>
            <CommonInfoTitle>
              {t('ANALYSIS.AVERAGE_WEEKLY_EXPENSE')}:
            </CommonInfoTitle>
            <CommonInfoAmount $amountType="expense">
              {averageExpense}
            </CommonInfoAmount>
          </div>
        </CommonCalcItem>
        <CommonCalcItem $itemType="averageIncome">
          <AverageInfoSvg as={AverageIncomeIcon} />
          <div>
            <CommonInfoTitle>
              {t('ANALYSIS.AVERAGE_WEEKLY_INCOME')}:
            </CommonInfoTitle>
            <CommonInfoAmount $amountType="income">
              {averageIncome}
            </CommonInfoAmount>
          </div>
        </CommonCalcItem>
        <CommonCalcItem $itemType="totalCount">
          <TotalTransactionsSvg as={TotalTransactionsIcon} />
          <div>
            <CommonInfoTitle>
              {t('ANALYSIS.TOTAL_TRANSACTIONS')}:
            </CommonInfoTitle>
            <CommonInfoAmount $amountType="all">
              {filteredTransactions.length}
            </CommonInfoAmount>
          </div>
        </CommonCalcItem>
      </CommonInfoContainer>
      <ChartsContainer>
        <ChartSvg as={LineChartIcon} />
        <ChartHeader>
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
        </ChartHeader>
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
        <ChartHeader>
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
        </ChartHeader>
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
        <ChartHeader>
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
        </ChartHeader>
        <PieChart
          transactions={filteredTransactions}
          categories={categories}
          chartFilter={pieChartFilter}
          date={date}
        />
      </ChartsContainer>
      <ChartsContainer>
        <ChartSvg as={TableIcon} />
        <ChartHeader>
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
        </ChartHeader>
        <Table
          transactions={filteredTransactions}
          categories={categories}
          tableFilter={tableFilter}
          date={date}
        />
      </ChartsContainer>
    </Grid>
  );
}

TransactionsAnalysis.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  accounts: PropTypes.array,
};

export default TransactionsAnalysis;
