import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { subtract, dinero, lessThan, toDecimal } from 'dinero.js';
import { useTranslation } from 'react-i18next';
import { formatDineroOutput } from '../../../utils/format/cash';
import {
  renderAccounts,
  filterByType,
  createSum,
  filterArchivedAccounts,
  createAverageAmount,
  filterByDate,
  filterByAccount,
  getCashRate,
} from '../utils/shared';
import { convertPeriod } from '../../../utils/format/date';
import LineChart from '../linechart/LineChart';
import BarChart from '../barchart/BarChart';
import PieChart from '../piechart/PieChart';
import Table from '../table/Table';
import { ReactComponent as FilterIcon } from '../../../assets/icons/shared/filter.svg';
import { ReactComponent as ExpenseIcon } from '../../../assets/icons/shared/expense.svg';
import { ReactComponent as AverageExpenseIcon } from '../../../assets/icons/shared/averageExpense.svg';
import { ReactComponent as AverageIncomeIcon } from '../../../assets/icons/shared/averageIncome.svg';
import { ReactComponent as IncomeIcon } from '../../../assets/icons/shared/income.svg';
import { ReactComponent as PositiveBalanceIcon } from '../../../assets/icons/shared/positiveBalance.svg';
import { ReactComponent as NegativeBalanceIcon } from '../../../assets/icons/shared/negativeBalance.svg';
import { ReactComponent as CalendarIcon } from '../../../assets/icons/shared/calendar.svg';
import { ReactComponent as RatesUpIcon } from '../../../assets/icons/shared/ratesUp.svg';
import { ReactComponent as RatesDownIcon } from '../../../assets/icons/shared/ratesDown.svg';
import { ReactComponent as RatesExpenseUpIcon } from '../../../assets/icons/shared/ratesExpenseUp.svg';
import { ReactComponent as RatesExpenseDownIcon } from '../../../assets/icons/shared/ratesExpenseDown.svg';

