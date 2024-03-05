import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { subtract, dinero, lessThan } from 'dinero.js';
import { useTranslation } from 'react-i18next';
import { formatDineroOutput } from '../../../utils/format/cash';
import {
  renderAccounts,
  filterByType,
  createSum,
  filterArchivedAccounts,
  createAverageAmount,
  createLocaleTransactions,
  filterByDate,
  filterByAccount,
} from '../utils/shared';
import { dateFormatter } from '../../../utils/format/date';
import LineChart from '../linechart/LineChart';
import BarChart from '../barchart/BarChart';
import PieChart from '../piechart/PieChart';
import Table from '../table/Table';

import { ReactComponent as FilterIcon } from '../../../assets/icons/shared/filter.svg';
import { ReactComponent as ExpenseIcon } from '../../../assets/icons/shared/cashFlowExpense.svg';
import { ReactComponent as AverageExpenseIcon } from '../../../assets/icons/shared/averageExpense.svg';
import { ReactComponent as AverageIncomeIcon } from '../../../assets/icons/shared/averageIncome.svg';
import { ReactComponent as IncomeIcon } from '../../../assets/icons/shared/cashFlowIncome.svg';
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
  AccountsFieldFilter,
  AnalysisHeader,
  AverageInfoSvg,
  CalendarChartButton,
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
import { Grid, InputAdornment } from '@mui/material';
import { currencies } from '../../../utils/constants/currencies.js';

function TransactionsAnalysis({
  transactions,
  categories,
  accounts,
  mainCurrency,
  language,
}) {
  const { t } = useTranslation();

  const [date] = useState({
    from: new Date('06/01/2023'),
    to: new Date('06/30/2023'),
    during: 'month',
  });
  const [lastDate] = useState({
    from: new Date('05/01/2023'),
    to: new Date('05/31/2023'),
    during: 'month',
  });
  const [barDate] = useState({
    from: new Date('06/01/2023'),
    to: new Date('06/30/2023'),
    during: 'month',
  });
  const [barPrevDate] = useState({
    from: new Date('05/01/2023'),
    to: new Date('05/31/2023'),
    during: 'month',
  });
  const [isBarChartCompared] = useState(true);
  const [accountFilter, setAccountFilter] = useState('All accounts');
  const [lineChartFilter, setLineChartFilter] = useState('expensesToIncomes');
  const [isLineChartDetailed, setIsLineChartDetailed] = useState(false);
  const [barChartFilter, setBarChartFilter] = useState('savings');
  const [isBarChartDetailed, setIsBarChartDetailed] = useState(false);
  const [pieChartFilter, setPieChartFilter] = useState('expenses');
  const [tableFilter, setTableFilter] = useState('expenses');
  const notArchivedAccounts = filterArchivedAccounts(accounts);
  const filteredTransactions = filterByAccount(
    transactions,
    notArchivedAccounts,
    accountFilter,
  );
  const expenses = filterByType(
    filterByDate(filteredTransactions, date),
    'expense',
  );
  const lastExpenses = filterByType(
    filterByDate(filteredTransactions, lastDate),
    'expense',
  );
  const incomes = filterByType(
    filterByDate(filteredTransactions, date),
    'income',
  );
  const lastIncomes = filterByType(
    filterByDate(filteredTransactions, lastDate),
    'income',
  );
  const expensesSum = createSum(expenses, mainCurrency);
  const incomesSum = createSum(incomes, mainCurrency);
  const savings = subtract(incomesSum, expensesSum);
  const lastExpensesSum = createSum(lastExpenses, mainCurrency);
  const lastIncomesSum = createSum(lastIncomes, mainCurrency);
  const lastSavings = subtract(lastIncomesSum, lastExpensesSum);
  const averageExpense = createAverageAmount(date, expensesSum, mainCurrency);
  const averageIncome = createAverageAmount(date, incomesSum, mainCurrency);

  return (
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <AnalysisHeader>
        <HeaderTitle>{t('ANALYSIS.CASH_FLOW')}</HeaderTitle>
        <AccountsFieldFilter
          margin="normal"
          select
          value={accountFilter}
          onChange={(event) => setAccountFilter(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterSvg as={FilterIcon} />
              </InputAdornment>
            ),
          }}
        >
          {renderAccounts(t, notArchivedAccounts)}
        </AccountsFieldFilter>
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
              {formatDineroOutput(expensesSum, mainCurrency)}
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
              {formatDineroOutput(incomesSum, mainCurrency)}
            </CommonInfoAmount>
            <div>
              {incomes.length}{' '}
              {t(createLocaleTransactions('ANALYSIS', incomes.length))}
            </div>
          </div>
        </CommonInfoItem>
        <CommonInfoItem $itemType="savings" $background={backgroundIcon}>
          {lessThan(
            savings,
            dinero({ amount: 0, currency: currencies[mainCurrency] }),
          ) ? (
            <CommonInfoSvg as={NegativeBalanceIcon} />
          ) : (
            <CommonInfoSvg as={PositiveBalanceIcon} />
          )}
          <div>
            <div>{t('ANALYSIS.TOTAL_SAVINGS')}:</div>
            <CommonInfoAmount>
              {formatDineroOutput(savings, mainCurrency)}
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
            $isActive={barChartFilter === 'savings'}
            onClick={() => setBarChartFilter('savings')}
          >
            {t('ANALYSIS.SAVINGS')}
          </ChartButton>
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
          <CalendarChartButton>
            <FilterSvg as={CalendarIcon} />
            June Vs May
          </CalendarChartButton>
          <ToggleChartButton
            $isActive={isBarChartDetailed}
            onClick={() => setIsBarChartDetailed(!isBarChartDetailed)}
          >
            {t('ANALYSIS.GROUPED')}
          </ToggleChartButton>
        </ToggleButtonsContainer>
        <BarChart
          transactions={filteredTransactions}
          categories={categories}
          chartFilter={barChartFilter}
          isCompare={isBarChartCompared}
          isDetailed={isBarChartDetailed}
          date={barDate}
          comparedDate={barPrevDate}
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
  mainCurrency: PropTypes.string,
  language: PropTypes.string,
};

export default TransactionsAnalysis;
