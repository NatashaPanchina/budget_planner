import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { subtract, toDecimal } from 'dinero.js';
import { useTranslation } from 'react-i18next';
import { formatDineroOutput } from '../../../utils/format/cash';
import {
  filterByType,
  createSum,
  filterArchivedAccounts,
  createAverageAmount,
  filterByDate,
  filterByAccount,
  getCashRate,
} from '../utils/shared';
import {
  convertPeriod,
  getCurrentMonth,
  getLastMonth,
} from '../../../utils/format/date';
import LineChart from '../linechart/LineChart';
import BarChart from '../barchart/BarChart';
import PieChart from '../piechart/PieChart';
import Table from '../table/Table';
import { ReactComponent as FilterIcon } from '../../../assets/icons/shared/filter.svg';
import { ReactComponent as AverageExpenseIcon } from '../../../assets/icons/shared/averageExpense.svg';
import { ReactComponent as AverageIncomeIcon } from '../../../assets/icons/shared/averageIncome.svg';
import { ReactComponent as CalendarIcon } from '../../../assets/icons/shared/calendar.svg';
import { ReactComponent as RatesUpIcon } from '../../../assets/icons/shared/ratesUp.svg';
import { ReactComponent as RatesDownIcon } from '../../../assets/icons/shared/ratesDown.svg';
import { ReactComponent as RatesExpenseUpIcon } from '../../../assets/icons/shared/ratesExpenseUp.svg';
import { ReactComponent as RatesExpenseDownIcon } from '../../../assets/icons/shared/ratesExpenseDown.svg';
import { ReactComponent as ToggleMenuIcon } from '../../../assets/icons/shared/menuDots.svg';

