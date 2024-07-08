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
import { Chart, ChartsInfoContainer } from '../CashFlow.styled';
import { formatNumberOutput } from '../../../utils/format/cash';
import { chartsColors } from '../../../utils/constants/chartsColors';
import { useSelector } from 'react-redux';
import { formatAxisAmount } from '../utils/axis';
import { names } from '../../../utils/constants/currencies';
import { renderKeys } from './utils';
import Tooltip from '../utils/tooltip/Tooltip';

function BarChart({
  transactions,
  categories,
  chartFilter,
  isCompare,
  isDetailed,
  date,
  comparedDate,
}) {
  const header = useSelector((state) => state.header);
  const mode = header.mode;
  const mainCurrency = header.profile ? header.profile.currency : names.USD;

  const keys = renderKeys(
    chartFilter,
    isDetailed,
    transactions,
    categories,
    date,
    isCompare,
    comparedDate,
  );
  const commonData = createData(
    {
      transactions,
      categories,
      chartFilter,
      isCompare,
      isDetailed,
      date,
      comparedDate,
    },
    'bar',
    mainCurrency,
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
          markers={[
            {
              axis: 'y',
              value: 0,
              lineStyle: {
                stroke: chartsColors[mode].marker,
                strokeDasharray: '4 4',
                strokeWidth: 1,
              },
            },
          ]}
          margin={{
            top: 10,
            right: 20,
            bottom: 20,
            left: 50,
          }}
          data={commonData}
          keys={keys}
          indexBy="date"
          valueFormat={(value) => formatNumberOutput(value, mainCurrency)}
          colors={({ id, data }) => String(data[`${id}Color`][1])}
          defs={renderGradients(
            createGradientColors(categories, date, comparedDate),
          )}
          fill={renderMatchs(
            createDescriptions(categories, date, comparedDate),
          )}
          borderRadius={8}
          padding={0.6}
          enableLabel={false}
          enableGridX={true}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          axisLeft={{
            format: (value) => formatAxisAmount(value),
          }}
          groupMode={
            chartFilter === 'expensesToIncomes' || isCompare
              ? 'grouped'
              : 'stacked'
          }
          innerPadding={chartFilter === 'expensesToIncomes' ? 4.5 : 0}
          tooltip={({ id, formattedValue }) => (
            <Tooltip id={id} formattedValue={formattedValue} />
          )}
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
  isCompare: PropTypes.bool,
  isDetailed: PropTypes.bool,
  date: PropTypes.object,
  comparedDate: PropTypes.object,
};

export default BarChart;
