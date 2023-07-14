import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';

import { createData } from '../utils/charts';
import Legends from '../legends/Legends';
import { renderTooltip } from '../utils/tooltip';

function LineChart({
  transactions,
  categories,
  chartFilter,
  isDetailed,
  date,
}) {
  let commonData = createData(
    { transactions, categories, chartFilter, isDetailed, date },
    'line',
  );
  return (
    <div className="line_chart_container">
      <div className="chart">
        <ResponsiveLine
          theme={{
            axis: {
              ticks: {
                line: {
                  stroke: '#fff',
                },
                text: {
                  fill: '#fff',
                },
              },
            },
            grid: {
              line: {
                stroke: '#989393',
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
          }) =>
            renderTooltip(
              serieId,
              `$ ${Number(yFormatted).toLocaleString('en-US', {
                minimumFractionDigits: 2,
              })}`,
            )
          }
        />
      </div>
      <Legends data={commonData} chartType="line" />
    </div>
  );
}

LineChart.propTypes = {
  transactions: PropTypes.array,
  categories: PropTypes.array,
  chartFilter: PropTypes.string,
  isDetailed: PropTypes.bool,
  date: PropTypes.object,
};

export default LineChart;
