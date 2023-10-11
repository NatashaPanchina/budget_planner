import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveBar } from '@nivo/bar';

import {
  createDescriptions,
  createGradientColors,
  renderGradients,
  renderMatchs,
} from '../utils/gradients';
import { createData } from '../utils/charts';
import Legends from '../legends/Legends';
import { renderTooltip } from '../utils/tooltip';
import { Chart, ChartsInfoContainer } from '../CashFlow.styled';
import { formatNumberOutput } from '../../../utils/format/cash';
import { chartsColors } from '../../../utils/constants/chartsColors';
import { useSelector } from 'react-redux';

function renderKeys(chartFilter, isDetailed, transactions, categories, date) {
  switch (chartFilter) {
    case 'expensesToIncomes':
      return ['expenses', 'incomes'];
    case 'expenses':
      if (isDetailed) {
        return Array.from(
          new Set(
            transactions
              .filter((transaction) => {
                const transactionDate = new Date(transaction.date);
                return (
                  transaction.transactionType === 'expense' &&
                  transactionDate <= date.to &&
                  transactionDate >= date.from
                );
              })
              .map((transaction) => {
                return categories.find(
                  (category) => category.id === transaction.category,
                ).description;
              }),
          ),
        );
      }
      return ['expenses'];
    case 'incomes':
      if (isDetailed) {
        return Array.from(
          new Set(
            transactions
              .filter((transaction) => transaction.transactionType === 'income')
              .map((transaction) => {
                return categories.find(
                  (category) => category.id === transaction.category,
                ).description;
              }),
          ),
        );
      }
      return ['incomes'];
    default:
      return [chartFilter];
  }
}

function BarChart({ transactions, categories, chartFilter, isDetailed, date }) {
  const { mode } = useSelector((state) => state.header);

  const keys = renderKeys(
    chartFilter,
    isDetailed,
    transactions,
    categories,
    date,
  );
  const commonData = createData(
    { transactions, categories, chartFilter, isDetailed, date },
    'bar',
  );

  return (
    <ChartsInfoContainer>
      <Chart>
        <ResponsiveBar
          theme={{
            axis: {
              ticks: {
                line: {
                  stroke: chartsColors[mode].stroke,
                },
                text: {
                  fill: chartsColors[mode].text,
                },
              },
              legend: {
                text: {
                  fill: chartsColors[mode].text,
                },
              },
            },
            grid: {
              line: {
                stroke: chartsColors[mode].stroke,
                strokeDasharray: '4 4',
              },
            },
          }}
          margin={{
            top: 10,
            right: 40,
            bottom: 50,
            left: 80,
          }}
          data={commonData}
          keys={keys}
          indexBy="date"
          valueFormat={(value) => formatNumberOutput(value, 'USD')}
          colors={({ id, data }) => String(data[`${id}Color`][1])}
          defs={renderGradients(createGradientColors(categories))}
          fill={renderMatchs(createDescriptions(categories))}
          padding={0.35}
          enableLabel={false}
          enableGridX={true}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          axisLeft={{
            format: (value) => `${Number(value).toLocaleString('en-US')}`,
          }}
          axisBottom={{
            tickPadding: 10,
            legend: 'date',
            legendOffset: 40,
            legendPosition: 'middle',
          }}
          groupMode={
            chartFilter === 'expensesToIncomes' ? 'grouped' : 'stacked'
          }
          innerPadding={chartFilter === 'expensesToIncomes' ? 3.5 : 0}
          tooltip={({ id, formattedValue, color }) =>
            renderTooltip(id, formattedValue, color)
          }
        />
      </Chart>
      <Legends data={commonData} chartType="bar" keys={keys} />
    </ChartsInfoContainer>
  );
}

BarChart.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  chartFilter: PropTypes.string,
  isDetailed: PropTypes.bool,
  date: PropTypes.object,
};

export default BarChart;
