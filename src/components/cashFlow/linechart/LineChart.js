import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';

import { createData } from '../utils/charts';
import Legends from '../legends/Legends';
import { renderTooltip } from '../utils/tooltip';
import { Chart, ChartsInfoContainer } from '../CashFlow.styled';
import { formatNumberOutput } from '../../../utils/format/cash';
import { chartsColors } from '../../../utils/constants/chartsColors';
import { useSelector } from 'react-redux';
import { names } from '../../../utils/constants/currencies';
import { formatAxisAmount } from '../utils/axis';

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
          margin={{ top: 10, right: 40, bottom: 50, left: 80 }}
          xScale={{ type: 'point' }}
          enableArea={true}
          areaOpacity={0.05}
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
          }) =>
            renderTooltip(
              serieId,
              formatNumberOutput(yFormatted, names[mainCurrency]),
            )
          }
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