import {
  AccountsFieldFilter,
  AnalysisHeader,
  AverageInfoContainer,
  AverageInfoSvg,
  CalcInfoAmount,
  CalendarChartButton,
  ChartButton,
  ChartHeader,
  ChartsContainer,
  CommonInfoContainer,
  CommonInfoHeader,
  CommonInfoItem,
  CommonInfoItemDiv,
  CommonInfoSvg,
  CountItemHeader,
  CountNumber,
  CountTransactionsItem,
  FilterSvg,
  FlexContainer,
  HeaderTitle,
  MobCommonInfoHeader,
  RatesContainer,
  RatesInfo,
  RatesSvg,
  ToggleButtonsContainer,
  ToggleChartButton,
} from './TransactionsAnalysis.styled.js';
import { Grid, InputAdornment } from '@mui/material';
import { currencies } from '../../../utils/constants/currencies.js';
import {
  FilterButton,
  FilterButtonsContainer,
  FilterTitle,
  MobileFilterButton,
  SortButtonsContainer,
} from '../../../theme/global.js';

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
  const expensesRate = getCashRate(
    toDecimal(expensesSum),
    toDecimal(lastExpensesSum),
  );
  const incomesRate = getCashRate(
    toDecimal(incomesSum),
    toDecimal(lastIncomesSum),
  );
  const savingsRate = getCashRate(toDecimal(savings), toDecimal(lastSavings));

  return (
    <>
      <AnalysisHeader>
        <HeaderTitle>{t('ANALYSIS.CASH_FLOW')}</HeaderTitle>
        <FilterButtonsContainer>
          <SortButtonsContainer>
            <FilterButton>
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
            </FilterButton>
            <FilterButton>
              <FilterSvg as={CalendarIcon} />
              <FilterTitle>
                {convertPeriod(date.from, date.during, language)}
              </FilterTitle>
            </FilterButton>
          </SortButtonsContainer>
          <MobileFilterButton>
            <FilterSvg as={FilterIcon} />
          </MobileFilterButton>
        </FilterButtonsContainer>
      </AnalysisHeader>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CommonInfoContainer>
          <CountTransactionsItem>
            <FlexContainer>
              <CountItemHeader>
                {t('ANALYSIS.TOTAL_TRANSACTIONS')}:
              </CountItemHeader>
              <CountNumber $type="saldo">
                {filterByDate(filteredTransactions, date).length}
              </CountNumber>
            </FlexContainer>
            <FlexContainer>
              <CountItemHeader>
                {t('ANALYSIS.INCOME_TRANSACTIONS')}:{' '}
              </CountItemHeader>
              <CountNumber $type="income"> {incomes.length}</CountNumber>
            </FlexContainer>
            <FlexContainer>
              <CountItemHeader>
                {t('ANALYSIS.EXPENSES_TRANSACTIONS')}:{' '}
              </CountItemHeader>
              <CountNumber $type="expense">{expenses.length}</CountNumber>
            </FlexContainer>
          </CountTransactionsItem>
          <CommonInfoItem $type="saldo">
            <CommonInfoHeader>{t('ANALYSIS.TOTAL_SAVINGS')}</CommonInfoHeader>
            <CommonInfoItemDiv>
              {lessThan(
                savings,
                dinero({ amount: 0, currency: currencies[mainCurrency] }),
              ) ? (
                <CommonInfoSvg as={NegativeBalanceIcon} />
              ) : (
                <CommonInfoSvg as={PositiveBalanceIcon} />
              )}
              <div>
                <MobCommonInfoHeader>
                  {t('ANALYSIS.SAVINGS')}
                </MobCommonInfoHeader>
                <CalcInfoAmount $type="saldo">
                  {formatDineroOutput(savings, mainCurrency)}
                </CalcInfoAmount>
                <RatesContainer>
                  <FlexContainer>
                    {savingsRate < 0 ? (
                      <RatesSvg as={RatesDownIcon} />
                    ) : (
                      <RatesSvg as={RatesUpIcon} />
                    )}
                    {savingsRate} %
                  </FlexContainer>
                  {savingsRate < 0 ? (
                    <RatesInfo> {t('ANALYSIS.LESS_THAN')}May</RatesInfo>
                  ) : (
                    <RatesInfo>{t('ANALYSIS.MORE_THAN')}May</RatesInfo>
                  )}
                </RatesContainer>
              </div>
            </CommonInfoItemDiv>
          </CommonInfoItem>
          <CommonInfoItem $type="income">
            <CommonInfoHeader>{t('ANALYSIS.TOTAL_INCOME')}</CommonInfoHeader>
            <CommonInfoItemDiv>
              <CommonInfoSvg as={IncomeIcon} />
              <div>
                <MobCommonInfoHeader>
                  {t('ANALYSIS.INCOMES')}
                </MobCommonInfoHeader>
                <CalcInfoAmount $type="income">
                  {formatDineroOutput(incomesSum, mainCurrency)}
                </CalcInfoAmount>
                <RatesContainer>
                  <FlexContainer>
                    {incomesRate < 0 ? (
                      <RatesSvg as={RatesDownIcon} />
                    ) : (
                      <RatesSvg as={RatesUpIcon} />
                    )}
                    {incomesRate} %
                  </FlexContainer>
                  {incomesRate < 0 ? (
                    <RatesInfo> {t('ANALYSIS.LESS_THAN')}May</RatesInfo>
                  ) : (
                    <RatesInfo>{t('ANALYSIS.MORE_THAN')}May</RatesInfo>
                  )}
                </RatesContainer>
              </div>
            </CommonInfoItemDiv>
          </CommonInfoItem>
          <CommonInfoItem $type="expense">
            <CommonInfoHeader>{t('ANALYSIS.TOTAL_EXPENSES')}</CommonInfoHeader>
            <CommonInfoItemDiv>
              <CommonInfoSvg as={ExpenseIcon} />
              <div>
                <MobCommonInfoHeader>
                  {t('ANALYSIS.EXPENSES')}
                </MobCommonInfoHeader>
                <CalcInfoAmount $type="expense">
                  {formatDineroOutput(expensesSum, mainCurrency)}
                </CalcInfoAmount>
                <RatesContainer>
                  <FlexContainer>
                    {expensesRate < 0 ? (
                      <RatesSvg as={RatesExpenseDownIcon} />
                    ) : (
                      <RatesSvg as={RatesExpenseUpIcon} />
                    )}
                    {`${expensesRate} % `}
                  </FlexContainer>
                  {expensesRate < 0 ? (
                    <RatesInfo> {t('ANALYSIS.LESS_THAN')}May</RatesInfo>
                  ) : (
                    <RatesInfo> {t('ANALYSIS.MORE_THAN')}May</RatesInfo>
                  )}
                </RatesContainer>
              </div>
            </CommonInfoItemDiv>
          </CommonInfoItem>
        </CommonInfoContainer>
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <ChartsContainer>
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
      </Grid>
      <Grid item xs={12} sm={6} md={5} lg={5}>
        <ChartsContainer>
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
          <ToggleButtonsContainer>
            <CalendarChartButton>
              <FilterSvg as={CalendarIcon} />
              {convertPeriod(date.from, date.during, language)}
            </CalendarChartButton>
          </ToggleButtonsContainer>
          <PieChart
            transactions={filteredTransactions}
            categories={categories}
            chartFilter={pieChartFilter}
            date={date}
          />
        </ChartsContainer>
      </Grid>
      <Grid item xs={12} sm={6} md={7} lg={7}>
        <ChartsContainer>
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
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <AverageInfoContainer>
          <CommonInfoItem $type="income">
            <CommonInfoHeader>
              {t('ANALYSIS.AVERAGE_WEEKLY_INCOME')}:
            </CommonInfoHeader>
            <AverageInfoSvg as={AverageIncomeIcon} />
            <CommonInfoItemDiv>
              <CalcInfoAmount $type="income">{averageIncome}</CalcInfoAmount>
            </CommonInfoItemDiv>
          </CommonInfoItem>
          <CommonInfoItem $type="expense">
            <CommonInfoHeader>
              {t('ANALYSIS.AVERAGE_WEEKLY_EXPENSE')}:
            </CommonInfoHeader>
            <AverageInfoSvg as={AverageExpenseIcon} />
            <CommonInfoItemDiv>
              <CalcInfoAmount $type="expense">{averageExpense}</CalcInfoAmount>
            </CommonInfoItemDiv>
          </CommonInfoItem>
        </AverageInfoContainer>
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <ChartsContainer>
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
            <CalendarChartButton>
              <FilterSvg as={CalendarIcon} />
              {convertPeriod(date.from, date.during, language)}
            </CalendarChartButton>
            <ToggleChartButton
              $isActive={isLineChartDetailed}
              onClick={() => setIsLineChartDetailed(!isLineChartDetailed)}
            >
              {t('ANALYSIS.GROUPED')}
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
      </Grid>
    </>
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