import {
  AnalysisHeader,
  AverageInfoContainer,
  AverageInfoItem,
  AverageInfoSvg,
  AverangeInfoHeader,
  CalcInfoAmount,
  ChartHeader,
  ChartsContainer,
  CommonInfoContainer,
  CommonInfoHeader,
  CommonInfoItem,
  CommonInfoItemDiv,
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
  PeriodsContainer,
  PeriodLink,
  CalendarContainer,
  Stripe,
  FilterCalendarSvg,
  CountTransaction,
  PieChartContainer,
  BarChartContainer,
  ToggleSvg,
} from './TransactionsAnalysis.styled.js';
import { Drawer, Grid } from '@mui/material';
import {
  FilterButton,
  FilterButtonsContainer,
  FilterMenuItem,
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

  const [period, setPeriod] = useState('month');
  const [date] = useState(getCurrentMonth());
  const [lastDate] = useState(getLastMonth());
  const formattedDate = convertPeriod(date.from, 'month_year', language);
  const formattedLastDate = convertPeriod(
    lastDate.from,
    'month_year',
    language,
  );
  const [barDate] = useState(getCurrentMonth());
  const [barPrevDate] = useState(getLastMonth());
  const [isBarChartCompared] = useState(true);
  const [accountFilter, setAccountFilter] = useState('All accounts');
  const [lineChartFilter, setLineChartFilter] = useState('expensesToIncomes');
  const [isLineChartDetailed, setIsLineChartDetailed] = useState(false);
  const [barChartFilter, setBarChartFilter] = useState('savings');
  const [isBarChartDetailed, setIsBarChartDetailed] = useState(false);
  const [pieChartFilter, setPieChartFilter] = useState('expenses');
  const [tableFilter, setTableFilter] = useState('expenses');
  const [mobMenu, setMobMenu] = useState(false);
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
              <FilterSvg as={FilterIcon} />
              <FilterTitle>{t('ANALYSIS.ALL_FILTERS')}</FilterTitle>
            </FilterButton>
            <FilterButton>
              <FilterSvg as={CalendarIcon} />
              <FilterTitle>{formattedDate}</FilterTitle>
            </FilterButton>
          </SortButtonsContainer>
          <MobileFilterButton onClick={() => setMobMenu(true)}>
            <ToggleSvg as={ToggleMenuIcon} />
          </MobileFilterButton>
        </FilterButtonsContainer>
      </AnalysisHeader>
      <Drawer anchor="right" open={mobMenu} onClose={() => setMobMenu(false)}>
        <FilterMenuItem
          onClick={() => {
            setMobMenu(false);
          }}
        >
          <FlexContainer>
            <FilterSvg as={FilterIcon} />
            {t('TRANSACTIONS.FILTER_KEY')}
          </FlexContainer>
        </FilterMenuItem>
        <FilterMenuItem onClick={() => setMobMenu(false)}>
          <FlexContainer>
            <FilterSvg as={CalendarIcon} />
            {formattedDate}
          </FlexContainer>
        </FilterMenuItem>
      </Drawer>
      <PeriodsContainer>
        <PeriodLink
          $isActive={period === 'week'}
          onClick={() => setPeriod('week')}
        >
          {t('ANALYSIS.WEEK')}
        </PeriodLink>
        <PeriodLink
          $isActive={period === 'month'}
          onClick={() => setPeriod('month')}
        >
          {t('ANALYSIS.MONTH')}
        </PeriodLink>
        <PeriodLink
          $isActive={period === 'year'}
          onClick={() => setPeriod('year')}
        >
          {t('ANALYSIS.YEAR')}
        </PeriodLink>
      </PeriodsContainer>
      <CalendarContainer>
        <FilterCalendarSvg as={CalendarIcon} />
        {convertPeriod(date.from, 'month_year', language)}
      </CalendarContainer>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <CountTransactionsItem>
          <CountTransaction>
            <CountItemHeader>
              {t('ANALYSIS.TOTAL_TRANSACTIONS')}:
            </CountItemHeader>
            <CountNumber>
              {filterByDate(filteredTransactions, date).length}
            </CountNumber>
          </CountTransaction>
          <CountTransaction>
            <CountItemHeader>
              {t('ANALYSIS.EXPENSES_TRANSACTIONS')}:{' '}
            </CountItemHeader>
            <CountNumber>{expenses.length}</CountNumber>
          </CountTransaction>
          <CountTransaction>
            <CountItemHeader>
              {t('ANALYSIS.INCOME_TRANSACTIONS')}:{' '}
            </CountItemHeader>
            <CountNumber> {incomes.length}</CountNumber>
          </CountTransaction>
        </CountTransactionsItem>
        <CommonInfoContainer>
          <CommonInfoItem>
            <CommonInfoHeader>{t('ANALYSIS.TOTAL_SAVINGS')}</CommonInfoHeader>
            <CommonInfoItemDiv>
              <div>
                <MobCommonInfoHeader>
                  {t('ANALYSIS.SAVINGS')}
                </MobCommonInfoHeader>
                <CalcInfoAmount>
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
                    <RatesInfo>
                      {' '}
                      {t('ANALYSIS.LESS_THAN')}
                      {formattedLastDate}
                    </RatesInfo>
                  ) : (
                    <RatesInfo>
                      {t('ANALYSIS.MORE_THAN')}
                      {formattedLastDate}
                    </RatesInfo>
                  )}
                </RatesContainer>
                <Stripe $type="saldo" />
              </div>
            </CommonInfoItemDiv>
          </CommonInfoItem>
          <CommonInfoItem>
            <CommonInfoHeader>{t('ANALYSIS.TOTAL_EXPENSES')}</CommonInfoHeader>
            <CommonInfoItemDiv>
              <div>
                <MobCommonInfoHeader>
                  {t('ANALYSIS.EXPENSES')}
                </MobCommonInfoHeader>
                <CalcInfoAmount>
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
                    <RatesInfo>
                      {' '}
                      {t('ANALYSIS.LESS_THAN')}
                      {formattedLastDate}
                    </RatesInfo>
                  ) : (
                    <RatesInfo>
                      {' '}
                      {t('ANALYSIS.MORE_THAN')}
                      {formattedLastDate}
                    </RatesInfo>
                  )}
                </RatesContainer>
                <Stripe $type="expense" />
              </div>
            </CommonInfoItemDiv>
          </CommonInfoItem>
          <CommonInfoItem>
            <CommonInfoHeader>{t('ANALYSIS.TOTAL_INCOME')}</CommonInfoHeader>
            <CommonInfoItemDiv>
              <div>
                <MobCommonInfoHeader>
                  {t('ANALYSIS.INCOMES')}
                </MobCommonInfoHeader>
                <CalcInfoAmount>
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
                    <RatesInfo>
                      {' '}
                      {t('ANALYSIS.LESS_THAN')}
                      {formattedLastDate}
                    </RatesInfo>
                  ) : (
                    <RatesInfo>
                      {t('ANALYSIS.MORE_THAN')}
                      {formattedLastDate}
                    </RatesInfo>
                  )}
                </RatesContainer>
                <Stripe $type="income" />
              </div>
            </CommonInfoItemDiv>
          </CommonInfoItem>
        </CommonInfoContainer>
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <BarChartContainer>
          <ChartHeader>{t('ANALYSIS.YOUR_SAVINGS')}</ChartHeader>
          {/* <ToggleButtonsContainer>
            <ToggleChartButton
              $isActive={isBarChartDetailed}
              onClick={() => setIsBarChartDetailed(!isBarChartDetailed)}
            >
              {t('ANALYSIS.GROUPED')}
            </ToggleChartButton>
          </ToggleButtonsContainer> */}
          <BarChart
            transactions={filteredTransactions}
            categories={categories}
            chartFilter={barChartFilter}
            isCompare={isBarChartCompared}
            isDetailed={isBarChartDetailed}
            date={barDate}
            comparedDate={barPrevDate}
          />
        </BarChartContainer>
      </Grid>
      <Grid item xs={12} sm={6} md={5} lg={5}>
        <PieChartContainer>
          <ChartHeader>{t('ANALYSIS.EXPENSES_BY_CATEGORY')}</ChartHeader>
          <PieChart
            transactions={filteredTransactions}
            categories={categories}
            chartFilter={pieChartFilter}
            date={date}
          />
        </PieChartContainer>
      </Grid>
      <Grid item xs={12} sm={6} md={7} lg={7}>
        <PieChartContainer>
          <Table
            transactions={filteredTransactions}
            categories={categories}
            tableFilter={tableFilter}
            date={date}
          />
        </PieChartContainer>
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <ChartsContainer>
          <ChartHeader>{t('ANALYSIS.EXPENSES_TO_INCOMES')}</ChartHeader>
          <LineChart
            transactions={filteredTransactions}
            categories={categories}
            chartFilter={lineChartFilter}
            isDetailed={isLineChartDetailed}
            date={date}
          />
        </ChartsContainer>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <AverageInfoContainer>
          <AverageInfoItem>
            <AverangeInfoHeader>
              {t('ANALYSIS.AVERAGE_WEEKLY_INCOME')}:
            </AverangeInfoHeader>
            <AverageInfoSvg as={AverageIncomeIcon} />
            <CalcInfoAmount $type="income">{averageIncome}</CalcInfoAmount>
          </AverageInfoItem>
          <AverageInfoItem>
            <AverangeInfoHeader>
              {t('ANALYSIS.AVERAGE_WEEKLY_EXPENSE')}:
            </AverangeInfoHeader>
            <AverageInfoSvg as={AverageExpenseIcon} />
            <CalcInfoAmount $type="expense">{averageExpense}</CalcInfoAmount>
          </AverageInfoItem>
        </AverageInfoContainer>
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
