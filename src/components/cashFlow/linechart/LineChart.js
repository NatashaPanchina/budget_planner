import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';

import { createData } from '../utils/charts';
import Legends from '../legends/Legends';
import { Chart, ChartsInfoContainer } from '../CashFlow.styled';
import { formatNumberOutput } from '../../../utils/format/cash';
import { chartsColors } from '../../../utils/constants/chartsColors';
import { useSelector } from 'react-redux';
import { names } from '../../../utils/constants/currencies';
import { formatAxisAmount } from '../utils/axis';
import Tooltip from '../utils/tooltip/Tooltip';

function LineChart({
  transactions,
  categories,
  chartFilter,
  isDetailed,
  date,
}) {
  const header = useSelector((state) => state.header);
  const mode = header.mode;
  const mainCurrency = header.profile ? header.profile.currency : names.USD;
  const commonData = createData(
    { transactions, categories, chartFilter, isDetailed, date },
    'line',
    mainCurrency,
  );

  return (
    <ChartsInfoContainer>
      <Chart>
        <ResponsiveLine
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
          data={commonData}
          colors={{ datum: 'color[1]' }}
          margin={{ top: 10, right: 30, bottom: 30, left: 50 }}
          xScale={{ type: 'point' }}
          enableArea={true}
          areaOpacity={0.1}
          enablePoints={false}
          axisLeft={{
            format: (value) => formatAxisAmount(value),
          }}
          lineWidth={2}
          useMesh={true}
          tooltip={({
            point: {
              serieId,
              data: { yFormatted },
            },
          }) => (
            <Tooltip
              id={serieId}
              formattedValue={formatNumberOutput(
                yFormatted,
                names[mainCurrency],
              )}
            />
          )}
        />
      </Chart>
      <Legends data={commonData} chartType="line" />
    </ChartsInfoContainer>
  );
}

LineChart.propTypes = {
  mode: PropTypes.string,
  transactions: PropTypes.array,
  categories: PropTypes.array,
  chartFilter: PropTypes.string,
  isDetailed: PropTypes.bool,
  date: PropTypes.object,
};

export default LineChart;
