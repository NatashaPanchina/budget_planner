import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';

import { createData } from '../utils/charts';
import Legends from '../legends/Legends';
import { renderTooltip } from '../utils/tooltip';
import { Chart, ChartsInfoContainer } from '../Analysis.styled';
import { formatNumberOutput } from '../../../utils/format/cash';
import { chartsColors } from '../../../utils/constants/chartsColors';
import { useSelector } from 'react-redux';

function LineChart({
  transactions,
  categories,
  chartFilter,
  isDetailed,
  date,
}) {
  const { mode } = useSelector((state) => state.header);
  const commonData = createData(
    { transactions, categories, chartFilter, isDetailed, date },
    'line',
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
          margin={{ top: 10, right: 50, bottom: 50, left: 80 }}
          xScale={{ type: 'point' }}
          enablePoints={false}
          axisLeft={{
            format: (value) => `${Number(value).toLocaleString('en-US')}`,
          }}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 10,
            tickRotation: 0,
            legend: 'date',
            legendOffset: 40,
            legendPosition: 'middle',
          }}
          lineWidth={2}
          useMesh={true}
          tooltip={({
            point: {
              serieId,
              data: { yFormatted },
            },
          }) => renderTooltip(serieId, formatNumberOutput(yFormatted, 'USD'))}
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
